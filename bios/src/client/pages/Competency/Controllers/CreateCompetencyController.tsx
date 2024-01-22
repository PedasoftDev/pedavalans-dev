import { ReactView, Spinner, State, UIController, UIView, VStack, cTop, useNavigate } from "@tuval/forms";
import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { GridColDef, trTR } from "@mui/x-data-grid";
import ICompetency from "../../../interfaces/ICompetency";
import { Resources } from "../../../assets/Resources";
import { useGetMe } from "@realmocean/sdk";
import OrganizationStructureDepartment from "../../../../server/hooks/organizationStructureDepartment/main";
import CompetencyGroup from "../../../../server/hooks/competencyGroup/main";
import { Toast } from "../../../components/Toast";
import StyledDataGrid from "../../../components/StyledDataGrid";
import Form from "../Views/Form";


const formReset: ICompetency.ICreateCompetency = {
    competency_id: "",
    competency_name: "",
    competency_group_id: "",
    competency_group_name: "",
    polyvalence_table_id: "",
    polyvalence_table_name: "",
    realm_id: "",
    tenant_id: "",
}

// const isLineBasedCompetencyActive = localStorage.getItem(Resources.ParameterNames.LineBasedCompetency.localStr) == "true" ? true : false;

export class CreateCompetencyController extends UIController {

    public LoadView(): UIView {

        const navigate = useNavigate();

        const { me, isLoading } = useGetMe("console");
        const { departments, isLoadingDepartments, totalDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization);
        const { groups, isLoadingGroups } = CompetencyGroup.GetList(me?.prefs?.organization);

        const [form, setForm] = useState<ICompetency.ICreateCompetency>(formReset);

        const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

        // const [lineBasedCompetency, setLineBasedCompetency] = useState<boolean>(isLineBasedCompetencyActive);

        // lines
        // const [lines, setLines] = useState<ILines.ILine[]>([]);
        // const [selectedLines, setSelectedLines] = useState<string[]>([]);


        const departmentColumns: GridColDef[] = [
            {
                field: "name",
                headerName: "Departman Adı",
                flex: 1,
            }
        ];

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
        ];

        // useEffect(() => {
        //     Promise.all([
        //         PolivalansBrokerClient.GetCompetencyGroupsByActive(),
        //         PolivalansBrokerClient.GetActiveOrganizationLines(),
        //     ]).then((response) => {
        //         const [groups, lines] = response;
        //         setCompetencyGroups(groups)
        //         setLines(lines)
        //         this.isLoading = false;
        //     })
        // }, [])

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
                title: "Yetkinlik ekleniyor...",
                timer: 5000,
            })
            const formSelectedDepartments = departments.filter((department) => selectedDepartments.includes(department.id)).map((department) => ({
                competency_department_id: department.id,
                competency_department_name: department.name
            }))
            // PolivalansBrokerClient.CreateCompetency(form).then((response) => {
            //     if (lineBasedCompetency) {
            //         const lineRelationData: ILines.ICreateOrUpdateCompetencyLineRelation = {
            //             competency_id: response,
            //             created_at: new Date().toISOString(),
            //             line_ids: selectedLines,
            //         }
            //         PolivalansBrokerClient.CreateOrUpdateCompetencyLineRelation(lineRelationData).then((response) => {
            //             Toast.fire({
            //                 icon: "success",
            //                 title: "Yetkinlik başarıyla oluşturuldu."
            //             });
            //             navigate("competency/list");
            //         })
            //     } else {
            //         Toast.fire({
            //             icon: "success",
            //             title: "Yetkinlik başarıyla oluşturuldu."
            //         });
            //         navigate("competency/list");
            //     }

            // }).catch((error) => {
            //     Toast.fire({
            //         icon: "error",
            //         title: "Yetkinlik eklenirken bir hata oluştu."
            //     })
            // })
        }

        const onCancel = () => {
            navigate("competency/list");
        }

        return (
            VStack({ alignment: cTop })(
                isLoading || isLoadingDepartments || isLoadingGroups ? VStack(Spinner()) :
                    ReactView(
                        <Form
                            title="Yeni Yetkinlik Ekleyin"
                            form={
                                <form
                                    onSubmit={onSubmit}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px",
                                        width: "60%"
                                    }}>
                                    <TextField name="competency_name" label="Yetkinlik Adı" variant="outlined" fullWidth size="small" value={form.competency_name} onChange={handleChange} required />
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Yetkinlik Grubu</InputLabel>
                                        <Select
                                            name="competency_group_id"
                                            value={form.competency_group_id}
                                            label="Yetkinlik Grubu"
                                            onChange={handleChangeGroup}
                                            size="small"
                                            required
                                        >
                                            {groups.map((groups) => (
                                                <MenuItem value={groups.competency_group_id} key={groups.competency_group_id}>{groups.competency_group_name}</MenuItem>
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
                                            getRowId={(row) => row.$id}
                                            localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                            isCellEditable={() => false}
                                            disableRowSelectionOnClick
                                            checkboxSelection
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
                                    <div style={{
                                        display: "flex", gap: "10px", flexDirection: "column", marginTop: "10px"
                                    }}>
                                        <Button type="submit" variant="contained" color="primary" size="small">Kaydet</Button>
                                        <Button variant="contained" color="info" size="small" onClick={onCancel}>İptal</Button>
                                    </div>
                                </form>
                            }
                        />
                    )
            ).padding("30px 20px")
        )
    }
}