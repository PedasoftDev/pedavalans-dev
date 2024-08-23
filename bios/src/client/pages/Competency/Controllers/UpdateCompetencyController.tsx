import { ReactView, Spinner, UIController, UIView, UIViewBuilder, VStack, cTop, nanoid, useEffect, useNavigate, useParams, useState } from "@tuval/forms";
import Swal from "sweetalert2";
import { Toast } from "../../../components/Toast";
import { GridColDef, trTR } from "@mui/x-data-grid";
import ICompetency from "../../../interfaces/ICompetency";
import { Autocomplete, Button, FormControl, FormControlLabel, Switch, TextField, Typography } from "@mui/material";
import Form from "../Views/Form";
import React from "react";
import StyledDataGrid from "../../../components/StyledDataGrid";
import OrganizationStructureDepartment from "../../../../server/hooks/organizationStructureDepartment/main";
import { Query, Services, useDeleteCache, useGetMe } from "@realmocean/sdk";
import CompetencyGroup from "../../../../server/hooks/competencyGroup/main";
import Competency from "../../../../server/hooks/competency/main";
import removeDollarProperties from "../../../assets/Functions/removeDollarProperties";
import CompetencyDepartment from "../../../../server/hooks/competencyDepartment/main";
import AppInfo from "../../../../AppInfo";
import Parameters from "../../../../server/hooks/parameters/main";
import { Resources } from "../../../assets/Resources";
import CompetencyLineRelation from "../../../../server/hooks/competencyLineRelation/main";
import OrganizationStructureLine from "../../../../server/hooks/organizationStructureLine/main";
import OrganizationStructurePosition from "../../../../server/hooks/organizationStructrePosition/main";
import Collections from "../../../../server/core/Collections";
import CompetencyPositionRelation from "../../../../server/hooks/competencyPositionRelation/main";
import OrganizationStructureWorkPlace from "../../../../server/hooks/organizationStructureWorkPlace/main";
import RelatedDepartmentsWorkPlaces from "../../../../server/hooks/relatedDepartmentsWorkPlaces/Main";

const positionBased = localStorage.getItem("position_based_polyvalence_management") === "true" ? true : false;

const formReset: ICompetency.ICompetency = {
    competency_id: "",
    competency_name: "",
    competency_group_id: "",
    competency_group_name: "",
    competency_description: "",
    competency_evaluation_period: "",
    competency_real_value: "",
    competency_target_value: "",
    competency_value_desc: "",
    employee_id: "",
    employee_name: "",
    work_place_id: "",
    work_place_name: "",
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

        const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetActiveList(me?.prefs?.organization);
        const { activeGroups, isLoading: isLoadingGroups } = CompetencyGroup.GetActiveCompetencyGroups();

        const { parameters: lineBased, isLoading: isLoadingParameter } = Parameters.GetParameterByName(Resources.ParameterLocalStr.line_based_competency_relationship)
        const { createCompetencyLineRelation } = CompetencyLineRelation.Create();
        const { competencyLineRelation, isLoading: isLoadingCompetencyLineRelation } = CompetencyLineRelation.GetByCompetencyId(id, me?.prefs?.organization);
        const { updateCompetencyLineRelation } = CompetencyLineRelation.Update();

        // lines
        const { lines, isLoadingLines } = OrganizationStructureLine.GetList(me?.prefs?.organization);

        const { competencyDepartments, isLoadingCompetencyDepartments } = CompetencyDepartment.GetByCompetencyId(competency?.competency_id);
        const { updateCompetencyDepartment } = CompetencyDepartment.Update();
        const { createCompetencyDepartment } = CompetencyDepartment.CreateCompetencyDepartment();

        // positions
        const { positions, isLoadingPositions } = OrganizationStructurePosition.GetList(me?.prefs?.organization);
        const { competencyPositionRelationList, isLoading: isLoadingCompetencyPositionRelationList } = CompetencyPositionRelation.GetByCompetencyId(id);
        const { createCompetencyPositionRelation } = CompetencyPositionRelation.Create();

        //workplace
        const [workPlaceDefination, setWorkPlaceDefination] = useState<boolean>(false);
        const { workPlaces, isLoadingWorkPlace } = OrganizationStructureWorkPlace.GetList(me?.prefs?.organization);
        const { isLoading: isLoadingRelWorkPlaces, relatedDepartmentsWorkPlacesList } = RelatedDepartmentsWorkPlaces.GetList();

        const { deleteCache } = useDeleteCache(AppInfo.Name);


        return (
            isLoading || isLoadingCompetency || isLoadingRelWorkPlaces || isLoadingWorkPlace || isLoadingDepartments || isLoadingPositions || isLoadingCompetencyPositionRelationList ||
                isLoadingGroups || isLoadingCompetencyDepartments || isLoadingCompetencyLineRelation ||
                isLoadingLines || isLoadingParameter ? VStack(Spinner()) :
                UIViewBuilder(() => {

                    const [form, setForm] = useState<ICompetency.ICompetency>(formReset)
                    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
                    const [isActive, setIsActive] = useState<boolean>(true);

                    const [selectedLines, setSelectedLines] = useState<string[]>([]);

                    const [selectedPositions, setSelectedPositions] = useState<any[]>([]);

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

                    useEffect(() => {
                        setForm(removeDollarProperties(competency))
                        setSelectedDepartments(competencyDepartments.map((department) => department.competency_department_id))
                        if (lineBased[0]?.is_active) {
                            setSelectedLines(competencyLineRelation.map((line) => line.line_id))
                        }
                        if (positionBased) {
                            const positionIds = competencyPositionRelationList.map(relation => relation.position_id);
                            setSelectedPositions(positions.filter((position) => positionIds.includes(position.$id)))
                        }
                        setIsActive(competency.is_active_competency)
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


                        updateCompetency({
                            databaseId: AppInfo.Database,
                            collectionId: "competency",
                            documentId: id,
                            data: form
                        }, () => {
                            if (!positionBased) {
                                if (lineBased[0]?.is_active) {
                                    competencyLineRelation.map((line) => {
                                        if (!selectedLines.includes(line.line_id)) {
                                            updateCompetencyLineRelation({
                                                databaseId: AppInfo.Database,
                                                collectionId: "competency_line_relation",
                                                documentId: line.$id,
                                                data: {
                                                    ...removeDollarProperties(line),
                                                    is_deleted: true
                                                }
                                            })
                                        }
                                    })
                                    selectedLines.map((line) => {
                                        if (!competencyLineRelation.map((line) => line.line_id).includes(line)) {
                                            const createLineId = nanoid();
                                            createCompetencyLineRelation({
                                                documentId: createLineId,
                                                data: {
                                                    id: createLineId,
                                                    competency_id: id,
                                                    competency_target_value: "",
                                                    line_id: line,
                                                    tenant_id: me?.prefs?.organization
                                                }
                                            })
                                        }
                                    })
                                }
                                const relationIds = competencyDepartments.map(department => department.$id);
                                relationIds.map((department) => {
                                    updateCompetencyDepartment({
                                        databaseId: AppInfo.Database,
                                        collectionId: "competency_department",
                                        documentId: department,
                                        data: {
                                            is_deleted: true
                                        }
                                    })
                                })
                                if (selectedDepartments.length === 0) {
                                    Toast.fire({
                                        icon: "success",
                                        title: "Yetkinlik başarıyla düzenlendi."
                                    });
                                    deleteCache();
                                    navigate("/app/competency/list");
                                } else {
                                    selectedDepartments.map((department, i) => {
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
                                        }, () => {
                                            if (i === selectedDepartments.length - 1) {
                                                Toast.fire({
                                                    icon: "success",
                                                    title: "Yetkinlik başarıyla düzenlendi."
                                                });
                                                deleteCache();
                                                navigate("/app/competency/list");
                                            }
                                        })
                                    })
                                }

                            } else {
                                const relationIds = competencyPositionRelationList.map(relation => relation.$id);
                                for (let i = 0; i < competencyPositionRelationList.length; i++) {
                                    updateCompetencyLineRelation({
                                        databaseId: AppInfo.Database,
                                        collectionId: Collections.CompetencyPositionRelation,
                                        documentId: relationIds[i],
                                        data: {
                                            is_deleted: true,
                                            is_active: false
                                        }
                                    })
                                }

                                for (let i = 0; i < selectedPositions.length; i++) {
                                    createCompetencyPositionRelation({
                                        documentId: nanoid(),
                                        data: {
                                            competency_id: id,
                                            position_id: selectedPositions[i].$id,
                                        }
                                    }, () => {
                                        if (i === selectedPositions.length - 1) {
                                            Toast.fire({
                                                icon: "success",
                                                title: "Yetkinlik başarıyla düzenlendi."
                                            });
                                            deleteCache();
                                            navigate("/app/competency/list");
                                        }

                                    })
                                }
                            }
                        })
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
                                updateCompetency({
                                    databaseId: AppInfo.Database,
                                    collectionId: "competency",
                                    documentId: id,
                                    data: {
                                        ...form,
                                        is_deleted_competency: true
                                    }
                                }, () => {
                                    deleteCache();
                                    Toast.fire({
                                        icon: "success",
                                        title: "Yetkinlik başarıyla silindi."
                                    });
                                    navigate("/app/competency/list");
                                })
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
                                                inputProps={{ maxLength: 500 }}
                                                rows={4}
                                                label="Yetkinlik Açıklaması"
                                            />
                                            {
                                                workPlaceDefination ? (
                                                    <Autocomplete
                                                        onChange={(event, newValue) => {
                                                            setForm({
                                                                ...form,
                                                                work_place_id: newValue ? newValue.id : '',
                                                                work_place_name: newValue ? newValue.name : ''
                                                            });
                                                        }}
                                                        value={workPlaces.find((workPlace) => workPlace.id === form.work_place_id) || null}
                                                        options={workPlaces.filter(x => x.is_active === true)}
                                                        getOptionLabel={(position) => position.record_id + " - " + position.name}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="İlgili İşyeri"
                                                                size="small"
                                                                required
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
                                                            console.log(newValue)
                                                        }}
                                                        value={selectedPositions}
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
                                                            workPlaceDefination ?
                                                                departments.filter((item) => item.is_active).filter((department) =>
                                                                    relatedDepartmentsWorkPlacesList.some((x) =>
                                                                        x.workplace_id === form.work_place_id && x.related_department_id === department.id
                                                                    )
                                                                )
                                                                :
                                                                departments.filter((item) => item.is_active)
                                                        }
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
                                            }
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
                                                    />
                                                </div>
                                            }
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