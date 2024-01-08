import { cTop, Spinner, State, UIFormController, VStack, UIView, ReactView, nanoid } from '@tuval/forms';
import Form from '../Views/Form';
import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import StyledDataGrid from '../../../components/StyledDataGrid';
import { Toast } from '../../../components/Toast';
import CompetencyGrade from '../../../../server/hooks/competencyGrade/main';
import AppInfo from '../../../../AppInfo';

interface IFormData {
    grade_id: string;
    $id: string;
    grade_level_id: string;
    grade_level_name: string;
    grade_level_number: string;
}

export class CompetencyGradeLevelController extends UIFormController {

    private grade_id: string;

    @State()
    public theme: boolean;

    private getTheme() {
        this.theme = JSON.parse(localStorage.getItem("pedavalans_theme"));
    }

    protected BindRouterParams({ grade_id }) {
        this.grade_id = grade_id;
        this.getTheme()
    }

    public LoadView(): UIView {

        const refreshForm = {
            grade_id: this.grade_id,
            $id: "",
            grade_level_id: "",
            grade_level_name: "",
            grade_level_number: ""
        }

        const [form, setForm] = useState<IFormData>(refreshForm)

        const { createDocument, errorCreate, isErrorCreate, isLoadingCreate, isSuccessCreate } = CompetencyGrade.CreateGradeLevel();

        const { levels, isLoadingLevels } = CompetencyGrade.GetGradeLevels(this.grade_id);

        const { updateDocument, errorUpdate, isErrorUpdate, isLoadingUpdate, isSuccessUpdate } = CompetencyGrade.UpdateCompetencyGradeLevel();

        const onSubmit = (e: any) => {
            e.preventDefault();
            const generatedId = nanoid();
            form.$id = generatedId;
            form.grade_level_id = generatedId;
            createDocument({ data: { ...form } }, () => {
                setForm(refreshForm)
                Toast.fire({
                    title: "Yetkinlik Düzeyi Seviyesi Eklendi",
                    icon: "success"
                })
            })
        }

        const onDelete = (id) => {
            Swal.fire({
                title: 'Silmek istediğinize emin misiniz?',
                text: "Bu işlem geri alınamaz!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Evet, sil!',
                cancelButtonText: 'Hayır, iptal et!'
            }).then((result) => {
                if (result.isConfirmed) {

                    const index = levels.findIndex((level) => level.$id === id)
                    updateDocument({
                        databaseId: AppInfo.Database,
                        collectionId: "competency_grade_level",
                        documentId: id,
                        data: {
                            ...levels[index],
                            is_deleted_grade: true
                        }
                    })

                    Toast.fire({
                        title: "Yetkinlik Düzeyi Seviyesi Silindi",
                        icon: "success"
                    })

                }
            })
        }

        const columns: GridColDef[] = [
            {
                field: 'grade_level_name',
                headerName: 'Seviye Adı',
                editable: false,
                flex: 1,
                width: 200
            },
            {
                field: 'grade_level_number',
                headerName: 'Seviye Değeri',
                editable: false,
                flex: 1,
                width: 200
            },
            {
                field: "$id",
                headerName: "İşlemler",
                width: 100,
                renderCell: (params) => (
                    <Button onClick={() => {
                        onDelete(params.value)
                    }} variant="outlined" size="small" fullWidth>Sil</Button>
                )

            }
        ]



        return (
            VStack({ alignment: cTop })(
                isLoadingLevels ? VStack(Spinner()) :
                    ReactView(
                        <Form
                            title="Yetkinlik Düzeyi Seviyelerini Düzenleyin"
                            form={
                                <form
                                    onSubmit={onSubmit}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px",
                                        width: "60%",
                                        alignItems: "center"
                                    }}>
                                    <div style={{
                                        display: "flex", gap: "10px", alignItems: "center"
                                    }}>
                                        <TextField
                                            name="grade_level_name"
                                            label="Seviye Adı"
                                            fullWidth
                                            size="small"
                                            value={form.grade_level_name}
                                            onChange={(e) => setForm({ ...form, grade_level_name: e.target.value })}
                                            required
                                        />
                                        <TextField
                                            name="grade_level_number"
                                            label="Seviye Değeri"
                                            fullWidth
                                            size="small"
                                            value={form.grade_level_number}
                                            onChange={(e) => setForm({ ...form, grade_level_number: e.target.value })}
                                            required
                                        />
                                        <Button type="submit" variant="contained" size="small">Ekle</Button>
                                    </div>
                                    <div style={{
                                        height: "calc(100vh - 300px)",
                                        width: "calc(100vw - 500px)",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <StyledDataGrid
                                            columns={columns}
                                            rows={levels}
                                        />
                                    </div>
                                </form>
                            }
                        />
                    )
            ).padding("30px 20px").background(this.theme ? "rgba(0,0,0,.85)" : "").foregroundColor(this.theme ? "white" : "")
        )
    }
}
