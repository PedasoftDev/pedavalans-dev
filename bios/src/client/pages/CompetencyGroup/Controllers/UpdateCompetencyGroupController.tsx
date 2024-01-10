import {
    cTop,
    ReactView,
    RequiredRule,
    Spinner,
    State,
    UIFormController,
    UIViewBuilder,
    useNavigate,
    useParams,
    VStack,
} from '@tuval/forms';

import React, { useState, useEffect } from 'react';
import Form from '../Views/Form';
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import ICompetencyGrade from '../../../interfaces/CompetencyGrade';
import { Toast } from '../../../components/Toast';
import CompetencyGroup from '../../../../server/hooks/competencyGroup/main';
import CompetencyGrade from '../../../../server/hooks/competencyGrade/main';
import AppInfo from '../../../../AppInfo';

export class UpdateCompetencyGroupController extends UIFormController {

    public LoadView() {

        const { id } = useParams();

        const navigate = useNavigate();

        // group
        const { group, isLoading } = CompetencyGroup.GetCompetencyGroup(id);
        const { updateDocument } = CompetencyGroup.UpdateCompetencyGroup();
        const [isActive, setIsActive] = useState(true);

        // grade
        const { grades, isLoading: isLoadingGrade } = CompetencyGrade.GetCompetencyGrades();

        return (
            isLoading || isLoadingGrade ? VStack(Spinner()) :
                UIViewBuilder(() => {
                    const navigateToList = () => {
                        navigate("/app/competency-group/list")
                    }

                    const handleSelectGrade = (e: SelectChangeEvent<string>) => {
                        this.SetValue("competency_grade_id", e.target.value)
                        this.SetValue("competency_grade_name", grades.find((grade) => grade.competency_grade_id === e.target.value)?.competency_grade_name)
                    }

                    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                        this.SetValue(e.target.name, e.target.value)
                    }

                    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        Toast.fire({
                            icon: 'info',
                            title: 'Yetkinlik grubu güncelleniyor...'
                        })
                        updateDocument({
                            databaseId: AppInfo.Database,
                            collectionId: "competency_group",
                            documentId: id,
                            data: this.GetFormData()
                        }, () => {
                            Toast.fire({
                                icon: 'success',
                                title: 'Yetkinlik grubu güncellendi.'
                            })
                            navigateToList()
                        })
                    }


                    const onDelete = () => {
                        Swal.fire({
                            title: 'Emin misiniz?',
                            text: "Yetkinlik grubunu silmek istediğinize emin misiniz?",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#d33',
                            cancelButtonColor: '#3085d6',
                            confirmButtonText: 'Evet, sil!',
                            cancelButtonText: 'Hayır, vazgeç!'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                updateDocument({
                                    databaseId: AppInfo.Database,
                                    collectionId: "competency_group",
                                    documentId: id,
                                    data: {
                                        ...this.GetFormData(),
                                        is_deleted_group: true
                                    }
                                }, () => {
                                    Toast.fire({
                                        title: "Yetkinlik Grubu Silindi",
                                        icon: "info"
                                    })
                                    navigateToList()
                                })
                            }
                        })
                    }

                    useEffect(() => {
                        for (let key in group) {
                            if (key.startsWith("$")) continue;
                            this.SetValue(key, group[key])
                        }
                        setIsActive(group.is_active_group)
                    }, [])

                    return (
                        isLoading ? VStack(Spinner()) :
                            VStack({ alignment: cTop })(
                                ReactView(
                                    <Form
                                        title="Tanımlı Yetkinlik Grubunu Düzenleyin"
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
                                                    name="competency_group_name"
                                                    label="Yetkinlik Grubu Adı"
                                                    variant="outlined"
                                                    fullWidth
                                                    size="small"
                                                    value={this.GetValue("competency_group_name")}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <FormControl fullWidth size="small" required>
                                                    <InputLabel>Yetkinlik Düzeyi</InputLabel>
                                                    <Select
                                                        name="competency_grade_id"
                                                        value={this.GetValue("competency_grade_id")}
                                                        label="Yetkinlik Düzeyi"
                                                        onChange={handleSelectGrade}
                                                        size="small"
                                                        required
                                                    >
                                                        {grades.map((grade) => (
                                                            <MenuItem value={grade.competency_grade_id} key={grade.competency_grade_id}>{grade.competency_grade_name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>

                                                <FormControlLabel
                                                    sx={{ width: "100%", alignContent: "end", padding: "0 5px 0 0" }}
                                                    onChange={(e: any) => this.SetValue("is_active_group", Boolean(e.target.checked))}
                                                    control={<Switch color="primary" checked={this.GetValue("is_active_group")} />}
                                                    label="Aktif mi?"
                                                    labelPlacement="start"
                                                />

                                                <div style={{
                                                    display: "flex", gap: "10px", flexDirection: "column", marginTop: "10px"
                                                }}>
                                                    <Button type="submit" variant="contained" color="primary" size="small">Güncelle</Button>
                                                    {!isActive &&
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