import React, { useState } from 'react';
import Form from '../ViewForm/Form';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Switch, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import { Toast } from '../../../../components/Toast';
import OrganizationStructureEmployee from '../../../../../server/hooks/organizationStructureEmployee/main';
import AppInfo from '../../../../../AppInfo';
import removeDollarProperties from '../../../../assets/Functions/removeDollarProperties';
import { Services, useGetMe } from '@realmocean/sdk';
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

    const [formEmployee, setFormEmployee] = useState(props.selectedEmployee);
    const [isActive, setIsActive] = useState(props.selectedEmployee.is_active);

    const navigate = useNavigate()
    const { me } = useGetMe("console");
    const [page, setPage] = useState<string>("addEmployee")
    const [showValidityPeriod, setShowValidityPeriod] = useState<boolean>(false)

    const [formDocument, setFormDocument] = useState<IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate>(resetFormDocument)
    const [document, setDocument] = useState<IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate[]>([])

    const { documentTypeGetList, isLoading: isLoadingDocumentType } = VocationalQualificationType.GetList(me?.prefs?.organization)
    const { documentGetList, isLoading: isLoadingDocument } = VocationalQualification.GetList(me?.prefs?.organization)

    const { updateOrganizationEmployeeDocument } = OrganizationEmployeeDocument.Update()
    const { createOrganizationEmployeeDocument } = OrganizationEmployeeDocument.Create()
    const { organizationEmployeeDocumentList, isLoading: isLoadingDocumentList } = OrganizationEmployeeDocument.GetList(me?.prefs?.organization)


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
        }, (res) => {
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

    const handleSelectType = (e: SelectChangeEvent<string>) => {
        const selectedValue = e.target.value;
        const selectedDocumentType = documentGetList.find((type) => type.document_type_id === selectedValue);

        if (selectedDocumentType.document_validity_period === "Süresiz") {
            setShowValidityPeriod(false);
            setFormDocument({
                ...formDocument,
                [e.target.name]: selectedValue,
                document_type_name: selectedDocumentType.document_type_name
            });
        } else {
            setShowValidityPeriod(true);
            setFormDocument({
                ...formDocument,
                [e.target.name]: selectedValue,
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

    const handleDocument = () => {

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
        }, () => {

            Toast.fire({
                icon: "success",
                title: "Belge başarıyla eklendi."
            })
            setFormDocument(resetFormDocument)
            setShowValidityPeriod(false);

        })

    }

    const { updateOrganizationEmployeeDocument: updateDocument } = OrganizationEmployeeDocument.Update()

    const [filterKey, setFilterKey] = useState('')

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

    const handleOpen = (rowData) => {

        if (rowData.end_date === "") {
            setShowValidityPeriod(false);
        } else {
            setShowValidityPeriod(true);
        }
        console.log("RowData: ", rowData);
        setCurrentRowData(rowData);
        setId(rowData.$id)
        setOpen(true);
        console.log("Fonskiyon İçi:" + id);
    };
    console.log("Fonskiyon dışı:" + id);



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

    const handleDelete = () => {
        setOpen(false)
        Swal.fire({
            title: 'Belge Silme',
            text: 'Belgeyi silmek istediğinize emin misiniz?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sil',
            cancelButtonText: 'İptal',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then((result) => {
            if (result.isConfirmed) {
                Toast.fire({
                    icon: 'info',
                    title: 'Belge siliniyor...',
                    timer: 5000,
                })
                updateDocument(
                    {
                        databaseId: AppInfo.Database,
                        collectionId: 'organization_employee_document',
                        documentId: id,
                        data: {
                            ...removeDollarProperties(currentRowData),
                            is_deleted: true,
                        },
                    },
                    () => {
                        Toast.fire({
                            icon: 'success',
                            title: 'Belge başarıyla silindi.',
                        })
                        handleClose()
                    }
                )
            }
        })
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
                        >
                            <div style={{ padding: 20, backgroundColor: 'white', margin: 'auto', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', width: "60%" }}>
                                {currentRowData && (
                                    <div>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
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

    const boxStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <div>
                <Button onClick={() => setPage("addEmployee")}>Personel Bilgileri</Button>
                <Button onClick={() => setPage("addEmployeeVQ")}>Belge ve Sertifikalar</Button>
            </div>
            <Form
                title='Tanımlı Personel Düzenle'
                onSubmit={onSubmit}
                formContent={
                    page === "addEmployee" ?
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
                            <FormControl fullWidth size="small">
                                <InputLabel>Belge Türü</InputLabel>
                                <Select
                                    name="document_type_id"
                                    value={formDocument.document_type_id}
                                    label="Belge Türü"
                                    onChange={handleSelectType}
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
                            {formDocument.document_type_id &&
                                <FormControl fullWidth size="small">
                                    <InputLabel>Belge Adı</InputLabel>
                                    <Select
                                        name="document_id"
                                        value={formDocument.document_id}
                                        label="Belge Türü"
                                        onChange={handleSelectDocumentName}
                                        size="small"
                                    >
                                        {documentGetList.filter((d) => d.document_type_id === formDocument.document_type_id).map((document) => (
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
                                rows={organizationEmployeeDocumentList.filter((x) => x.employee_id === formEmployee.$id)}
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
        </div>

    )
}

export default EditEmployeeView