import React, { Fragment, MouseEventHandler, useState } from 'react';
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
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
import IVocationalQualification from '../../../../interfaces/IVocationalQualification';
import VocationalQualificationType from '../../../../../server/hooks/vocationalQualificationType/main';
import VocationalQualification from '../../../../../server/hooks/vocationalQualification/main';
import OrganizationEmployeeDocument from '../../../../../server/hooks/organizationEmployeeDocument/main';
import dayjs from 'dayjs';
import StyledDataGrid from '../../../../components/StyledDataGrid';
import { GridColDef, trTR } from '@mui/x-data-grid';
import { Resources } from '../../../../assets/Resources';

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
    birth_date: "",
    gender: "",
    department_start_date: "",
    position_start_date: "",
    phone: "",
    realm_id: "",
    tenant_id: ""
}

const resetFormDocument: IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate = {
    employee_id: "",
    document_id: "",
    document_name: "",
    document_type_id: "",
    document_type_name: "",
    end_date: "",
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
            documents: IVocationalQualification.IBase[]
        }
): JSX.Element => {
    const { me, isLoading } = useGetMe("console");
    const { createEmployee, createError, createIsError, createIsLoading, createIsSuccess } = OrganizationStructureEmployee.Create()

    const [formEmployee, setFormEmployee] = useState(formState);

    const [page, setPage] = useState<string>("addEmployee")
    const [formDocument, setFormDocument] = useState<IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate>(resetFormDocument)
    const [document, setDocument] = useState<IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate[]>([])

    const [showValidityPeriod, setShowValidityPeriod] = useState<boolean>(false)

    const { createOrganizationEmployeeDocument, error: createDocumentError } = OrganizationEmployeeDocument.Create()
    const { documentTypeGetList, isLoading: isLoadingDocumentType } = VocationalQualificationType.GetList(me?.prefs?.organization)
    const { documentGetList, isLoading: isLoadingDocument } = VocationalQualification.GetList(me?.prefs?.organization)


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
        }, (res) => {
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
                tenant_id: me?.prefs?.organization,
                job_start_date: formEmployee.job_start_date
            }).then(() => {
                if (document.length != 0) {
                    document.forEach((doc, i) => {
                        createOrganizationEmployeeDocument({
                            data: {
                                employee_id: res.$id,
                                document_id: doc.document_id,
                                document_name: doc.document_name,
                                document_type_id: doc.document_type_id,
                                document_type_name: doc.document_type_name,
                                end_date: doc.end_date,
                                tenant_id: me?.prefs?.organization,
                            }
                        }, () => {
                            if (document.length - 1 === i) {
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Personel Bilgileri başarıyla eklendi.'
                                })
                                onReset();
                            }
                        })
                    })
                } else {
                    Toast.fire({
                        icon: 'success',
                        title: 'Personel Bilgileri başarıyla eklendi.'
                    })
                    onReset();
                }
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

    const handleSelectType = (event, newValue) => {
        const selectedValue = newValue.document_type_id;
        const selectedDocumentType = documentGetList.find((type) => type.document_type_id === selectedValue);

        if (selectedDocumentType.document_validity_period === "Süresiz") {
            setShowValidityPeriod(false);
            setFormDocument({
                ...formDocument,
                document_type_id: selectedValue,
                document_type_name: selectedDocumentType.document_type_name
            });
        } else {
            setShowValidityPeriod(true);
            setFormDocument({
                ...formDocument,
                document_type_id: selectedValue,
                document_type_name: selectedDocumentType.document_type_name
            });
        }
    };

    const handleSelectDocumentName = (e: SelectChangeEvent<string>) => {
        const selectedValue = e.target.value;
        const selectedDocument = documentGetList.find((doc) => doc.document_id === selectedValue);

        setFormDocument({
            ...formDocument,
            [e.target.name]: selectedValue,
            document_name: selectedDocument.document_name
        });

    };

    const isDocumentFull = () => {
        return formDocument.document_type_id && formDocument.document_id
    }

    const handleDocument = () => {
        if (!isDocumentFull()) {
            Toast.fire({
                icon: 'error',
                title: 'Boş belge eklenemez.',
                text: createDocumentError?.message
            })
            return
        }
        setDocument([...document, { ...formDocument }])
        setFormDocument(resetFormDocument)
        setShowValidityPeriod(false);
    }

    const [rowsActive, setRowsActive] = useState(true)
    const [filterKey, setFilterKey] = useState('')

    const columns: GridColDef[] = [
        {
            field: 'document_type_name',
            headerName: 'Belge Türü',
            flex: 1,

        },
        {
            field: 'document_name',
            headerName: 'Belge Adı',
            flex: 1,
        },
        {
            field: 'end_date',
            headerName: 'Belgenin Bitiş Tarihi',
            width: 200,
            align: "center",
            valueGetter: (params: any) => {
                if (params.value === "") {
                    return params.value = "Süresiz"
                } else {
                    return Resources.Functions.formatDate(params.value);
                }
            }
        },
    ]




    return (
        isLoading ?
            <Fragment>
                {VStack(Spinner()).render()}
            </Fragment>
            :
            <div>
                <div>
                    <Button onClick={() => setPage("addEmployee")}>Personel Bilgileri</Button>
                    <Button onClick={() => setPage("addEmployeeVQ")}>Belge ve Sertifikalar</Button>
                </div>
                <Form
                    title='Yeni Personel Bilgileri Tanımlayın'
                    onSubmit={onSubmit}
                    formContent={
                        page === "addEmployee" ?
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%", height: "60vh", overflowY: "auto", padding: "10px 8px 10px 0" }}>
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
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Doğum Tarihi"
                                        format="DD/MM/YYYY"
                                        slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                        onChange={(e: any) => {
                                            setFormEmployee({
                                                ...formEmployee,
                                                birth_date: e.$d.toString().split("GMT")[0] + "GMT+0000 (GMT+00:00)"
                                            })
                                        }} />
                                </LocalizationProvider>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Cinsiyet</InputLabel>
                                    <Select
                                        value={formEmployee.gender}
                                        label={"Cinsiyet"}
                                        onChange={(e: SelectChangeEvent) => {
                                            setFormEmployee({
                                                ...formEmployee,
                                                gender: e.target.value as string
                                            })
                                        }}
                                        size="small"
                                    >
                                        <MenuItem value="male">Erkek</MenuItem>
                                        <MenuItem value="female">Kadın</MenuItem>
                                    </Select>
                                </FormControl>
                                {selectFormStates.map((selectFormState) =>
                                    <div key={selectFormState.id}>
                                        <Autocomplete
                                            options={selectFormState.options}
                                            value={selectFormState.options.find(option => option.id === formEmployee[selectFormState.id]) || null}
                                            onChange={(event, newValue) => {
                                                setFormEmployee({
                                                    ...formEmployee,
                                                    [selectFormState.id]: newValue ? newValue.id : ''
                                                });
                                            }}
                                            getOptionLabel={(option) => option.name}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label={selectFormState.label}
                                                    name={selectFormState.id}
                                                    size="small"
                                                    required
                                                />
                                            )}
                                        />
                                        {selectFormState.id === "department_id" && formEmployee.department_id && (
                                            <FormControl fullWidth size="small" sx={{ marginTop: "10px" }}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker label="Departmana Başlama Tarihi"
                                                        format="DD/MM/YYYY"
                                                        slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                        onChange={(e: any) => {
                                                            setFormEmployee({
                                                                ...formEmployee,
                                                                department_start_date: e.$d.toString().split("GMT")[0] + "GMT+0000 (GMT+00:00)"
                                                            })
                                                        }} />
                                                </LocalizationProvider>
                                            </FormControl>

                                        )}
                                        {selectFormState.id === "position_id" && formEmployee.position_id && (
                                            <FormControl fullWidth size="small" sx={{ marginTop: "10px" }}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker label="Pozisyona Başlama Tarihi"
                                                        format="DD/MM/YYYY"
                                                        slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                        onChange={(e: any) => {
                                                            setFormEmployee({
                                                                ...formEmployee,
                                                                position_start_date: e.$d.toString().split("GMT")[0] + "GMT+0000 (GMT+00:00)"
                                                            })
                                                        }} />
                                                </LocalizationProvider>
                                            </FormControl>

                                        )}
                                    </div>
                                )
                                }
                                <Autocomplete
                                    options={props.employees}
                                    value={props.employees.find(option => option.id === formEmployee.manager_id) || null}
                                    onChange={(event, newValue) => {
                                        setFormEmployee({
                                            ...formEmployee,
                                            manager_id: newValue ? newValue.id : ''
                                        });
                                    }}
                                    getOptionLabel={(option) => option.first_name + " " + option.last_name}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Amir"
                                            name="manager_id"
                                            size="small"
                                            required
                                        />
                                    )}
                                />
                                <FormControl fullWidth size="small">
                                    <TextField
                                        name='phone'
                                        size='small'
                                        label='Telefon Numarası'
                                        value={formEmployee.phone}
                                        onChange={(e) => {
                                            let enteredValue = e.target.value;
                                            if (!enteredValue.startsWith("+")) {
                                                enteredValue = "+" + enteredValue
                                            }
                                            if (/^\+?\d{0,15}$/.test(enteredValue)) {
                                                setFormEmployee({ ...formEmployee, [e.target.name]: enteredValue });
                                            }
                                        }
                                        }
                                    />
                                </FormControl>
                            </div> :
                            page === "addEmployeeVQ" &&
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%" }}>
                                <Autocomplete
                                    options={documentTypeGetList}
                                    getOptionLabel={(option) => option.document_type_name}
                                    value={documentTypeGetList.find(option => option.document_type_id === formDocument.document_type_id) || null}
                                    onChange={(event, newValue) => handleSelectType(event, newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Belge Türü"
                                            name="document_type_id"
                                            size="small"
                                            required
                                        />
                                    )}
                                />
                                {formDocument.document_type_id &&
                                    <Autocomplete
                                        options={documentGetList.filter((d) => d.document_type_id === formDocument.document_type_id)}
                                        getOptionLabel={(option) => option.document_name}
                                        value={documentGetList.find((doc) => doc.document_id === formDocument.document_id) || null}
                                        onChange={(event, newValue) => {
                                            if (newValue) {
                                                setFormDocument({
                                                    ...formDocument,
                                                    document_id: newValue.document_id,
                                                    document_name: newValue.document_name
                                                });
                                            }
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Belge Adı"
                                                size="small"
                                            />
                                        )}
                                        fullWidth
                                    />
                                }
                                {showValidityPeriod && (
                                    <div style={{ display: "flex", gap: "10px", }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker label="Belge Bitiş Tarihi"
                                                format="DD/MM/YYYY"
                                                value={dayjs(formDocument.end_date)}
                                                slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                onChange={(e: any) => {
                                                    setFormDocument({ ...formDocument, end_date: e.$d });
                                                }} />
                                        </LocalizationProvider>
                                    </div>
                                )}
                                <Button
                                    onClick={handleDocument}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                >
                                    Belge Ekle
                                </Button>

                                <StyledDataGrid
                                    rows={
                                        document
                                            ? document
                                                .filter(
                                                    (item) =>
                                                        item.document_name
                                                            .toLowerCase()
                                                            .indexOf(filterKey.toLowerCase()) > -1
                                                )
                                            : []
                                    }
                                    columns={columns}
                                    getRowId={(row) => row.document_id}
                                    localeText={
                                        trTR.components.MuiDataGrid.defaultProps.localeText
                                    }
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
            </div>
    )
}

export default AddEmployeeView
