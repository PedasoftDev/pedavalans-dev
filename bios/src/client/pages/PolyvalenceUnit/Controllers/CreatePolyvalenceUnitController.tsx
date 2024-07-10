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
import React, { useState, useCallback, useEffect } from 'react';
import Form from '../Views/Form';
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
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
import OrganizationStructurePosition from '../../../../server/hooks/organizationStructrePosition/main';
import PolyvalenceUnitPositionRelation from '../../../../server/hooks/polyvalenceUnitPositionRelation/main';
import AccountRelation from '../../../../server/hooks/accountRelation/main';

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
];

const positionBased = localStorage.getItem("position_based_polyvalence_management") === "true" ? true : false;

export class CreatePolyvalenceUnitController extends UIController {

    public LoadView(): UIView {

        const navigate = useNavigate();
        const { me, isLoading } = useGetMe("console");
        const { accounts, isLoading: isLoadingAccounts } = useListAccounts();
        const { accountRelations, isLoadingResult: isLoadingAccountRelations } = AccountRelation.GetList(me?.prefs?.organization);
        const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization);
        const { positions, isLoadingPositions } = OrganizationStructurePosition.GetList(me?.prefs?.organization);
        const { createPolyvalenceUnit } = PolyvalenceUnit.Create();
        const { createPolyvalenceUnitLineRelation } = PolyvalenceUnitTableLineRelation.Create();

        // lines
        const { lines, isLoadingLines } = OrganizationStructureLine.GetList(me?.prefs?.organization);

        const { parameters: lineBased, isLoading: isLoadingParameter } = Parameters.GetParameterByName(Resources.ParameterLocalStr.line_based_competency_relationship)
        const { parameters: tableAuth, isLoading: isLoadingTableAuth } = Parameters.GetParameterByName(Resources.ParameterLocalStr.polyvalence_unit_table_auth)

        const { createPolyvalenceUnitTableDataViewer } = PolyvalenceUnitTableDataViewer.Create();
        const { createPolyvalenceUnitTableDataResponsible } = PolyvalenceUnitTableDataResponsible.Create();

        const { createPolyvalenceUnitPositionRelation } = PolyvalenceUnitPositionRelation.Create();

        return (
            isLoading || isLoadingAccounts || isLoadingDepartments || isLoadingAccountRelations || isLoadingParameter || isLoadingPositions || isLoadingLines || isLoadingTableAuth ? VStack(Spinner()) :
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

                    const [selectedPositions, setSelectedPositions] = useState<typeof positions>([])

                    const [selectedResponsibleAccounts, setSelectedResponsibleAccounts] = useState<string[]>([])
                    const [selectedViewerAccounts, setSelectedViewerAccounts] = useState<string[]>([])

                    const [selectedLine, setSelectedLine] = useState<string>("")

                    const [accountsData, setAccountsData] = useState<typeof accounts>([])

                    const responseFunc = useCallback(() => {
                        Toast.fire({
                            icon: "success",
                            title: "Polivalans Tablosu Başarıyla Oluşturuldu"
                        })
                        onCancel();
                    }, [])

                    const onCancel = useCallback(() => {
                        navigate("/app/polyvalence-unit/list")
                    }, [])

                    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        const id: string = nanoid();
                        if (positionBased && selectedPositions.length === 0) {
                            Toast.fire({
                                icon: "error",
                                title: "En az bir pozisyon seçmelisiniz"
                            })
                            return;
                        }
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

                            if (positionBased) {
                                selectedPositions.forEach((position) => {
                                    createPolyvalenceUnitPositionRelation({
                                        documentId: nanoid(),
                                        data: {
                                            polyvalence_unit_id: id,
                                            position_id: position.$id,
                                        }
                                    })
                                })
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

                    useEffect(() => {
                        const accountsDataCpy = []
                        accountRelations.forEach((accountRelation) => {
                            if (accountRelation.is_active) {
                                accountsDataCpy.push(accounts.find((account) => account.$id === accountRelation.account_id))
                            }
                        })
                        setAccountsData(accountsDataCpy)
                    }, [])

                    return (
                        VStack({ alignment: cTop })(
                            ReactView(
                                <Form
                                    title="Yeni Polivalans Tablosu Tanımlayın"
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
                                                label="Polivalans Tablosu Adı"
                                                size="small"
                                                name="polyvalence_table_name"
                                                value={form.polyvalence_table_name}
                                                onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                                                required
                                            />
                                            {!positionBased ?
                                                <FormControl fullWidth size="small">
                                                    <Autocomplete
                                                        options={departments}
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
                                                        }}
                                                    />
                                                </FormControl>
                                            }
                                            {
                                                (lineBased[0]?.is_active && !positionBased) &&
                                                <FormControl fullWidth size="small">
                                                    <Autocomplete
                                                        options={lines.filter(x => x.department_id == form.polyvalence_department_id)}
                                                        getOptionLabel={(line) => line.name}
                                                        value={lines.find((line) => line.id === selectedLine) || null}
                                                        onChange={(event, newValue) => {
                                                            if (newValue) {
                                                                setSelectedLine(newValue.id);
                                                            }
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Bağlı Hat"
                                                                size="small"
                                                                required
                                                            />
                                                        )}
                                                    />
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
                                                        rows={accountsData.filter((account) => !selectedResponsibleAccounts.includes(account.$id))}
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
                                                <Autocomplete
                                                    options={evaluationFrequency}
                                                    getOptionLabel={(frequency) => frequency.frequency}
                                                    value={evaluationFrequency.find((frequency) => frequency.frequency === form.polyvalence_evaluation_frequency) || null}
                                                    onChange={(event, newValue) => {
                                                        if (newValue) {
                                                            setForm({
                                                                ...form,
                                                                polyvalence_evaluation_frequency: newValue.frequency
                                                            });
                                                        }
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Değerlendirme Sıklığı"
                                                            size="small"
                                                            required
                                                        />
                                                    )}
                                                />
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