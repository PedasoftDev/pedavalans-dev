import React, { Fragment } from "react";
import { UIFormController, UIView, cTop, VStack, ReactView, useState, useEffect, useNavigate, Spinner, useParams, UIViewBuilder, nanoid, } from "@tuval/forms";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import StyledDataGrid from "../../../components/StyledDataGrid";
import { GridColDef, trTR } from "@mui/x-data-grid";
import Form from "../../Competency/Views/Form";
import AppInfo from "../../../../AppInfo";
import { Query, Services, useGetMe } from "@realmocean/sdk";
import OrganizationStructureDepartment from "../../../../server/hooks/organizationStructureDepartment/main";
import Machine from "../../../../server/hooks/machine/main";
import IMachine from "../../../interfaces/IMachine";
import removeDollarProperties from "../../../assets/Functions/removeDollarProperties";
import CompetencyMachineAssociation from "../../../../server/hooks/competencyMachineAssocation/main";
import ICompetency from "../../../interfaces/ICompetency";
import Collections from "../../../../server/core/Collections";
import ICompetencyMachineAssociation from "../../../interfaces/ICompetencyMachineAssociation";
import ICompetencyDepartment from "../../../interfaces/ICompetencyDepartment";
import Competency from "../../../../server/hooks/competency/main";
import { Toast } from "../../../components/Toast";

const formReset: IMachine.IBase = {
    name: "",
    department_id: "",
    code: "",
    difficulty_coefficient: "",
    id: "",
    is_active_machine: "true",
    is_deleted: false,
    tenant_id: "",
    is_active: true
}

export class UpdateMachineController extends UIFormController {

    public LoadView(): UIView {

        const { id } = useParams();
        const navigate = useNavigate();
        const { me, isLoading } = useGetMe("console");

        const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization);
        const { machine, isLoading: isLoadingMachine } = Machine.Get(id);
        const { updateMachine } = Machine.Update();
        const { competencyList, isLoadingCompetencyList } = Competency.GetList(me?.prefs?.organization);
        const { competencyMachineAssociationList, isLoading: isLoadingAssocation } = CompetencyMachineAssociation.GetListByMachineId(me?.prefs?.organization, id);
        const { createCompetencyMachineAssociation } = CompetencyMachineAssociation.Create();
        const { updateCompetencyMachineAssociation } = CompetencyMachineAssociation.Update();

        return (
            isLoading || isLoadingMachine || isLoadingDepartments || isLoadingCompetencyList || isLoadingAssocation ? VStack(Spinner()) :
                UIViewBuilder(() => {

                    const [isLoadingCompetencies, setIsLoadingCompetencies] = useState(true);
                    const [form, setForm] = useState<IMachine.IBase>(formReset)
                    const [selectedCompetencies, setSelectedCompetencies] = useState<string[]>([]);
                    const [competencies, setCompetencies] = useState([]);

                    const columns: GridColDef[] = [
                        {
                            field: "competency_name",
                            headerName: "Yetkinlik Adı",
                            flex: 1
                        }
                    ];

                    const getCompetencies = async (department_id: string) => {
                        setIsLoadingCompetencies(true);

                        const result: ICompetency.ICompetency[] = []

                        interface ICompetenciesWithDepartments extends ICompetency.ICompetency {
                            department_id: string;
                        }

                        const competenciesWithDepartments: ICompetenciesWithDepartments[] = []

                        const competencyMachineAssociationAllList: ICompetencyMachineAssociation.IBase[] = await Services.Databases.listDocuments(
                            AppInfo.Name,
                            AppInfo.Database,
                            Collections.CompetencyMachineAssociation,
                            [Query.equal("is_deleted", false), Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_active", true), Query.limit(10000)]
                        ).then((res) => res.documents as any[]);

                        const competencyDepartments: ICompetencyDepartment.ICompetencyDepartment[] = await Services.Databases.listDocuments(
                            AppInfo.Name,
                            AppInfo.Database,
                            Collections.CompetencyDepartment,
                            [Query.equal("competency_department_id", department_id), Query.equal("is_deleted", false), Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_active", true), Query.limit(10000)]
                        ).then((res) => res.documents as any);

                        competencyList.forEach((competency) => {
                            if (competencyDepartments.find((cd) => cd.competency_id === competency.competency_id)) {
                                competenciesWithDepartments.push({ ...competency, department_id: department_id });
                            }
                        })

                        competenciesWithDepartments.forEach((competency) => {
                            if (competencyMachineAssociationList.find((cma) => cma.competency_id === competency.competency_id) || !competencyMachineAssociationAllList.find((cma) => cma.competency_id === competency.competency_id)) {
                                result.push(competency);
                            }
                        })

                        setCompetencies(result);
                        setSelectedCompetencies(competencyMachineAssociationList.map((cma) => cma.competency_id));
                        setIsLoadingCompetencies(false);
                    }

                    const onSubmit = (e) => {
                        e.preventDefault();
                        const alreadyAssocation = competencyMachineAssociationList;
                        Services.Databases.listDocuments(
                            AppInfo.Name,
                            AppInfo.Database,
                            Collections.Machine,
                            [Query.equal("code", form.code), Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted", false), Query.limit(10000)]
                        ).then((res) => {
                            res.documents.forEach((doc) => {
                                if (doc.id !== form.id) {
                                    Toast.fire({
                                        icon: "error",
                                        title: "Bu kod zaten kullanılıyor."
                                    })
                                    return;
                                }
                            })

                            updateMachine({
                                databaseId: AppInfo.Database,
                                collectionId: Collections.Machine,
                                documentId: form.id,
                                data: form
                            }, (machineRes) => {

                                alreadyAssocation.forEach((association, indexAssociation) => {
                                    updateCompetencyMachineAssociation({
                                        databaseId: AppInfo.Database,
                                        collectionId: Collections.CompetencyMachineAssociation,
                                        documentId: association.$id,
                                        data: { ...removeDollarProperties(association), is_deleted: true, is_active: false }
                                    })
                                })

                                selectedCompetencies.forEach(competency => {
                                    const assocId = nanoid();
                                    createCompetencyMachineAssociation({
                                        documentId: assocId,
                                        data: {
                                            id: assocId,
                                            competency_id: competency,
                                            machine_id: form.id,
                                            tenant_id: me?.prefs?.organization
                                        }
                                    })
                                })
                                setTimeout(() => {
                                    Toast.fire({
                                        icon: "success",
                                        title: "Makine başarıyla güncellendi."
                                    })
                                    navigate("/app/machine/list");
                                }, selectedCompetencies.length * 100 + 1000);
                            })
                        })
                    }

                    const onCancel = () => {
                        navigate("/app/machine/list");
                    }

                    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.name === "difficulty_coefficient") {
                            if (Number(e.target.value) > 1) {
                                e.target.value = "1";
                            }
                            if (Number(e.target.value) < 0) {
                                e.target.value = "0";
                            }
                        }
                        setForm({ ...form, [e.target.name]: e.target.value })
                    }

                    useEffect(() => {
                        setForm(removeDollarProperties(machine))
                        getCompetencies(machine.department_id);
                    }, [])

                    return (
                        isLoadingCompetencies ? VStack(Spinner()) :
                            VStack({ alignment: cTop })(
                                ReactView(
                                    <Form
                                        title="Makineyi Düzenleyin"
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
                                                                getRowId={(row) => row.competency_id}
                                                                localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                                                isCellEditable={() => false}
                                                                disableRowSelectionOnClick
                                                                checkboxSelection
                                                                rowSelectionModel={selectedCompetencies}
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
                                                    <Button type="submit" variant="contained" color="primary" size="small">Düzenle</Button>
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