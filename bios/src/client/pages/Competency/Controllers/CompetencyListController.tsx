import { HStack, ReactView, Spinner, State, UIController, UIView, UIViewBuilder, VStack, cLeading, cTop, cTopLeading, nanoid, useNavigate } from "@tuval/forms";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Tooltip } from "@mui/material";
import { GridColDef, trTR } from "@mui/x-data-grid";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import StyledDataGrid from "../../../components/StyledDataGrid";
import { Views } from "../../../components/Views";
import ICompetency from "../../../interfaces/ICompetency";
import Competency from "../../../../server/hooks/competency/main";
import { Query, Services, useGetMe } from "@realmocean/sdk";
import CompetencyDepartment from "../../../../server/hooks/competencyDepartment/main";
import { Resources } from "../../../assets/Resources";
import { SiMicrosoftexcel } from "react-icons/si";
import { competencyTransferTemplateByExcel } from "../../../assets/Functions/competencyTransferTemplateByExcel";
import excelToJson from "../../../assets/Functions/excelToJson";
import LinearProgressWithLabel from "../../../components/LinearProgressWithLabel";
import AppInfo from "../../../../AppInfo";
import Collections from "../../../../server/core/Collections";
import ICompetencyGroup from "../../../interfaces/ICompetencyGroup";
import { IOrganizationStructure } from "../../../interfaces/IOrganizationStructure";
import { Umay } from "@tuval/core";
import { Toast } from "../../../components/Toast";
import AccountRelation from "../../../../server/hooks/accountRelation/main";
import { GridContainer } from "../Views/View";

interface ICompetencyImportFromExcel {
    yetkinlik_adi: string;
    yetkinlik_aciklamasi: string;
    yetkinlik_grubu_adi: string;
    departman_adlari: string;
}

export class CompetencyListController extends UIController {

    public LoadView(): UIView {

        const navigate = useNavigate();

        const { me, isLoading: isMeLoading } = useGetMe("console");
        const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id)

        const { competencyList, isLoadingCompetencyList } = Competency.GetList(me?.prefs?.organization)
        const { competencyDepartmentList, isLoadingCompetencyDepartmentList } = CompetencyDepartment.GetList(me?.prefs?.organization)

        return (
            isMeLoading || isLoadingCompetencyList || isLoadingCompetencyDepartmentList || isLoadingResult ? VStack(Spinner()) :
                UIViewBuilder(() => {

                    const [filterKey, setFilterKey] = useState("");
                    const [rowsActive, setRowsActive] = useState<boolean>(true);

                    // excel import -- start
                    const [open, setOpen] = React.useState(false);
                    const fileInputRef = useRef<HTMLInputElement>(null);
                    const [excelData, setExcelData] = React.useState<ICompetencyImportFromExcel[]>([]);
                    const [excelColumns, setExcelColumns] = React.useState<GridColDef[]>([]);
                    const [isTransfer, setIsTransfer] = React.useState(false);
                    const [transferPercent, setTransferPercent] = React.useState(0);

                    const handleClickOpen = () => {
                        setOpen(true);
                    };

                    const handleClose = () => {
                        setOpen(false);
                        setExcelColumns([]);
                        setExcelData([]);
                    };


                    const handleButtonClick = () => {
                        if (fileInputRef.current) {
                            fileInputRef.current.click(); // Dosya seçme penceresini aç
                        }
                    };

                    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files?.[0];
                        console.log(file);
                        if (file) {
                            excelToJson(file, (data) => {
                                // first row is columns
                                const columns = data?.shift() as string[];
                                const excelColumns: GridColDef[] = columns.map((column, index) => {
                                    return {
                                        field: column.toLowerCase(),
                                        headerName: column.replace(/_/g, " "),
                                        flex: 1,
                                        minWidth: 150,
                                        type: "string"
                                    }
                                });
                                setExcelColumns(excelColumns);

                                // data without first row
                                let excelValues = []
                                data?.map((row, index) => {
                                    let appendRow: any = {}
                                    row.forEach((cell: string, cellIndex: number) => {
                                        appendRow[columns[cellIndex].toLowerCase()] = String(cell);
                                    });
                                    if (appendRow.yetkinlik_adi && appendRow.yetkinlik_adi !== "") {
                                        excelValues.push({ id: index, ...appendRow });
                                    }
                                });

                                setExcelData(excelValues);

                                handleClickOpen();
                            });
                        }
                    };

                    const handleTransfer = async () => {
                        setIsTransfer(true);

                        // transfer
                        try {
                            const competencyGroups: ICompetencyGroup.IGetCompetencyGroup[] = await Services.Databases.listDocuments(
                                AppInfo.Name, AppInfo.Database, Collections.CompetencyGroup,
                                [Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_active_group", true), Query.equal("is_deleted_group", false), Query.limit(10000)]).then((data) => data.documents as any);
                            console.log(competencyGroups);

                            const departments: IOrganizationStructure.IDepartments.IDepartment[] = await Services.Databases.listDocuments(
                                AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureDepartment,
                                [Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted", false), Query.equal("is_active", true), Query.limit(10000)]).then((data) => data.documents as any);

                            const task = new Umay();
                            const failedCompetencies: ICompetencyImportFromExcel[] = [];
                            excelData.forEach((competencyItem, index) => {
                                const competencyDepartments = competencyItem.departman_adlari.split(",").map((item) => item.trim());
                                const competencyGroup = competencyGroups.find((item) => item.competency_group_name === competencyItem.yetkinlik_grubu_adi);
                                const createCompetency: ICompetency.ICreateCompetency = {
                                    competency_id: nanoid(),
                                    competency_name: competencyItem.yetkinlik_adi,
                                    competency_description: competencyItem.yetkinlik_aciklamasi,
                                    competency_group_name: competencyItem.yetkinlik_grubu_adi,
                                    tenant_id: me?.prefs?.organization,
                                    competency_group_id: competencyGroup?.$id,
                                    realm_id: me?.prefs?.organization,
                                }
                                task.Task(async () => {
                                    try {
                                        await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.Competency, createCompetency.competency_id, createCompetency)

                                        competencyDepartments.forEach(async (departmentName) => {
                                            const department = departments.find((item) => item.name === departmentName);
                                            if (department) {
                                                const comp_dep_id = nanoid();
                                                try {
                                                    await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.CompetencyDepartment, comp_dep_id, {
                                                        competency_department_table_id: comp_dep_id,
                                                        competency_department_id: department.id,
                                                        competency_department_name: department.name,
                                                        competency_id: createCompetency.competency_id,
                                                        tenant_id: me?.prefs?.organization
                                                    });
                                                } catch {
                                                    console.log(departmentName);
                                                }
                                            }
                                        })

                                        const percentage = index / excelData.length * 100;
                                        setTransferPercent(percentage);

                                    } catch {
                                        failedCompetencies.push(competencyItem);
                                    }
                                })
                                task.Wait(2);
                            })

                            task.Wait(1);

                            failedCompetencies.forEach((competencyItem, index) => {
                                const competencyDepartments = competencyItem.departman_adlari.split(",").map((item) => item.trim());
                                const competencyGroup = competencyGroups.find((item) => item.competency_group_name === competencyItem.yetkinlik_grubu_adi);
                                const createCompetency: ICompetency.ICreateCompetency = {
                                    competency_id: nanoid(),
                                    competency_name: competencyItem.yetkinlik_adi,
                                    competency_description: competencyItem.yetkinlik_aciklamasi,
                                    competency_group_name: competencyItem.yetkinlik_grubu_adi,
                                    tenant_id: me?.prefs?.organization,
                                    competency_group_id: competencyGroup?.$id,
                                    realm_id: me?.prefs?.organization,
                                }
                                task.Task(async () => {
                                    try {
                                        await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.Competency, createCompetency.competency_id, createCompetency)

                                        competencyDepartments.forEach(async (departmentName) => {
                                            const department = departments.find((item) => item.name === departmentName);
                                            if (department) {
                                                const comp_dep_id = nanoid();
                                                try {
                                                    await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.CompetencyDepartment, comp_dep_id, {
                                                        competency_department_table_id: comp_dep_id,
                                                        competency_department_id: department.id,
                                                        competency_department_name: department.name,
                                                        competency_id: createCompetency.competency_id,
                                                        tenant_id: me?.prefs?.organization
                                                    });
                                                } catch {
                                                    console.log(departmentName);
                                                }
                                            }
                                        })

                                    } catch {
                                        console.log(competencyItem);
                                    }
                                })
                            })


                            task.Wait(2);


                            task.Task(() => {
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Yetkinlikler aktarıldı.'
                                });

                                setTimeout(() => {
                                    window.location.reload();
                                }, 2000);
                            })

                            task.Run()

                        }
                        catch (error: any) {
                            setIsTransfer(false);
                            Toast.fire({
                                icon: 'error',
                                title: 'Yetkinlikler aktarılamadı.'
                            });
                        }
                    }

                    // excel import -- end

                    const columns: GridColDef[] = [
                        {
                            field: "competency_name",
                            headerName: "Yetkinlik Adı",
                            minWidth: 200,
                            editable: false,
                            disableColumnMenu: true,
                            flex: 1,
                            renderCell: (params) => { // renderCell özelliğini ekleyerek hücreyi özelleştir
                                return (
                                    <div style={{ cursor: "pointer" }} onClick={() => navigate(`/app/competency-dashboard/view/${params.row.competency_id}`)}>
                                        {params.value}
                                    </div>
                                );
                            }

                        },
                        {
                            field: "competency_group_name",
                            headerName: "Yetkinlik Grubu",
                            minWidth: 200,
                            editable: false,
                            disableColumnMenu: true,
                            flex: 1
                        },
                        {
                            field: "competency_departments",
                            headerName: "Departmanlar",
                            minWidth: 200,
                            editable: false,
                            disableColumnMenu: true,
                            flex: 1,
                            valueGetter: (params) => {
                                return competencyDepartmentList.filter((item) => item.competency_id === params.row.$id)
                                    .map((item) => item.competency_department_name).join(", ");
                            }
                        },
                        {
                            field: "competency_id",
                            headerName: "İşlemler",
                            minWidth: 70,
                            editable: false,
                            disableColumnMenu: true,
                            renderCell: (params) => {
                                return (
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Button variant="text" size="small" onClick={() => navigate(`/app/competency/edit/${params.value}`)}>Düzenle</Button>
                                    </div>
                                )
                            }
                        }
                    ];

                    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
                        setFilterKey(e.target.value);
                    }

                    const handleSetActiveRows = () => {
                        setRowsActive(!rowsActive);
                    }

                    return (
                        VStack({ spacing: 15, alignment: cTopLeading })(
                            HStack({ alignment: cLeading })(
                                Views.Title("Yetkinlikler").paddingTop("10px")
                            ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                            HStack({ alignment: cTop })(
                                ReactView(
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px",
                                        width: "100%",
                                    }}>
                                        <div style={{
                                            display: "flex",
                                            gap: "10px",
                                            alignItems: "center"
                                        }}>
                                            <div style={{ width: "80%" }}>
                                                <TextField placeholder="Yetkinlik Arayın..." size="small" fullWidth onChange={handleSearch} />
                                            </div>
                                            <Tooltip title={`${rowsActive ? "Pasif" : "Aktif"} Yetkinlikleri Göster`}>
                                                <IconButton onClick={handleSetActiveRows}>
                                                    <FilterAltOutlinedIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <div style={{
                                                width: "20%",
                                                display: "flex",
                                                gap: "10px",
                                            }}>
                                                <Button size="small" fullWidth variant="outlined" onClick={() => navigate("/app/competency/create")}>Yeni Yetkinlik</Button>
                                                {
                                                    accountRelations[0].is_admin &&
                                                    <Tooltip title={`Yetkinlik Aktarım Şablonunu İndir`}>
                                                        <Button
                                                            variant='contained'
                                                            onClick={() => competencyTransferTemplateByExcel(localStorage.getItem(Resources.ParameterLocalStr.line_based_competency_relationship) == "true" ? true : false)}
                                                            size='small'><SiMicrosoftexcel size={20} />
                                                        </Button>
                                                    </Tooltip>
                                                }
                                                {
                                                    accountRelations[0].is_admin &&
                                                    <Tooltip title={`Yetkinlik Aktarım Şablonunu Yükle`}>
                                                        <Button
                                                            variant='outlined'
                                                            onClick={handleButtonClick}
                                                            size='small'><SiMicrosoftexcel size={20} /><input
                                                                type='file'
                                                                accept='.xlsx, .xls'
                                                                onChange={handleFileChange}
                                                                ref={fileInputRef}
                                                                style={{ display: 'none' }}
                                                            />
                                                        </Button>
                                                    </Tooltip>
                                                }
                                            </div>
                                        </div>
                                        <GridContainer>
                                            <StyledDataGrid
                                                rows={competencyList.filter((item) => item.is_active_competency === rowsActive).filter((item) => item.competency_name.toLowerCase().indexOf(filterKey.toLowerCase()) > -1)}
                                                columns={columns}
                                                getRowId={(row) => row.$id}
                                                localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                            />
                                        </GridContainer>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            fullScreen
                                        >
                                            <DialogTitle>Yetkinlik Aktarımı</DialogTitle>
                                            <DialogContent>
                                                <div style={{
                                                    height: "calc(100vh - 150px)",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}>
                                                    <StyledDataGrid rows={excelData} columns={excelColumns} sx={{ width: "100%" }}
                                                        localeText={trTR.components.MuiDataGrid.defaultProps.localeText} /> {/* excel data */}
                                                    {isTransfer &&
                                                        <div style={{ width: "100%" }}>
                                                            <DialogContentText>Aktarım yapılıyor...</DialogContentText>
                                                            <LinearProgressWithLabel value={transferPercent} />
                                                        </div>
                                                    }
                                                </div>
                                            </DialogContent>
                                            <DialogActions>
                                                {!isTransfer && <Button onClick={handleClose} color='error' variant='contained'>İptal</Button>}
                                                {!isTransfer && <Button variant='contained' color='primary' onClick={handleTransfer}>Aktarımı Başlat</Button>}
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                )
                            )
                        ).padding("0 20px")
                    )
                })
        )


    }
}