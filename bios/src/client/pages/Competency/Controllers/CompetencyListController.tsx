import { HStack, ReactView, Spinner, State, UIController, UIView, UIViewBuilder, VStack, cLeading, cTop, cTopLeading, nanoid, useNavigate } from "@tuval/forms";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, IconButton, TextField, Tooltip } from "@mui/material";
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
import { Toast, ToastError, ToastSuccess } from "../../../components/Toast";
import AccountRelation from "../../../../server/hooks/accountRelation/main";
import { GridContainer } from "../Views/View";
import CompetencyPositionRelation from "../../../../server/hooks/competencyPositionRelation/main";
import OrganizationStructurePosition from "../../../../server/hooks/organizationStructrePosition/main";
import CompetencyWorkplace from "../../../../server/hooks/competencyWorkPlace/Main";
import { IoIosArrowForward } from "react-icons/io";
import CompetencyLineRelation from "../../../../server/hooks/competencyLineRelation/main";
import OrganizationStructureLine from "../../../../server/hooks/organizationStructureLine/main";
import { DataImportBroker } from "../../../../server/brokers/DataImportBroker";

const positionBased = localStorage.getItem("position_based_polyvalence_management") === "true" ? true : false;

interface ICompetencyImportFromExcel {
    yetkinlik_adi: string;
    yetkinlik_aciklamasi: string;
    yetkinlik_grubu_adi: string;
    departman_adlari: string;
}

export class CompetencyListController extends UIController {

    // Pagination States
    @State()
    private page: number;

    @State()
    private pageSize: number;

    @State()
    private searchTerm: string;

    @State()
    private isActive: boolean;

    protected BindRouterParams(): void {
        this.page = 0;
        this.pageSize = 20;
        this.searchTerm = "";
        this.isActive = true;
    }

    public LoadView(): UIView {

        const navigate = useNavigate();

        const { me, isLoading: isMeLoading } = useGetMe("console");
        const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id)

        const { competencyList, isLoadingCompetencyList, totalCompetencyList } = Competency.GetCompetenciesPagination(this.page, this.pageSize, this.isActive);
        const { competencyDepartmentList, isLoadingCompetencyDepartmentList } = CompetencyDepartment.GetList(me?.prefs?.organization)

        // positions
        const { positions, isLoadingPositions } = OrganizationStructurePosition.GetList(me?.prefs?.organization);
        const { competencyPositionRelationList, isLoading } = CompetencyPositionRelation.GetList();
        //lines
        const [lineBasedCompetencyRelationship, setLineBasedCompetencyRelationship] = useState<boolean>(false);
        const { competencyLineRelationList, isLoading: isLoadingCompetencyLineRelation } = CompetencyLineRelation.GetList();
        const { lines, isLoadingLines } = OrganizationStructureLine.GetList(me?.prefs?.organization);

        // workplace
        const [workPlaceDefination, setWorkPlaceDefination] = useState<boolean>(false);
        const { competencyWorkplaceList, isLoadingCompetencyWorkplacetList } = CompetencyWorkplace.GetList(me?.prefs?.organization);
        return (
            isMeLoading || isLoadingCompetencyList || isLoadingLines || isLoadingCompetencyWorkplacetList || isLoadingCompetencyDepartmentList || isLoadingResult || isLoading || isLoadingPositions || isLoadingCompetencyLineRelation ? VStack(Spinner()) :
                UIViewBuilder(() => {

                    const [filterKey, setFilterKey] = useState("");

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

                        DataImportBroker.Default.competencyImport(excelData, me?.prefs?.organization).then((res) => {
                            ToastSuccess("Başarılı", "Aktarım başarılı bir şekilde tamamlandı.");
                            handleClose();
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000);
                        }).catch((err) => {
                            ToastError("Hata", "Aktarım sırasında bir hata oluştu. Lütfen tekrar deneyin.");
                            handleClose();
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000);
                        })
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
                        positionBased ?
                            {
                                field: "competency_positions",
                                headerName: "Pozisyonlar",
                                minWidth: 200,
                                editable: false,
                                disableColumnMenu: true,
                                flex: 1,
                                valueGetter: (params) => {
                                    return competencyPositionRelationList.filter((item) => item.competency_id === params.row.$id)
                                        .map((item) => positions.find((position) => position.id === item.position_id)?.name).join(", ");
                                }
                            }
                            :
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
                        lineBasedCompetencyRelationship &&
                        {
                            field: "line_name",
                            headerName: "Hat",
                            minWidth: 200,
                            editable: false,
                            disableColumnMenu: true,
                            flex: 1,
                            valueGetter(params) {
                                return competencyLineRelationList.filter((item) => item.competency_id === params.row.$id).map((item) => lines.find((line) => line.id === item.line_id)?.name).join(", ");
                            }
                        },
                        workPlaceDefination &&
                        {
                            field: "work_place_name",
                            headerName: "İşyeri",
                            minWidth: 200,
                            editable: false,
                            disableColumnMenu: true,
                            flex: 1,
                            valueGetter(params) {
                                return competencyWorkplaceList.filter((item) => item.competency_id === params.row.$id).map((item) => item.work_place_name).join(", ");
                            },
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
                        this.isActive = !this.isActive;
                    }

                    useEffect(() => {
                        Services.Databases.listDocuments(
                            AppInfo.Name,
                            AppInfo.Database,
                            Collections.Parameter,
                            [
                                Query.equal("name", "work_place_definition"),
                                Query.limit(10000)
                            ]
                        ).then((res) => {
                            setWorkPlaceDefination(res.documents[0]?.is_active)
                        }).then(() => {
                            Services.Databases.listDocuments(
                                AppInfo.Name,
                                AppInfo.Database,
                                Collections.Parameter,
                                [
                                    Query.equal("name", "line_based_competency_relationship"),
                                    Query.limit(10000)
                                ]
                            ).then((res) => {
                                setLineBasedCompetencyRelationship(res.documents[0]?.is_active)
                            })
                        })
                    }, [])

                    return (
                        VStack({ spacing: 15, alignment: cTopLeading })(
                            HStack({ alignment: cLeading })(
                                Views.Title(this.isActive ? "Yetkinlikler" : "Pasif Yetkinlikler").paddingTop("10px")
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
                                            <Tooltip title={`${this.isActive ? "Pasif" : "Aktif"} Yetkinlikleri Göster`}>
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
                                                    (accountRelations[0].is_admin || accountRelations[0].authorization_profile === "admin") &&
                                                    <Tooltip title={`Yetkinlik Aktarım Şablonunu İndir`}>
                                                        <Button
                                                            variant='contained'
                                                            onClick={() => {
                                                                Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.Parameter, [Query.equal("name", "work_place_definition")]).
                                                                    then((res) => {
                                                                        competencyTransferTemplateByExcel(
                                                                            localStorage.getItem(Resources.ParameterLocalStr.line_based_competency_relationship) == "true" ? true : false, res.documents[0]?.is_active)
                                                                    })
                                                            }}
                                                            size='small'><SiMicrosoftexcel size={20} />
                                                        </Button>
                                                    </Tooltip>
                                                }
                                                {
                                                    (accountRelations[0].is_admin || accountRelations[0].authorization_profile === "admin") &&
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
                                                rows={competencyList.filter((item) => item.competency_name.toLowerCase().indexOf(filterKey.toLowerCase()) > -1)}
                                                columns={columns}
                                                getRowId={(row) => row.$id}
                                                localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                                hideFooter
                                                slots={{
                                                    toolbar: () => (
                                                        <div style={{ display: "flex", gap: "10px", width: "100%", alignItems: "center" }}>
                                                            <IconButton onClick={() => {
                                                                if (this.page > 0) {
                                                                    this.page = this.page - 1;  // Önceki sayfaya git
                                                                }
                                                            }}>
                                                                <IoIosArrowForward style={{ transform: "rotate(180deg)" }} />
                                                            </IconButton>
                                                            <IconButton onClick={() => {
                                                                if (this.page < Math.ceil(totalCompetencyList / this.pageSize) - 1) {
                                                                    this.page = this.page + 1;  // Sonraki sayfaya git
                                                                }
                                                            }}>
                                                                <IoIosArrowForward />
                                                            </IconButton>
                                                            <span>{this.page} / {Math.ceil(totalCompetencyList / this.pageSize) - 1}</span>
                                                            <span>Toplam: {totalCompetencyList}</span>
                                                            <span>Gösterilen: {competencyList.length}</span>
                                                        </div>
                                                    )
                                                }}
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