import {
    cTop,
    ReactView,
    Spinner,
    State,
    UIController,
    UIView,
    UIViewBuilder,
    useNavigate,
    VStack,
} from '@tuval/forms';
import React, { useState, useEffect, useCallback } from 'react';
import Form from '../Views/Form';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { GridColDef, trTR } from '@mui/x-data-grid';
import { Toast } from '../../../components/Toast';
import IPolyvalenceUnit from '../../../interfaces/IPolyvalenceUnit';
import StyledDataGrid from '../../../components/StyledDataGrid';
import { useGetCurrentTeam, useGetMe, useGetTeamMembership, useListTeamMemberships } from '@realmocean/sdk';
import OrganizationStructureDepartment from '../../../../server/hooks/organizationStructureDepartment/main';
import AppInfo from '../../../../AppInfo';

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

    //   protected BindRouterParams(): void {
    //     this.isLoading = true;
    //     const orgProvider = useOrganizationService();
    //     orgProvider.getAccounts().then((response) => {
    //       accounts = response.map((account) => ({
    //         ...account,
    //         id: account.Id
    //       }))
    //     })
    //     if (isLineBasedCompetencyActive) {
    //       PolivalansBrokerClient.GetActiveOrganizationLines().then((response) => {
    //         this.lines = response
    //       })
    //     }
    //     this.isLoading = false;
    //   }


    public LoadView(): UIView {

        const navigate = useNavigate();
        const { me, isLoading } = useGetMe("console");
        const { memberships, isLoading: isLoadingTeam } = useListTeamMemberships(AppInfo.Name, me?.prefs?.organization)
        const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization);

        return (
            isLoading || isLoadingTeam || isLoadingDepartments ? VStack(Spinner()) :
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

                    // const [lineBasedCompetency, setLineBasedCompetency] = useState<boolean>(isLineBasedCompetencyActive);
                    // const [selectedLine, setSelectedLine] = useState<string>("")

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

                        // PolivalansBrokerClient.CreatePolyvalenceUnit(form.polyvalence_table_name, form.polyvalence_department_id, form.polyvalence_department_name,
                        //     selectedPolvalenceTableDataResponsibleEmployees, selectedPolvalenceTableDataViewerEmployees, form.frequency).then((response) => {
                        //         if (lineBasedCompetency) {
                        //             const data = {
                        //                 "polyvalence_table_id": response.id,
                        //                 "line_id": selectedLine,
                        //                 "created_at": new Date().toISOString(),
                        //             }
                        //             PolivalansBrokerClient.CreatePolyvalenceUnitTableLineRelation(data).then((response) => {
                        //                 responseFunc();
                        //             })
                        //         } else {
                        //             responseFunc();
                        //         }
                        //     })
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
                                            {/* {
                                                        lineBasedCompetency && this.lines &&
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
                                                                {this.lines.filter(x => x.department_id == form.polyvalence_department_id).map((lines) => (
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
                                                            rows={accounts.filter((account) => !selectedViewerAccounts.includes(account.id))}
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
                                                            rows={accounts.filter((account) => !selectedResponsibleAccounts.includes(account.id))}
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
                                                        />
                                                    </div> */}
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