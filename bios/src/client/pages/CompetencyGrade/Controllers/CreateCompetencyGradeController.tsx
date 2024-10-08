import { cTop, nanoid, ReactView, UIFormController, useNavigate, VStack } from '@tuval/forms';
import React from 'react';
import { Button, TextField } from '@mui/material';
import { Toast } from '../../../components/Toast';
import Form from '../Views/Form';
import CompetencyGrade from '../../../../server/hooks/competencyGrade/main';
import { useGetMe } from '@realmocean/sdk';

interface IFormData {
    grade_name: string;
}

export class CreateCompetencyGradeController extends UIFormController {

    public LoadView() {

        const navigate = useNavigate();

        const { me, isLoading } = useGetMe("console")

        const { createDocument } = CompetencyGrade.CreateCompetencyGrade();

        const [form, setForm] = React.useState<IFormData>({
            grade_name: ""
        })

        const onSubmit = (e: any) => {
            const id = nanoid();
            e.preventDefault();
            Toast.fire({
                icon: 'info',
                title: 'Yetkinlik Düzeyi Oluşturuluyor...'
            })
            createDocument({
                documentId: id,
                data: {
                    competency_grade_id: id,
                    competency_grade_name: form.grade_name,
                    tenant_id: me?.prefs?.organization,
                    realm_id: "1"
                }
            }, () => {
                Toast.fire({
                    icon: 'success',
                    title: 'Yetkinlik Düzeyi Oluşturuldu'
                })
                navigate("/app/competency-grade/list")
            })
        }

        const onCancel = () => {
            navigate("/app/competency-grade/list")
        }
        return (
            VStack({ alignment: cTop })(
                ReactView(
                    <Form
                        title="Yetkinlik Düzeyi Tanımlayın"
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
                                    name="grade_name"
                                    label="Düzey Adı"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    value={form.grade_name}
                                    onChange={(e) => setForm({ ...form, grade_name: e.target.value })}
                                    required
                                />
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