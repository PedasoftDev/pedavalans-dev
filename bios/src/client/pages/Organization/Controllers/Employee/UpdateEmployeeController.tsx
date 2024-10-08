import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Query, Services, useDeleteCache, useGetMe, useListAccounts } from '@realmocean/sdk';
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
  useParams,
  VStack,
} from '@tuval/forms';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { BiPlusCircle } from 'react-icons/bi';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import Swal from 'sweetalert2';

import AppInfo from '../../../../../AppInfo';
import Collections from '../../../../../server/core/Collections';
import AccountRelation from '../../../../../server/hooks/accountRelation/main';
import BucketFiles from '../../../../../server/hooks/bucketFiles/Main';
import EmployeeMultipleDepartments from '../../../../../server/hooks/employeeMultipleDepartments/Main';
import EmployeeMultipleLines from '../../../../../server/hooks/employeeMultipleLines/Main';
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
import removeDollarProperties from '../../../../assets/Functions/removeDollarProperties';
import { Resources } from '../../../../assets/Resources';
import StyledDataGrid from '../../../../components/StyledDataGrid';
import { Toast, ToastError, ToastSuccess } from '../../../../components/Toast';
import { Views } from '../../../../components/Views';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import { Form } from '../../Views/Views';

const resetForm: IOrganizationStructure.IEmployees.IEmployee = {
  id: '',
  id_number: '',
  first_name: '',
  last_name: '',
  job_start_date: '',
  birth_date: '',
  department_id: '',
  department_start_date: '',
  gender: '',
  position_id: '',
  workplace_id: '',
  line_id: '',
  title_id: '',
  manager_id: '',
  phone: '',
  email: '',
  proxy_employee_id: '',
  educational_status: '',
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
    const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization)
    const { employees, isLoadingEmployees } = OrganizationStructureEmployee.GetList(me?.prefs?.organization)
    const { positions, isLoadingPositions } = OrganizationStructurePosition.GetList(me?.prefs?.organization)
    const { workPlaces, isLoadingWorkPlace } = OrganizationStructureWorkPlace.GetList(me?.prefs?.organization)
    const { lines, isLoadingLines } = OrganizationStructureLine.GetList(me?.prefs?.organization)
    const { titles, isLoadingTitles } = OrganizationStructureTitle.GetList(me?.prefs?.organization)
    const { documentTypeGetList, isLoading: isLoadingDocumentType } = VocationalQualificationType.GetList(me?.prefs?.organization)
    const { documentGetList, isLoading: isLoadingDocument } = VocationalQualification.GetList(me?.prefs?.organization)
    const { isLoadingPositionRelationDepartmentsList, positionRelationDepartmentsList } = PositionRelationDepartments.GetList()


    const { updateEmployee } = OrganizationStructureEmployee.Update()
    const { createLog } = OrganizationStructureEmployeeLog.Create()

    const { deleteCache } = useDeleteCache(AppInfo.Name);

    const { getFileView, isLoadingViewFile } = BucketFiles.GetView(AppInfo.Name, "employees_image_bucket", id)

    const { accounts, isLoading: isLoadingAccounts } = useListAccounts([Query.limit(10000)])
    const { accountRelations, isLoadingResult } = AccountRelation.GetList(me?.prefs?.organization);

    const { createEmployeeMultipleLines } = EmployeeMultipleLines.Create()
    const { employeeMultipleLinesList, isLoading: isLoadingEmployeeMultipleList } = EmployeeMultipleLines.GetList()
    const { updateEmployeeMultipeLines } = EmployeeMultipleLines.Update()

    const { createEmployeeMultipleDepartments } = EmployeeMultipleDepartments.Create()
    const { employeeMultipleDepartmentsList, isLoading: isLoadingEmployeeMultipleDepartmentsList } = EmployeeMultipleDepartments.GetList()
    const { updateEmployeeMultipleDepartments } = EmployeeMultipleDepartments.Update()

    return (
      isLoading || isLoadingAccounts || isLoadingResult || isLoadingDepartments || isLoadingEmployeeMultipleDepartmentsList || isLoadingEmployeeMultipleList || isLoadingWorkPlace || isLoadingViewFile || isLoadingEmployees || isLoadingPositionRelationDepartmentsList || isLoadingPositions || isLoadingTitles || isLoadingLines || isLoadingDocument || isLoadingDocumentType ? VStack(Spinner()) :
        me === null ? UINavigate("/login") :
          UIViewBuilder(() => {
            const navigate = useNavigate();

            const [formEmployee, setFormEmployee] = useState<IOrganizationStructure.IEmployees.IEmployee>(resetForm)
            const [isActive, setIsActive] = useState<boolean>(true)
            const [documents, setDocuments] = useState<IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate[]>([])
            const [documentsCopy, setDocumentsCopy] = useState<IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate[]>([])
            const [formDocument, setFormDocument] = useState<IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate>({
              ...resetDocumentForm,
              tenant_id: me?.prefs?.organization
            })
            const [editFormDocument, setEditFormDocument] = useState<IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate>({
              ...resetDocumentForm,
              tenant_id: me?.prefs?.organization
            })
            const [multipleLines, setMultipleLines] = useState([])
            const [multipleDepartments, setMultipleDepartments] = useState([])

            const [showValidityPeriod, setShowValidityPeriod] = useState<boolean>(false)
            const [showEditValidityPeriod, setShowEditValidityPeriod] = useState<boolean>(false)

            const [formIsEmployee, setFormIsEmployee] = useState(true)
            const [positionRelationDepartmentsState, setPositionRelationDepartmentsState] = useState<boolean>(false);
            const [lineRelationState, setLineRelationState] = useState<boolean>(false);
            const [workPlaceDefination, setWorkPlaceDefination] = useState<boolean>(false);
            const [multipleLineDefinition, setMultipleLineDefinition] = useState<boolean>(false);
            const [multipleDepartmentDefinition, setMultipleDepartmentDefinition] = useState<boolean>(false);

            const [proxySelectedEmployees, setProxySelectedEmployees] = useState<string[]>([])

            const employeesSameManagerId = formEmployee.manager_id ? employees.filter((employee) => employee.manager_id === formEmployee.manager_id) : []


            const [isOpenDialog, setIsOpenDialog] = useState(false)

            const selectFormStates = [
              {
                id: "title_id",
                label: "Ünvanı",
                options: titles
              },
              !multipleDepartmentDefinition &&
              {
                id: "department_id",
                label: "Bulunduğu Departman",
                options: departments.filter((item) => item.is_active === true)
              },
              {
                id: "position_id",
                label: "Bulunduğu Pozisyon",
                options: positionRelationDepartmentsState ? (positions.filter((item) => positionRelationDepartmentsList.filter((item2) => item2.parent_department_id === formEmployee.department_id).map((item3) => item3.relation_position_id).includes(item.id))) : positions
              },
            ].filter(Boolean);

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
                      setShowEditValidityPeriod(!(appendForm.document_type_name === "Süresiz"))
                      handleClickOpen()
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
              const regex = /^[1-9]{1}[0-9]{9}[02468]{1}$/
              if (!regex.test(formEmployee.id_number)) {
                ToastError("Hata", "Geçersiz TCKN")
                return;
              }
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
              if (employees.find(x => x.email != formEmployee.email && x.email === formEmployee.email)) {
                Toast.fire({
                  icon: "error",
                  title: "Çalışan eklenirken bir hata oluştu!",
                  text: "E-Posta zaten kullanılmaktadır."
                })
                return;
              }

              const successFunc = () => {
                ToastSuccess("Personel başarıyla güncellendi", "")
                deleteCache()
                navigate(link + "/list")
              }

              updateEmployee({
                databaseId: AppInfo.Database,
                collectionId: Collections.OrganizationStructureEmployee,
                documentId: formEmployee.$id,
                data: removeDollarProperties(formEmployee)
              }, (result) => {
                if (multipleDepartmentDefinition) {
                  // Ensure that we only deal with workplaces related to the current trainer
                  const currentDepartments = employeeMultipleDepartmentsList.filter(
                    (dep) => dep.employee_id === id
                  );

                  // Identify removed workplaces (those that are in the database but not in the selected list)
                  const removedDepList = currentDepartments.filter(
                    (relatedDep) =>
                      !multipleDepartments.some(
                        (selectedLines) => selectedLines.id === relatedDep.department_id
                      )
                  );

                  // Identify new workplaces (those that are selected but not in the database)
                  const newDeps = multipleDepartments.filter(
                    (selectedDeps) =>
                      !currentDepartments.some(
                        (relatedDeps) => relatedDeps.id === selectedDeps.department_id
                      )
                  );

                  // Update removed workplaces to be inactive and deleted
                  removedDepList.forEach((workplace) => {
                    updateEmployeeMultipleDepartments({
                      databaseId: AppInfo.Database,
                      collectionId: Collections.EmployeeDepartmentRelation,
                      documentId: workplace.$id,
                      data: {
                        is_active: false,
                        is_deleted: true,
                      },
                    });
                  });

                  // Add new workplaces
                  newDeps.forEach((selectedWorkplace) => {
                    const nanoId = nanoid();
                    createEmployeeMultipleDepartments({
                      documentId: nanoId,
                      data: {
                        id: nanoId,
                        employee_id: formEmployee.$id,
                        department_id: selectedWorkplace.department_id,
                        department_record_id: departments.find((department) => department.id === selectedWorkplace.department_id)?.record_id,
                        department_name: departments.find((department) => department.id === selectedWorkplace.department_id)?.name,
                        is_active: true,
                        is_deleted: false,
                        tenant_id: me?.prefs?.organization,
                      },
                    });
                  });
                }
                if (multipleLineDefinition) {
                  // Ensure that we only deal with workplaces related to the current trainer
                  const currentLines = employeeMultipleLinesList.filter(
                    (lines) => lines.employee_id === id
                  );

                  // Identify removed workplaces (those that are in the database but not in the selected list)
                  const removedLines = currentLines.filter(
                    (relatedLines) =>
                      !multipleLines.some(
                        (selectedLines) => selectedLines.id === relatedLines.line_id
                      )
                  );

                  // Identify new workplaces (those that are selected but not in the database)
                  const newLines = multipleLines.filter(
                    (selectedLines) =>
                      !currentLines.some(
                        (relatedLines) => relatedLines.id === selectedLines.line_id
                      )
                  );

                  // Update removed workplaces to be inactive and deleted
                  removedLines.forEach((workplace) => {
                    updateEmployeeMultipeLines({
                      databaseId: AppInfo.Database,
                      collectionId: Collections.EmployeeLineRelation,
                      documentId: workplace.$id,
                      data: {
                        is_active: false,
                        is_deleted: true,
                      },
                    });
                  });

                  // Add new workplaces
                  newLines.forEach((selectedWorkplace) => {
                    const nanoId = nanoid();
                    createEmployeeMultipleLines({
                      documentId: nanoId,
                      data: {
                        id: nanoId,
                        employee_id: formEmployee.$id,
                        department_id: formEmployee.department_id,
                        line_id: selectedWorkplace.line_id,
                        line_record_id: lines.find((line) => line.id === selectedWorkplace.line_id)?.record_id,
                        line_name: lines.find((line) => line.id === selectedWorkplace.line_id)?.name,
                        is_active: true,
                        is_deleted: false,
                        tenant_id: me?.prefs?.organization,
                      },
                    });
                  });
                }
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

                  const createNewDocument = (doc: IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate, id: string, callback: () => void) => {
                    const document: IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate = {
                      document_id: doc.document_id,
                      document_name: doc.document_name,
                      document_type_id: doc.document_type_id,
                      document_type_name: doc.document_type_name,
                      employee_id: id,
                      end_date: doc.end_date,
                      id: "",
                      tenant_id: me?.prefs?.organization
                    }
                    delete document.id;
                    Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationEmployeeDocument, nanoid(), document).then(() => {
                      callback()
                    })
                  }

                  const deactiveDocument = (doc: IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate, callback: () => void) => {
                    Services.Databases.updateDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationEmployeeDocument, doc.id, {
                      is_active: false,
                      is_deleted: true
                    }).then(() => {
                      callback()
                    })
                  }

                  if (documentsCopy.length > 0) {
                    documentsCopy.forEach((doc, i) => {
                      deactiveDocument(doc, () => {
                        if (i === documentsCopy.length - 1) {
                          if (documents.length === 0) {
                            successFunc()
                          } else {
                            documents.forEach((doc, _i) => {
                              createNewDocument(doc, formEmployee.$id, () => {
                                if (_i === documents.length - 1) {
                                  successFunc()
                                }
                              })
                            })
                          }
                        }
                      })
                    })
                  } else {
                    if (documents.length === 0) {
                      successFunc()
                    } else {
                      documents.forEach((doc, i) => {
                        createNewDocument(doc, formEmployee.$id, () => {
                          if (i === documents.length - 1) {
                            successFunc()
                          }
                        })
                      })
                    }
                  }
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
                const employee = employees.find((employee) => employee.$id === id);
                if (employee) {
                  setFormEmployee(employee);
                  setIsActive(employee.is_active);

                  const appInfoParams = {
                    name: AppInfo.Name,
                    database: AppInfo.Database,
                  };

                  const commonQuery = [
                    Query.equal("employee_id", id),
                    Query.equal("is_deleted", false),
                    Query.equal("is_active", true),
                  ];

                  const fetchEmployeeDocs = Services.Databases.listDocuments(
                    appInfoParams.name,
                    appInfoParams.database,
                    Collections.OrganizationEmployeeDocument,
                    commonQuery
                  ).then((result) => {
                    const docsCreateCopies = result.documents.map((doc) => ({
                      document_id: doc.document_id,
                      document_name: doc.document_name,
                      document_type_id: doc.document_type_id,
                      document_type_name: doc.document_type_name,
                      end_date: doc.end_date,
                      employee_id: doc.employee_id,
                      id: doc.$id,
                      tenant_id: doc.tenant_id,
                    }));
                    setDocumentsCopy(docsCreateCopies);
                    setDocuments(docsCreateCopies);
                  });

                  const fetchMultipleLines = Services.Databases.listDocuments(
                    appInfoParams.name,
                    appInfoParams.database,
                    Collections.EmployeeLineRelation,
                    commonQuery
                  ).then((res) => {
                    setMultipleLines(res.documents);
                  });

                  const fetchMultipleDepartments = Services.Databases.listDocuments(
                    appInfoParams.name,
                    appInfoParams.database,
                    Collections.EmployeeDepartmentRelation,
                    commonQuery
                  ).then((res) => {
                    setMultipleDepartments(res.documents);
                  });

                  const fetchParameters = [
                    { queryName: "position_relation_department", setter: setPositionRelationDepartmentsState },
                    { queryName: "line_based_competency_relationship", setter: setLineRelationState },
                    { queryName: "work_place_definition", setter: setWorkPlaceDefination },
                    { queryName: "multiple_line_definition", setter: setMultipleLineDefinition },
                    { queryName: "multiple_department_definition", setter: setMultipleDepartmentDefinition },
                  ];

                  const parameterRequests = fetchParameters.map(({ queryName }) =>
                    Services.Databases.listDocuments(
                      appInfoParams.name,
                      appInfoParams.database,
                      Collections.Parameter,
                      [Query.equal("name", queryName), Query.limit(10000)]
                    )
                  );

                  Promise.all([fetchEmployeeDocs, fetchMultipleLines, fetchMultipleDepartments, ...parameterRequests])
                    .then((results: any) => {
                      fetchParameters.forEach((param, index) => {
                        param.setter(results[3 + index].documents[0]?.is_active);
                      });
                    })
                    .catch((error) => {
                      console.error("Error fetching data:", error);
                    });
                }
              }

              setProxySelectedEmployees(employees.filter((employee) => employee.proxy_employee_id).map((employee) => employee.proxy_employee_id));
            }, [id, employees]);



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
                    }).then(() => {
                      Toast.fire({
                        icon: "success",
                        title: "Personel başarıyla silindi"
                      })
                      deleteCache()
                      onReset()
                    })
                  })
                }
              })
            }

            return (
              VStack({ alignment: cTop })(
                HStack({ alignment: cLeading })(
                  Views.Title("Organizasyon Yapısı").paddingTop("20px")
                ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                VStack({ alignment: cTop })(
                  ReactView(
                    <div style={{ width: "100%", height: "100%" }}>
                      <Form
                        title={formIsEmployee ? 'Personel Bilgilerini Güncelleyin' : formEmployee.first_name + ' ' + formEmployee.last_name + ' - ' + 'Personelin Belgelerini Güncelleyin'}
                        onSubmit={onSubmit}
                        formContent={
                          formIsEmployee ?
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%" }}>
                              <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                              }}>
                                {/* {
                                  isHaveImage ?
                                    <img src={getFileView as any} width={100} height={100} />
                                    :
                                    <IoPersonCircleOutline style={{ width: "100px", height: "100px" }} />
                                } */}
                                <img src={getFileView as any} width={100} height={100} />
                                <div style={{
                                  display: "flex",
                                  gap: "5px",
                                }}>
                                  <IconButton color="primary" aria-label="add an alarm">
                                    <MdEdit />
                                  </IconButton>
                                  <IconButton color="primary" aria-label="add an alarm">
                                    <FaRegTrashAlt />
                                  </IconButton>

                                </div>
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
                                name='id_number'
                                size='small'
                                label='TCKN'
                                value={formEmployee.id_number}
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
                                  slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }}
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
                                  slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }}
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
                              {
                                multipleDepartmentDefinition && (
                                  <Autocomplete
                                    options={departments.filter((item) => item.is_active === true)}
                                    value={
                                      multipleDepartments.map((department) => departments?.find(option => option.id === department.department_id) || null)
                                    }
                                    multiple
                                    onChange={(event, newValue) => {
                                      setMultipleDepartments(newValue.map((department) => {
                                        return {
                                          department_id: department.id,
                                          employee_id: formEmployee.id,
                                        }
                                      })
                                      );
                                    }}
                                    getOptionLabel={(option) => option.record_id + " - " + option.name}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Bulunduğu Departman"
                                        name="department_id"
                                        size="small"
                                      />
                                    )}
                                  />
                                )
                              }
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
                                          slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }}
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
                                          slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }}
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
                                    value={
                                      multipleLines.map((line) => lines.find(option => option.id === line.line_id) || null)
                                    }
                                    multiple
                                    onChange={(event, newValue) => {
                                      setMultipleLines(newValue.map((line) => {
                                        return {
                                          line_id: line.id,
                                          employee_id: formEmployee.id,
                                        }
                                      })
                                      );
                                    }}
                                    getOptionLabel={(option) => option?.record_id + " - " + option?.name}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Bulunduğu Hat"
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
                                options={accounts.filter(account => accountRelations.some(relation => relation.account_id === account.$id && !relation.is_deleted))}
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
                              <Autocomplete
                                options={employeesSameManagerId.filter((x) => !proxySelectedEmployees.includes(x.$id) && x.$id !== formEmployee.$id)}
                                value={employees.find(option => option.$id === formEmployee.proxy_employee_id) || null}
                                onChange={(event, newValue) => {
                                  setFormEmployee({
                                    ...formEmployee,
                                    proxy_employee_id: newValue.$id
                                  });
                                }}
                                getOptionLabel={(option) => option.first_name + " " + option.last_name}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Yerine Vekalet Edecek Personel"
                                    name="proxy_employee_id"
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
                              <FormControl fullWidth size="small">
                                <TextField
                                  name='email'
                                  size='small'
                                  label='E-Posta'
                                  value={formEmployee.email}
                                  onChange={(e) => {
                                    setFormEmployee({
                                      ...formEmployee,
                                      email: e.target.value as string
                                    })
                                  }
                                  }
                                />

                              </FormControl>
                              <FormControlLabel
                                sx={{ width: "100%", alignContent: "end", padding: "0 5px 0 0" }}
                                onChange={(e: any) => setFormEmployee({ ...formEmployee, is_active: e.target.checked })}
                                control={<Switch color="primary" checked={formEmployee.is_active} />}
                                label="Aktif mi?"
                                labelPlacement="start"
                              />
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
                                      slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }}
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
                                height: "calc(100vh - 310px)",
                                width: "100%"
                              }}>
                                <StyledDataGrid columns={documentColumns}
                                  rows={documents}
                                />
                              </div>
                              {/* Edit Document Dialog */}
                              <Dialog
                                open={isOpenDialog}
                              >
                                <DialogTitle>Belge Düzenle</DialogTitle>
                                <DialogContent>
                                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "400px", padding: "10px" }}>
                                    <Autocomplete
                                      options={documentTypeGetList}
                                      value={editFormDocument.document_type_id ? documentTypeGetList.find(option => option.$id === editFormDocument.document_type_id) : null}
                                      onChange={(event, newValue) => {
                                        const selectedValue = newValue.document_type_id;
                                        const selectedDocumentType = documentGetList.find((type) => type.document_type_id === selectedValue);
                                        setShowEditValidityPeriod(!(selectedDocumentType.document_validity_period === "Süresiz"));
                                        setEditFormDocument({
                                          ...editFormDocument,
                                          document_type_id: selectedValue,
                                          document_type_name: selectedDocumentType.document_type_name,
                                          ...(selectedDocumentType.document_validity_period === "Süresiz" && { end_date: "" })
                                        });
                                      }}
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
                                        setEditFormDocument({
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
                                    {showEditValidityPeriod &&
                                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker label="Bitiş Tarihi"
                                          format="DD/MM/YYYY"
                                          value={dayjs(editFormDocument.end_date)}
                                          slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }}
                                          onChange={(e: any) => {
                                            setEditFormDocument({
                                              ...editFormDocument,
                                              end_date: e.$d.toString().split("GMT")[0] + "GMT+0000 (GMT+00:00)"
                                            })
                                          }}
                                        />
                                      </LocalizationProvider>}
                                  </div>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClose}>İptal</Button>
                                  <Button onClick={(e) => {
                                    e.preventDefault();
                                    const updatedDocuments = documents.map((doc) => {
                                      if (doc.id === editFormDocument.id) {
                                        return editFormDocument
                                      }
                                      return doc
                                    })
                                    setDocuments(updatedDocuments)
                                    handleClose()
                                  }}>Güncelle</Button>
                                </DialogActions>
                              </Dialog>
                            </div>
                        }
                        buttons={formIsEmployee ?
                          isActive ?
                            [
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
                              },
                              {
                                text: "Sil",
                                color: "error",
                                type: "button",
                                onClick: onDelete
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