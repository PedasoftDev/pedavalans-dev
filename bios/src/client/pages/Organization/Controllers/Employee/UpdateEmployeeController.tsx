import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DialogContainer, HStack, ReactView, Spinner, UIController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, nanoid, useNavigate, useParams } from '@tuval/forms';
import { useGetMe } from '@realmocean/sdk'
import { Views } from '../../../../components/Views'
import AccountRelation from '../../../../../server/hooks/accountRelation/main'
import OrganizationStructureDepartment from '../../../../../server/hooks/organizationStructureDepartment/main'
import OrganizationStructureEmployee from '../../../../../server/hooks/organizationStructureEmployee/main'
import OrganizationStructurePosition from '../../../../../server/hooks/organizationStructrePosition/main'
import OrganizationStructureLine from '../../../../../server/hooks/organizationStructureLine/main'
import { Form } from '../../Views/Views'
import OrganizationStructureTitle from '../../../../../server/hooks/organizationStructureTitle/main'
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Toast, ToastError, ToastSuccess } from '../../../../components/Toast';
import OrganizationStructureEmployeeLog from '../../../../../server/hooks/organizationStructureEmployeeLog/main';
import OrganizationEmployeeDocument from '../../../../../server/hooks/organizationEmployeeDocument/main';
import VocationalQualificationType from '../../../../../server/hooks/vocationalQualificationType/main';
import VocationalQualification from '../../../../../server/hooks/vocationalQualification/main';
import dayjs from 'dayjs';
import { BiPlusCircle } from 'react-icons/bi';
import StyledDataGrid from '../../../../components/StyledDataGrid';
import { Resources } from '../../../../assets/Resources';
import removeDollarProperties from '../../../../assets/Functions/removeDollarProperties';
import AppInfo from '../../../../../AppInfo';
import Collections from '../../../../../server/core/Collections';

const resetForm: IOrganizationStructure.IEmployees.IEmployee = {
  id: '',
  first_name: '',
  last_name: '',
  job_start_date: '',
  birth_date: '',
  department_id: '',
  department_start_date: '',
  gender: '',
  position_id: '',
  line_id: '',
  title_id: '',
  manager_id: '',
  phone: '',
  position_start_date: '',
  realm_id: '',
  tenant_id: '',
  is_active: true,
  is_deleted: false
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

export class UpdateEmployeeController extends UIController {


  public LoadView(): UIView {
    const { id } = useParams();

    const { me, isLoading } = useGetMe("console");
    const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id)
    const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization)
    const { employees, isLoadingEmployees } = OrganizationStructureEmployee.GetList(me?.prefs?.organization)
    const { positions, isLoadingPositions } = OrganizationStructurePosition.GetList(me?.prefs?.organization)
    const { lines, isLoadingLines } = OrganizationStructureLine.GetList(me?.prefs?.organization)
    const { titles, isLoadingTitles } = OrganizationStructureTitle.GetList(me?.prefs?.organization)
    const { documentTypeGetList, isLoading: isLoadingDocumentType } = VocationalQualificationType.GetList(me?.prefs?.organization)
    const { documentGetList, isLoading: isLoadingDocument } = VocationalQualification.GetList(me?.prefs?.organization)
    const { organizationEmployeeDocumentList, isLoading: isLoadingDocuments } = OrganizationEmployeeDocument.GetList(me?.prefs?.organization)

    const { updateEmployee } = OrganizationStructureEmployee.Update()
    const { createLog } = OrganizationStructureEmployeeLog.Create()

    const { createOrganizationEmployeeDocument } = OrganizationEmployeeDocument.Create()

    return (
      isLoading || isLoadingResult || isLoadingDepartments || isLoadingDocuments || isLoadingEmployees || isLoadingPositions || isLoadingTitles || isLoadingLines || isLoadingDocument || isLoadingDocumentType ? VStack(Spinner()) :
        me === null ? UINavigate("/login") :
          UIViewBuilder(() => {
            const accountRelation = accountRelations[0]
            const navigate = useNavigate();

            const [formEmployee, setFormEmployee] = useState<IOrganizationStructure.IEmployees.IEmployee>(resetForm)
            const [isActive, setIsActive] = useState<boolean>(true)
            const [documents, setDocuments] = useState<IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate[]>([])
            const [formDocument, setFormDocument] = useState<IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate>({
              ...resetDocumentForm,
              tenant_id: me?.prefs?.organization
            })
            const [editFormDocument, setEditFormDocument] = useState<IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate>({
              ...resetDocumentForm,
              tenant_id: me?.prefs?.organization
            })

            const [showValidityPeriod, setShowValidityPeriod] = useState<boolean>(false)

            const [formIsEmployee, setFormIsEmployee] = useState(true)

            const [isOpenDialog, setIsOpenDialog] = useState(false)

            const selectFormStates = [
              {
                id: "title_id",
                label: "Ünvanı",
                options: titles
              },
              {
                id: "position_id",
                label: "Bulunduğu Pozisyon",
                options: positions
              },
              {
                id: "department_id",
                label: "Bulunduğu Departman",
                options: departments
              },
              {
                id: "line_id",
                label: "Bulunduğu Hat",
                options: lines.filter((line) => line.department_id === formEmployee.department_id)
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
                  <div style={{
                    display: "flex",
                    gap: "10px"
                  }}>
                    <Button variant='text' onClick={() => {
                      const appendForm = params.row as IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate;
                      setEditFormDocument(appendForm)
                      handleClickOpen()
                      setDocuments(documents.filter((document) => document.id !== appendForm.id))
                    }}>
                      Düzenle
                    </Button>
                    <Button variant='text' color='error' onClick={() => {
                      setDocuments(documents.filter((document) => document.id !== params.row.id))
                    }}>
                      Sil
                    </Button>
                  </div>

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
              if (formEmployee.first_name === "" || formEmployee.last_name === "" || formEmployee.id === "") {
                setFormIsEmployee(true)
                ToastError("Personel bilgileri eksik", "")
                return;
              }
              if (employees.find(x => x.$id != formEmployee.$id && x.id === formEmployee.id)) {
                Toast.fire({
                  icon: "error",
                  title: "Bu sicil numarası zaten kullanılıyor. Lütfen farklı bir sicil numarası girin."
                })
                return;
              }

              updateEmployee({
                databaseId: AppInfo.Database,
                collectionId: Collections.OrganizationStructureEmployee,
                documentId: formEmployee.$id,
                data: formEmployee
              }, (result) => {
                createLog({
                  documentId: nanoid(),
                  data: {
                    employee_id: formEmployee.$id,
                    employee_name: formEmployee.first_name + " " + formEmployee.last_name,
                    log_date: new Date().toISOString(),
                    log_type: isActive ? formEmployee.is_active ? "update" : "deactivate" : formEmployee.is_active ? "activate" : "update",
                    department_id: formEmployee.department_id,
                    department_name: departments.find((department) => department.id === formEmployee.department_id)?.name,
                    title_id: formEmployee.title_id,
                    title_name: titles.find((title) => title.id === formEmployee.title_id)?.name,
                    position_id: formEmployee.position_id,
                    position_name: positions.find((position) => position.id === formEmployee.position_id)?.name,
                    line_id: formEmployee.line_id,
                    line_name: lines.find((line) => line.id === formEmployee.line_id)?.name,
                    manager_id: formEmployee.manager_id,
                    manager_name: formEmployee.manager_id ?
                      employees.find((employee) => employee.id === formEmployee.manager_id)?.first_name + " "
                      + employees.find((employee) => employee.id === formEmployee.manager_id)?.last_name : "",
                    tenant_id: formEmployee.tenant_id,
                    job_start_date: formEmployee.job_start_date
                  }
                }, () => {
                  // const docsEmployee = organizationEmployeeDocumentList.filter((doc) => doc.employee_id === id)
                  // if (docsEmployee.length > 0) {
                  //   docsEmployee.forEach((doc, i) => {
                  //     updateEmployee({
                  //       databaseId: AppInfo.Database,
                  //       collectionId: Collections.OrganizationEmployeeDocument,
                  //       documentId: doc.$id,
                  //       data: {
                  //         is_active: false,
                  //         is_deleted: true
                  //       }
                  //     }, () => {
                  //       if (i === docsEmployee.length - 1) {
                  //         if (documents.length > 0) {
                  //           documents.forEach((doc, _i) => {
                  //             const document: IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate = {
                  //               document_id: doc.document_id,
                  //               document_name: doc.document_name,
                  //               document_type_id: doc.document_type_id,
                  //               document_type_name: doc.document_type_name,
                  //               employee_id: id,
                  //               end_date: doc.end_date,
                  //               id: "",
                  //               tenant_id: me?.prefs?.organization
                  //             }
                  //             delete document.id;
                  //             createOrganizationEmployeeDocument({
                  //               documentId: nanoid(),
                  //               data: {
                  //                 ...document,
                  //                 employee_id: id
                  //               }
                  //             }, () => {
                  //               if (_i === documents.length - 1) {
                  //                 ToastSuccess("Personel başarıyla güncellendi", "")
                  //                 navigate(link + "/list")
                  //               }
                  //             })
                  //           })
                  //         } else {
                  //           ToastSuccess("Personel başarıyla güncellendi", "")
                  //           navigate(link + "/list")
                  //         }
                  //       }
                  //     })
                  //   })
                  // }
                })
              })

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

            const handleClickOpen = () => {
              setIsOpenDialog(true);
            };

            const handleClose = () => {
              setEditFormDocument({ ...resetDocumentForm, tenant_id: me?.prefs?.organization })
              setIsOpenDialog(false);
            };

            useEffect(() => {
              if (id) {
                const employee = employees.find((employee) => employee.$id === id)
                if (employee) {
                  setFormEmployee(removeDollarProperties(employee))
                  setIsActive(employee.is_active)
                  const docsEmployee = organizationEmployeeDocumentList.filter((doc) => doc.employee_id === id)
                  const docsCreateCopies: IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate[] = docsEmployee.map((doc) => {
                    return {
                      document_id: doc.document_id,
                      document_name: doc.document_name,
                      document_type_id: doc.document_type_id,
                      document_type_name: doc.document_type_name,
                      end_date: doc.end_date,
                      employee_id: doc.employee_id,
                      id: doc.$id,
                      tenant_id: doc.tenant_id
                    }
                  })
                  setDocuments(docsCreateCopies)
                }
              }
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
                        title={formIsEmployee ? 'Personel Bilgilerini Güncelleyin' : 'Personelin Belgelerini Güncelleyin'}
                        onSubmit={onSubmit}
                        formContent={
                          formIsEmployee ?
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
                                  value={dayjs(formEmployee.job_start_date)}
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
                                  value={dayjs(formEmployee.birth_date)}
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

                                      />
                                    )}
                                  />
                                  {selectFormState.id === "department_id" && formEmployee.department_id && (
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
                                  )}
                                  {selectFormState.id === "position_id" && formEmployee.position_id && (
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
                                  )}
                                </div>
                              )}
                              <Autocomplete
                                options={employees}
                                value={employees.find(option => option.$id === formEmployee.manager_id) || null}
                                onChange={(event, newValue) => {
                                  setFormEmployee({
                                    ...formEmployee,
                                    manager_id: newValue.$id
                                  });
                                }}
                                getOptionLabel={(option) => option.first_name + " " + option.last_name}
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
                                    }
                                  }}>
                                  <BiPlusCircle size={25} />
                                </IconButton>
                              </div>
                              <div style={{
                                height: "calc(100vh - 280px)"
                              }}>
                                <StyledDataGrid columns={documentColumns}
                                  rows={documents}
                                />
                                {/* Edit Document Dialog */}
                                <Dialog
                                  open={isOpenDialog}
                                >
                                  <DialogTitle>Belge Düzenle</DialogTitle>
                                  <DialogContent>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
                                      <Autocomplete
                                        options={documentTypeGetList}
                                        value={editFormDocument.document_type_id ? documentTypeGetList.find(option => option.$id === editFormDocument.document_type_id) : null}
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
                                        options={documentGetList.filter((d) => d.document_type_id === editFormDocument.document_type_id)}
                                        value={editFormDocument.document_id ? documentGetList.find(option => option.$id === editFormDocument.document_id) : null}
                                        onChange={(event, newValue) => {
                                          setFormDocument({
                                            ...editFormDocument,
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
                                            value={dayjs(editFormDocument.end_date)}
                                            slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                            onChange={(e: any) => {
                                              setFormDocument({
                                                ...editFormDocument,
                                                end_date: e.$d.toString().split("GMT")[0] + "GMT+0000 (GMT+00:00)"
                                              })
                                            }}
                                          />
                                        </LocalizationProvider>}
                                      <IconButton
                                        size='small'
                                        onClick={() => {
                                          if (editFormDocument.document_id === "" || editFormDocument.document_type_id === "") {
                                            ToastError("Belge türü ve belge adı seçiniz", "")
                                          } else if (showValidityPeriod && editFormDocument.end_date === "") {
                                            ToastError("Bitiş tarihi seçiniz", "")
                                          } else {
                                            setDocuments([...documents, { ...editFormDocument, id: nanoid() }])
                                            setFormDocument({ ...resetDocumentForm, tenant_id: me?.prefs?.organization })
                                          }
                                        }}>
                                        <BiPlusCircle size={25} />
                                      </IconButton>
                                    </div>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button onClick={handleClose}>İptal</Button>
                                    <Button>Subscribe</Button>
                                  </DialogActions>
                                </Dialog>
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