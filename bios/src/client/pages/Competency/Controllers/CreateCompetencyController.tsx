import { ReactView, Spinner, UIController, UIView, VStack, cTop, nanoid, useNavigate } from "@tuval/forms";
import React, { useEffect, useState } from "react";
import { Autocomplete, Button, FormControl, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { GridColDef, GridToolbar, trTR } from "@mui/x-data-grid";
import ICompetency from "../../../interfaces/ICompetency";
import { Resources } from "../../../assets/Resources";
import { Query, Services, useGetMe } from "@realmocean/sdk";
import OrganizationStructureDepartment from "../../../../server/hooks/organizationStructureDepartment/main";
import CompetencyGroup from "../../../../server/hooks/competencyGroup/main";
import { Toast } from "../../../components/Toast";
import StyledDataGrid from "../../../components/StyledDataGrid";
import Form from "../Views/Form";
import Competency from "../../../../server/hooks/competency/main";
import CompetencyDepartment from "../../../../server/hooks/competencyDepartment/main";
import Parameters from "../../../../server/hooks/parameters/main";
import OrganizationStructureLine from "../../../../server/hooks/organizationStructureLine/main";
import CompetencyLineRelation from "../../../../server/hooks/competencyLineRelation/main";
import OrganizationStructurePosition from "../../../../server/hooks/organizationStructrePosition/main";
import CompetencyPositionRelation from "../../../../server/hooks/competencyPositionRelation/main";
import AppInfo from "../../../../AppInfo";
import Collections from "../../../../server/core/Collections";
import OrganizationStructureWorkPlace from "../../../../server/hooks/organizationStructureWorkPlace/main";
import { IOrganizationStructure } from "../../../interfaces/IOrganizationStructure";
import RelatedDepartmentsWorkPlaces from "../../../../server/hooks/relatedDepartmentsWorkPlaces/Main";
import CompetencyWorkplace from "../../../../server/hooks/competencyWorkPlace/Main";

const positionBased = localStorage.getItem("position_based_polyvalence_management") === "true" ? true : false;


const formReset: ICompetency.ICreateCompetency = {
    competency_id: "",
    competency_name: "",
    competency_description: "",
    competency_group_id: "",
    competency_group_name: "",
    work_place_id: "",
    work_place_name: "",
    realm_id: "",
    tenant_id: "",
}


export class CreateCompetencyController extends UIController {

    public LoadView(): UIView {

        const navigate = useNavigate();

        const [form, setForm] = useState<ICompetency.ICreateCompetency>(formReset);

        const { me, isLoading } = useGetMe("console");
        const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetActiveList(me?.prefs?.organization);
        const { activeGroups, isLoading: isLoadingActiveGroups } = CompetencyGroup.GetActiveCompetencyGroups();


        const { createCompetency } = Competency.Create();
        const { createCompetencyDepartment } = CompetencyDepartment.CreateCompetencyDepartment();

        const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

        const { parameters: lineBased, isLoading: isLoadingParameter } = Parameters.GetParameterByName(Resources.ParameterLocalStr.line_based_competency_relationship)
        const { createCompetencyLineRelation, isLoading: isLoadingCreateLineRelation } = CompetencyLineRelation.Create()

        // lines
        const { lines, isLoadingLines } = OrganizationStructureLine.GetList(me?.prefs?.organization);
        const [selectedLines, setSelectedLines] = useState<string[]>([]);

        // positions
        const { positions, isLoadingPositions } = OrganizationStructurePosition.GetList(me?.prefs?.organization);
        const [selectedPositions, setSelectedPositions] = useState<typeof positions>([]);
        const { createCompetencyPositionRelation } = CompetencyPositionRelation.Create();

        // workplaces
        const { CreateWorkPlace } = CompetencyWorkplace.CreateWorkPlace();
        const [selectedWorkPlace, setSelectedWorkPlace] = useState([]);
        const { workPlaces, isLoadingWorkPlace } = OrganizationStructureWorkPlace.GetList(me?.prefs?.organization);
        const { isLoading: isLoadingRelWorkPlaces, relatedDepartmentsWorkPlacesList } = RelatedDepartmentsWorkPlaces.GetList();
        const [workPlaceDefination, setWorkPlaceDefination] = useState<boolean>(false);

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
            const group = activeGroups.find((group) => group.competency_group_id === e.target.value)
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

            const competency_id: string = nanoid();
            createCompetency({
                documentId: competency_id,
                data: {
                    ...form,
                    competency_id: competency_id,
                    tenant_id: me?.prefs?.organization,
                }
            }, () => {
                if (workPlaceDefination) {
                    for (const item in selectedWorkPlace) {
                        const comp_wp_id = nanoid();
                        CreateWorkPlace({
                            documentId: comp_wp_id,
                            data: {
                                id: comp_wp_id,
                                work_place_id: selectedWorkPlace[item].id,
                                work_place_name: selectedWorkPlace[item].name,
                                competency_id: competency_id,
                                tenant_id: me?.prefs?.organization
                            }
                        })
                    }
                }
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

                if (positionBased) {
                    for (let i = 0; i < selectedPositions.length; i++) {
                        createCompetencyPositionRelation({
                            documentId: nanoid(),
                            data: {
                                position_id: selectedPositions[i].$id,
                                competency_id: competency_id,
                            }
                        })
                    }
                }

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
            })
        }, [])
        return (
            VStack({ alignment: cTop })(
                isLoading || isLoadingDepartments || isLoadingCreateLineRelation || isLoadingRelWorkPlaces || isLoadingWorkPlace || isLoadingActiveGroups || isLoadingParameter || isLoadingLines || isLoadingPositions ? VStack(Spinner()) :
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
                                    <Autocomplete
                                        value={activeGroups.find((group) => group.competency_group_id === form.competency_group_id) || null}
                                        onChange={(event, newValue) => {
                                            setForm({
                                                ...form,
                                                competency_group_id: newValue ? newValue.competency_group_id : '',
                                                competency_group_name: newValue ? newValue.competency_group_name : ''
                                            });
                                        }}
                                        options={activeGroups}
                                        getOptionLabel={(option) => option.competency_group_name}
                                        isOptionEqualToValue={(option, value) => option.competency_group_id === value.competency_group_id}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Yetkinlik Grubu"
                                                size="small"
                                                required
                                                fullWidth
                                            />
                                        )}
                                        fullWidth
                                        size="small"
                                    />
                                    <TextField
                                        fullWidth
                                        onChange={handleChange}
                                        value={form.competency_description}
                                        name="competency_description"
                                        multiline={true}
                                        inputProps={{ maxLength: 256 }}
                                        rows={4}
                                        label="Yetkinlik Açıklaması"
                                    />
                                    {
                                        workPlaceDefination ? (
                                            <Autocomplete
                                                multiple
                                                onChange={(event, newValue) => {
                                                    setSelectedWorkPlace(newValue);
                                                }}
                                                options={workPlaces.filter(x => x.is_active === true)}
                                                value={selectedWorkPlace}
                                                getOptionLabel={(position) => position.record_id + " - " + position.name}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="İlgili İşyeri"
                                                        size="small"
                                                        required={selectedWorkPlace.length === 0}
                                                        fullWidth
                                                    />
                                                )}
                                                fullWidth
                                                size="small"
                                            />
                                        ) : null
                                    }
                                    {positionBased ?
                                        <FormControl fullWidth size="small">
                                            <Autocomplete
                                                multiple
                                                disableCloseOnSelect
                                                options={positions.filter(x => x.is_active === true)}
                                                getOptionLabel={(position) => position.record_id + " - " + position.name}
                                                filterSelectedOptions
                                                size="small"
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Bağlı Pozisyonlar"
                                                        size="small"
                                                    />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setSelectedPositions(newValue);
                                                }}
                                            />
                                        </FormControl>
                                        :
                                        <div style={{
                                            height: "280px",
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "5px",
                                        }}>
                                            <Typography variant="button" sx={{ marginLeft: "10px" }}>Yetkinlik Departmanları</Typography>
                                            <StyledDataGrid
                                                rows={
                                                    workPlaceDefination
                                                        ? departments.filter((item) => item.is_active).filter((department) =>
                                                            selectedWorkPlace.some((selectedWorkPlaceItem) =>
                                                                relatedDepartmentsWorkPlacesList.some((x) =>
                                                                    x.workplace_id === selectedWorkPlaceItem.id &&
                                                                    x.related_department_id === department.id
                                                                )
                                                            )
                                                        )
                                                        : departments.filter((item) => item.is_active)
                                                }
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
                                                disableColumnFilter
                                                disableColumnSelector
                                                disableDensitySelector
                                                slots={{ toolbar: GridToolbar }}
                                                slotProps={{
                                                    toolbar: {
                                                        showQuickFilter: true,
                                                    },
                                                }}

                                            />
                                        </div>}
                                    {
                                        !positionBased && lineBased[0]?.is_active &&

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
                                                disableColumnFilter
                                                disableColumnSelector
                                                disableDensitySelector
                                                slots={{ toolbar: GridToolbar }}
                                                slotProps={{
                                                    toolbar: {
                                                        showQuickFilter: true,
                                                    },
                                                }}
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