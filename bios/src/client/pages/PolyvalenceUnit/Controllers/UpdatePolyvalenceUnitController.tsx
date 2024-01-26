import React, { useEffect, useState } from 'react';
import {
    cTop,
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
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { trTR } from '@mui/x-data-grid';
import StyledDataGrid from '../../../components/StyledDataGrid';
import { Toast } from '../../../components/Toast';
import IPolyvalenceUnit from '../../../interfaces/IPolyvalenceUnit';
import { useGetMe, useListTeamMemberships } from '@realmocean/sdk';
import OrganizationStructureDepartment from '../../../../server/hooks/organizationStructureDepartment/main';
import AppInfo from '../../../../AppInfo';
import PolyvalenceUnit from '../../../../server/hooks/polyvalenceUnit/main';
import removeDollarProperties from '../../../assets/Functions/removeDollarProperties';

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
        const { memberships, isLoading: isLoadingTeam } = useListTeamMemberships(AppInfo.Name, me?.prefs?.organization);
        const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization);
        const { polyvalenceUnit, isLoadingPolyvalenceUnit } = PolyvalenceUnit.Get(id);
        const { updatePolyvalenceUnit, errorPolyvalenceUnit, isErrorPolyvalenceUnit, isLoadingPolyvalenceUnitUpdate, isSuccessPolyvalenceUnit } = PolyvalenceUnit.Update();

        return (
            isLoading || isLoadingTeam || isLoadingDepartments || isLoadingPolyvalenceUnit ? VStack(Spinner()) :
                UIViewBuilder(() => {

                    const [form, setForm] = useState<IPolyvalenceUnit.IPolyvalenceUnit>(formReset)

                    const [selectedResponsibleAccounts, setSelectedResponsibleAccounts] = useState<string[]>([]);

                    const [selectedViewerAccounts, setSelectedViewerAccounts] = useState<string[]>([]);

                    // const [lineBasedCompetency, setLineBasedCompetency] = useState<boolean>(isLineBasedCompetencyActive);

                    const [lines, setLines] = useState<any[]>([]);
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
                            Toast.fire({
                                icon: 'success',
                                title: 'Polivalans tablosu güncellendi!'
                            })
                            navigate("/app/polyvalence-unit/list")
                        })
                        // const selectedPolvalenceTableDataResponsibleEmployees = accounts.filter((account) => selectedResponsibleAccounts.includes(account.id)).map((account) => {
                        //     return {
                        //         "responsible_employee_id": account.id,
                        //         "responsible_employee_name": account.Name
                        //     }
                        // });
                        // const selectedPolvalenceTableDataViewerEmployees = accounts.filter((account) => selectedViewerAccounts.includes(account.id)).map((account) => {
                        //     return {
                        //         "viewer_employee_id": account.id,
                        //         "viewer_employee_name": account.Name
                        //     }
                        // });
                        // PolivalansBrokerClient.UpdatePolyvalenceTable(this.id, form.polyvalence_table_name,
                        //     form.polyvalence_department_id, form.polyvalence_department_name, selectedPolvalenceTableDataResponsibleEmployees, selectedPolvalenceTableDataViewerEmployees).then(() => {
                        //         Toast.fire({
                        //             icon: 'success',
                        //             title: 'Polivalans tablosu güncellendi!'
                        //         })
                        //         navigate("/app/com.pedasoft.app.pedavalans/polyvalenceUnit/list")
                        //     })
                    }

                    const onCancel = () => {
                        navigate("/app/polyvalence-unit/list")
                    }

                    const accountColumns = [
                        {
                            field: "FirstName",
                            headerName: "Adı",
                            flex: 1
                        },
                        {
                            field: "LastName",
                            headerName: "Soyadı",
                            flex: 1
                        },
                    ]

                    useEffect(() => {
                        // Promise.all([
                        //     RealmBrokerClient.GetSessionInfo(),
                        //     PolivalansBrokerClient.GetPolyvalenceTableById(this.id),
                        //     PolivalansBrokerClient.GetParameterByNameAndTenantId(Resources.ParameterNames.PolyvalenceUnitTableAuth),
                        //     PolivalansBrokerClient.GetPolyvalenceUnitTableLineRelationByPolyvalenceUnitTableId(this.id),
                        //     PolivalansBrokerClient.GetActiveOrganizationLines()
                        // ]).then(res => {
                        //     const [sessionInfo, polyvalenceUnitTable, parameter, lineRelation, lines] = res;
                        //     setForm(polyvalenceUnitTable);
                        //     setSelectedResponsibleAccounts(polyvalenceUnitTable.polyvalence_unit_table_data_responsible.map((responsible) => responsible.responsible_employee_id));
                        //     setSelectedViewerAccounts(polyvalenceUnitTable.polyvalence_unit_table_data_viewer.map((viewer) => viewer.viewer_employee_id));
                        //     setSelectedLine(lineRelation.line_id);
                        //     setLines(lines);
                        //     if (parameter && sessionInfo.is_tenant_admin == false) {
                        //         // if (parameter) {
                        //         PolivalansBrokerClient.GetCanEditPolyvalenceUnitTable(this.id).then((canEdit) => {
                        //             this.canEdit = canEdit;
                        //             if (!canEdit) {
                        //                 PolivalansBrokerClient.GetCanViewPolyvalenceUnitTable(this.id).then((canView) => {
                        //                     this.canView = canView;
                        //                     if (!canView) {
                        //                         navigate("/app/com.pedasoft.app.pedavalans/polyvalenceUnit/list")
                        //                         Views.Toast.fire({
                        //                             icon: 'error',
                        //                             title: 'Bu tabloyu görüntüleme yetkiniz yok!'
                        //                         })
                        //                     }
                        //                 })
                        //             }
                        //         })

                        //     } else {
                        //         this.canEdit = true;
                        //         this.canView = true;
                        //     }
                        // })
                        setForm(removeDollarProperties(polyvalenceUnit))
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
                                            {/* {
                                                lineBasedCompetency && lines &&
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
                                            } */}
                                            {/* <div style={{
                                                height: "250px",
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "5px",
                                            }}>
                                                <Typography variant="button" sx={{ marginLeft: "10px" }}>Polivalans Veri Sorumluları</Typography>
                                                <StyledDataGrid
                                                    rows={memberships}
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
                                                    rows={memberships}
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
                                                />
                                            </div> */}
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
                                            <div style={{ display: "flex", gap: "10px", flexDirection: "column", marginTop: "8px" }}>
                                                <Button type="submit" variant="contained" color="primary" size="small">Güncelle</Button>
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