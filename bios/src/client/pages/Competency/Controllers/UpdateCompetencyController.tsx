import { ReactView, Spinner, UIController, UIView, UIViewBuilder, VStack, cTop, nanoid, useEffect, useNavigate, useParams, useState } from "@tuval/forms";
import Swal from "sweetalert2";
import { Toast } from "../../../components/Toast";
import { GridColDef, trTR } from "@mui/x-data-grid";
import ICompetency from "../../../interfaces/ICompetency";
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField, Typography } from "@mui/material";
import Form from "../Views/Form";
import React from "react";
import StyledDataGrid from "../../../components/StyledDataGrid";
import OrganizationStructureDepartment from "../../../../server/hooks/organizationStructureDepartment/main";
import { useGetMe } from "@realmocean/sdk";
import CompetencyGroup from "../../../../server/hooks/competencyGroup/main";
import Competency from "../../../../server/hooks/competency/main";
import removeDollarProperties from "../../../assets/Functions/removeDollarProperties";
import CompetencyDepartment from "../../../../server/hooks/competencyDepartment/main";
import AppInfo from "../../../../AppInfo";

const formReset: ICompetency.ICompetency = {
    competency_id: "",
    competency_name: "",
    competency_group_id: "",
    competency_group_name: "",
    competency_evaluation_period: "",
    competency_real_value: "",
    competency_target_value: "",
    competency_value_desc: "",
    employee_id: "",
    employee_name: "",
    is_active_competency: false,
    is_deleted_competency: false,
    polyvalence_table_id: "",
    polyvalence_table_name: "",
    realm_id: "",
    tenant_id: "",
}

export class UpdateCompetencyController extends UIController {

    public LoadView(): UIView {

        const navigate = useNavigate();
        const { id } = useParams();

        const { me, isLoading } = useGetMe("console");
        const { competency, isLoadingCompetency } = Competency.Get(id)
        const { updateCompetency } = Competency.Update();
        const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization);
        const { groups, isLoadingGroups } = CompetencyGroup.GetList(me?.prefs?.organization);
        const { competencyDepartments, isLoadingCompetencyDepartments } = CompetencyDepartment.GetByCompetencyId(competency?.competency_id);
        const { updateCompetencyDepartment } = CompetencyDepartment.Update();
        const { createCompetencyDepartment } = CompetencyDepartment.CreateCompetencyDepartment();



        return (
            isLoading || isLoadingCompetency || isLoadingDepartments || isLoadingGroups || isLoadingCompetencyDepartments ? VStack(Spinner()) :
                UIViewBuilder(() => {

                    const [form, setForm] = useState<ICompetency.ICompetency>(formReset)
                    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
                    const [isActive, setIsActive] = useState<boolean>(true);

                    // // lines
                    // const [lines, setLines] = useState<ILines.ILine[]>([]);
                    // const [selectedLines, setSelectedLines] = useState<string[]>([]);

                    // const [lineBasedCompetency, setLineBasedCompetency] = useState<boolean>(isLineBasedCompetencyActive);

                    const lineColumns: GridColDef[] = [
                        {
                            field: "name",
                            headerName: "Hat Adı",
                            flex: 1,
                        },
                        {
                            field: "department_name",
                            headerName: "Bağlı Olduğu Departman",
                            flex: 1,
                        }
                    ]


                    const departmentColumns: GridColDef[] = [
                        {
                            field: "name",
                            headerName: "Departman Adı",
                            flex: 1,
                        }
                    ];

                    // useEffect(() => {
                    //     Promise.all([
                    //         PolivalansBrokerClient.GetCompetencyGroupsByActive(),
                    //         PolivalansBrokerClient.GetCompetency(this.id),
                    //         PolivalansBrokerClient.GetActiveOrganizationLines(),
                    //         PolivalansBrokerClient.GetCompetencyLineRelationByCompetencyId(this.id)
                    //     ]).then((response) => {
                    //         const [groups, competency, lines, selectedLinesRes] = response;
                    //         setCompetencyGroups(groups)
                    //         setForm(competency)
                    //         setLines(lines)
                    //         setSelectedLines(selectedLinesRes)
                    //         setSelectedDepartments(competency.competency_departments.map((department) => department.competency_department_id))
                    //         setIsActive(competency.is_active_competency == "true" ? true : false)
                    //     })
                    // }, [])
                    useEffect(() => {
                        setForm(removeDollarProperties(competency))
                        setSelectedDepartments(competencyDepartments.map((department) => department.competency_department_id))
                    }, [])

                    const handleChangeGroup = (e: SelectChangeEvent<string>) => {
                        const group = groups.find((group) => group.competency_group_id === e.target.value)
                        setForm({
                            ...form,
                            [e.target.name as string]: e.target.value,
                            competency_group_name: group?.competency_group_name
                        })
                    }

                    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                        setForm({
                            ...form,
                            [e.target.name as string]: e.target.value
                        })
                    }

                    const onSubmit = (e) => {
                        e.preventDefault();
                        Toast.fire({
                            icon: "info",
                            title: "Yetkinlik düzenleniyor...",
                            timer: 5000,
                        })
                        competencyDepartments.map((department) => {
                            if (!selectedDepartments.includes(department.competency_department_id)) {
                                updateCompetencyDepartment({
                                    databaseId: AppInfo.Database,
                                    collectionId: "competency_department",
                                    documentId: department.$id,
                                    data: {
                                        ...removeDollarProperties(department),
                                        is_deleted: true
                                    }
                                })
                            }
                        })

                        selectedDepartments.map((department) => {
                            if (!competencyDepartments.map((department) => department.competency_department_id).includes(department)) {
                                const createDepId = nanoid();
                                createCompetencyDepartment({
                                    documentId: createDepId,
                                    data: {
                                        competency_department_table_id: createDepId,
                                        competency_department_id: department,
                                        competency_department_name: departments.find((dep) => dep.id === department).name,
                                        competency_id: id,
                                        tenant_id: me?.prefs?.organization
                                    }
                                })
                            }
                        })

                        updateCompetency({
                            databaseId: AppInfo.Database,
                            collectionId: "competency",
                            documentId: id,
                            data: form
                        }, () => {
                            Toast.fire({
                                icon: "success",
                                title: "Yetkinlik başarıyla düzenlendi."
                            });
                            navigate("/app/competency/list");
                        })


                        // form.competency_departments = selectedCompetencyDepartments;
                        // PolivalansBrokerClient.UpdateCompetency(form).then((response) => {
                        //     if (lineBasedCompetency) {
                        //         const lineRelationData: ILines.ICreateOrUpdateCompetencyLineRelation = {
                        //             competency_id: form.competency_id,
                        //             created_at: new Date().toISOString(),
                        //             line_ids: selectedLines,
                        //         }
                        //         PolivalansBrokerClient.CreateOrUpdateCompetencyLineRelation(lineRelationData).then((response) => {
                        //             Toast.fire({
                        //                 icon: "success",
                        //                 title: "Yetkinlik başarıyla düzenlendi."
                        //             });
                        //             navigate("/app/competency/list");
                        //         })
                        //     } else {
                        //         Toast.fire({
                        //             icon: "success",
                        //             title: "Yetkinlik başarıyla düzenlendi."
                        //         });
                        //         navigate("/app/competency/list");
                        //     }
                        // }).catch((error) => {
                        //     Toast.fire({
                        //         icon: "error",
                        //         title: "Yetkinlik düzenlenirken bir hata oluştu."
                        //     })
                        // })
                    }

                    const onCancel = () => {
                        navigate("/app/competency/list");
                    }

                    const onDelete = () => {
                        Swal.fire({
                            title: "Yetkinlik Silme",
                            text: "Yetkinliği silmek istediğinize emin misiniz?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Sil",
                            cancelButtonText: "İptal",
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Toast.fire({
                                    icon: "info",
                                    title: "Yetkinlik siliniyor...",
                                    timer: 5000,
                                })
                                // PolivalansBrokerClient.DeleteCompetency(this.id).then((response) => {
                                //     Toast.fire({
                                //         icon: "success",
                                //         title: "Yetkinlik başarıyla silindi."
                                //     });
                                //     navigate("/app/competency/list");
                                // }).catch((error) => {
                                //     Toast.fire({
                                //         icon: "error",
                                //         title: "Yetkinlik silinirken bir hata oluştu."
                                //     })
                                // })
                            }
                        })
                    }

                    return (
                        VStack({ alignment: cTop })(
                            ReactView(
                                <Form
                                    title="Tanımlı Yetkinliği Düzenleyin"
                                    form={
                                        <form
                                            onSubmit={onSubmit}
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "10px",
                                                width: "60%",
                                                height: "calc(100vh - 200px)",
                                            }}>
                                            <TextField name="competency_name" label="Yetkinlik Adı" variant="outlined" fullWidth size="small" value={form.competency_name} onChange={handleChange} required />
                                            <FormControl fullWidth size="small" required>
                                                <InputLabel>Yetkinlik Grubu</InputLabel>
                                                <Select
                                                    name="competency_group_id"
                                                    value={form.competency_group_id}
                                                    label="Yetkinlik Grubu"
                                                    onChange={handleChangeGroup}
                                                    size="small"
                                                >
                                                    {groups.map((group) => (
                                                        <MenuItem value={group.competency_group_id} key={group.competency_group_id}>{group.competency_group_name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <div style={{
                                                height: "280px",
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "5px",
                                            }}>
                                                <Typography variant="button" sx={{ marginLeft: "10px" }}>Yetkinlik Departmanları</Typography>
                                                <StyledDataGrid
                                                    rows={departments}
                                                    columns={departmentColumns}
                                                    localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                                    isCellEditable={() => false}
                                                    disableRowSelectionOnClick
                                                    checkboxSelection
                                                    rowSelectionModel={selectedDepartments}
                                                    onRowSelectionModelChange={(newRowSelectionModel: any) => {
                                                        setSelectedDepartments(newRowSelectionModel)
                                                    }}
                                                    rowHeight={30}
                                                    columnHeaderHeight={30}
                                                />
                                            </div>
                                            {/* {
                                                lineBasedCompetency &&
                                                <div style={{
                                                    height: "280px",
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "5px",
                                                }}>
                                                    <Typography variant="button" sx={{ marginLeft: "10px" }}>Yetkinlik Hatları</Typography>
                                                    <Views.StyledDataGrid
                                                        // çoklu id ye göre filtreleme yapılacak
                                                        rows={lines.filter((line) => selectedDepartments.indexOf(line.department_id) > -1)}
                                                        columns={lineColumns}
                                                        localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                                        isCellEditable={() => false}
                                                        disableRowSelectionOnClick
                                                        checkboxSelection
                                                        onRowSelectionModelChange={(newRowSelectionModel: any) => {
                                                            setSelectedLines(newRowSelectionModel)
                                                        }}
                                                        rowSelectionModel={selectedLines}
                                                        rowHeight={30}
                                                        columnHeaderHeight={30}
                                                    />
                                                </div>
                                            } */}
                                            <FormControlLabel
                                                sx={{ width: "100%", alignContent: "end", padding: "0 5px 0 0" }}
                                                onChange={(e: any) => setForm({ ...form, is_active_competency: e.target.checked })}
                                                control={<Switch color="primary" checked={form.is_active_competency} />}
                                                label="Aktif mi?"
                                                labelPlacement="start"
                                            />
                                            <div style={{
                                                display: "flex", gap: "10px", flexDirection: "column", marginTop: "10px"
                                            }}>
                                                <Button type="submit" variant="contained" color="primary" size="small">Kaydet</Button>
                                                {
                                                    !isActive &&
                                                    <Button variant="contained" color="error" size="small" onClick={onDelete}>Sil</Button>

                                                }
                                                <Button variant="contained" color="info" size="small" onClick={onCancel}>İptal</Button>
                                            </div>
                                        </form>
                                    }
                                />
                            )
                        ).padding("30px 20px")
                    )
                })
        )

    }
}