import React, { useState } from 'react';
import Form from '../ViewForm/Form';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import { Toast } from '../../../../components/Toast';
import OrganizationStructureEmployee from '../../../../../server/hooks/organizationStructureEmployee/main';
import AppInfo from '../../../../../AppInfo';


const formEmployeeState: IOrganizationStructure.IEmployees.IEmployee = {
    id: "",
    first_name: "",
    last_name: "",
    title_id: "",
    position_id: "",
    department_id: "",
    line_id: "",
    manager_id: "",
    is_active: true,
    is_deleted: false,
    realm_id: "",
    tenant_id: ""
}

const EditEmployeeView = (
    props:
        {
            selectedEmployee: IOrganizationStructure.IEmployees.IEmployee,
            active: boolean,
            setActive: React.Dispatch<React.SetStateAction<boolean>>,
            setDefaultPage: React.Dispatch<React.SetStateAction<string>>,
            titles: IOrganizationStructure.ITitles.ITitle[],
            positions: IOrganizationStructure.IPositions.IPosition[],
            departments: IOrganizationStructure.IDepartments.IDepartment[],
            lines: IOrganizationStructure.ILines.ILine[],
            employees: IOrganizationStructure.IEmployees.IEmployee[]
        }
): JSX.Element => {
    const { updateEmployee, updateError, updateIsError, updateIsLoading, updateIsSuccess } = OrganizationStructureEmployee.Update();

    const [formEmployee, setFormEmployee] = useState(props.selectedEmployee);
    const [isActive, setIsActive] = useState(props.selectedEmployee.is_active);


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
    ]

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateEmployee({
            databaseId: AppInfo.Database,
            collectionId: "organization_employee",
            documentId: formEmployee.id,
            data: formEmployee,
        }, () => {
            Toast.fire({
                icon: "success",
                title: "Personel başarıyla güncellendi"
            })
            onReset()
        })
        if (!updateIsLoading && updateIsError) {
            Toast.fire({
                icon: "error",
                title: "Personel güncellenirken bir hata oluştu"
            })
            onReset()
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormEmployee({ ...formEmployee, [e.target.name]: e.target.value });
    }

    const onReset = () => {
        setFormEmployee(formEmployeeState);
        props.setDefaultPage("");
        props.setActive(true);
    }

    const onDelete = () => {
        Swal.fire({
            title: 'Emin misiniz?',
            text: "Bu işlem geri alınamaz!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Evet, sil!',
            cancelButtonText: "Hayır"
        }).then((result) => {
            if (result.isConfirmed) {
                updateEmployee({
                    databaseId: AppInfo.Database,
                    collectionId: "organization_employee",
                    documentId: formEmployee.id,
                    data: {
                        ...formEmployee,
                        is_deleted: true
                    },
                }, () => {
                    Toast.fire({
                        icon: "success",
                        title: "Personel başarıyla silindi"
                    })
                    onReset()
                })
                if (!updateIsLoading && updateIsError) {
                    Toast.fire({
                        icon: "error",
                        title: "Personel silinirken bir hata oluştu"
                    })
                    onReset()
                }
            }
        })
    }

    return (
        <Form
            title='Tanımlı Personel Düzenle'
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
                            {props.employees.filter(x => x.id != props.selectedEmployee.id).map((option) => {
                                return (
                                    <MenuItem key={option.id} value={option.id}>{option.first_name + " " + option.last_name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        sx={{ width: "100%", alignContent: "end" }}
                        onChange={(e: any) => setFormEmployee({ ...formEmployee, is_active: e.target.checked })}
                        value={formEmployee.is_active}
                        control={<Switch color="primary" checked={formEmployee.is_active} />}
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

export default EditEmployeeView