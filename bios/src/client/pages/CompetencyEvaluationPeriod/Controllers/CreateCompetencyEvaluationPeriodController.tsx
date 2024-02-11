import {
    cTop,
    nanoid,
    ReactView,
    Spinner,
    UIFormController,
    useNavigate,
    VStack,
} from '@tuval/forms';
import React, { useCallback, useState } from 'react';
import Form from '../Views/Form';
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import { Toast } from '../../../components/Toast';
import ICompetencyEvaluationPeriod from '../../../interfaces/ICompetencyEvaluationPeriod';
import CompetencyEvaluationPeriod from '../../../../server/hooks/competencyEvaluationPeriod/main';
import { useGetMe } from '@realmocean/sdk';
import AppInfo from '../../../../AppInfo';

let years = []
for (let i = 2022; i < 2100; i++) {
    years.push({ year: String(i) })
}

const resetForm = {
    evaluation_period_id: "",
    evaluation_period_name: "",
    evaluation_period_year: "",
    is_default_year: "false",
    realm_id: "",
    tenant_id: "",
}

export class CreateCompetencyEvaluationPeriodController extends UIFormController {

    public LoadView() {

        const navigate = useNavigate();

        const { me, isLoading } = useGetMe('console');

        const [form, setForm] = useState<ICompetencyEvaluationPeriod.ICreateCompetencyEvaluationPeriod>(resetForm);

        const { createDocument } = CompetencyEvaluationPeriod.CreateCompetencyEvaluationPeriod();
        const { periods, isLoading: isLoadingPeriods, total } = CompetencyEvaluationPeriod.GetDefaultCompetencyEvaluationPeriod(me?.prefs?.organization);
        const { updateDocument } = CompetencyEvaluationPeriod.UpdateCompetencyEvaluationPeriod()

        const onSubmit = (e: any) => {
            e.preventDefault();
            Toast.fire({
                icon: 'info',
                title: 'Dönem Oluşturuluyor'
            })
            const id = nanoid();
            createDocument({
                documentId: id,
                data: {
                    ...form,
                    evaluation_period_id: id,
                    realm_id: "",
                    tenant_id: me?.prefs?.organization
                }
            }, () => {
                if (form.is_default_year === "true") {
                    for (let i = 0; i < total; i++) {
                        let data: ICompetencyEvaluationPeriod.ICompetencyEvaluationPeriod = { ...resetForm, is_deleted_period: false }
                        for (const key in periods[i]) {
                            if (key.startsWith("$")) continue;
                            data[key] = periods[i][key]
                        }
                        updateDocument({
                            databaseId: AppInfo.Database,
                            collectionId: "competency_evaluation_period",
                            documentId: data.evaluation_period_id,
                            data: {
                                ...data,
                                is_default_year: "false"
                            }
                        })
                    }
                }
                Toast.fire({
                    icon: 'success',
                    title: 'Dönem Oluşturuldu'
                })
                navigateToList()
            })
        }

        const navigateToList = useCallback(() => {
            navigate("/app/competency-evaluation-period/list")
        }, [])

        return (
            isLoading || isLoadingPeriods ? VStack(Spinner()) :
                VStack({ alignment: cTop })(
                    ReactView(
                        <Form
                            title="Yetkinlik Değerlendirme Dönemi Tanımlama"
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
                                        control={<Switch color="primary" checked={form.is_default_year === "true" ? true : false} />}
                                        label="Varsayılan Dönem mi?"
                                        labelPlacement="start"
                                    />
                                    <div style={{
                                        display: "flex", gap: "10px", flexDirection: "column", marginTop: "10px"
                                    }}>
                                        <Button type="submit" variant="contained" color="primary" size="small">Kaydet</Button>
                                        <Button variant="contained" color="info" size="small" onClick={navigateToList}>İptal</Button>
                                    </div>
                                </form>
                            }
                        />
                    )
                ).padding("30px 20px")
        )
    }
}