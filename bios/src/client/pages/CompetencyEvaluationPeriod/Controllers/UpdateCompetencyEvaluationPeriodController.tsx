import {
    cTop,
    ReactView,
    Spinner,
    UIFormController,
    UIViewBuilder,
    useNavigate,
    useParams,
    VStack,
} from '@tuval/forms';
import React, { useState, useEffect } from 'react';
import Form from '../Views/Form';
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import { Toast } from '../../../components/Toast';
import ICompetencyEvaluationPeriod from '../../../interfaces/ICompetencyEvaluationPeriod';
import CompetencyEvaluationPeriod from '../../../../server/hooks/competencyEvaluationPeriod/main';
import AppInfo from '../../../../AppInfo';
import removeDollarProperties from '../../../assets/Functions/removeDollarProperties';
import { useGetMe } from '@realmocean/sdk';

interface IYear {
    year: string;
}

let years: IYear[] = []
for (let i = 2022; i < 2100; i++) {
    years.push({ year: String(i) })
}

export class UpdateCompetenyEvaluationPeriodController extends UIFormController {

    public LoadView() {
        const { id } = useParams();
        const navigate = useNavigate();
        const { me, isLoading: isLoadingMe } = useGetMe('console');

        const [form, setForm] = useState<ICompetencyEvaluationPeriod.ICompetencyEvaluationPeriod>({
            evaluation_period_id: "",
            evaluation_period_name: "",
            evaluation_period_year: "",
            is_default_year: "false",
            is_deleted_period: false,
            realm_id: "",
            tenant_id: "",
        });
        const [isDefault, setIsDefault] = useState<string>("true");

        const { period, isLoading } = CompetencyEvaluationPeriod.GetCompetencyEvaluationPeriod(id);
        const { periods, isLoading: isLoadingDefaults, total } = CompetencyEvaluationPeriod.GetDefaultCompetencyEvaluationPeriod(me?.prefs?.organization);
        const { updateDocument } = CompetencyEvaluationPeriod.UpdateCompetencyEvaluationPeriod();

        const onSubmit = (e: any) => {
            e.preventDefault();
            Toast.fire({
                icon: 'info',
                title: 'Dönem Güncelleniyor'
            })
            updateDocument({
                databaseId: AppInfo.Database,
                collectionId: "competency_evaluation_period",
                documentId: id,
                data: form
            }, () => {
                if (form.is_default_year === "true") {
                    periods.filter(x => x.evaluation_period_id != id).forEach((period: ICompetencyEvaluationPeriod.ICompetencyEvaluationPeriod, i) => {
                        updateDocument({
                            databaseId: AppInfo.Database,
                            collectionId: "competency_evaluation_period",
                            documentId: period.evaluation_period_id,
                            data: {
                                ...removeDollarProperties(period),
                                is_default_year: "false"
                            }
                        }, () => {
                            if (i === periods.length - 1) {
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Dönem Güncellendi'
                                })
                                navigate("/app/competency-evaluation-period/list")
                            }
                            return;
                        });
                    })
                }
                Toast.fire({
                    icon: 'success',
                    title: 'Dönem Güncellendi'
                })
                navigate("/app/competency-evaluation-period/list")
            })
        }

        const navigateToList = () => {
            navigate("/app/competency-evaluation-period/list")
        }

        const onDelete = () => {
            Swal.fire({
                title: 'Emin Misiniz?',
                text: "Bu işlem geri alınamaz!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Evet, Sil!',
                cancelButtonText: 'Hayır, İptal Et'
            }).then((result) => {
                if (result.isConfirmed) {
                    Toast.fire({
                        icon: 'info',
                        title: 'Dönem Siliniyor'
                    })
                    updateDocument({
                        databaseId: AppInfo.Database,
                        collectionId: "competency_evaluation_period",
                        documentId: id,
                        data: {
                            ...removeDollarProperties(period),
                            is_deleted_period: true
                        }
                    }, () => {
                        Toast.fire({
                            icon: 'success',
                            title: 'Dönem Silindi'
                        })
                        navigate("/app/competency-evaluation-period/list")
                    })
                }
            })
        }

        return (
            isLoading || isLoadingMe || isLoadingDefaults ? VStack(Spinner()) :
                UIViewBuilder(() => {
                    useEffect(() => {
                        setForm(removeDollarProperties(period));
                        setIsDefault(period.is_default_year);
                    }, [])

                    return (
                        VStack({ alignment: cTop })(
                            ReactView(
                                <Form
                                    title="Tanımlı Değerlendirme Dönemini Düzenleyin"
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
                                                name="evaluation_period_name"
                                                label="Dönem Adı"
                                                variant="outlined"
                                                fullWidth
                                                size="small"
                                                value={form.evaluation_period_name}
                                                onChange={(e) => setForm({ ...form, evaluation_period_name: e.target.value })}
                                                required
                                            />
                                            <FormControl fullWidth size="small" required>
                                                <InputLabel>Dönem Yılı</InputLabel>
                                                <Select
                                                    name="evaluation_period_year"
                                                    value={form.evaluation_period_year}
                                                    label="Dönem Yılı"
                                                    onChange={(e) => setForm({ ...form, evaluation_period_year: e.target.value })}
                                                    size="small"
                                                    required
                                                >
                                                    {years.map((year) => (
                                                        <MenuItem value={year.year} key={year.year}>{year.year}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <FormControlLabel
                                                sx={{ width: "100%", alignContent: "end", padding: "0 5px 0 0" }}
                                                onChange={(e: any) => setForm({ ...form, is_default_year: e.target.checked ? "true" : "false" })}
                                                control={<Switch color="primary" checked={form.is_default_year == "true" ? true : false} />}
                                                label="Varsayılan Dönem mi?"
                                                labelPlacement="start"
                                            />
                                            <div style={{
                                                display: "flex", gap: "10px", flexDirection: "column", marginTop: "10px"
                                            }}>
                                                <Button type="submit" variant="contained" color="primary" size="small">Güncelle</Button>
                                                {isDefault === "false" &&
                                                    <Button variant="contained" color="error" size="small" onClick={onDelete}>Sil</Button>
                                                }
                                                <Button variant="contained" color="info" size="small" onClick={navigateToList}>İptal</Button>
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