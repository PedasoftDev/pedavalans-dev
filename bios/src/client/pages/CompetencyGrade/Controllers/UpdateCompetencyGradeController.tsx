import { cTop, VStack, useNavigate, ReactView, Spinner, useParams, UIFormController, UIViewBuilder } from "@tuval/forms";
import React, { useCallback, useEffect } from "react";
import Form from "../Views/Form";
import { Button, TextField } from "@mui/material";
import { Toast } from "../../../components/Toast";
import CompetencyGrade from "../../../../server/hooks/competencyGrade/main";
import AppInfo from "../../../../AppInfo";
import Swal from "sweetalert2";
import { useDeleteCache, useGetMe } from "@realmocean/sdk";
import CompetencyGroup from "../../../../server/hooks/competencyGroup/main";

export class UpdateCompetencyGradeController extends UIFormController {

    public LoadView() {

        const { id } = useParams();
        const { me } = useGetMe('console')
        const { groups, isLoadingGroups } = CompetencyGroup.GetList(me?.prefs?.organization)

        const navigate = useNavigate();

        const { grade, isLoading } = CompetencyGrade.GetCompetencyGrade(id);

        const { deleteCache } = useDeleteCache(AppInfo.Name);

        return (
            isLoading || isLoadingGroups ? VStack(Spinner()) :
                UIViewBuilder(() => {
                    const { updateDocument, isSuccess, error, isError, isLoading: isLoadingUpdate } = CompetencyGrade.UpdateCompetencyGrade();

                    const deleteCompetencyGrade = useCallback(() => {
                        if (groups.find((item) => item.competency_grade_id === id)) {
                            Swal.fire({
                                title: 'Yetkinlik Düzeyi bir Yetkinlik Grubu ile ilişkilendirilmiş',
                                text: "Bu Yetkinlik Düzeyini silemezsiniz!",
                                icon: 'error',
                                confirmButtonColor: '#d33',
                                confirmButtonText: 'Tamam'
                            })
                            return;
                        }
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
                                        is_deleted_grade: true
                                    }
                                }, () => {
                                    Toast.fire({
                                        title: "Yetkinlik Düzeyi Silindi",
                                        icon: "info"
                                    })
                                    deleteCache()
                                    navigate("/app/competency-grade/list")
                                })
                            }
                        })
                    }, [])


                    const goBack = () => {
                        navigate("/app/competency-grade/list")
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
                        }, () => {
                            Toast.fire({
                                title: "Yetkinlik Düzeyi Düzenlendi",
                                icon: "success"
                            })
                            navigate("/app/competency-grade/list")
                        })
                    }

                    useEffect(() => {
                        for (let key in grade) {
                            if (key.startsWith("$")) continue;
                            this.SetValue(key, grade[key])
                        }
                    }, [])

                    return (
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