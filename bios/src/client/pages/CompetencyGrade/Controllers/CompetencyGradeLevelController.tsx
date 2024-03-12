import { cTop, Spinner, UIFormController, VStack, UIView, ReactView, nanoid, useState, useParams } from '@tuval/forms';
import Form from '../Views/Form';
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { GridColDef, trTR } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import StyledDataGrid from '../../../components/StyledDataGrid';
import { Toast } from '../../../components/Toast';
import CompetencyGrade from '../../../../server/hooks/competencyGrade/main';
import AppInfo from '../../../../AppInfo';
import Collections from '../../../../server/core/Collections';

interface IFormData {
    grade_id: string;
    grade_level_id: string;
    grade_level_name: string;
    grade_level_number: string;
}

export class CompetencyGradeLevelController extends UIFormController {

    public LoadView(): UIView {

        const { id } = useParams();

        useEffect(() => {
            console.log(id)
        }, [])

        const refreshForm = {
            grade_id: id,
            grade_level_id: "",
            grade_level_name: "",
            grade_level_number: ""
        }

        const [form, setForm] = useState<IFormData>(refreshForm)

        const [theme] = useState<boolean>(JSON.parse(localStorage.getItem("pedavalans_theme")))

        const { createDocument } = CompetencyGrade.CreateGradeLevel();

        const { levels, isLoadingLevels } = CompetencyGrade.GetGradeLevels(id);

        const { updateDocument } = CompetencyGrade.UpdateCompetencyGradeLevel();

        const [selectedRow, setSelectedRow] = useState<any>(null)

        // dialog
        const [openDialog, setOpenDialog] = useState(false);

        const handleCloseDialog = () => {
            setOpenDialog(false);
            setSelectedRow(null)
        }

        const handleSubmitDialog = (e: any) => {
            e.preventDefault();
            updateDocument({
                databaseId: AppInfo.Database,
                collectionId: Collections.CompetencyGradeLevel,
                documentId: selectedRow.$id,
                data: {
                    grade_level_name: selectedRow.grade_level_name,
                    grade_level_number: selectedRow.grade_level_number
                }
            }, () => {
                Toast.fire({
                    title: "Yetkinlik Düzeyi Seviyesi Güncellendi",
                    icon: "success"
                })

                setSelectedRow(null)
                setOpenDialog(false);
            })
        }

        const onSubmit = (e: any) => {
            e.preventDefault();
            const generatedId = nanoid();
            form.grade_level_id = generatedId;
            createDocument({
                documentId: generatedId,
                data: { ...form }
            }, () => {
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
                width: 200,
            },
            {
                field: 'grade_level_number',
                headerName: 'Seviye Değeri',
                editable: false,
                flex: 1,
                width: 200,
            },
            {
                field: "$id",
                headerName: "İşlemler",
                width: 200,
                renderCell: (params) => (
                    <ButtonGroup>
                        <Button onClick={() => {
                            setSelectedRow(params.row)
                            setOpenDialog(true)
                        }} variant="outlined" size="small" fullWidth>Düzenle</Button>
                        <Button onClick={() => {
                            onDelete(params.value)
                        }} variant="outlined" size="small" fullWidth>Sil</Button>
                    </ButtonGroup>
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
                                        width: "calc(100vw - 400px)",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <StyledDataGrid
                                            getRowId={(row) => row.$id}
                                            columns={columns}
                                            rows={levels}
                                            localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                        />
                                    </div>
                                    <Dialog
                                        open={openDialog}
                                        onClose={handleCloseDialog}>
                                        <div style={{ width: "400px" }}>
                                            <DialogTitle>Düzenleyin</DialogTitle>
                                            <DialogContent>
                                                <TextField
                                                    fullWidth
                                                    label="Seviye Adı"
                                                    variant="outlined"
                                                    size='small'
                                                    margin='normal'
                                                    required
                                                    value={selectedRow?.grade_level_name}
                                                    onChange={(e) => setSelectedRow({ ...selectedRow, grade_level_name: e.target.value })}
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Seviye Değeri"
                                                    variant="outlined"
                                                    size='small'
                                                    margin='normal'
                                                    required
                                                    value={selectedRow?.grade_level_number}
                                                    onChange={(e) => setSelectedRow({ ...selectedRow, grade_level_number: e.target.value })}
                                                />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleCloseDialog}>İptal</Button>
                                                <Button onClick={handleSubmitDialog}>Kaydet</Button>
                                            </DialogActions>
                                        </div>
                                    </Dialog>
                                </form>
                            }
                        />
                    )
            ).padding("30px 20px").background(theme ? "rgba(0,0,0,.85)" : "").foregroundColor(theme ? "white" : "")
        )
    }
}
