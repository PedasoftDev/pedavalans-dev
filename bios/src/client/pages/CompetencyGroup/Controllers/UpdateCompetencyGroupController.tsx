import {
    cTop,
    ReactView,
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
import { Autocomplete, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import { Toast } from '../../../components/Toast';
import CompetencyGroup from '../../../../server/hooks/competencyGroup/main';
import CompetencyGrade from '../../../../server/hooks/competencyGrade/main';
import AppInfo from '../../../../AppInfo';
import { useDeleteCache, useGetMe } from '@realmocean/sdk';
import ICompetencyGroup from '../../../interfaces/ICompetencyGroup';
import removeDollarProperties from '../../../assets/Functions/removeDollarProperties';

const resetForm: ICompetencyGroup.IGetCompetencyGroup = {
    competency_group_name: "",
    competency_grade_id: "",
    competency_grade_name: "",
    is_active_group: true,
    competency_group_id: "",
    is_deleted_group: false,
    realm_id: "",
    tenant_id: "",
}

export class UpdateCompetencyGroupController extends UIFormController {

    public LoadView() {
        const { me, isLoading: isLoadingMe } = useGetMe("console");
        const { deleteCache } = useDeleteCache(AppInfo.Name);
        const { id } = useParams();

        const navigate = useNavigate();

        // group
        const { group, isLoading } = CompetencyGroup.GetCompetencyGroup(id);
        const { updateDocument } = CompetencyGroup.UpdateCompetencyGroup();


        // grade
        const { grades, isLoading: isLoadingGrade } = CompetencyGrade.GetCompetencyGrades(me?.prefs?.organization);

        return (
            isLoading || isLoadingGrade || isLoadingMe ? VStack(Spinner()) :
                UIViewBuilder(() => {
                    const [groupForm, setGroupForm] = useState<ICompetencyGroup.IGetCompetencyGroup>(resetForm)
                    const [isActive, setIsActive] = useState(true);

                    const navigateToList = () => {
                        navigate("/app/competency-group/list")
                    }

                    const handleSelectGrade = (e: SelectChangeEvent<string>) => {
                        setGroupForm({
                            ...groupForm,
                            competency_grade_id: e.target.value,
                            competency_grade_name: grades.find((grade) => grade.competency_grade_id === e.target.value)?.competency_grade_name
                        })
                    }

                    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                        setGroupForm({
                            ...groupForm,
                            [e.target.name]: e.target.value
                        })
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
                            data: groupForm
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
                                        ...groupForm,
                                        is_deleted_group: true
                                    }
                                }, () => {
                                    Toast.fire({
                                        title: "Yetkinlik Grubu Silindi",
                                        icon: "info"
                                    })
                                    deleteCache()
                                    navigateToList()
                                })
                            }
                        })
                    }

                    useEffect(() => {
                        setGroupForm(removeDollarProperties(group))
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
                                                    value={groupForm.competency_group_name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <Autocomplete
                                                    value={grades.find((grade) => grade.competency_grade_id === groupForm.competency_grade_id) || null}
                                                    onChange={(event, newValue) => {
                                                        setGroupForm({
                                                            ...groupForm,
                                                            competency_grade_id: newValue ? newValue.competency_grade_id : '',
                                                            competency_grade_name: newValue ? newValue.competency_grade_name : ''
                                                        });
                                                    }}
                                                    options={grades}
                                                    getOptionLabel={(option) => option.competency_grade_name}
                                                    isOptionEqualToValue={(option, value) => option.competency_grade_id === value.competency_grade_id}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Yetkinlik Düzeyi"
                                                            size="small"
                                                            required
                                                            fullWidth
                                                        />
                                                    )}
                                                    fullWidth
                                                    size="small"
                                                />

                                                <FormControlLabel
                                                    sx={{ width: "100%", alignContent: "end", padding: "0 5px 0 0" }}
                                                    onChange={(e: any) =>
                                                        setGroupForm({ ...groupForm, is_active_group: e.target.checked })
                                                    }
                                                    control={<Switch color="primary" checked={groupForm.is_active_group} />}
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