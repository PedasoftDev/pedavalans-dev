import {
    cTop,
    nanoid,
    ReactView,
    Spinner,
    UIController,
    UIView,
    UIViewBuilder,
    useNavigate,
    VStack,
} from '@tuval/forms';
import React, { useState, useCallback } from 'react';
import Form from '../Views/Form';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { GridColDef, trTR } from '@mui/x-data-grid';
import { Toast } from '../../../components/Toast';
import IPolyvalenceUnit from '../../../interfaces/IPolyvalenceUnit';
import StyledDataGrid from '../../../components/StyledDataGrid';
import { useGetMe, useListAccounts } from '@realmocean/sdk';
import OrganizationStructureDepartment from '../../../../server/hooks/organizationStructureDepartment/main';
import PolyvalenceUnit from '../../../../server/hooks/polyvalenceUnit/main';
import OrganizationStructureLine from '../../../../server/hooks/organizationStructureLine/main';
import { Resources } from '../../../assets/Resources';
import Parameters from '../../../../server/hooks/parameters/main';
import PolyvalenceUnitTableLineRelation from '../../../../server/hooks/polyvalenceUnitTableLineRelation/main';
import IPolyvalenceUnitTableDataResponsible from '../../../interfaces/IPolyvalenceUnitTableDataResponsible';
import IPolyvalenceUnitTableDataViewer from '../../../interfaces/IPolyvalenceUnitTableDataViewer';
import PolyvalenceUnitTableDataViewer from '../../../../server/hooks/polyvalenceUnitTableDataViewer/main';
import PolyvalenceUnitTableDataResponsible from '../../../../server/hooks/polyvalenceUnitTableDataResponsible/main';

// Değerlendirme Sıklığı için
const evaluationFrequency = [
    {
        frequency: "Yıl"
    },
    {
        frequency: "Yarıyıl"
    },
    {
        frequency: "Çeyrekyıl"
    },
    {
        frequency: "Ay"
    }
]

export class CreatePolyvalenceUnitController extends UIController {

    public LoadView(): UIView {

        const navigate = useNavigate();
        const { me, isLoading } = useGetMe("console");
        const { accounts, isLoading: isLoadingAccounts } = useListAccounts();
        const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization);
        const { createPolyvalenceUnit } = PolyvalenceUnit.Create();
        const { createPolyvalenceUnitLineRelation } = PolyvalenceUnitTableLineRelation.Create();

        // lines
        const { lines, isLoadingLines } = OrganizationStructureLine.GetList(me?.prefs?.organization);

        const { parameters: lineBased, isLoading: isLoadingParameter } = Parameters.GetParameterByName(Resources.ParameterLocalStr.line_based_competency_relationship, me?.prefs?.organization)
        const { parameters: tableAuth, isLoading: isLoadingTableAuth } = Parameters.GetParameterByName(Resources.ParameterLocalStr.polyvalence_unit_table_auth, me?.prefs?.organization)

        const { createPolyvalenceUnitTableDataViewer } = PolyvalenceUnitTableDataViewer.Create();
        const { createPolyvalenceUnitTableDataResponsible } = PolyvalenceUnitTableDataResponsible.Create();

        return (
            isLoading || isLoadingAccounts || isLoadingDepartments || isLoadingParameter || isLoadingLines || isLoadingTableAuth ? VStack(Spinner()) :
                UIViewBuilder(() => {

                    const [form, setForm] = useState<IPolyvalenceUnit.ICreatePolyvalenceUnit>({
                        polyvalence_table_id: "",
                        polyvalence_table_name: "",
                        polyvalence_department_id: "",
                        polyvalence_department_name: "",
                        polyvalence_evaluation_frequency: "",
                        realm_id: "",
                        tenant_id: ""
                    })

                    const [selectedResponsibleAccounts, setSelectedResponsibleAccounts] = useState<string[]>([])
                    const [selectedViewerAccounts, setSelectedViewerAccounts] = useState<string[]>([])

                    const [selectedLine, setSelectedLine] = useState<string>("")

                    const responseFunc = useCallback(() => {
                        Toast.fire({
                            icon: "success",
                            title: "Birim Polivalans Tablosu Başarıyla Oluşturuldu"
                        })
                        onCancel();
                    }, [])

                    const onCancel = useCallback(() => {
                        navigate("/app/polyvalence-unit/list")
                    }, [])

                    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        const id: string = nanoid();
                        createPolyvalenceUnit({
                            documentId: id,
                            data: {
                                ...form,
                                polyvalence_table_id: id,
                                tenant_id: me?.prefs?.organization
                            }
                        }, () => {
                            if (tableAuth[0]?.is_active) {
                                for (let i = 0; i < selectedResponsibleAccounts.length; i++) {
                                    const responsibleDataId: string = nanoid();
                                    const responsibleData: IPolyvalenceUnitTableDataResponsible.ICreate = {
                                        data_responsible_id: responsibleDataId,
                                        polyvalence_table_id: id,
                                        responsible_employee_id: selectedResponsibleAccounts[i],
                                        responsible_employee_name: accounts.find((account) => account.$id == selectedResponsibleAccounts[i]).name,
                                        tenant_id: me?.prefs?.organization,
                                        realm_id: ""
                                    }
                                    createPolyvalenceUnitTableDataResponsible({
                                        documentId: nanoid(),
                                        data: responsibleData
                                    })
                                }
                                for (let i = 0; i < selectedViewerAccounts.length; i++) {
                                    const viewerDataId: string = nanoid();
                                    const viewerData: IPolyvalenceUnitTableDataViewer.ICreate = {
                                        data_viewer_id: viewerDataId,
                                        polyvalence_table_id: id,
                                        viewer_employee_id: selectedViewerAccounts[i],
                                        viewer_employee_name: accounts.find((account) => account.$id == selectedViewerAccounts[i]).name,
                                        tenant_id: me?.prefs?.organization,
                                        realm_id: ""
                                    }
                                    createPolyvalenceUnitTableDataViewer({
                                        documentId: nanoid(),
                                        data: viewerData
                                    })
                                }
                            }

                            if (lineBased[0]?.is_active) {
                                createPolyvalenceUnitLineRelation({
                                    documentId: id,
                                    data: {
                                        polyvalence_table_id: id,
                                        line_id: selectedLine,
                                        tenant_id: me?.prefs?.organization
                                    }
                                }, () => {
                                    responseFunc();
                                })
                            }
                            else {
                                responseFunc();
                            }
                        })
                    }

                    const accountColumns: GridColDef[] = [
                        {
                            field: "name",
                            headerName: "Adı Soyadı",
                            flex: 1
                        },
                    ]

                    return (
                        VStack({ alignment: cTop })(
                            ReactView(
                                <Form
                                    title="Yeni Birim Polivalans Tablosu Tanımlayın"
                                    form={
                                        <form
                                            onSubmit={onSubmit}
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "8px",
                                                width: "60%",
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
                                            {
                                                tableAuth[0]?.is_active &&
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
                                                        getRowId={(row) => row.$id}
                                                    />
                                                </div>
                                            }
                                            {
                                                tableAuth[0]?.is_active &&
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
                                                        rowHeight={30}
                                                        columnHeaderHeight={30}
                                                        getRowId={(row) => row.$id}
                                                    />
                                                </div>
                                            }
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Değerlendirme Sıklığı</InputLabel>
                                                <Select
                                                    name="polyvalence_evaluation_frequency"
                                                    value={form.polyvalence_evaluation_frequency}
                                                    label="Değerlendirme Sıklığı"
                                                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                                                    size="small"
                                                    required
                                                >
                                                    {evaluationFrequency.map((frequency) => (
                                                        <MenuItem value={frequency.frequency} key={frequency.frequency}>{frequency.frequency}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <div style={{ display: "flex", gap: "10px", flexDirection: "column", marginTop: "8px" }}>
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