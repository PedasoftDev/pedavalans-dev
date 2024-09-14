import {
  Autocomplete,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Query, Services, useGetMe, useListAccounts } from '@realmocean/sdk';
import {
  cLeading,
  cTop,
  HStack,
  nanoid,
  ReactView,
  Spinner,
  UIController,
  UINavigate,
  UIView,
  UIViewBuilder,
  useNavigate,
  VStack,
} from '@tuval/forms';
import dayjs from 'dayjs';
import React, { Fragment, useEffect, useState } from 'react';
import { BiPlusCircle } from 'react-icons/bi';

import AppInfo from '../../../../../AppInfo';
import Collections from '../../../../../server/core/Collections';
import BucketFiles from '../../../../../server/hooks/bucketFiles/Main';
import OrganizationEmployeeDocument from '../../../../../server/hooks/organizationEmployeeDocument/main';
import OrganizationStructurePosition from '../../../../../server/hooks/organizationStructrePosition/main';
import OrganizationStructureDepartment from '../../../../../server/hooks/organizationStructureDepartment/main';
import OrganizationStructureEmployee from '../../../../../server/hooks/organizationStructureEmployee/main';
import OrganizationStructureEmployeeLog from '../../../../../server/hooks/organizationStructureEmployeeLog/main';
import OrganizationStructureLine from '../../../../../server/hooks/organizationStructureLine/main';
import OrganizationStructureTitle from '../../../../../server/hooks/organizationStructureTitle/main';
import OrganizationStructureWorkPlace from '../../../../../server/hooks/organizationStructureWorkPlace/main';
import PositionRelationDepartments from '../../../../../server/hooks/positionRelationDepartments/Main';
import VocationalQualification from '../../../../../server/hooks/vocationalQualification/main';
import VocationalQualificationType from '../../../../../server/hooks/vocationalQualificationType/main';
import { Resources } from '../../../../assets/Resources';
import StyledDataGrid from '../../../../components/StyledDataGrid';
import { Toast, ToastError, ToastSuccess } from '../../../../components/Toast';
import { Views } from '../../../../components/Views';
import { IOrganizationEmployeeLog } from '../../../../interfaces/IOrganizationEmployeeLog';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import FileUploadButton from '../../Views/EmployeeImageInputFileButton';
import { Form } from '../../Views/Views';
import EmployeeMultipleLines from '../../../../../server/hooks/employeeMultipleLines/Main';

const resetForm: IOrganizationStructure.IEmployees.ICreateEmployee = {
  id: '',
  first_name: '',
  last_name: '',
  job_start_date: '',
  birth_date: '',
  department_id: '',
  department_start_date: '',
  gender: '',
  educational_status: '',
  position_id: '',
  workplace_id: '',
  line_id: '',
  title_id: '',
  manager_id: '',
  phone: '',
  position_start_date: '',
  realm_id: '',
  tenant_id: ''
}

const resetDocumentForm: IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate = {
  id: '',
  document_id: '',
  document_name: '',
  employee_id: '',
  document_type_id: '',
  document_type_name: '',
  tenant_id: '',
  end_date: '',
}

const link: string = Resources.OrganizationStructureTabValues.find((tab) => tab.value === 0)?.link;

export class CreateEmployeeController extends UIController {


  public LoadView(): UIView {

    const { me, isLoading } = useGetMe("console");
    const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization)
    const { employees, isLoadingEmployees } = OrganizationStructureEmployee.GetList(me?.prefs?.organization)
    const { positions, isLoadingPositions } = OrganizationStructurePosition.GetList(me?.prefs?.organization)
    const { workPlaces, isLoadingWorkPlace } = OrganizationStructureWorkPlace.GetList(me?.prefs?.organization)
    const { lines, isLoadingLines } = OrganizationStructureLine.GetList(me?.prefs?.organization)
    const { titles, isLoadingTitles } = OrganizationStructureTitle.GetList(me?.prefs?.organization)
    const { documentTypeGetList, isLoading: isLoadingDocumentType } = VocationalQualificationType.GetList(me?.prefs?.organization)
    const { documentGetList, isLoading: isLoadingDocument } = VocationalQualification.GetList(me?.prefs?.organization)
    const { isLoadingPositionRelationDepartmentsList, positionRelationDepartmentsList } = PositionRelationDepartments.GetList()

    const { createEmployee } = OrganizationStructureEmployee.Create()
    const { createLog } = OrganizationStructureEmployeeLog.Create()

    const { accounts, isLoading: isLoadingAccounts } = useListAccounts([Query.limit(10000)])

    const { createOrganizationEmployeeDocument } = OrganizationEmployeeDocument.Create()

    const { createFilePage } = BucketFiles.Create(AppInfo.Name, "employee_documents_id")

    const { createEmployeeMultipleLines } = EmployeeMultipleLines.Create()

    return (
      isLoading || isLoadingAccounts || isLoadingWorkPlace || isLoadingPositionRelationDepartmentsList || isLoadingDepartments || isLoadingEmployees || isLoadingPositions || isLoadingTitles || isLoadingLines || isLoadingDocument || isLoadingDocumentType ? VStack(Spinner()) :
        me === null ? UINavigate("/login") :
          UIViewBuilder(() => {
            const navigate = useNavigate();

            const [formEmployee, setFormEmployee] = useState<IOrganizationStructure.IEmployees.ICreateEmployee>(resetForm)
            const [documents, setDocuments] = useState<IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate[]>([])
            const [formDocument, setFormDocument] = useState<IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate>({
              ...resetDocumentForm,
              tenant_id: me?.prefs?.organization
            })

            const [multipleLines, setMultipleLines] = useState([])

            const [showValidityPeriod, setShowValidityPeriod] = useState<boolean>(false)

            const [formIsEmployee, setFormIsEmployee] = useState(true)
            const [positionRelationDepartmentsState, setPositionRelationDepartmentsState] = useState<boolean>(false);
            const [lineRelationState, setLineRelationState] = useState<boolean>(false);
            const [workPlaceDefination, setWorkPlaceDefination] = useState<boolean>(false);
            const [multipleLineDefinition, setMultipleLineDefinition] = useState<boolean>(false);

            const [selectedLines, setSelectedLines] = useState<IOrganizationStructure.ILines.ILine[]>([])

            const [file, setFile] = useState(null);

            const handleFileChange = (event) => {
              const uploadedFile = event.target.files[0];
              setFile(uploadedFile);
              console.log('Dosya yüklendi:', uploadedFile);
            };

            const selectFormStates = [
              {
                id: "title_id",
                label: "Ünvanı",
                options: titles
              },
              {
                id: "department_id",
                label: "Bulunduğu Departman",
                options: departments.filter((item) => item.is_active === true)
              },
              {
                id: "position_id",
                label: "Bulunduğu Pozisyon",
                options: positionRelationDepartmentsState ? (positions.filter((item) => positionRelationDepartmentsList.filter((item2) => item2.parent_department_id === formEmployee.department_id).map((item3) => item3.relation_position_id).includes(item.id))) : positions
              }
            ];

            const documentColumns = [
              { field: 'document_type_name', headerName: 'Belge Türü', flex: 1 },
              { field: 'document_name', headerName: 'Belge Adı', flex: 1 },
              {
                field: 'end_date', headerName: 'Bitiş Tarihi', flex: 1,
                valueFormatter: (params) => {
                  let date = '';
                  params.value !== "" ? date = dayjs(params.value).format("DD/MM/YYYY") : date = 'Süresiz';
                  return date;
                }
              },
              {
                field: 'actions', headerName: 'İşlemler', flex: 1,
                renderCell: (params) =>
                  <Button variant='text' onClick={() => {
                    const appendForm = params.row as IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate;
                    setFormDocument(appendForm)
                    setDocuments(documents.filter((document) => document.id !== appendForm.id))
                  }}>
                    Düzenle
                  </Button>
              }
            ];

            const onChange = (e: any) => {
              setFormEmployee({
                ...formEmployee,
                [e.target.name]: e.target.value
              })
            }

            const onSubmit = (e: any) => {
              e.preventDefault();
              if (multipleLineDefinition) {
                const id = nanoid()
                if (formEmployee.first_name === "" || formEmployee.last_name === "" || formEmployee.id === "") {
                  setFormIsEmployee(true)
                  ToastError("Personel bilgileri eksik", "")
                  return;
                } else if (employees.some((document) => document.id == formEmployee.id)) {
                  Toast.fire({
                    icon: "error",
                    title: "Çalışan eklenirken bir hata oluştu!",
                    text: "Çalışan sicil numarası zaten kullanılmaktadır."
                  })
                  return;
                }
                createEmployee({
                  documentId: id,
                  data: {
                    ...formEmployee,
                    line_id: '',
                    tenant_id: me?.prefs?.organization,
                  }
                }, () => {
                  const manager = employees.find((employee) => employee.id === formEmployee.manager_id)
                  const logData: IOrganizationEmployeeLog.Create = {
                    employee_id: id,
                    employee_name: formEmployee.first_name + " " + formEmployee.last_name,
                    log_date: new Date().toString(),
                    log_type: "create",
                    job_start_date: formEmployee.job_start_date,
                    department_id: formEmployee.department_id,
                    department_name: departments.find((department) => department.id === formEmployee.department_id)?.name,
                    position_id: formEmployee.position_id,
                    position_name: positions.find((position) => position.id === formEmployee.position_id)?.name,
                    line_id: formEmployee.line_id,
                    line_name: lines.find((line) => line.id === formEmployee.line_id)?.name,
                    title_id: formEmployee.title_id,
                    title_name: titles.find((title) => title.id === formEmployee.title_id)?.name,
                    manager_id: formEmployee.manager_id,
                    manager_name: manager?.first_name + " " + manager?.last_name,
                    tenant_id: me?.prefs?.organization,
                    is_active: true,
                    is_deleted: false
                  }
                  createLog({
                    documentId: nanoid(),
                    data: logData
                  }, () => {
                    if (documents.length === 0) {
                      Toast.fire({
                        icon: 'success',
                        title: 'Personel başarıyla eklendi'
                      })
                      onReset()
                    } else {
                      Toast.fire({
                        icon: 'info',
                        title: 'Belgeler ekleniyor'
                      })
                      documents.map((document, i) => {
                        delete document.id;
                        createOrganizationEmployeeDocument({
                          documentId: nanoid(),
                          data: {
                            ...document,
                            employee_id: id
                          }
                        }, () => {
                          if (i === documents.length - 1) {
                            Toast.fire({
                              icon: 'success',
                              title: 'Personel başarıyla eklendi'
                            })
                            onReset()
                          }
                        })
                      })
                    }
                  })
                })
                for (const item of multipleLines) {
                  const multipleLinesId = nanoid();
                  const createForm = {
                    id: multipleLinesId,
                    employee_id: id,
                    department_id: formEmployee.department_id,
                    line_id: item.id,
                    line_record_id: item.record_id,
                    line_name: item.name,
                    tenant_id: me?.prefs?.organization,
                    is_active: true,
                    is_deleted: false
                  }
                  createEmployeeMultipleLines({
                    documentId: multipleLinesId,
                    data: createForm
                  })
                }
                createFilePage({
                  bucketId: "employees_image_bucket",
                  fileId: id,
                  file: file,
                  onProgress: (progress) => {
                    console.log('Yükleme durumu:', progress);
                    return {};
                  },
                })
              }
              else {
                const id = nanoid()
                if (formEmployee.first_name === "" || formEmployee.last_name === "" || formEmployee.id === "") {
                  setFormIsEmployee(true)
                  ToastError("Personel bilgileri eksik", "")
                  return;
                } else if (employees.some((document) => document.id == formEmployee.id)) {
                  Toast.fire({
                    icon: "error",
                    title: "Çalışan eklenirken bir hata oluştu!",
                    text: "Çalışan sicil numarası zaten kullanılmaktadır."
                  })
                  return;
                }
                createEmployee({
                  documentId: id,
                  data: {
                    ...formEmployee,
                    tenant_id: me?.prefs?.organization,
                  }
                }, () => {
                  const manager = employees.find((employee) => employee.id === formEmployee.manager_id)
                  const logData: IOrganizationEmployeeLog.Create = {
                    employee_id: id,
                    employee_name: formEmployee.first_name + " " + formEmployee.last_name,
                    log_date: new Date().toString(),
                    log_type: "create",
                    job_start_date: formEmployee.job_start_date,
                    department_id: formEmployee.department_id,
                    department_name: departments.find((department) => department.id === formEmployee.department_id)?.name,
                    position_id: formEmployee.position_id,
                    position_name: positions.find((position) => position.id === formEmployee.position_id)?.name,
                    line_id: formEmployee.line_id,
                    line_name: lines.find((line) => line.id === formEmployee.line_id)?.name,
                    title_id: formEmployee.title_id,
                    title_name: titles.find((title) => title.id === formEmployee.title_id)?.name,
                    manager_id: formEmployee.manager_id,
                    manager_name: manager?.first_name + " " + manager?.last_name,
                    tenant_id: me?.prefs?.organization,
                    is_active: true,
                    is_deleted: false
                  }
                  createLog({
                    documentId: nanoid(),
                    data: logData
                  }, () => {
                    if (documents.length === 0) {
                      Toast.fire({
                        icon: 'success',
                        title: 'Personel başarıyla eklendi'
                      })
                      onReset()
                    } else {
                      Toast.fire({
                        icon: 'info',
                        title: 'Belgeler ekleniyor'
                      })
                      documents.map((document, i) => {
                        delete document.id;
                        createOrganizationEmployeeDocument({
                          documentId: nanoid(),
                          data: {
                            ...document,
                            employee_id: id
                          }
                        }, () => {
                          if (i === documents.length - 1) {
                            Toast.fire({
                              icon: 'success',
                              title: 'Personel başarıyla eklendi'
                            })
                            onReset()
                          }
                        })
                      })
                    }
                  })
                })
                createFilePage({
                  bucketId: "employees_image_bucket",
                  fileId: id,
                  file: file,
                  onProgress: (progress) => {
                    console.log('Yükleme durumu:', progress);
                    return {};
                  },
                })
              }
            }
            const handleSelectType = (event, newValue) => {
              const selectedValue = newValue.document_type_id;
              const selectedDocumentType = documentGetList.find((type) => type.document_type_id === selectedValue);
              setShowValidityPeriod(!(selectedDocumentType.document_validity_period === "Süresiz"));
              setFormDocument({
                ...formDocument,
                document_type_id: selectedValue,
                document_type_name: selectedDocumentType.document_type_name
              });
            };

            const onReset = () => {
              navigate(link + "/list")
            }

            useEffect(() => {
              Services.Databases.listDocuments(
                AppInfo.Name,
                AppInfo.Database,
                Collections.Parameter,
                [
                  Query.equal("name", "position_relation_department"),
                  Query.limit(10000),
                ]
              ).then((res) => {
                setPositionRelationDepartmentsState(res.documents[0]?.is_active)
              }).then(() => {
                Services.Databases.listDocuments(
                  AppInfo.Name,
                  AppInfo.Database,
                  Collections.Parameter,
                  [
                    Query.equal("name", "line_based_competency_relationship"),
                    Query.limit(10000),
                  ]
                ).then((res) => {
                  setLineRelationState(res.documents[0]?.is_active)
                })
              }).then(() => {
                Services.Databases.listDocuments(
                  AppInfo.Database,
                  AppInfo.Database,
                  Collections.Parameter,
                  [
                    Query.equal("name", "work_place_definition"),
                    Query.limit(10000),
                  ]
                ).then((res) => {
                  setWorkPlaceDefination(res.documents[0]?.is_active)
                })
              }).then(() => {
                Services.Databases.listDocuments(
                  AppInfo.Database,
                  AppInfo.Database,
                  Collections.Parameter,
                  [
                    Query.equal("name", "multiple_line_definition"),
                    Query.limit(10000),
                  ]
                ).then((res) => {
                  setMultipleLineDefinition(res.documents[0]?.is_active)
                })
              })
            }, [])

            return (
              VStack({ alignment: cTop })(
                HStack({ alignment: cLeading })(
                  Views.Title("Organizasyon Yapısı").paddingTop("20px")
                ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                VStack({ alignment: cTop })(
                  ReactView(
                    <div style={{ width: "100%", height: "100%" }}>
                      <Form
                        title={formIsEmployee ? 'Yeni Personel Bilgileri Tanımlayın' : 'Yeni Personelin Belgelerini Tanımlayın'}
                        onSubmit={onSubmit}
                        formContent={
                          formIsEmployee ?
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%" }}>
                              <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                <FileUploadButton onFileChange={handleFileChange} />
                                {file && <p>Yüklenen Fotoğraf: {file.name}</p>}
                              </div>
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
                              <FormControl fullWidth size="small">
                                <InputLabel>Eğitim Durumu</InputLabel>
                                <Select
                                  value={formEmployee.educational_status}
                                  label={"Eğitim Durumu"}
                                  onChange={(e: SelectChangeEvent) => {
                                    setFormEmployee({
                                      ...formEmployee,
                                      educational_status: e.target.value as string
                                    })
                                  }}
                                  size="small"
                                >
                                  <MenuItem value="elementary school">İlkokul</MenuItem>
                                  <MenuItem value="secondary school">Ortaokul</MenuItem>
                                  <MenuItem value="high school">Lise</MenuItem>
                                  <MenuItem value="university">Üniversite</MenuItem>
                                </Select>
                              </FormControl>
                              {
                                workPlaceDefination ? (<Autocomplete
                                  options={workPlaces.filter((item) => item.is_active === true)}
                                  value={workPlaces.find(option => option.id === formEmployee.workplace_id) || null}
                                  onChange={(event, newValue) => {
                                    setFormEmployee({
                                      ...formEmployee,
                                      workplace_id: newValue.id
                                    });
                                  }}
                                  getOptionLabel={(option) => option.record_id + " - " + option.name}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Bulunduğu İşyeri"
                                      name="workplace_id"
                                      size="small"
                                    />
                                  )}
                                />) : null
                              }
                              {selectFormStates.map((selectFormState) =>
                                <div key={selectFormState.id}>
                                  <Autocomplete
                                    options={selectFormState.options}
                                    value={selectFormState.options.find(option => option?.id === formEmployee[selectFormState.id]) || null}
                                    onChange={(event, newValue) => {
                                      setFormEmployee({
                                        ...formEmployee,
                                        [selectFormState.id]: newValue ? newValue.id : ''
                                      });
                                    }}
                                    getOptionLabel={
                                      (option) => `${option.record_id} - ${option.name}`
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label={selectFormState.label}
                                        name={selectFormState.id}
                                        size="small"

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
                              )}
                              {lineRelationState ?
                                multipleLineDefinition ? ((
                                  <Autocomplete
                                    options={lines.filter((line) => line.department_id === formEmployee.department_id)}
                                    value={multipleLines}
                                    multiple
                                    onChange={(event, newValue) => {
                                      setMultipleLines(newValue);
                                    }}
                                    getOptionLabel={(option) => option.record_id + " - " + option.name}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Bulunduğu Hat"
                                        name="line_id"
                                        size="small"
                                      />
                                    )}
                                  />
                                ))
                                  : ((
                                    <Autocomplete
                                      options={lines.filter((line) => line.department_id === formEmployee.department_id)}
                                      value={lines.find(option => option.id === formEmployee.line_id) || null}
                                      onChange={(event, newValue) => {
                                        setFormEmployee({
                                          ...formEmployee,
                                          line_id: newValue.id
                                        });
                                      }}
                                      getOptionLabel={(option) => option.record_id + " - " + option.name}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Bulunduğu Hat"
                                          name="line_id"
                                          size="small"
                                        />
                                      )}
                                    />
                                  ))
                                : null
                              }
                              <Autocomplete
                                options={accounts}
                                value={accounts.find(option => option.$id === formEmployee.manager_id) || null}
                                onChange={(event, newValue) => {
                                  setFormEmployee({
                                    ...formEmployee,
                                    manager_id: newValue.$id
                                  });
                                }}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Amir"
                                    name="manager_id"
                                    size="small"
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
                            </div>
                            :
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%" }}>
                              <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                                <Autocomplete
                                  options={documentTypeGetList}
                                  value={formDocument.document_type_id ? documentTypeGetList.find(option => option.$id === formDocument.document_type_id) : null}
                                  onChange={handleSelectType}
                                  getOptionLabel={(option) => option.document_type_name}
                                  renderInput={(params) =>
                                    <TextField
                                      {...params}
                                      label="Belge Türü"
                                      size="small"

                                    />
                                  }
                                  fullWidth
                                />
                                <Autocomplete
                                  options={documentGetList.filter((d) => d.document_type_id === formDocument.document_type_id)}
                                  value={formDocument.document_id ? documentGetList.find(option => option.$id === formDocument.document_id) : null}
                                  onChange={(event, newValue) => {
                                    setFormDocument({
                                      ...formDocument,
                                      document_id: newValue.document_id,
                                      document_name: newValue.document_name
                                    });
                                  }}
                                  getOptionLabel={(option) => option.document_name}
                                  renderInput={(params) =>
                                    <TextField
                                      {...params}
                                      label="Belge Adı"
                                      size="small"

                                    />
                                  }
                                  fullWidth
                                />
                                {showValidityPeriod &&
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Bitiş Tarihi"
                                      format="DD/MM/YYYY"
                                      value={dayjs(formDocument.end_date)}
                                      slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                      onChange={(e: any) => {
                                        setFormDocument({
                                          ...formDocument,
                                          end_date: e.$d.toString().split("GMT")[0] + "GMT+0000 (GMT+00:00)"
                                        })
                                      }}
                                    />
                                  </LocalizationProvider>}
                                <IconButton
                                  size='small'
                                  onClick={() => {
                                    if (formDocument.document_id === "" || formDocument.document_type_id === "") {
                                      ToastError("Belge türü ve belge adı seçiniz", "")
                                    } else if (showValidityPeriod && formDocument.end_date === "") {
                                      ToastError("Bitiş tarihi seçiniz", "")
                                    } else {
                                      setDocuments([...documents, { ...formDocument, id: nanoid() }])
                                      setFormDocument({ ...resetDocumentForm, tenant_id: me?.prefs?.organization })
                                      ToastSuccess("Belge başarıyla eklendi", "")
                                    }
                                  }}>
                                  <BiPlusCircle size={25} />
                                </IconButton>
                              </div>
                              <div style={{
                                height: "calc(100vh - 310px)"
                              }}>
                                <StyledDataGrid columns={documentColumns}
                                  rows={documents}
                                />
                              </div>
                            </div>
                        }

                        buttons={formIsEmployee ? [
                          {
                            text: "Kaydet",
                            color: "primary",
                            type: "submit"
                          },
                          {
                            text: "Belgeler",
                            color: "info",
                            type: "button",
                            onClick: () => {
                              setFormIsEmployee(false)
                            }
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
                              text: "Kaydet",
                              color: "primary",
                              type: "submit"
                            },
                            {
                              text: "Personel Bilgileri",
                              color: "info",
                              type: "button",
                              onClick: () => {
                                setFormIsEmployee(true)
                              }
                            },
                            {
                              text: "İptal",
                              color: "error",
                              type: "button",
                              onClick: onReset
                            }
                          ]
                        }
                      />
                    </div>
                  )
                ).paddingTop("10px")
              ).padding("0 10px 0 20px")
            )
          })
    )
  }
}