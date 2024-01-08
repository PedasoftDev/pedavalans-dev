import { cTop, VStack, useNavigate, ReactView, Spinner, useParams, Text, UIFormController, UIViewBuilder } from "@tuval/forms";
import React, { useCallback, useEffect } from "react";
import Form from "../Views/Form";
import { Button, TextField } from "@mui/material";
import { Toast } from "../../../components/Toast";
import CompetencyGrade from "../../../../server/hooks/competencyGrade/main";
import AppInfo from "../../../../AppInfo";
import Swal from "sweetalert2";

export class UpdateCompetencyGradeController extends UIFormController {

    public LoadView() {

        const { id } = useParams();

        const navigate = useNavigate();

        const { grade, isLoading } = CompetencyGrade.GetCompetencyGrade(id);

        return (
            isLoading ? VStack(Spinner()) :
                UIViewBuilder(() => {
                    const { updateDocument, isSuccess, error, isError, isLoading: isLoadingUpdate } = CompetencyGrade.UpdateCompetencyGrade();

                    const deleteCompetencyGrade = useCallback(() => {
                        Swal.fire({
                            title: 'Yetkinlik Düzeyini Silmek İstediğinize Emin Misiniz?',
                            text: "Yetkinlik Düzeyi Silindiğinde Geri Alınamaz!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#d33',
                            cancelButtonColor: '#3085d6',
                            confirmButtonText: 'Sil',
                            cancelButtonText: 'İptal'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                updateDocument({
                                    databaseId: AppInfo.Database,
                                    collectionId: "competency_grade",
                                    documentId: id,
                                    data: {
                                        ...grade,
                                        is_deleted_grade: true
                                    }
                                })
                                if (isSuccess) {
                                    Toast.fire({
                                        title: "Yetkinlik Düzeyi Silindi",
                                        icon: "info"
                                    })
                                    navigate("/competencyGrade/list")

                                }
                            }
                        })
                    }, [])


                    const goBack = () => {
                        navigate("/competencyGrade/list")
                    }

                    const onSubmit = (e: any) => {
                        e.preventDefault();
                        Toast.fire({
                            icon: 'info',
                            title: 'Yetkinlik Düzeyi Düzenleniyor'
                        })
                        updateDocument({
                            databaseId: AppInfo.Database,
                            collectionId: "competency_grade",
                            documentId: id,
                            data: this.GetFormData()
                        })
                    }

                    useEffect(() => {
                        for (let key in grade) {
                            this.SetValue(key, grade[key])
                        }
                    }, [])

                    return (
                        VStack({ alignment: cTop })(
                            Text(JSON.stringify(this.GetFormData())),
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
                                                value={this.GetValue("competency_grade_name")}
                                                onChange={(e) => { this.SetValue("competency_grade_name", e.target.value) }}
                                                required
                                            />
                                            <div style={{
                                                display: "flex", gap: "10px", flexDirection: "column", marginTop: "10px"
                                            }}>
                                                <Button type="submit" variant="contained" color="primary" size="small">Güncelle</Button>
                                                <Button variant="contained" color="error" size="small" onClick={deleteCompetencyGrade}>Sil</Button>
                                                <Button variant="contained" color="info" size="small" onClick={goBack}>İptal</Button>
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