import React, { Fragment, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Form from '../ViewForm/Form';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import { Toast } from '../../../../components/Toast';
import OrganizationStructureEmployee from '../../../../../server/hooks/organizationStructureEmployee/main';
import { useGetMe } from '@realmocean/sdk';
import { Spinner, VStack, nanoid } from '@tuval/forms';

const formState: IOrganizationStructure.IEmployees.ICreateEmployee = {
    id: "",
    first_name: "",
    last_name: "",
    title_id: "",
    position_id: "",
    department_id: "",
    line_id: "",
    manager_id: "",
    realm_id: "",
    tenant_id: ""
}

const AddEmployeeView = (
    props:
        {
            setActive: React.Dispatch<React.SetStateAction<boolean>>,
            setDefaultPage: React.Dispatch<React.SetStateAction<string>>,
            titles: IOrganizationStructure.ITitles.ITitle[],
            positions: IOrganizationStructure.IPositions.IPosition[],
            departments: IOrganizationStructure.IDepartments.IDepartment[],
            lines: IOrganizationStructure.ILines.ILine[],
            employees: IOrganizationStructure.IEmployees.IEmployee[]
        }
): JSX.Element => {
    const { me, isLoading } = useGetMe("console");
    const { createEmployee, createError, createIsError, createIsLoading, createIsSuccess } = OrganizationStructureEmployee.Create()

    const [formEmployee, setFormEmployee] = useState(formState);

    const selectFormStates = [
        {
            id: "title_id",
            label: "Ünvanı",
            options: props.titles
        },
        {
            id: "position_id",
            label: "Bulunduğu Pozisyon",
            options: props.positions
        },
        {
            id: "department_id",
            label: "Bulunduğu Departman",
            options: props.departments
        },
        {
            id: "line_id",
            label: "Bulunduğu Hat",
            options: props.lines.filter((line) => line.department_id === formEmployee.department_id)
        }
    ];

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = nanoid();
        createEmployee({
            documentId: id,
            data: {
                ...formEmployee,
                id: id,
                tenant_id: me?.prefs?.organization
            }
        }, () => {
            Toast.fire({
                icon: 'success',
                title: 'Personel başarıyla eklendi.'
            })
            onReset();
        })
        if (!isLoading && createIsError) {
            Toast.fire({
                icon: 'error',
                title: 'Personel eklenirken bir hata oluştu.',
                text: createError?.message
            })
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormEmployee({ ...formEmployee, [e.target.name]: e.target.value });
    }

    const onReset = () => {
        setFormEmployee(formState);
        props.setDefaultPage("");
        props.setActive(true);
    }

    return (
        isLoading ?
            <Fragment>
                {VStack(Spinner()).render()}
            </Fragment>
            :
            <Form
                title='Yeni Personel Tanımlayın'
                onSubmit={onSubmit}
                formContent={

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%" }}>
                        <TextField
                            name='first_name'
                            size='small'
                            label='İsim'
                            value={formEmployee.first_name}
                            onChange={onChange}
                        />
                        <TextField
                            name='last_name'
                            size='small'
                            label='Soyisim'
                            value={formEmployee.last_name}
                            onChange={onChange}
                        />
                        {selectFormStates.map((selectFormState) => {
                            return (
                                <FormControl fullWidth size="small">
                                    <InputLabel>{selectFormState.label}</InputLabel>
                                    <Select
                                        name={selectFormState.id}
                                        value={formEmployee[selectFormState.id]}
                                        label={selectFormState.label}
                                        onChange={(e: SelectChangeEvent) => {
                                            setFormEmployee({
                                                ...formEmployee,
                                                [selectFormState.id]: e.target.value as string
                                            })
                                        }}
                                        size="small"
                                    >
                                        {selectFormState.options.map((option) => {
                                            return (
                                                <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            )
                        })
                        }
                        <FormControl fullWidth size="small">
                            <InputLabel>Amir</InputLabel>
                            <Select
                                name="manager_id"
                                value={formEmployee.manager_id}
                                label="Amir"
                                onChange={(e: SelectChangeEvent) => {
                                    setFormEmployee({
                                        ...formEmployee,
                                        manager_id: e.target.value as string
                                    })
                                }}
                                size="small"
                            >
                                {props.employees.map((option) => {
                                    return (
                                        <MenuItem key={option.id} value={option.id}>{option.first_name + " " + option.last_name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
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

export default AddEmployeeView
