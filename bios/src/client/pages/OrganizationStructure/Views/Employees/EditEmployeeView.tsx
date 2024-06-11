import React, { useEffect, useState } from 'react';
import Form from '../ViewForm/Form';
import { Autocomplete, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Switch, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import { Toast } from '../../../../components/Toast';
import OrganizationStructureEmployee from '../../../../../server/hooks/organizationStructureEmployee/main';
import AppInfo from '../../../../../AppInfo';
import removeDollarProperties from '../../../../assets/Functions/removeDollarProperties';
import { Services, useDeleteCache, useGetMe } from '@realmocean/sdk';
import Collections from '../../../../../server/core/Collections';
import { nanoid, useNavigate, useParams } from '@tuval/forms';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import VocationalQualificationType from '../../../../../server/hooks/vocationalQualificationType/main';
import VocationalQualification from '../../../../../server/hooks/vocationalQualification/main';
import OrganizationEmployeeDocument from '../../../../../server/hooks/organizationEmployeeDocument/main';
import { Resources } from '../../../../assets/Resources';
import { GridColDef, trTR } from '@mui/x-data-grid';
import StyledDataGrid from '../../../../components/StyledDataGrid';


const formEmployeeState: IOrganizationStructure.IEmployees.IEmployee = {
    id: "",
    first_name: "",
    last_name: "",
    title_id: "",
    position_id: "",
    department_id: "",
    job_start_date: "",
    line_id: "",
    manager_id: "",
    birth_date: "",
    gender: "",
    department_start_date: "",
    position_start_date: "",
    phone: "",
    is_active: true,
    is_deleted: false,
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

    const { deleteCache } = useDeleteCache(AppInfo.Name);

    const [formEmployee, setFormEmployee] = useState(props.selectedEmployee);
    const [isActive, setIsActive] = useState(props.selectedEmployee.is_active);

    const { me } = useGetMe("console");
    const [page, setPage] = useState<string>("addEmployee")
    const [showValidityPeriod, setShowValidityPeriod] = useState<boolean>(false)

    const [formDocument, setFormDocument] = useState<IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate>(resetFormDocument)

    const { documentTypeGetList, isLoading: isLoadingDocumentType } = VocationalQualificationType.GetList(me?.prefs?.organization)
    const { documentGetList, isLoading: isLoadingDocument } = VocationalQualification.GetList(me?.prefs?.organization)

    const { createOrganizationEmployeeDocument, error: createDocumentError } = OrganizationEmployeeDocument.Create()
    const { organizationEmployeeDocumentList } = OrganizationEmployeeDocument.GetList(me?.prefs?.organization)
    const [organizationEmployeeDocuments, setOrganizationEmployeeDocuments] = useState([]);
    const [isLoadingDocumentList, setIsLoadingDocumentList] = useState(true);

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

        if (props.employees.find(x => x.$id != formEmployee.$id && x.id === formEmployee.id)) {
            Toast.fire({
                icon: "error",
                title: "Bu sicil numarası zaten kullanılıyor. Lütfen farklı bir sicil numarası girin."
            })
            return;
        }

        updateEmployee({
            databaseId: AppInfo.Database,
            collectionId: "organization_employee",
            documentId: formEmployee.$id,
            data: removeDollarProperties(formEmployee),
        }, () => {
            Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureEmployeeLog, nanoid(), {
                employee_id: formEmployee.$id,
                employee_name: formEmployee.first_name + " " + formEmployee.last_name,
                log_date: new Date().toISOString(),
                log_type: props.selectedEmployee.is_active ? formEmployee.is_active ? "update" : "deactivate" : formEmployee.is_active ? "activate" : "update",
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
                tenant_id: formEmployee.tenant_id,
                job_start_date: formEmployee.job_start_date
            }).then(() => {
                Toast.fire({
                    icon: "success",
                    title: "Personel başarıyla güncellendi"
                })
                onReset();
            })
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
                    documentId: formEmployee.$id,
                    data: {
                        ...removeDollarProperties(formEmployee),
                        is_deleted: true
                    },
                }, () => {
                    Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureEmployeeLog, nanoid(), {
                        employee_id: formEmployee.$id,
                        employee_name: formEmployee.first_name + " " + formEmployee.last_name,
                        log_date: new Date().toISOString(),
                        log_type: "delete",
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
                        tenant_id: formEmployee.tenant_id,
                        job_start_date: formEmployee.job_start_date
                    }).then(() => {
                        Toast.fire({
                            icon: "success",
                            title: "Personel başarıyla silindi"
                        })
                        onReset()
                    })
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

        createOrganizationEmployeeDocument({
            data: {
                employee_id: formEmployee.$id,
                document_id: formDocument.document_id,
                document_name: formDocument.document_name,
                document_type_id: formDocument.document_type_id,
                document_type_name: formDocument.document_type_name,
                end_date: formDocument.end_date,
                tenant_id: me?.prefs?.organization,
            }
        }, (newDocument) => {

            Toast.fire({
                icon: "success",
                title: "Belge başarıyla eklendi."
            })
            setFormDocument(resetFormDocument)
            setShowValidityPeriod(false);

            setOrganizationEmployeeDocuments(prevList => [...prevList, newDocument])

        })

    }

    const { updateOrganizationEmployeeDocument: updateDocument } = OrganizationEmployeeDocument.Update()

    const resetCurrentRowForm: IOrganizationStructure.IEmployeeVocationalQualificationRelation.IBase = {
        employee_id: "",
        document_id: "",
        document_name: "",
        document_type_id: "",
        document_type_name: "",
        end_date: "",
        tenant_id: "",
        is_active: true,
        is_deleted: false,
    }

    const [open, setOpen] = useState(false)
    const [currentRowData, setCurrentRowData] = useState<IOrganizationStructure.IEmployeeVocationalQualificationRelation.IBase>(resetCurrentRowForm);
    const [id, setId] = useState(null);

    const fetchData = async () => {
        const result = await OrganizationEmployeeDocument.GetList(me?.prefs?.organization)
        setOrganizationEmployeeDocuments(result.organizationEmployeeDocumentList)
    }

    useEffect(() => {
        fetchData()
    }, [])


    const handleOpen = (rowData) => {

        if (rowData.end_date === "") {
            setShowValidityPeriod(false);
        } else {
            setShowValidityPeriod(true);
        }
        setCurrentRowData(rowData);
        setId(rowData.$id)
        setOpen(true);
    };



    const handleSubmit = () => {

        updateDocument(
            {
                databaseId: AppInfo.Database,
                collectionId: 'organization_employee_document',
                documentId: id,
                data: removeDollarProperties(currentRowData),
            },
            () => {
                Toast.fire({
                    icon: 'success',
                    title: 'Belge başarıyla düzenlendi.',
                });
                handleClose();
            }
        );
    };

    const handleDelete = async () => {
        setOpen(false)
        const result = await Swal.fire({
            title: 'Belge Silme',
            text: 'Belgeyi silmek istediğinize emin misiniz?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sil',
            cancelButtonText: 'İptal',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        })

        if (result.isConfirmed) {
            Toast.fire({
                icon: 'info',
                title: 'Belge siliniyor...',
                timer: 5000,
            })
            await updateDocument(
                {
                    databaseId: AppInfo.Database,
                    collectionId: 'organization_employee_document',
                    documentId: id,
                    data: {
                        ...removeDollarProperties(currentRowData),
                        is_deleted: true,
                    },
                })
            Toast.fire({
                icon: 'success',
                title: 'Belge başarıyla silindi.',
            })
            setOrganizationEmployeeDocuments(prevList => prevList.filter(doc => doc.$id !== id))
            deleteCache()

            handleClose()


        }
    }

    const handleClose = () => {
        setOpen(false);
        setCurrentRowData(resetCurrentRowForm)
        setId(null)
    };

    const handleCurrentRowSelectType = (e: SelectChangeEvent<string>) => {
        const selectedValue = e.target.value;
        const selectedDocumentType = documentGetList.find((type) => type.document_type_id === selectedValue);

        if (selectedDocumentType.document_validity_period === "Süresiz") {
            setShowValidityPeriod(false);
            setCurrentRowData({
                ...currentRowData,
                [e.target.name]: selectedValue,
                document_type_name: selectedDocumentType.document_type_name, end_date: "Süresiz"
            });
        } else {
            setShowValidityPeriod(true);
            setCurrentRowData({
                ...currentRowData,
                [e.target.name]: selectedValue,
                document_type_name: selectedDocumentType.document_type_name
            });
        }
    };
    const handleCurrentRowSelectDocumentName = (e: SelectChangeEvent<string>) => {
        const selectedValue = e.target.value;
        const selectedDocument = documentGetList.find((doc) => doc.document_id === selectedValue);

        setCurrentRowData({
            ...currentRowData,
            [e.target.name]: selectedValue,
            document_name: selectedDocument.document_name
        });

    };

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
        {
            field: "$id",
            headerName: "İşlemler",
            width: 200,
            align: "center",
            renderCell: (params) => {

                return (
                    <div style={{ display: "flex", gap: "10px" }}>
                        <Button onClick={() => handleOpen(params.row)}>Düzenle</Button>

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            title='Tanımlı Belge Düzenleme'
                        >
                            <div style={{ padding: 20, backgroundColor: 'white', margin: 'auto', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', width: "60%" }}>
                                {currentRowData && (
                                    <div>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
                                            <Typography variant='h5' align='center' mb={2}>Tanımlı Belge Düzenleme</Typography>
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Belge Türü</InputLabel>
                                                <Select
                                                    name="document_type_id"
                                                    value={currentRowData.document_type_id}
                                                    label="Belge Türü"
                                                    onChange={handleCurrentRowSelectType}
                                                    size="small"
                                                >
                                                    {documentTypeGetList.map((document_type) => (
                                                        <MenuItem
                                                            value={document_type.document_type_id}
                                                            key={document_type.document_type_id}
                                                        >
                                                            {document_type.document_type_name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            {currentRowData.document_type_id &&
                                                <FormControl fullWidth size="small">
                                                    <InputLabel>Belge Adı</InputLabel>
                                                    <Select
                                                        name="document_id"
                                                        value={currentRowData.document_id}
                                                        label="Belge Türü"
                                                        onChange={handleCurrentRowSelectDocumentName}
                                                        size="small"
                                                    >
                                                        {documentGetList.filter((d) => d.document_type_id === currentRowData.document_type_id).map((document) => (
                                                            <MenuItem
                                                                value={document.document_id}
                                                                key={document.document_id}
                                                            >
                                                                {document.document_name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            }
                                            {showValidityPeriod && (
                                                <div style={{ display: "flex", gap: "10px", }}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker label="Belge Bitiş Tarihi"
                                                            format="DD/MM/YYYY"
                                                            value={dayjs(currentRowData.end_date)}
                                                            slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                            onChange={(e: any) => {
                                                                setCurrentRowData({ ...currentRowData, end_date: e.$d });
                                                            }} />
                                                    </LocalizationProvider>
                                                </div>
                                            )}

                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                gap: '10px',
                                                flexDirection: 'column',
                                                marginTop: '10px',
                                            }}
                                        >
                                            <Button
                                                onClick={handleSubmit}
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                            >
                                                Güncelle
                                            </Button>

                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                onClick={handleDelete}
                                            >
                                                Sil
                                            </Button>

                                            <Button
                                                variant="contained"
                                                color="info"
                                                size="small"
                                                onClick={handleClose}
                                            >
                                                İptal
                                            </Button>
                                        </div>
                                    </div>
                                )}

                            </div>

                        </Modal>
                    </div>
                )
            }
        }
    ]

    return (
        <div>
            <div>
                <Button onClick={() => setPage("addEmployee")}>Personel Bilgileri</Button>
                <Button onClick={() => {
                    setPage("addEmployeeVQ")
                    setOrganizationEmployeeDocuments(organizationEmployeeDocumentList)
                }}>Belge ve Sertifikalar</Button>
            </div>
            <Form
                title='Tanımlı Personel Bilgilerini Düzenle'
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
                                    value={dayjs(formEmployee.job_start_date)}
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
                                    value={dayjs(formEmployee.birth_date)}
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
                            {selectFormStates.map((selectFormState) => (
                                <div key={selectFormState.id}>
                                    <FormControl fullWidth size="small">
                                        <Autocomplete
                                            options={selectFormState.options}
                                            getOptionLabel={(option) => option.name}
                                            value={selectFormState.options.find((option) => option.id === formEmployee[selectFormState.id]) || null}
                                            onChange={(event, newValue) => {
                                                if (newValue) {
                                                    setFormEmployee({
                                                        ...formEmployee,
                                                        [selectFormState.id]: newValue.id
                                                    });
                                                }
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label={selectFormState.label}
                                                    size="small"
                                                />
                                            )}
                                        />
                                    </FormControl>
                                    {
                                        selectFormState.id === "department_id" && formEmployee.department_id && (
                                            <FormControl fullWidth size="small" sx={{ marginTop: "10px" }}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker label="Departmana Başlama Tarihi"
                                                        format="DD/MM/YYYY"
                                                        value={dayjs(formEmployee.department_start_date)}
                                                        slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                        onChange={(e: any) => {
                                                            setFormEmployee({
                                                                ...formEmployee,
                                                                department_start_date: e.$d.toString().split("GMT")[0] + "GMT+0000 (GMT+00:00)"
                                                            })
                                                        }} />
                                                </LocalizationProvider>
                                            </FormControl>

                                        )
                                    }
                                    {
                                        selectFormState.id === "position_id" && formEmployee.position_id && (
                                            <FormControl fullWidth size="small" sx={{ marginTop: "10px" }}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker label="Pozisyona Başlama Tarihi"
                                                        format="DD/MM/YYYY"
                                                        value={dayjs(formEmployee.position_start_date)}
                                                        slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                        onChange={(e: any) => {
                                                            setFormEmployee({
                                                                ...formEmployee,
                                                                position_start_date: e.$d.toString().split("GMT")[0] + "GMT+0000 (GMT+00:00)"
                                                            })
                                                        }} />
                                                </LocalizationProvider>
                                            </FormControl>

                                        )
                                    }
                                </div>
                            ))}
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
                            <FormControlLabel
                                sx={{ width: "100%", alignContent: "end" }}
                                onChange={(e: any) => setFormEmployee({ ...formEmployee, is_active: e.target.checked })}
                                value={formEmployee.is_active}
                                control={<Switch color="primary" checked={formEmployee.is_active} />}
                                label="Aktif mi?"
                                labelPlacement="start"
                            />
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
                                rows={organizationEmployeeDocuments.filter((x) => x.employee_id === formEmployee.$id)}
                                columns={columns}
                                getRowId={(row) => row.$id}
                                localeText={
                                    trTR.components.MuiDataGrid.defaultProps.localeText
                                }
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
        </div >

    )
}

export default EditEmployeeView