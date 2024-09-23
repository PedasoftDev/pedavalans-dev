import { Autocomplete, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
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

import AppInfo from '../../../../AppInfo';
import Collections from '../../../../server/core/Collections';
import BucketFiles from '../../../../server/hooks/bucketFiles/Main';
import OrganizationStructurePosition from '../../../../server/hooks/organizationStructrePosition/main';
import OrganizationStructureDepartment from '../../../../server/hooks/organizationStructureDepartment/main';
import OrganizationStructureEmployee from '../../../../server/hooks/organizationStructureEmployee/main';
import OrganizationStructureEmployeeLog from '../../../../server/hooks/organizationStructureEmployeeLog/main';
import OrganizationStructureLine from '../../../../server/hooks/organizationStructureLine/main';
import OrganizationStructureTitle from '../../../../server/hooks/organizationStructureTitle/main';
import OrganizationStructureWorkPlace from '../../../../server/hooks/organizationStructureWorkPlace/main';
import PositionRelationDepartments from '../../../../server/hooks/positionRelationDepartments/Main';
import { ToastSuccess } from '../../../components/Toast';
import { Views } from '../../../components/Views';
import { IOrganizationStructure } from '../../../interfaces/IOrganizationStructure';
import { Form } from '../../Organization/Views/Views';
import EmployeeMultipleLines from '../../../../server/hooks/employeeMultipleLines/Main';


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

const link: string = "/app/employees-in-my-team";

export class UpdateEmployeeInMyTeamController extends UIController {

  public LoadView(): UIView {
    const { id } = useParams();

    const { me, isLoading } = useGetMe("console");
    const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization)
    const { employees, isLoadingEmployees } = OrganizationStructureEmployee.GetList(me?.prefs?.organization)
    const { positions, isLoadingPositions } = OrganizationStructurePosition.GetList(me?.prefs?.organization)
    const { workPlaces, isLoadingWorkPlace } = OrganizationStructureWorkPlace.GetList(me?.prefs?.organization)
    const { lines, isLoadingLines } = OrganizationStructureLine.GetList(me?.prefs?.organization)
    const { titles, isLoadingTitles } = OrganizationStructureTitle.GetList(me?.prefs?.organization)
    const { isLoadingPositionRelationDepartmentsList, positionRelationDepartmentsList } = PositionRelationDepartments.GetList()


    const { updateEmployee } = OrganizationStructureEmployee.Update()
    const { createLog } = OrganizationStructureEmployeeLog.Create()

    const { deleteCache } = useDeleteCache(AppInfo.Name);

    const { getFileView, isLoadingViewFile } = BucketFiles.GetView(AppInfo.Name, "employees_image_bucket", id)

    const { accounts, isLoading: isLoadingAccounts } = useListAccounts([Query.limit(10000)])

    const { createEmployeeMultipleLines } = EmployeeMultipleLines.Create()
    const { employeeMultipleLinesList, isLoading: isLoadingEmployeeMultipleList } = EmployeeMultipleLines.GetList()
    const { updateEmployeeMultipeLines } = EmployeeMultipleLines.Update()

    return (
      isLoading || isLoadingAccounts || isLoadingEmployeeMultipleList || isLoadingDepartments || isLoadingWorkPlace || isLoadingViewFile || isLoadingEmployees || isLoadingPositionRelationDepartmentsList || isLoadingPositions || isLoadingTitles || isLoadingLines ? VStack(Spinner()) :
        me === null ? UINavigate("/login") :
          UIViewBuilder(() => {
            const navigate = useNavigate();

            const [formEmployee, setFormEmployee] = useState<IOrganizationStructure.IEmployees.IEmployee>(resetForm)
            const [formIsEmployee, setFormIsEmployee] = useState(true)
            const [positionRelationDepartmentsState, setPositionRelationDepartmentsState] = useState<boolean>(false);
            const [lineRelationState, setLineRelationState] = useState<boolean>(false);
            const [workPlaceDefination, setWorkPlaceDefination] = useState<boolean>(false);
            const [multipleLineDefinition, setMultipleLineDefinition] = useState<boolean>(false);
            const [multipleLines, setMultipleLines] = useState([])


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
              },
            ];

            const onSubmit = (e: any) => {
              e.preventDefault();

              const successFunc = () => {
                ToastSuccess("Personel başarıyla güncellendi", "")
                deleteCache()
                navigate(link + "/view")
              }

              updateEmployee({
                databaseId: AppInfo.Database,
                collectionId: Collections.OrganizationStructureEmployee,
                documentId: formEmployee.$id,
                data: {
                  line_id: formEmployee.line_id
                }
              }, (result) => {
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
                    log_type: "line-change",
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
                  successFunc()

                })
              })
            }


            const onReset = () => {
              navigate(link + "/view")
            }


            useEffect(() => {
              if (id) {
                const employee = employees.find((employee) => employee.$id === id)
                if (employee) {
                  setFormEmployee(employee)
                }
              }
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
                    Query.equal("name", "multiple_line_definition"),
                    Query.limit(10000),
                  ]
                ).then((res) => {
                  setMultipleLineDefinition(res.documents[0]?.is_active)

                }).then(() => {
                  Services.Databases.listDocuments(
                    AppInfo.Name,
                    AppInfo.Database,
                    Collections.EmployeeLineRelation,
                    [
                      Query.equal("employee_id", id),
                      Query.equal("is_deleted", false),
                      Query.equal("is_active", true)
                    ]
                  ).then((res) => {
                    setMultipleLines(res.documents)
                  })
                })
              })
            }, [])

            return (
              VStack({ alignment: cTop })(
                HStack({ alignment: cLeading })(
                  Views.Title("Ekibimdeki Çalışanlar").paddingTop("20px")
                ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                VStack({ alignment: cTop })(
                  ReactView(
                    <div style={{ width: "100%", height: "100%" }}>
                      <Form
                        title={formIsEmployee ? 'Personel Bilgilerini Güncelleyin' : formEmployee.first_name + ' ' + formEmployee.last_name + ' - ' + 'Personelin Belgelerini Güncelleyin'}
                        onSubmit={onSubmit}
                        formContent={
                          <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%" }}>
                            <div style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                            }}>
                              <img src={getFileView as any} width={100} height={100} />
                            </div>
                            <TextField
                              name='id'
                              size='small'
                              label='Sicil No'
                              value={formEmployee.id}
                              required
                              onChange={() => { }}
                            />
                            <TextField
                              name='first_name'
                              size='small'
                              label='İsim'
                              value={formEmployee.first_name}
                              required
                              onChange={() => { }}
                            />
                            <TextField
                              name='last_name'
                              size='small'
                              label='Soyisim'
                              value={formEmployee.last_name}
                              required
                              onChange={() => { }}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker label="İşe Başlama Tarihi"
                                format="DD/MM/YYYY"
                                onChange={() => { }}
                                disabled
                                slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }}
                                value={dayjs(formEmployee.job_start_date)} />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker label="Doğum Tarihi"
                                format="DD/MM/YYYY"
                                onChange={() => { }}
                                disabled
                                slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }}
                                value={dayjs(formEmployee.birth_date)} />
                            </LocalizationProvider>
                            <FormControl fullWidth size="small">
                              <InputLabel>Cinsiyet</InputLabel>
                              <Select
                                value={formEmployee.gender}
                                label={"Cinsiyet"}
                                size="small"
                                onChange={() => { }}
                                disabled
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
                                size="small"
                                onChange={() => { }}
                                disabled
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
                                getOptionLabel={(option) => option.record_id + " - " + option.name}
                                onChange={() => { }}
                                disabled
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
                                  value={selectFormState.options.find(option => option.id === formEmployee[selectFormState.id]) || null}
                                  getOptionLabel={(option) => option.name}
                                  onChange={() => { }}
                                  disabled
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
                                        disabled
                                        value={dayjs(formEmployee.department_start_date)}
                                        onChange={() => { }}
                                        slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }} />
                                    </LocalizationProvider>
                                  </FormControl>
                                )}
                                {selectFormState.id === "position_id" && formEmployee.position_id && (
                                  <FormControl fullWidth size="small" sx={{ marginTop: "10px" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <DatePicker label="Pozisyona Başlama Tarihi"
                                        format="DD/MM/YYYY"
                                        disabled
                                        onChange={() => { }}
                                        value={dayjs(formEmployee.position_start_date)}
                                        slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }} />
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
                              options={accounts}
                              value={accounts.find(option => option.$id === formEmployee.manager_id) || null}
                              getOptionLabel={(option) => option.name}
                              onChange={() => { }}
                              disabled
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
                                onChange={() => { }}
                                disabled
                              />
                            </FormControl>
                            <FormControlLabel
                              sx={{ width: "100%", alignContent: "end", padding: "0 5px 0 0" }}
                              control={<Switch color="primary" checked={formEmployee.is_active} />}
                              label="Aktif mi?"
                              labelPlacement="start"
                              onChange={() => { }}
                              disabled
                            />
                          </div>
                        }
                        buttons={
                          [
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