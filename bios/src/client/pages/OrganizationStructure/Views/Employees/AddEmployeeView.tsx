import React, { Fragment, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Form from '../ViewForm/Form';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import { Toast } from '../../../../components/Toast';
import OrganizationStructureEmployee from '../../../../../server/hooks/organizationStructureEmployee/main';
import { Services, useGetMe } from '@realmocean/sdk';
import { Spinner, VStack, nanoid } from '@tuval/forms';
import AppInfo from '../../../../../AppInfo';
import Collections from '../../../../../server/core/Collections';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const formState: IOrganizationStructure.IEmployees.ICreateEmployee = {
    id: "",
    first_name: "",
    last_name: "",
    title_id: "",
    position_id: "",
    department_id: "",
    line_id: "",
    manager_id: "",
    job_start_date: new Date().toUTCString(),
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
        if (props.employees.find((employee) => employee.id === formEmployee.id)) {
            Toast.fire({
                icon: 'error',
                title: 'Bu sicil numarası zaten kullanımda.'
            })
            return;
        }

        const employeeNanoId: string = nanoid();
        createEmployee({
            documentId: employeeNanoId,
            data: {
                ...formEmployee,
                tenant_id: me?.prefs?.organization
            }
        }, () => {
            Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureEmployeeLog, nanoid(), {
                employee_id: employeeNanoId,
                employee_name: formEmployee.first_name + " " + formEmployee.last_name,
                log_date: new Date().toISOString(),
                log_type: "create",
                department_id: formEmployee.department_id,
                department_name: props.departments.find((department) => department.id === formEmployee.department_id)?.name,
                title_id: formEmployee.title_id,
                title_name: props.titles.find((title) => title.id === formEmployee.title_id)?.name,
                position_id: formEmployee.position_id,
                position_name: props.positions.find((position) => position.id === formEmployee.position_id)?.name,
                line_id: formEmployee.line_id,
                line_name: props.lines.find((line) => line.id === formEmployee.line_id)?.name,
                manager_id: formEmployee.manager_id,
                manager_name: formEmployee.manager_id ?
                    props.employees.find((employee) => employee.id === formEmployee.manager_id)?.first_name + " "
                    + props.employees.find((employee) => employee.id === formEmployee.manager_id)?.last_name : "",
                tenant_id: me?.prefs?.organization
            }).then(() => {
                Toast.fire({
                    icon: 'success',
                    title: 'Personel başarıyla eklendi.'
                })
                onReset();
            })
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
                            name='id'
                            size='small'
                            label='Sicil No'
                            value={formEmployee.id}
                            onChange={onChange}
                            required
                        />
                        <TextField
                            name='first_name'
                            size='small'
                            label='İsim'
                            value={formEmployee.first_name}
                            onChange={onChange}
                            required
                        />
                        <TextField
                            name='last_name'
                            size='small'
                            label='Soyisim'
                            value={formEmployee.last_name}
                            onChange={onChange}
                            required
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="İşe Başlama Tarihi"
                                format="DD/MM/YYYY"
                                slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                onChange={(e: any) => {
                                    setFormEmployee({
                                        ...formEmployee,
                                        job_start_date: e.$d.toString().split("GMT")[0] + "GMT+0000 (GMT+00:00)"
                                    })
                                }} />
                        </LocalizationProvider>
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
