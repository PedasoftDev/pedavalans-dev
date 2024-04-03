import { ReactView, Spinner, UIController, UIView, VStack, cTop, nanoid, useNavigate } from "@tuval/forms";
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
import Competency from "../../../../server/hooks/competency/main";
import CompetencyDepartment from "../../../../server/hooks/competencyDepartment/main";
import CompetencyGrade from "../../../../server/hooks/competencyGrade/main";
import CompetencyGradeValue from "../../../../server/hooks/competencyGradeValue/main";
import Parameters from "../../../../server/hooks/parameters/main";
import OrganizationStructureLine from "../../../../server/hooks/organizationStructureLine/main";
import CompetencyLineRelation from "../../../../server/hooks/competencyLineRelation/main";


const formReset: ICompetency.ICreateCompetency = {
    competency_id: "",
    competency_name: "",
    competency_group_id: "",
    competency_group_name: "",
    realm_id: "",
    tenant_id: "",
}


export class CreateCompetencyController extends UIController {

    public LoadView(): UIView {

        const navigate = useNavigate();

        const [form, setForm] = useState<ICompetency.ICreateCompetency>(formReset);

        const [competencyGroupId, setCompetencyGroupId] = useState<string>("1");


        const { me, isLoading } = useGetMe("console");
        const { departments, isLoadingDepartments, totalDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization);
        const { groups, isLoadingGroups } = CompetencyGroup.GetList(me?.prefs?.organization);
        const { group, isLoading: isLoadingGroup } = CompetencyGroup.GetCompetencyGroup(competencyGroupId);
        const { grade, isLoading: isLoadingGrade } = CompetencyGrade.GetCompetencyGrade(group ? group.competency_grade_id : "1")
        const { levels, isLoadingLevels } = CompetencyGrade.GetGradeLevels(grade ? grade.competency_grade_id : "1")


        const { createCompetency } = Competency.Create();
        const { createCompetencyDepartment } = CompetencyDepartment.CreateCompetencyDepartment();
        const { createCompetencyGradeValue } = CompetencyGradeValue.CreateCompetencyGradeValue();

        const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

        const { parameters: lineBased, isLoading: isLoadingParameter } = Parameters.GetParameterByName(Resources.ParameterLocalStr.line_based_competency_relationship, me?.prefs?.organization)
        const { createCompetencyLineRelation, error, isError, isLoading: isLoadingCreateLineRelation, isSuccess } = CompetencyLineRelation.Create()

        // lines
        const { lines, isLoadingLines } = OrganizationStructureLine.GetList(me?.prefs?.organization);
        const [selectedLines, setSelectedLines] = useState<string[]>([]);


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

        const handleChangeGroup = (e: SelectChangeEvent<string>) => {
            const group = groups.find((group) => group.competency_group_id === e.target.value)
            setForm({
                ...form,
                [e.target.name as string]: e.target.value,
                competency_group_name: group?.competency_group_name
            })
            setCompetencyGroupId(e.target.value)
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

            const competency_id: string = nanoid();
            createCompetency({
                documentId: competency_id,
                data: {
                    ...form,
                    competency_id: competency_id,
                    tenant_id: me?.prefs?.organization
                }
            }, () => {
                for (let i = 0; i < formSelectedDepartments.length; i++) {
                    const comp_dep_id = nanoid();
                    createCompetencyDepartment({
                        documentId: comp_dep_id,
                        data: {
                            competency_department_table_id: comp_dep_id,
                            competency_department_id: formSelectedDepartments[i].competency_department_id,
                            competency_department_name: formSelectedDepartments[i].competency_department_name,
                            competency_id: competency_id,
                            tenant_id: me?.prefs?.organization
                        }
                    })
                }

                // for (let i = 0; i < levels.length; i++) {
                //     const comp_grade_level_id = nanoid();
                //     createCompetencyGradeValue({
                //         documentId: comp_grade_level_id,
                //         data: {
                //             competency_grade_value_id: comp_grade_level_id,
                //             grade_level_id: levels[i].grade_level_id,
                //             grade_level_name: levels[i].grade_level_name,
                //             grade_level_number: levels[i].grade_level_number,
                //             competency_id: competency_id,
                //             tenant_id: me?.prefs?.organization
                //         }
                //     })
                // }

                if (lineBased[0]?.is_active) {
                    for (let i = 0; i < selectedLines.length; i++) {
                        const comp_line_relation_id = nanoid();
                        createCompetencyLineRelation({
                            documentId: comp_line_relation_id,
                            data: {
                                id: comp_line_relation_id,
                                competency_id: competency_id,
                                line_id: selectedLines[i],
                                tenant_id: me?.prefs?.organization
                            }

                        })
                    }
                }

                Toast.fire({
                    icon: "success",
                    title: "Yetkinlik başarıyla oluşturuldu."
                });
                setTimeout(() => {
                    navigate("/app/competency/list");
                }, 2000)
            })
        }

        const onCancel = () => {
            navigate("/app/competency/list");
        }

        return (
            VStack({ alignment: cTop })(
                isLoading || isLoadingDepartments || isLoadingGroups || isLoadingParameter || isLoadingLines ? VStack(Spinner()) :
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
                                    {
                                        lineBased[0]?.is_active &&

                                        <div style={{
                                            height: "280px",
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "5px",
                                        }}>
                                            <Typography variant="button" sx={{ marginLeft: "10px" }}>Yetkinlik Hatları</Typography>
                                            <StyledDataGrid
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

                                    }
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