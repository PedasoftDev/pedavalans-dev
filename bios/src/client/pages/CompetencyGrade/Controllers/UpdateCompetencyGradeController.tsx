import { cTop, VStack, useNavigate, ReactView, UIController, Spinner } from "@tuval/forms";
import React, { useEffect } from "react";
import Form from "../Views/Form";
import { Button, TextField } from "@mui/material";
import { Toast } from "../../../components/Toast";
import CompetencyGrade from "../../../../server/hooks/competencyGrade/main";

interface IFormData {
    competency_grade_name: string;
}

export class UpdateCompetencyGradeController extends UIController {

    private id: string;

    protected BindRouterParams({ competency_grade_id }) {
        this.id = competency_grade_id;
    }

    public LoadView() {

        const navigate = useNavigate();

        const { grade, isLoading } = CompetencyGrade.GetCompetencyGrade(this.id);

        const [form, setForm] = React.useState<ICompetencyGrade.ICompetencyGrade>(null)

        useEffect(() => {
            setForm(grade)
        }, [grade])



        const goBack = () => {
            navigate("/competencyGrade/list")
        }

        const onSubmit = (e: any) => {
            e.preventDefault();
            Toast.fire({
                icon: 'info',
                title: 'Yetkinlik Düzeyi Düzenleniyor'
            })
        }

        return (
            isLoading ? VStack(Spinner()) :
                VStack({ alignment: cTop })(
                    ReactView(
                        <Form
                            title="Tanımlı Yetkinlik Düzeyini Düzenleyin"
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
                                        name="competency_grade_name"
                                        label="Düzey Adı"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        value={form.competency_grade_name}
                                        onChange={(e) => setForm({ ...form, competency_grade_name: e.target.value })}
                                        required
                                    />
                                    <div style={{
                                        display: "flex", gap: "10px", flexDirection: "column", marginTop: "10px"
                                    }}>
                                        <Button type="submit" variant="contained" color="primary" size="small">Güncelle</Button>
                                        <Button variant="contained" color="info" size="small" onClick={goBack}>İptal</Button>
                                    </div>
                                </form>
                            }
                        />
                    )
                ).padding("30px 20px")
        )
    }
}