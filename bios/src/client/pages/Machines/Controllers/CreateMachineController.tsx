import React, { Fragment } from "react";
import { ReactView, Spinner, UIFormController, UIView, VStack, cTop, useNavigate, useState, UIViewBuilder, nanoid } from "@tuval/forms";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import OrganizationStructureDepartment from "../../../../server/hooks/organizationStructureDepartment/main";
import { Query, Services, useGetMe } from "@realmocean/sdk";
import Form from "../../Competency/Views/Form";
import StyledDataGrid from "../../../components/StyledDataGrid";
import IMachine from "../../../interfaces/IMachine";
import { GridColDef, trTR } from "@mui/x-data-grid";
import AppInfo from "../../../../AppInfo";
import Collections from "../../../../server/core/Collections";
import ICompetency from "../../../interfaces/ICompetency";
import ICompetencyMachineAssociation from "../../../interfaces/ICompetencyMachineAssociation";
import ICompetencyDepartment from "../../../interfaces/ICompetencyDepartment";
import Machine from "../../../../server/hooks/machine/main";
import CompetencyMachineAssociation from "../../../../server/hooks/competencyMachineAssocation/main";
import { Toast } from "../../../components/Toast";

const resetForm: IMachine.ICreate = {
    id: "",
    code: "",
    department_id: "",
    difficulty_coefficient: "",
    is_active_machine: "true",
    name: "",
    tenant_id: ""
}

export class CreateMachineController extends UIFormController {


    public LoadView(): UIView {

        const navigate = useNavigate();

        const { me, isLoading } = useGetMe("console");
        const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization)
        const { createMachine } = Machine.Create();
        const { machineList, isLoading: isLoadingMachines } = Machine.GetList(me?.prefs?.organization);
        const { createCompetencyMachineAssociation } = CompetencyMachineAssociation.Create();

        const [form, setForm] = useState(resetForm);


        return (
            isLoading || isLoadingDepartments || isLoadingMachines ? VStack(Spinner()) :
                UIViewBuilder(() => {
                    const [competencies, setCompetencies] = useState([]);
                    const [selectedCompetencies, setSelectedCompetencies] = useState<string[]>([]);
                    const [isLoadingCompetencies, setIsLoadingCompetencies] = useState(false);

                    const columns: GridColDef[] = [
                        {
                            field: "competency_name",
                            headerName: "Yetkinlik Adı",
                            flex: 1
                        }
                    ];

                    const handleChange = (e: any) => {
                        if (e.target.name === "difficulty_coefficient") {
                            if (Number(e.target.value) > 1) {
                                e.target.value = "1";
                            }
                            if (Number(e.target.value) < 0) {
                                e.target.value = "0";
                            }
                        }
                        setForm({ ...form, [e.target.name]: e.target.value });
                    }

                    const getCompetencies = async (department_id: string) => {

                        if (department_id === "") return;
                        setIsLoadingCompetencies(true);

                        const result: ICompetency.ICompetency[] = []

                        interface ICompetenciesWithDepartments extends ICompetency.ICompetency {
                            department_id: string;
                        }
                        const competenciesWithDepartments: ICompetenciesWithDepartments[] = []

                        const competencyMachineAssociationList: ICompetencyMachineAssociation.IBase[] = await Services.Databases.listDocuments(
                            AppInfo.Name,
                            AppInfo.Database,
                            Collections.CompetencyMachineAssociation,
                            [Query.equal("is_deleted", false), Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_active", true)]
                        ).then((res) => res.documents as any[]);

                        const competencyDepartments: ICompetencyDepartment.ICompetencyDepartment[] = await Services.Databases.listDocuments(
                            AppInfo.Name,
                            AppInfo.Database,
                            Collections.CompetencyDepartment,
                            [Query.equal("competency_department_id", department_id)]
                        ).then((res) => res.documents as any);

                        const competencyList: ICompetency.ICompetency[] = await Services.Databases.listDocuments(
                            AppInfo.Name,
                            AppInfo.Database,
                            Collections.Competency,
                            [Query.equal("is_deleted_competency", false), Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_active_competency", true)]
                        ).then((res) => res.documents as any[]);

                        competencyList.forEach((competency) => {
                            if (competencyDepartments.find((cd) => cd.competency_id === competency.competency_id)) {
                                competenciesWithDepartments.push({ ...competency, department_id: department_id });
                            }
                        })

                        competenciesWithDepartments.forEach((competency) => {
                            if (!competencyMachineAssociationList.find((cma) => cma.competency_id === competency.competency_id)) {
                                result.push(competency);
                            }
                        });

                        setCompetencies(result);
                        setIsLoadingCompetencies(false);

                    }

                    const onCancel = () => {
                        navigate("/app/machine/list");
                    };


                    const onSubmit = (e: any) => {
                        e.preventDefault();
                        if (form.department_id === "") {
                            return;
                        }
                        if (selectedCompetencies.length === 0) {
                            Toast.fire({
                                icon: "error",
                                title: "En az bir yetkinlik seçmelisiniz"
                            });
                            return;
                        }
                        if (machineList.find((machine) => machine.code === form.code)) {
                            Toast.fire({
                                icon: "error",
                                title: "Bu kod ile bir makine zaten var"
                            });
                            return;
                        }

                        const machineId = nanoid();

                        createMachine({
                            documentId: machineId,
                            data: {
                                ...form,
                                id: machineId,
                                tenant_id: me?.prefs?.organization
                            }
                        }, () => {
                            selectedCompetencies.forEach((competency_id, i) => {
                                const competencyMachineAssociationId = nanoid();
                                createCompetencyMachineAssociation({
                                    documentId: competencyMachineAssociationId,
                                    data: {
                                        id: competencyMachineAssociationId,
                                        competency_id,
                                        machine_id: machineId,
                                        tenant_id: me?.prefs?.organization
                                    }
                                }, () => {
                                    if (i === selectedCompetencies.length - 1) {
                                        Toast.fire({
                                            icon: "success",
                                            title: "Makine başarıyla eklendi"
                                        });
                                        onCancel();
                                    }
                                })
                            })
                        })

                    }

                    return (
                        VStack({ alignment: cTop })(
                            ReactView(
                                <Form
                                    title="Yeni Makine Ekleyin"
                                    form={
                                        <form
                                            onSubmit={onSubmit}
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "10px",
                                                width: "60%"
                                            }}>
                                            <TextField
                                                name="code"
                                                label="Makine Kodu"
                                                variant="outlined"
                                                fullWidth
                                                size="small"
                                                value={form.code}
                                                onChange={handleChange}
                                                required
                                            />
                                            <TextField
                                                name="name"
                                                label="Makine Adı"
                                                variant="outlined"
                                                fullWidth
                                                size="small"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                            />
                                            <TextField
                                                name="difficulty_coefficient"
                                                label="Makine Zorluk Katsayısı"
                                                variant="outlined"
                                                fullWidth
                                                size="small"
                                                value={form.difficulty_coefficient}
                                                onChange={handleChange}
                                                required
                                                type="number"
                                                inputProps={{
                                                    step: 0.1,
                                                    min: 0,
                                                    max: 1,
                                                    maxLength: 3
                                                }}
                                            />
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Departman</InputLabel>
                                                <Select
                                                    name="department_id"
                                                    value={form.department_id}
                                                    label="Departman"
                                                    onChange={(e: any) => {
                                                        setForm({ ...form, department_id: e.target.value });
                                                        getCompetencies(e.target.value);
                                                    }}
                                                    size="small"
                                                    required
                                                >
                                                    {departments.map((department) => (
                                                        <MenuItem value={department.id} key={department.id}>{department.name}</MenuItem>
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
                                                <Typography variant="button" sx={{ marginLeft: "10px" }}>Yetkinlikler</Typography>
                                                {
                                                    isLoadingCompetencies ? <Fragment>{Spinner().render()}</Fragment> :
                                                        <StyledDataGrid
                                                            rows={form.department_id === "" ? [] : competencies}
                                                            columns={columns}
                                                            getRowId={(row) => row.$id}
                                                            localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                                            isCellEditable={() => false}
                                                            disableRowSelectionOnClick
                                                            checkboxSelection
                                                            onRowSelectionModelChange={(newRowSelectionModel: any) => {
                                                                setSelectedCompetencies(newRowSelectionModel);
                                                            }}
                                                            rowHeight={30}
                                                            columnHeaderHeight={30}

                                                        />
                                                }
                                            </div>
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
                })
        )
    }
}