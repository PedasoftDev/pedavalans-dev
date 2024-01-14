import React, { useState } from 'react'
import Form from '../ViewForm/Form'
import { FormControlLabel, Switch, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import { Toast } from '../../../../components/Toast';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import OrganizationStructureDepartment from '../../../../../server/hooks/organizationStructureDepartment/main';
import removeDollarProperties from '../../../../assets/Functions/removeDollarProperties';
import AppInfo from '../../../../../AppInfo';

interface IFormDepartment {
    id: string;
    record_id: string;
    name: string;
    is_active: boolean;
}

const formDepartmentState: IFormDepartment = {
    id: "",
    record_id: "",
    name: "",
    is_active: true
}

const EditDepartmentView = (
    props:
        {
            setDefaultPage: React.Dispatch<React.SetStateAction<string>>,
            departments: IOrganizationStructure.IDepartments.IDepartment[],
            setDepartmentsActives: React.Dispatch<React.SetStateAction<boolean>>,
            selectedDepartment: IFormDepartment
        }
): JSX.Element => {

    const { updateDocument, error, isError, isLoading } = OrganizationStructureDepartment.Update();

    const [formDepartment, setFormDepartment] = useState(props.selectedDepartment);
    const [isActive, setIsActive] = useState(props.selectedDepartment.is_active);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (props.departments.some((department) => department.record_id == formDepartment.record_id && department.id != formDepartment.id)) {
            Toast.fire({
                icon: "error",
                title: "Departman eklenirken bir hata oluştu!",
                text: "Departman kodu zaten kullanılmaktadır."
            })
            return;
        }
        updateDocument({
            databaseId: AppInfo.Database,
            collectionId: "organization_department",
            documentId: formDepartment.id,
            data: formDepartment
        }, () => {
            Toast.fire({
                icon: "success",
                title: "Departman başarıyla güncellendi!",
                text: "Departman başarıyla güncellendi."
            })
            onReset();
        })
        if (!isLoading && isError) {
            Toast.fire({
                icon: "error",
                title: "Departman eklenirken bir hata oluştu!",
                text: error?.message
            })
        }

    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormDepartment({ ...formDepartment, [e.target.name]: e.target.value });
    }

    const onReset = () => {
        props.setDepartmentsActives(true);
        setFormDepartment(formDepartmentState);
        props.setDefaultPage("");
    }

    const onDelete = () => {
        Swal.fire({
            title: "Departman Silme",
            text: `${formDepartment.name} adlı Departman silinecek!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Evet, sil!",
            cancelButtonText: "Hayır, iptal et!"
        }).then((result) => {
            if (!result.isConfirmed) {
                return;
            }
            updateDocument({
                databaseId: AppInfo.Database,
                collectionId: "organization_department",
                documentId: formDepartment.id,
                data: {
                    ...formDepartment,
                    is_deleted: true
                }
            }, () => {
                Toast.fire({
                    icon: "info",
                    title: "Departman başarıyla silindi!",
                    text: "Departman başarıyla silindi."
                })
                onReset();
            })
        })
    }


    return (
        <Form
            title='Departman Tanımını Düzenleyin'
            onSubmit={onSubmit}
            formContent={
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%" }}>

                    <TextField
                        name='record_id'
                        size='small'
                        label='Kayıt Kodu'
                        value={formDepartment.record_id}
                        onChange={onChange}
                    />

                    <TextField
                        name='name'
                        size='small'
                        label='Departman Adı'
                        value={formDepartment.name}
                        onChange={onChange}
                    />

                    <FormControlLabel
                        sx={{ width: "100%", alignContent: "end" }}
                        onChange={(e: any) => setFormDepartment({ ...formDepartment, is_active: e.target.checked })}
                        value={formDepartment.is_active}
                        control={<Switch color="primary" checked={formDepartment.is_active} />}
                        label="Aktif mi?"
                        labelPlacement="start"
                    />
                </div>
            }
            buttons={
                isActive ?
                    [
                        {
                            text: "Güncelle",
                            color: "primary",
                            type: "submit"
                        },
                        {
                            text: "İptal",
                            color: "error",
                            type: "button",
                            onClick: onReset
                        }
                    ]
                    :
                    [
                        {
                            text: "Güncelle",
                            color: "primary",
                            type: "submit"
                        },
                        {
                            text: "Sil",
                            color: "error",
                            onClick: onDelete
                        },
                        {
                            text: "İptal",
                            color: "primary",
                            type: "button",
                            onClick: onReset
                        }
                    ]
            }
        />
    )
}

export default EditDepartmentView