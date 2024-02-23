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
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';
import { trTR } from '@mui/x-data-grid';
import StyledDataGrid from '../../../components/StyledDataGrid';
import { Toast } from '../../../components/Toast';
import IPolyvalenceUnit from '../../../interfaces/IPolyvalenceUnit';
import { useGetMe, useListAccounts } from '@realmocean/sdk';
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

const formReset = {
    polyvalence_table_id: "",
    polyvalence_table_name: "",
    polyvalence_department_id: "",
    polyvalence_department_name: "",
    polyvalence_evaluation_frequency: "",
    is_active_table: true,
    is_deleted_table: false,
    realm_id: "",
    tenant_id: ""
}


export class UpdatePolyvalenceUnitController extends UIController {
    public LoadView(): UIView {

        const { id } = useParams();
        const navigate = useNavigate();
        const { me, isLoading } = useGetMe("console");
        const { accounts, isLoading: isLoadingAccounts } = useListAccounts();
        const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization);
        const { polyvalenceUnit, isLoadingPolyvalenceUnit } = PolyvalenceUnit.Get(id);
        const { updatePolyvalenceUnit } = PolyvalenceUnit.Update();

        // lines
        const { lines, isLoadingLines } = OrganizationStructureLine.GetList(me?.prefs?.organization);

        const { lineRelation, isLoading: isLoadingLineRelation } = PolyvalenceUnitTableLineRelation.GetByPolyvalenceUnitId(id, me?.prefs?.organization)
        const { updatePolyvalenceUnitLineRelation } = PolyvalenceUnitTableLineRelation.Update();
        const { createPolyvalenceUnitLineRelation } = PolyvalenceUnitTableLineRelation.Create();

        const { parameters: lineBased, isLoading: isLoadingParameter } = Parameters.GetParameterByName(Resources.ParameterLocalStr.line_based_competency_relationship, me?.prefs?.organization)
        const { parameters: tableAuth, isLoading: isLoadingTableAuth } = Parameters.GetParameterByName(Resources.ParameterLocalStr.polyvalence_unit_table_auth, me?.prefs?.organization)

        // selectedAccounts
        const { dataResponsible, isLoadingDataResponsible } = PolyvalenceUnitTableDataResponsible.GetByPolyvalenceUnitId(id);
        const { dataViewer, isLoadingDataViewer } = PolyvalenceUnitTableDataViewer.GetByPolyvalenceUnitId(id);
        const { createPolyvalenceUnitTableDataResponsible } = PolyvalenceUnitTableDataResponsible.Create();
        const { createPolyvalenceUnitTableDataViewer } = PolyvalenceUnitTableDataViewer.Create();
        const { updatePolyvalenceUnitTableDataResponsible } = PolyvalenceUnitTableDataResponsible.Update();
        const { updatePolyvalenceUnitTableDataViewer } = PolyvalenceUnitTableDataViewer.Update();

        return (
            isLoading || isLoadingAccounts || isLoadingDepartments || isLoadingPolyvalenceUnit || isLoadingTableAuth || isLoadingDataResponsible || isLoadingDataViewer
                || isLoadingParameter || isLoadingLines || isLoadingLineRelation ? VStack(Spinner()) :
                UIViewBuilder(() => {

                    const [form, setForm] = useState<IPolyvalenceUnit.IPolyvalenceUnit>(formReset);
                    const [isActive, setIsActive] = useState<boolean>(true);

                    const [selectedResponsibleAccounts, setSelectedResponsibleAccounts] = useState<string[]>([]);

                    const [selectedViewerAccounts, setSelectedViewerAccounts] = useState<string[]>([]);

                    const [selectedLine, setSelectedLine] = useState<string>("");


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
                                const alreadyViewer = dataViewer.map((viewer) => viewer.viewer_employee_id)
                                const alreadyResponsible = dataResponsible.map((responsible) => responsible.responsible_employee_id)
                                const newViewer = selectedViewerAccounts.filter((viewer) => !alreadyViewer.includes(viewer))
                                const newResponsible = selectedResponsibleAccounts.filter((responsible) => !alreadyResponsible.includes(responsible))
                                const removedViewer = alreadyViewer.filter((viewer) => !selectedViewerAccounts.includes(viewer))
                                const removedResponsible = alreadyResponsible.filter((responsible) => !selectedResponsibleAccounts.includes(responsible))
                                newViewer.forEach((viewer) => {
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
                                removedViewer.forEach((viewer) => {
                                    updatePolyvalenceUnitTableDataViewer({
                                        databaseId: AppInfo.Database,
                                        collectionId: Collections.PolyvalenceUnitTableDataViewer,
                                        documentId: dataViewer.find((x) => x.viewer_employee_id == viewer)?.$id,
                                        data: {
                                            ...removeDollarProperties(dataViewer.find((x) => x.viewer_employee_id == viewer)),
                                            is_deleted: true
                                        }
                                    })
                                })
                                newResponsible.forEach((responsible) => {
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
                                removedResponsible.forEach((responsible) => {
                                    updatePolyvalenceUnitTableDataResponsible({
                                        databaseId: AppInfo.Database,
                                        collectionId: Collections.PolyvalenceUnitTableDataResponsible,
                                        documentId: dataResponsible.find((x) => x.responsible_employee_id == responsible)?.$id,
                                        data: {
                                            ...removeDollarProperties(dataResponsible.find((x) => x.responsible_employee_id == responsible)),
                                            is_deleted: true
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
                                        documentId: lineRelation[0]?.polyvalence_table_line_relation_id,
                                        data: {
                                            ...removeDollarProperties(lineRelation[0]),
                                            line_id: selectedLine
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
                                updatePolyvalenceUnit({
                                    databaseId: AppInfo.Database,
                                    collectionId: "polyvalence_unit_table",
                                    documentId: id,
                                    data: {
                                        ...form,
                                        is_deleted_table: true
                                    }
                                }, () => {
                                    Toast.fire({
                                        icon: 'success',
                                        title: 'Polivalans tablosu silindi!'
                                    })
                                    navigate("/app/polyvalence-unit/list")
                                })
                            }
                        })
                    }

                    useEffect(() => {
                        setSelectedResponsibleAccounts(dataResponsible.map((responsible) => responsible.responsible_employee_id))
                        setSelectedViewerAccounts(dataViewer.map((viewer) => viewer.viewer_employee_id))
                        setForm(removeDollarProperties(polyvalenceUnit))
                        if (lineBased[0]?.is_active) {
                            setSelectedLine(lineRelation[0]?.line_id)
                        }
                        setIsActive(polyvalenceUnit.is_active_table)
                    }, [])

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
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Bağlı Departman</InputLabel>
                                                <Select
                                                    name="polyvalence_department_id"
                                                    value={form.polyvalence_department_id}
                                                    label="Bağlı Departman"
                                                    onChange={(e) => {
                                                        setForm({
                                                            ...form,
                                                            [e.target.name]: e.target.value,
                                                            polyvalence_department_name: departments.find((department) => department.id == e.target.value).name
                                                        })
                                                    }}
                                                    size="small"
                                                    required
                                                >
                                                    {departments.map((department) => (
                                                        <MenuItem value={department.id} key={department.id}>{department.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            {
                                                lineBased[0]?.is_active &&
                                                <FormControl fullWidth size="small">
                                                    <InputLabel>Bağlı Hat</InputLabel>
                                                    <Select
                                                        name="line"
                                                        value={selectedLine}
                                                        label="Bağlı Hat"
                                                        onChange={(e) => setSelectedLine(e.target.value)}
                                                        size="small"
                                                        required
                                                    >
                                                        {lines.filter(x => x.department_id == form.polyvalence_department_id).map((lines) => (
                                                            <MenuItem value={lines.id} key={lines.id}>{lines.name}</MenuItem>
                                                        ))}
                                                    </Select>
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
                                                    rows={accounts.filter((account) => !selectedViewerAccounts.includes(account.$id))}
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
                                                    rows={accounts.filter((account) => !selectedResponsibleAccounts.includes(account.$id))}
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