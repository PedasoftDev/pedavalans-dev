import React, { useState, Fragment } from 'react';
import { TextField } from '@mui/material';
import Form from '../ViewForm/Form';
import { Toast } from '../../../../components/Toast';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import OrganizationStructureDepartment from '../../../../../server/hooks/organizationStructureDepartment/main';
import { Spinner, VStack, nanoid } from '@tuval/forms';
import { useGetMe } from '@realmocean/sdk';

const formDepartmentState: IOrganizationStructure.IDepartments.ICreateDepartment = {
    id: "",
    record_id: "",
    name: "",
    tenant_id: "",
    realm_id: "",
}

const AddDepartmentView = (
    props:
        {
            setDefaultPage: React.Dispatch<React.SetStateAction<string>>,
            departments: IOrganizationStructure.IDepartments.IDepartment[]
        }
): JSX.Element => {

    const [formDepartment, setFormDepartment] = useState(formDepartmentState);

    const { me, isLoading: isLoadingMe } = useGetMe("console");
    const { createDocument, error, isError } = OrganizationStructureDepartment.Create();


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (props.departments.some((document) => document.record_id == formDepartment.record_id)) {
            Toast.fire({
                icon: "error",
                title: "Departman eklenirken bir hata oluştu!",
                text: "Departman kodu zaten kullanılmaktadır."
            })
            return;
        }
        const id = nanoid();
        createDocument({
            documentId: id,
            data: {
                ...formDepartment,
                id: id,
                tenant_id: me?.prefs?.organization
            }
        }, () => {
            Toast.fire({
                icon: "success",
                title: "Departman başarıyla eklendi!",
            })
            props.setDefaultPage("");
        });
        if (isError) {
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
        setFormDepartment(formDepartmentState);
        props.setDefaultPage("");
    }

    return (
        isLoadingMe ?
            <Fragment>
                {VStack(Spinner()).render()}
            </Fragment> :
            <Form
                title='Yeni Departman Tanımlayın'
                onSubmit={onSubmit}
                formContent={

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%" }}>
                        <TextField
                            name='record_id'
                            size='small'
                            label='Kayıt Kodu'
                            value={formDepartment.record_id}
                            onChange={onChange}
                            required
                        />
                        <TextField
                            name='name'
                            size='small'
                            label='Departman Adı'
                            value={formDepartment.name}
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

export default AddDepartmentView
