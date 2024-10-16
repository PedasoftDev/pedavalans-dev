import React, { useEffect, useState } from 'react';
import {
    cTop,
    nanoid,
    ReactView,
    Spinner,
    UIController,
    UIView,
    UIViewBuilder,
    useNavigate,
    useParams,
    VStack,
} from '@tuval/forms';
import Form from '../Views/Form';
import { Autocomplete, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';
import { trTR } from '@mui/x-data-grid';
import StyledDataGrid from '../../../components/StyledDataGrid';
import { Toast } from '../../../components/Toast';
import IPolyvalenceUnit from '../../../interfaces/IPolyvalenceUnit';
import { Query, Services, useDeleteCache, useGetMe, useListAccounts } from '@realmocean/sdk';
import OrganizationStructureDepartment from '../../../../server/hooks/organizationStructureDepartment/main';
import AppInfo from '../../../../AppInfo';
import PolyvalenceUnit from '../../../../server/hooks/polyvalenceUnit/main';
import removeDollarProperties from '../../../assets/Functions/removeDollarProperties';
import OrganizationStructureLine from '../../../../server/hooks/organizationStructureLine/main';
import Parameters from '../../../../server/hooks/parameters/main';
import { Resources } from '../../../assets/Resources';
import PolyvalenceUnitTableLineRelation from '../../../../server/hooks/polyvalenceUnitTableLineRelation/main';
import Swal from 'sweetalert2';
import PolyvalenceUnitTableDataResponsible from '../../../../server/hooks/polyvalenceUnitTableDataResponsible/main';
import PolyvalenceUnitTableDataViewer from '../../../../server/hooks/polyvalenceUnitTableDataViewer/main';
import IPolyvalenceUnitTableDataViewer from '../../../interfaces/IPolyvalenceUnitTableDataViewer';
import Collections from '../../../../server/core/Collections';
import IPolyvalenceUnitTableDataResponsible from '../../../interfaces/IPolyvalenceUnitTableDataResponsible';
import OrganizationStructurePosition from '../../../../server/hooks/organizationStructrePosition/main';
import PolyvalenceUnitPositionRelation from '../../../../server/hooks/polyvalenceUnitPositionRelation/main';
import AccountRelation from '../../../../server/hooks/accountRelation/main';
import OrganizationStructureWorkPlace from '../../../../server/hooks/organizationStructureWorkPlace/main';
import RelatedDepartmentsWorkPlaces from '../../../../server/hooks/relatedDepartmentsWorkPlaces/Main';

const formReset = {
    polyvalence_table_id: "",
    polyvalence_table_name: "",
    polyvalence_department_id: "",
    polyvalence_department_name: "",
    polyvalence_evaluation_frequency: "",
    work_place_id: "",
    work_place_name: "",
    is_active_table: true,
    is_deleted_table: false,
    realm_id: "",
    tenant_id: ""
}

const positionBased = localStorage.getItem("position_based_polyvalence_management") === "true" ? true : false;
const workPlaceDefination = localStorage.getItem("work_place_definition") === "true" ? true : false;

export class UpdatePolyvalenceUnitController extends UIController {

    public LoadView(): UIView {

        const { id } = useParams();
        const navigate = useNavigate();
        const { me, isLoading } = useGetMe("console");
        const { accounts, isLoading: isLoadingAccounts } = useListAccounts([Query.limit(10000)]);
        const { accountRelations, isLoadingResult: isLoadingAccountRelations } = AccountRelation.GetList(me?.prefs?.organization);
        const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization);
        const { positions, isLoadingPositions } = OrganizationStructurePosition.GetList(me?.prefs?.organization);
        const { polyvalenceUnit, isLoadingPolyvalenceUnit } = PolyvalenceUnit.Get(id);
        const { updatePolyvalenceUnit } = PolyvalenceUnit.Update();

        // lines
        const { lines, isLoadingLines } = OrganizationStructureLine.GetList(me?.prefs?.organization);

        const { lineRelation, isLoading: isLoadingLineRelation } = PolyvalenceUnitTableLineRelation.GetByPolyvalenceUnitId(id, me?.prefs?.organization)
        const { updatePolyvalenceUnitLineRelation } = PolyvalenceUnitTableLineRelation.Update();
        const { createPolyvalenceUnitLineRelation } = PolyvalenceUnitTableLineRelation.Create();

        const { parameters: lineBased, isLoading: isLoadingParameter } = Parameters.GetParameterByName(Resources.ParameterLocalStr.line_based_competency_relationship)
        const { parameters: tableAuth, isLoading: isLoadingTableAuth } = Parameters.GetParameterByName(Resources.ParameterLocalStr.polyvalence_unit_table_auth)

        // selectedAccounts
        const { dataResponsible, isLoadingDataResponsible } = PolyvalenceUnitTableDataResponsible.GetByPolyvalenceUnitId(id);
        const { dataViewer, isLoadingDataViewer } = PolyvalenceUnitTableDataViewer.GetByPolyvalenceUnitId(id);
        const { createPolyvalenceUnitTableDataResponsible } = PolyvalenceUnitTableDataResponsible.Create();
        const { createPolyvalenceUnitTableDataViewer } = PolyvalenceUnitTableDataViewer.Create();
        const { updatePolyvalenceUnitTableDataResponsible } = PolyvalenceUnitTableDataResponsible.Update();
        const { updatePolyvalenceUnitTableDataViewer } = PolyvalenceUnitTableDataViewer.Update();

        const { workPlaces, isLoadingWorkPlace } = OrganizationStructureWorkPlace.GetList(me?.prefs?.organization);
        const { relatedDepartmentsWorkPlacesList, isLoading: isLoadingRelDepList } = RelatedDepartmentsWorkPlaces.GetList();

        const { deleteCache } = useDeleteCache(AppInfo.Name)

        const { polyvalenceUnitPositionRelations, isLoading: isLoadingPolyvalenceUnitPositionRelations } = PolyvalenceUnitPositionRelation.GetByPolyvalenceUnitId(id);
        const { createPolyvalenceUnitPositionRelation } = PolyvalenceUnitPositionRelation.Create();

        return (
            isLoading || isLoadingAccounts || isLoadingWorkPlace || isLoadingRelDepList || isLoadingAccountRelations || isLoadingPositions || isLoadingPolyvalenceUnitPositionRelations || isLoadingDepartments || isLoadingPolyvalenceUnit || isLoadingTableAuth || isLoadingDataResponsible || isLoadingDataViewer
                || isLoadingParameter || isLoadingLines || isLoadingLineRelation ? VStack(Spinner()) :
                UIViewBuilder(() => {

                    const [form, setForm] = useState<IPolyvalenceUnit.IPolyvalenceUnit>(formReset);
                    const [isActive, setIsActive] = useState<boolean>(true);

                    const [selectedResponsibleAccounts, setSelectedResponsibleAccounts] = useState<string[]>([]);

                    const [selectedViewerAccounts, setSelectedViewerAccounts] = useState<string[]>([]);

                    const [selectedLine, setSelectedLine] = useState<string>("");

                    const [selectedPositions, setSelectedPositions] = useState<typeof positions>([])

                    const [accountsData, setAccountsData] = useState<typeof accounts>([])

                    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        Toast.fire({
                            icon: 'info',
                            title: 'Polivalans tablosu güncelleniyor...'
                        })
                        updatePolyvalenceUnit({
                            databaseId: AppInfo.Database,
                            collectionId: "polyvalence_unit_table",
                            documentId: id,
                            data: form
                        }, () => {

                            if (tableAuth[0]?.is_active) {
                                dataViewer.forEach((viewer) => {
                                    updatePolyvalenceUnitTableDataViewer({
                                        databaseId: AppInfo.Database,
                                        collectionId: Collections.PolyvalenceUnitTableDataViewer,
                                        documentId: viewer.$id,
                                        data: {
                                            is_deleted: true
                                        }
                                    })
                                })
                                dataResponsible.forEach((responsible) => {
                                    updatePolyvalenceUnitTableDataResponsible({
                                        databaseId: AppInfo.Database,
                                        collectionId: Collections.PolyvalenceUnitTableDataResponsible,
                                        documentId: responsible.$id,
                                        data: {
                                            is_deleted: true
                                        }
                                    })
                                })
                                selectedResponsibleAccounts.forEach((responsible) => {
                                    const newResponsibleId = nanoid();
                                    const newResponsibleModel: IPolyvalenceUnitTableDataResponsible.ICreate = {
                                        data_responsible_id: newResponsibleId,
                                        polyvalence_table_id: id,
                                        responsible_employee_id: responsible,
                                        responsible_employee_name: accounts.find(x => x.$id == responsible)?.name,
                                        tenant_id: me?.prefs?.organization,
                                        realm_id: ""
                                    }
                                    createPolyvalenceUnitTableDataResponsible({
                                        documentId: newResponsibleId,
                                        data: newResponsibleModel
                                    })
                                })
                                selectedViewerAccounts.forEach((viewer) => {
                                    const newViewerId = nanoid();
                                    const newViewerModel: IPolyvalenceUnitTableDataViewer.ICreate = {
                                        data_viewer_id: newViewerId,
                                        polyvalence_table_id: id,
                                        viewer_employee_id: viewer,
                                        viewer_employee_name: accounts.find(x => x.$id == viewer)?.name,
                                        tenant_id: me?.prefs?.organization,
                                        realm_id: ""
                                    }
                                    createPolyvalenceUnitTableDataViewer({
                                        documentId: newViewerId,
                                        data: newViewerModel
                                    })
                                })
                            }

                            if (positionBased) {
                                const positionRelationIds = []
                                polyvalenceUnitPositionRelations.map(x => positionRelationIds.push(x.$id))
                                positionRelationIds.forEach((positionRelation) => {
                                    // Herhangi bir update fonksiyonu yeterli olacaktır.
                                    updatePolyvalenceUnit({
                                        databaseId: AppInfo.Database,
                                        collectionId: Collections.PolyvalenceUnitPositionRelation,
                                        documentId: positionRelation,
                                        data: {
                                            is_active: false,
                                            is_deleted: true
                                        }
                                    })
                                })

                                selectedPositions.forEach((position) => {
                                    createPolyvalenceUnitPositionRelation({
                                        documentId: nanoid(),
                                        data: {
                                            polyvalence_unit_id: id,
                                            position_id: position.$id
                                        }
                                    })
                                })
                            }

                            if (lineBased[0]?.is_active) {
                                if (lineRelation.length == 0) {
                                    const documentId = nanoid();
                                    createPolyvalenceUnitLineRelation({
                                        documentId: documentId,
                                        data: {
                                            polyvalence_table_line_relation_id: documentId,
                                            polyvalence_table_id: id,
                                            line_id: selectedLine,
                                            tenant_id: me?.prefs?.organization,
                                        }
                                    })
                                } else {
                                    updatePolyvalenceUnitLineRelation({
                                        databaseId: AppInfo.Database,
                                        collectionId: "polyvalence_unit_table_line_rel",
                                        documentId: id,
                                        data: {
                                            line_id: selectedLine,
                                            polyvalence_table_line_relation_id: lineRelation[0]?.polyvalence_table_line_relation_id,
                                            polyvalence_table_id: id,
                                            tenant_id: me?.prefs?.organization,
                                        }
                                    })
                                }
                            }
                            Toast.fire({
                                icon: 'success',
                                title: 'Polivalans tablosu güncellendi!'
                            })
                            navigate("/app/polyvalence-unit/list")
                        })
                    }

                    const onCancel = () => {
                        navigate("/app/polyvalence-unit/list")
                    }

                    const accountColumns = [
                        {
                            field: "name",
                            headerName: "Adı Soyadı",
                            flex: 1
                        }
                    ];

                    const onDelete = () => {
                        Swal.fire({
                            title: 'Emin misiniz?',
                            text: "Bu polivalans tablosunu silmek istediğinizden emin misiniz?",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#d33',
                            cancelButtonColor: '#3085d6',
                            confirmButtonText: 'Evet, sil!',
                            cancelButtonText: 'Hayır'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Services.Databases.updateDocument(AppInfo.Name, AppInfo.Database, "polyvalence_unit_table", id, { is_deleted_table: true }).then(() => {
                                    Toast.fire({
                                        icon: 'success',
                                        title: 'Polivalans tablosu silindi!'
                                    })
                                    navigate("/app/polyvalence-unit/list")
                                    deleteCache()
                                })
                            }
                        })
                    }

                    const mapResponsibleEmployeeIds = (dataResponsible) => {
                        return dataResponsible.map((responsible) => responsible.responsible_employee_id);
                    };

                    const mapViewerEmployeeIds = (dataViewer) => {
                        return dataViewer.map((viewer) => viewer.viewer_employee_id);
                    };

                    const mapPositionRelations = (positionRelations, positions) => {
                        return positionRelations.map((positionRelation) =>
                            positions.find((position) => position.$id === positionRelation.position_id)
                        );
                    };

                    const getActiveAccounts = (accounts, accountRelations) => {
                        if (!accounts || !accountRelations) return [];
                        return accountRelations
                            .filter((accountRelation) => accountRelation.is_active)
                            .map((accountRelation) => accounts.find((account) => account.$id === accountRelation.account_id))
                            .filter(Boolean);
                    };

                    useEffect(() => {
                        if (dataResponsible) {
                            setSelectedResponsibleAccounts(mapResponsibleEmployeeIds(dataResponsible));
                        }
                        if (dataViewer) {
                            setSelectedViewerAccounts(mapViewerEmployeeIds(dataViewer));
                        }
                        setForm(removeDollarProperties(polyvalenceUnit));
                        if (lineBased[0]?.is_active) {
                            setSelectedLine(lineRelation[0]?.line_id);
                        }
                        setSelectedPositions(mapPositionRelations(polyvalenceUnitPositionRelations, positions));
                        setIsActive(polyvalenceUnit.is_active_table);
                        setAccountsData(getActiveAccounts(accounts, accountRelations));
                    }, [dataResponsible, dataViewer, polyvalenceUnit, lineBased, lineRelation, polyvalenceUnitPositionRelations, positions, accounts, accountRelations]);

                    return (
                        VStack({ alignment: cTop })(
                            ReactView(
                                <Form
                                    title="Tanımlı Birim Polivalans Tablosunu Düzenleyin"
                                    form={
                                        <form
                                            onSubmit={onSubmit}
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "8px",
                                                width: "60%"
                                            }}>
                                            <TextField
                                                label="Birim Polivalans Tablosu Adı"
                                                size="small"
                                                name="polyvalence_table_name"
                                                value={form.polyvalence_table_name}
                                                onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                                                required
                                            />
                                            {
                                                workPlaceDefination ? (
                                                    <Autocomplete
                                                        onChange={(event, newValue) => {
                                                            setForm({
                                                                ...form,
                                                                work_place_id: newValue.id,
                                                                work_place_name: newValue.name

                                                            })
                                                        }}
                                                        value={workPlaces.find((workPlace) => workPlace.id === form.work_place_id) || null}
                                                        options={workPlaces.filter(x => x.is_active === true)}
                                                        getOptionLabel={(position) => position.record_id + " - " + position.name}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="İlgili İşyeri"
                                                                size="small"
                                                                fullWidth
                                                            />
                                                        )}
                                                        fullWidth
                                                        size="small"
                                                    />
                                                ) : null
                                            }
                                            {!positionBased ?
                                                <FormControl fullWidth size="small">
                                                    <Autocomplete
                                                        options={
                                                            workPlaceDefination
                                                                ? departments.filter((department) =>
                                                                    relatedDepartmentsWorkPlacesList.some((x) =>
                                                                        x.workplace_id === form.work_place_id && x.related_department_id === department.id
                                                                    )
                                                                )
                                                                : departments.filter((item) => item.is_active)
                                                        }
                                                        getOptionLabel={(department) => department.name}
                                                        value={departments.find((department) => department.id === form.polyvalence_department_id) || null}
                                                        onChange={(event, newValue) => {
                                                            if (newValue) {
                                                                setForm({
                                                                    ...form,
                                                                    polyvalence_department_id: newValue.id,
                                                                    polyvalence_department_name: newValue.name
                                                                });
                                                            }
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Bağlı Departman"
                                                                size="small"
                                                                required
                                                            />
                                                        )}
                                                    />
                                                </FormControl>
                                                :
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
                                            }
                                            {
                                                !positionBased && lineBased[0]?.is_active &&
                                                <FormControl fullWidth size="small">
                                                    <Autocomplete
                                                        options={lines.filter(x => x.department_id == form.polyvalence_department_id)}
                                                        getOptionLabel={(option) => option.name}
                                                        value={lines.find((line) => line.id === selectedLine) || null}
                                                        onChange={(e, value) => {
                                                            setSelectedLine(value.id)
                                                        }}
                                                        renderInput={(params) => <TextField
                                                            {...params}
                                                            label="Bağlı Hat"
                                                            size="small"

                                                        />}
                                                    />
                                                </FormControl>
                                            }
                                            <div style={{
                                                height: "250px",
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "5px",
                                            }}>
                                                <Typography variant="button" sx={{ marginLeft: "10px" }}>Polivalans Veri Sorumluları</Typography>
                                                <StyledDataGrid
                                                    rows={accountsData.filter((account) => !selectedViewerAccounts.includes(account.$id))}
                                                    columns={accountColumns}
                                                    localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                                    isCellEditable={() => false}
                                                    disableRowSelectionOnClick
                                                    checkboxSelection
                                                    onRowSelectionModelChange={(newRowSelectionModel: any) => {
                                                        setSelectedResponsibleAccounts(newRowSelectionModel)
                                                    }}
                                                    rowHeight={30}
                                                    columnHeaderHeight={30}
                                                    rowSelectionModel={selectedResponsibleAccounts}
                                                    getRowId={(row) => row.$id}
                                                />
                                            </div>
                                            <div style={{
                                                height: "250px",
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "5px",
                                            }}>
                                                <Typography variant="button" sx={{ marginLeft: "10px" }}>Polivalans Veri Görüntüleyicileri</Typography>
                                                <StyledDataGrid
                                                    rows={accountsData.filter((account) => !selectedResponsibleAccounts.includes(account.$id))}
                                                    columns={accountColumns}
                                                    localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                                    isCellEditable={() => false}
                                                    disableRowSelectionOnClick
                                                    checkboxSelection
                                                    onRowSelectionModelChange={(newRowSelectionModel: any) => {
                                                        setSelectedViewerAccounts(newRowSelectionModel)
                                                    }}
                                                    rowSelectionModel={selectedViewerAccounts}
                                                    rowHeight={30}
                                                    columnHeaderHeight={30}
                                                    getRowId={(row) => row.$id}
                                                />
                                            </div>
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Değerlendirme Sıklığı</InputLabel>
                                                <Select
                                                    name="polyvalence_evaluation_frequency"
                                                    value={form.polyvalence_evaluation_frequency}
                                                    label="Değerlendirme Sıklığı"
                                                    size="small"
                                                    required
                                                >
                                                    <MenuItem
                                                        value={form.polyvalence_evaluation_frequency}
                                                        key={form.polyvalence_evaluation_frequency}>{form.polyvalence_evaluation_frequency}</MenuItem>

                                                </Select>
                                            </FormControl>
                                            <FormControlLabel
                                                sx={{ width: "100%", alignContent: "end" }}
                                                onChange={(e: any) => setForm({ ...form, is_active_table: e.target.checked })}
                                                value={form.is_active_table}
                                                control={<Switch color="primary" checked={form.is_active_table} />}
                                                label="Aktif mi?"
                                                labelPlacement="start"
                                            />
                                            <div style={{ display: "flex", gap: "10px", flexDirection: "column", marginTop: "8px" }}>
                                                <Button type="submit" variant="contained" color="primary" size="small">Güncelle</Button>
                                                {!isActive &&
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