import React, { useState, useEffect, Fragment } from 'react'
import Form from '../ViewForm/Form';
import { TextField } from '@mui/material';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import { Toast } from '../../../../components/Toast';
import OrganizationStructurePosition from '../../../../../server/hooks/organizationStructrePosition/main';
import { Spinner, VStack, nanoid } from '@tuval/forms';
import { useGetMe } from '@realmocean/sdk';


const formState: IOrganizationStructure.IPositions.ICreatePosition = {
    id: "",
    name: "",
    record_id: "",
    realm_id: "",
    tenant_id: ""
}

const AddPositionView = (
    props:
        {
            positions: IOrganizationStructure.IPositions.IPosition[],
            setDefaultPage: React.Dispatch<React.SetStateAction<string>>,
        }
): JSX.Element => {
    const { positions, setDefaultPage } = props;
    const { me, isLoading } = useGetMe("console");
    const { create, error, isError, isLoading: isLoadingCreate, isSuccess } = OrganizationStructurePosition.Create();

    const [form, setForm] = useState(formState);


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (positions.find(position => position.record_id === form.record_id)) {
            Toast.fire({
                icon: 'error',
                title: 'Bu kayıt kodu ile başka bir pozisyon zaten mevcut.'
            })
        } else {
            const id = nanoid();
            create({
                documentId: id,
                data: {
                    ...form,
                    id: id,
                    tenant_id: me?.prefs?.organization
                }
            }, () => {
                Toast.fire({
                    icon: 'success',
                    title: 'Pozisyon başarıyla eklendi.'
                })
                onReset();
            })
            if (!isLoadingCreate && isError) {
                Toast.fire({
                    icon: 'error',
                    title: 'Pozisyon eklenirken bir hata oluştu.'
                })
            }
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
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
                title='Yeni Pozisyon Tanımlayın'
                onSubmit={onSubmit}
                formContent={

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%" }}>
                        <TextField
                            name='record_id'
                            size='small'
                            label='Kayıt Kodu'
                            value={form.record_id}
                            onChange={onChange}
                            required
                        />
                        <TextField
                            name='name'
                            size='small'
                            label='Pozisyon Adı'
                            value={form.name}
                            onChange={onChange}
                            required
                        />
                    </div>
                }

                buttons={[
                    {
                        text: "Kaydet",
                        color: "primary",
                        type: "submit"
                    },
                    {
                        text: "İptal",
                        color: "error",
                        type: "button",
                        onClick: onReset
                    }
                ]}
            />
    )
}

export default AddPositionView