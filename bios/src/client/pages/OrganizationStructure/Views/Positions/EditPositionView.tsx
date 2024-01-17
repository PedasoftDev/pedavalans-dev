import React, { Fragment, useState } from 'react'
import Swal from 'sweetalert2';
import { FormControlLabel, Switch, TextField } from '@mui/material';
import Form from '../ViewForm/Form';
import { Toast } from '../../../../components/Toast';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import OrganizationStructurePosition from '../../../../../server/hooks/organizationStructrePosition/main';
import { Spinner, VStack } from '@tuval/forms';
import AppInfo from '../../../../../AppInfo';

const formState: IOrganizationStructure.IPositions.IPosition = {
    id: "",
    record_id: "",
    name: "",
    is_deleted: false,
    is_active: true,
    realm_id: "",
    tenant_id: ""
}

const EditPositionView = (
    props:
        {
            setDefaultPage: React.Dispatch<React.SetStateAction<string>>,
            setActive: React.Dispatch<React.SetStateAction<boolean>>,
            selectedPosition: IOrganizationStructure.IPositions.IPosition
        }
): JSX.Element => {
    const { selectedPosition, setActive, setDefaultPage } = props;

    const { update, error, isError, isLoading, isSuccess } = OrganizationStructurePosition.Update();

    const [form, setForm] = useState(selectedPosition);
    const [isActive, setIsActive] = useState(selectedPosition.is_active);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        update({
            databaseId: AppInfo.Database,
            collectionId: "organization_position",
            documentId: form.id,
            data: form
        }, () => {
            Toast.fire({
                icon: "success",
                title: "Pozisyon başarıyla güncellendi!"
            });
            onReset()
        })
        if (!isLoading && isError) {
            Toast.fire({
                icon: "error",
                title: "Pozisyon güncellenirken bir hata oluştu!",
                text: error.message
            });
            onReset()
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onDelete = () => {
        Swal.fire({
            title: "Pozisyon Silme",
            text: `${form.name} adlı posizyon silinecek!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Evet, sil!",
            cancelButtonText: "Hayır, iptal et!"
        }).then((result) => {
            if (!result.isConfirmed) {
                return;
            }
            update({
                databaseId: AppInfo.Database,
                collectionId: "organization_position",
                documentId: form.id,
                data: { ...form, is_deleted: true }
            }, () => {
                Toast.fire({
                    icon: "success",
                    title: "Pozisyon başarıyla silindi!"
                });
                onReset()
            })
            if (!isLoading && isError) {
                Toast.fire({
                    icon: "error",
                    title: "Pozisyon silinirken bir hata oluştu!",
                    text: error.message
                });
                onReset()
            }
        })
    }

    const onReset = () => {
        setForm(formState);
        setDefaultPage("");
    }

    return (
        isLoading ?
            <Fragment>
                {VStack(Spinner()).render()}
            </Fragment>
            :
            <Form
                title='Pozisyon Tanımını Düzenleyin'
                onSubmit={onSubmit}
                formContent={
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%" }}>

                        <TextField
                            name='record_id'
                            size='small'
                            label='Kayıt Kodu'
                            value={form.record_id}
                            onChange={onChange}
                        />

                        <TextField
                            name='name'
                            size='small'
                            label='Pozisyon Adı'
                            value={form.name}
                            onChange={onChange}
                        />

                        <FormControlLabel
                            sx={{ width: "100%", alignContent: "end" }}
                            onChange={(e: any) => setForm({ ...form, is_active: e.target.checked })}
                            value={form.is_active}
                            control={<Switch color="primary" checked={form.is_active} />}
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

export default EditPositionView;