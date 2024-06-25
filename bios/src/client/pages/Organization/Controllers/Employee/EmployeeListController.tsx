import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Tooltip } from '@mui/material'
import { GridColDef, trTR } from '@mui/x-data-grid'
import React, { useRef, useState } from 'react'
import { MdDisplaySettings } from 'react-icons/md'
import StyledDataGrid from '../../../../components/StyledDataGrid'
import { SiMicrosoftexcel } from 'react-icons/si'
import { employeeTransferTemplateByExcel } from '../../../../assets/Functions/employeeTransferTemplateByExcel'
import { Resources } from '../../../../assets/Resources'
import excelToJson from '../../../../assets/Functions/excelToJson'
import { HStack, ReactView, Spinner, UIController, UIView, UIViewBuilder, VStack, cLeading, cTop, nanoid, useNavigate } from '@tuval/forms';
import { Services, useGetMe } from '@realmocean/sdk'
import LinearProgressWithLabel from '../../../../components/LinearProgressWithLabel'
import { Views } from '../../../../components/Views'
import AccountRelation from '../../../../../server/hooks/accountRelation/main'
import OrganizationStructureDepartment from '../../../../../server/hooks/organizationStructureDepartment/main'
import OrganizationStructureEmployee from '../../../../../server/hooks/organizationStructureEmployee/main'
import OrganizationStructurePosition from '../../../../../server/hooks/organizationStructrePosition/main'
import OrganizationStructureLine from '../../../../../server/hooks/organizationStructureLine/main'
import { GridContainer } from '../../Views/Views'
import OrganizationStructureTitle from '../../../../../server/hooks/organizationStructureTitle/main'
import { AntTab, AntTabs, TabPanel, a11yProps } from '../../../../components/Tabs'
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure'
import { Umay } from '@tuval/core'
import AppInfo from '../../../../../AppInfo'
import Collections from '../../../../../server/core/Collections'
import { Toast } from '../../../../components/Toast'
import Swal from 'sweetalert2'


interface IEmployeeImportFromExcel {
  sicil_no: string;
  adi: string;
  soyadi: string;
  departman_kodu: string;
  departman_adi: string;
  departmana_baslama_tarihi: string;
  unvan_kodu: string;
  unvan_tanimi: string;
  pozisyon_kodu: string;
  pozisyon_tanimi: string;
  pozisyona_baslama_tarihi: string;
  hat_kodu: string | null;
  hat_adi: string | null;
}

const excelDateToJSDate = (excelDate: number) => {
  const jsDate = new Date((excelDate - (25567 + 1)) * 86400 * 1000);
  return jsDate.toISOString().split('T')[0];
}

export class EmployeeListController extends UIController {


  public LoadView(): UIView {

    const { me, isLoading } = useGetMe("console");
    const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id)
    const { departments: propDepartments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization)
    const { employees: propEmployees, isLoadingEmployees } = OrganizationStructureEmployee.GetList(me?.prefs?.organization)
    const { positions: propPositions, isLoadingPositions } = OrganizationStructurePosition.GetList(me?.prefs?.organization)
    const { lines: propLines, isLoadingLines } = OrganizationStructureLine.GetList(me?.prefs?.organization)
    const { titles: propTitles, isLoadingTitles } = OrganizationStructureTitle.GetList(me?.prefs?.organization)

    return (
      isLoading || isLoadingResult || isLoadingDepartments || isLoadingEmployees || isLoadingPositions || isLoadingTitles || isLoadingLines ? VStack(Spinner()) :
        UIViewBuilder(() => {
          const accountRelation = accountRelations[0]
          const value = 0;
          const navigate = useNavigate();

          const [filterKey, setFilterKey] = useState("");
          const [active, setActive] = useState(true);
          const [open, setOpen] = useState(false);
          const fileInputRef = useRef<HTMLInputElement>(null);
          const [excelData, setExcelData] = useState<IEmployeeImportFromExcel[]>([]);
          const [excelColumns, setExcelColumns] = useState<GridColDef[]>([]);
          const [isTransfer, setIsTransfer] = useState(false);
          const [transferPercent, setTransferPercent] = useState(0);

          const filteredEmployees = propEmployees.filter((employee) =>
            employee.first_name.toLowerCase().indexOf(filterKey.toLowerCase()) > -1 ||
            employee.last_name.toLowerCase().indexOf(filterKey.toLowerCase()) > -1
          )

          const handleClickOpen = () => {
            setOpen(true);
          };

          const handleClose = () => {
            setOpen(false);
            setExcelColumns([]);
            setExcelData([]);
          };


          const handleButtonClick = () => {
            if (fileInputRef.current) {
              fileInputRef.current.click();
            }
          };

          const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
              excelToJson(file, (data) => {
                // first row is columns
                const columns = data?.shift() as string[];
                const excelColumns: GridColDef[] = columns.map((column, index) => {
                  return {
                    field: column.toLowerCase(),
                    headerName: column.replace(/_/g, " "),
                    flex: 1,
                    minWidth: 150,
                    type: "string"
                  }
                });
                setExcelColumns(excelColumns);

                // data without first row
                let excelData = []
                data?.map((row, index) => {
                  let appendRow: any = {}
                  row.forEach((cell: string | number, cellIndex: number) => {
                    if (typeof cell === 'number' && columns[cellIndex].toLowerCase().includes('tarih')) {
                      appendRow[columns[cellIndex].toLowerCase()] = excelDateToJSDate(cell);
                    } else {
                      appendRow[columns[cellIndex].toLowerCase()] = String(cell);
                    }
                  });
                  if (appendRow.sicil_no) {
                    excelData.push({ id: index, ...appendRow });
                  }
                });

                setExcelData(excelData);

                handleClickOpen();
              });
            }
          };

          const handleTransfer = async () => {
            setIsTransfer(true);

            try {
              let departments: { code: string, name: string }[] = [];
              let titles: { code: string, name: string }[] = [];
              let positions: { code: string, name: string }[] = [];
              let lines: { code: string, name: string, department_code: string }[] = [];

              excelData.map((row, index) => {
                if (departments.findIndex(x => x.code === row.departman_kodu) === -1) {
                  departments.push({ code: row.departman_kodu, name: row.departman_adi });
                }
                if (titles.findIndex(x => x.code === row.unvan_kodu) === -1) {
                  titles.push({ code: row.unvan_kodu, name: row.unvan_tanimi });
                }
                if (positions.findIndex(x => x.code === row.pozisyon_kodu) === -1) {
                  positions.push({ code: row.pozisyon_kodu, name: row.pozisyon_tanimi });
                }
                if (row.hat_kodu && lines.findIndex(x => x.code === row.hat_kodu) === -1) {
                  lines.push({ code: row.hat_kodu, name: row.hat_adi, department_code: row.departman_kodu });
                }
              })

              // add departments
              const tasks = new Umay();
              const failedDepartments: string[] = [];
              const createdDepartments: IOrganizationStructure.IDepartments.ICreateDepartment[] = []
              tasks.Task(async () => {
                for (let department of departments) {
                  if (!propDepartments.find(x => x.record_id === department.code)) {
                    try {
                      const data: IOrganizationStructure.IDepartments.ICreateDepartment = {
                        id: nanoid(),
                        name: department.name,
                        record_id: department.code,
                        tenant_id: me?.prefs?.organization,
                        realm_id: me?.prefs?.organization
                      }

                      if (data.name && data.record_id) {
                        await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureDepartment, data.id, data);
                        createdDepartments.push(data);
                      }
                    }
                    catch (error) {
                      failedDepartments.push(department.code);
                    }
                  } else {
                    createdDepartments.push(propDepartments.find(x => x.record_id === department.code));
                  }
                }
              });
              tasks.Wait(1);
              const failedTitles: string[] = [];
              const createdTitles: IOrganizationStructure.ITitles.ICreateTitle[] = []
              tasks.Task(async () => {
                for (let title of titles) {
                  if (!propTitles.find(x => x.record_id === title.code)) {
                    try {
                      const data: IOrganizationStructure.ITitles.ICreateTitle = {
                        id: nanoid(),
                        name: title.name,
                        record_id: title.code,
                        tenant_id: me?.prefs?.organization,
                        realm_id: me?.prefs?.organization
                      }
                      if (data.name && data.record_id) {
                        await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureTitle, data.id, data).then(() => {
                          createdTitles.push(data);
                        });
                      }
                    }
                    catch (error) {
                      failedTitles.push(title.code);
                    }
                  } else {
                    createdTitles.push(propTitles.find(x => x.record_id === title.code));
                  }
                }
              })
              tasks.Wait(1);
              const failedPositions: string[] = [];
              const createdPositions: IOrganizationStructure.IPositions.ICreatePosition[] = [];
              tasks.Task(async () => {
                for (let position of positions) {
                  if (!propPositions.find(x => x.record_id === position.code)) {
                    try {
                      const data: IOrganizationStructure.IPositions.ICreatePosition = {
                        id: nanoid(),
                        name: position.name,
                        record_id: position.code,
                        tenant_id: me?.prefs?.organization,
                        realm_id: me?.prefs?.organization
                      }
                      if (data.name && data.record_id) {
                        await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructurePosition, data.id, data).then(() => {
                          createdPositions.push(data);
                        });
                      }
                    }
                    catch (error) {
                      failedPositions.push(position.code);
                    }
                  } else {
                    createdPositions.push(propPositions.find(x => x.record_id === position.code));
                  }
                }
              })
              tasks.Wait(1);
              const failedLines: string[] = [];
              const createdLines: IOrganizationStructure.ILines.ICreateLine[] = [];
              tasks.Task(async () => {
                for (let line of lines) {
                  if (!propTitles.find(x => x.record_id === line.code)) {
                    try {
                      const data: IOrganizationStructure.ILines.ICreateLine = {
                        id: nanoid(),
                        name: line.name,
                        record_id: line.code,
                        department_id: createdDepartments.find(x => x.record_id === line.department_code)?.id,
                        department_name: createdDepartments.find(x => x.record_id === line.department_code)?.name,
                        tenant_id: me?.prefs?.organization,
                        realm_id: me?.prefs?.organization
                      }
                      if (data.name && data.record_id) {
                        await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureLine, data.id, data).then(() => {
                          createdLines.push(data);
                        });

                      }
                    }
                    catch (error) {
                      failedLines.push(line.code);
                    }
                  }
                }
              })
              tasks.Wait(1);

              tasks.Task(async () => {
                for (let failedDepartment of failedDepartments) {
                  try {
                    const data: IOrganizationStructure.IDepartments.ICreateDepartment = {
                      id: nanoid(),
                      name: departments.find(x => x.code === failedDepartment)?.name,
                      record_id: failedDepartment,
                      tenant_id: me?.prefs?.organization,
                      realm_id: me?.prefs?.organization
                    }
                    await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureDepartment, data.id, data).then(() => {
                      createdDepartments.push(data);
                    })
                  }
                  catch (error) {
                    console.log("Departman eklenemedi: " + failedDepartment);
                  }
                }
              });
              tasks.Wait(1);
              tasks.Task(async () => {
                for (let failedTitle of failedTitles) {
                  try {
                    const data: IOrganizationStructure.ITitles.ICreateTitle = {
                      id: nanoid(),
                      name: titles.find(x => x.code === failedTitle)?.name,
                      record_id: failedTitle,
                      tenant_id: me?.prefs?.organization,
                      realm_id: me?.prefs?.organization
                    }
                    await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureTitle, data.id, data).then(() => {
                      createdTitles.push(data);
                    });
                  }
                  catch (error) {
                    console.log("Ünvan eklenemedi: " + failedTitle);
                  }
                }
              });
              tasks.Wait(1);
              tasks.Task(async () => {
                for (let failedPosition of failedPositions) {
                  try {
                    const data: IOrganizationStructure.IPositions.ICreatePosition = {
                      id: nanoid(),
                      name: positions.find(x => x.code === failedPosition)?.name,
                      record_id: failedPosition,
                      tenant_id: me?.prefs?.organization,
                      realm_id: me?.prefs?.organization
                    }
                    await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructurePosition, data.id, data).then(() => {
                      createdPositions.push(data);
                    });
                  }
                  catch (error) {
                    console.log("Pozisyon eklenemedi: " + failedPosition);
                  }
                }
              });
              tasks.Wait(1);
              tasks.Task(async () => {
                for (let failedLine of failedLines) {
                  try {
                    const data: IOrganizationStructure.ILines.ICreateLine = {
                      id: nanoid(),
                      name: lines.find(x => x.code === failedLine)?.name,
                      record_id: failedLine,
                      department_id: createdDepartments.find(x => x.record_id === lines.find(x => x.code === failedLine)?.department_code)?.id,
                      department_name: createdDepartments.find(x => x.record_id === lines.find(x => x.code === failedLine)?.department_code)?.name,
                      tenant_id: me?.prefs?.organization,
                      realm_id: me?.prefs?.organization
                    }
                    await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureLine, data.id, data).then(() => {
                      createdLines.push(data);
                    });
                  }
                  catch (error) {
                    console.log("Hat eklenemedi: " + failedLine);
                  }
                }
              });
              tasks.Wait(1);

              const failedEmployees: string[] = [];
              excelData.map((employee, index) => {
                tasks.Task(async () => {
                  if (!propEmployees.find(x => x.id === employee.sicil_no)) {
                    try {
                      let department = createdDepartments.find(x => x.record_id === employee.departman_kodu);
                      let title = createdTitles.find(x => x.record_id === employee.unvan_kodu);
                      let position = createdPositions.find(x => x.record_id === employee.pozisyon_kodu);
                      let line = createdLines.find(x => x.record_id === employee.hat_kodu);
                      if (!department) {
                        department = propDepartments.find(x => x.record_id === employee.departman_kodu);
                      }
                      if (!title) {
                        title = propTitles.find(x => x.record_id === employee.unvan_kodu);
                      }
                      if (!position) {
                        position = propPositions.find(x => x.record_id === employee.pozisyon_kodu);
                      }
                      if (!line) {
                        line = propLines.find(x => x.record_id === employee.hat_kodu);
                      }
                      const data: IOrganizationStructure.IEmployees.ICreateEmployee = {
                        id: employee.sicil_no,
                        first_name: employee.adi,
                        last_name: employee.soyadi,
                        department_id: department?.id,
                        title_id: title?.id,
                        position_id: position?.id,
                        job_start_date: employee["ise_baslama_tarihi"],
                        line_id: line?.id,
                        manager_id: null,
                        birth_date: employee["dogum_tarihi"],
                        gender: employee["cinsiyet"].toLowerCase() === "e" ? "male" : "female",
                        phone: employee["telefon_no"],
                        department_start_date: employee.departmana_baslama_tarihi,
                        position_start_date: employee.pozisyona_baslama_tarihi,
                        realm_id: me?.prefs?.organization,
                        tenant_id: me?.prefs?.organization
                      }
                      if (!propEmployees.find(x => x.id === employee.sicil_no)) {
                        if (data.first_name && data.last_name) {
                          const employeeNanoId = nanoid();
                          await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureEmployee, employeeNanoId, data);
                          await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureEmployeeLog, nanoid(), {
                            employee_id: employeeNanoId,
                            employee_name: data.first_name + " " + data.last_name,
                            log_date: new Date().toISOString(),
                            log_type: "create",
                            department_id: data.department_id,
                            department_name: department?.name,
                            title_id: data.title_id,
                            title_name: title?.name,
                            position_id: data.position_id,
                            position_name: position?.name,
                            line_id: data.line_id,
                            line_name: line?.name,
                            tenant_id: me?.prefs?.organization
                          });
                          setTransferPercent(index / excelData.length * 100);
                        }
                      }
                    } catch (error) {
                      failedEmployees.push(employee.sicil_no);
                    }
                  }
                });
                tasks.Wait(1);
              })


              tasks.Wait(1);
              tasks.Task(async () => {
                for (let failedEmployee of failedEmployees) {
                  try {
                    const employee = excelData.find(x => x.sicil_no === failedEmployee);
                    const data: IOrganizationStructure.IEmployees.ICreateEmployee = {
                      id: employee.sicil_no,
                      first_name: employee.adi,
                      last_name: employee.soyadi,
                      department_id: createdDepartments.find(x => x.record_id === employee.departman_kodu)?.id || null,
                      title_id: createdTitles.find(x => x.record_id === employee.unvan_kodu)?.id || null,
                      position_id: createdPositions.find(x => x.record_id === employee.pozisyon_kodu)?.id || null,
                      line_id: createdLines.find(x => x.record_id === employee.hat_kodu)?.id || null,
                      job_start_date: "",
                      phone: "",
                      birth_date: "",
                      gender: "",
                      department_start_date: employee.departmana_baslama_tarihi,
                      position_start_date: employee.pozisyona_baslama_tarihi,
                      manager_id: null,
                      realm_id: me?.prefs?.organization,
                      tenant_id: me?.prefs?.organization
                    }
                    await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureEmployee, nanoid(), data);
                  } catch (error) {
                    console.log("Çalışan eklenemedi: " + failedEmployee);
                  }
                }
              })
              tasks.Wait(1);
              tasks.Task(async () => {
                Toast.fire({
                  icon: 'success',
                  title: 'Çalışanlar başarıyla aktarıldı.'
                });
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              })
              tasks.Run();
            }
            catch (error: any) {
              console.log(error);
              Swal.fire({
                icon: 'error',
                title: 'Hata Oluştu',
                text: error.message,
                showCloseButton: true,
                closeButtonAriaLabel: 'Tamam',
              })
            }
          }

          // excel import -- end

          const columns: GridColDef[] = [
            {
              field: 'id',
              headerName: 'Sicil Numarası',
              width: 200,
              flex: 1
            },
            {
              field: 'first_name',
              headerName: 'İsim',
              width: 200,
              flex: 1
            },
            {
              field: 'last_name',
              headerName: 'Soyisim',
              width: 200,
              flex: 1
            },
            {
              field: 'title_id',
              headerName: 'Ünvan',
              width: 200,
              flex: 1,
              valueGetter: (params: any) => {
                const title = propTitles.find((title: any) => title.id === params.value);
                if (title) {
                  return title.name;
                } else {
                  return "";
                }
              }
            },
            {
              field: 'position_id',
              headerName: 'Pozisyon',
              width: 200,
              flex: 1,
              valueGetter: (params: any) => {
                const position = propPositions.find((position: any) => position.id === params.value);
                if (position) {
                  return position.name;
                } else {
                  return "";
                }
              }
            },
            {
              field: 'line_id',
              headerName: 'Hat',
              width: 200,
              flex: 1,
              valueGetter: (params: any) => {
                const line = propLines.find((line: any) => line.id === params.value);
                if (line) {
                  return line.name;
                } else {
                  return "";
                }
              }
            },
            {
              field: 'department_id',
              headerName: 'Departman',
              width: 200,
              flex: 1,
              valueGetter: (params: any) => {
                const department = propDepartments.find((department: any) => department.id === params.value);
                if (department) {
                  return department.name;
                } else {
                  return "";
                }
              }
            },
            {
              field: '$createdAt',
              headerName: 'Oluşturulma Tarihi',
              width: 200,
              flex: 1,
              valueGetter: (params: any) => {
                return Resources.Functions.formatDate(params.value);
              }
            },
            {
              field: 'actions',
              headerName: 'İşlemler',
              width: 100,
              renderCell: (params: any) => (
                <Button variant='text' onClick={() => {
                  navigate(Resources.OrganizationStructureTabValues.find(x => x.value === 0)?.link + "/" + params.row.$id);
                }}>Düzenle</Button>
              )
            }
          ];

          const handleChange = (event: React.SyntheticEvent<Element, Event>, value: any) => {
            navigate(Resources.OrganizationStructureTabValues.find(x => x.value === value)?.link + "/list");
          }

          return (
            VStack({ alignment: cTop })(
              HStack({ alignment: cLeading })(
                Views.Title("Organizasyon Yapısı").paddingTop("20px")
              ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
              VStack({ alignment: cTop })(
                ReactView(
                  <div style={{ width: "100%", height: "100%" }}>
                    <AntTabs value={value} onChange={handleChange}>
                      {Resources.OrganizationStructureTabValues.map((tabValue) => (
                        <AntTab key={tabValue.value} label={tabValue.label} {...a11yProps(tabValue.value)} />
                      ))}
                    </AntTabs>
                    <TabPanel value={value} index={0}>
                      <div style={{ display: "flex", flexDirection: "column", padding: "8px 0", gap: "5px" }
                      }>
                        {/* employee import */}
                        < Dialog
                          open={open}
                          onClose={handleClose}
                          fullScreen
                        >
                          <DialogTitle>Çalışan Aktarımı</DialogTitle>
                          <DialogContent>
                            <div style={{
                              height: "calc(100vh - 150px)",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center"
                            }}>
                              <StyledDataGrid rows={excelData} columns={excelColumns} sx={{ width: "100%" }}
                                localeText={trTR.components.MuiDataGrid.defaultProps.localeText} /> {/* excel data */}
                              {isTransfer &&
                                <div style={{ width: "100%" }}>
                                  <DialogContentText>Aktarım yapılıyor...</DialogContentText>
                                  <LinearProgressWithLabel value={transferPercent} />
                                </div>
                              }
                            </div>
                          </DialogContent>
                          <DialogActions>
                            {!isTransfer && <Button onClick={handleClose} color='error' variant='contained'>İptal</Button>}
                            {!isTransfer && <Button variant='contained' color='primary' onClick={() => { handleTransfer() }}>Aktarımı Başlat</Button>}
                          </DialogActions>
                        </Dialog>
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                          <div style={{ width: "60%" }}>
                            <TextField size='small' label='Personel Arayın' variant='outlined' fullWidth onChange={(e) => setFilterKey(e.target.value)} />
                          </div>
                          <div style={{ width: "10%" }}>
                            {
                              <Tooltip title={`${active ? "Pasif" : "Aktif"} Personelleri Göster`}>
                                <Button variant='contained' fullWidth onClick={() => setActive(!active)} size='small'><MdDisplaySettings size={20} /></Button>
                              </Tooltip>
                            }
                          </div>
                          <div style={{ width: "30%", display: "flex", gap: "5px" }}>
                            <Button variant='contained' fullWidth size='small' onClick={() => {
                              navigate(Resources.OrganizationStructureTabValues.find(x => x.value === 0)?.link + "/create");
                            }}>Yeni Personel</Button>
                            {(accountRelation.is_admin || accountRelation.authorization_profile === "admin") && <Tooltip title={`Çalışan Aktarım Şablonunu İndir`}>
                              <Button
                                variant='contained'
                                onClick={() => employeeTransferTemplateByExcel(localStorage.getItem(Resources.ParameterLocalStr.line_based_competency_relationship) == "true" ? true : false)}
                                size='small'><SiMicrosoftexcel size={20} />
                              </Button>
                            </Tooltip>
                            }
                            {(accountRelation.is_admin || accountRelation.authorization_profile === "admin") && <Tooltip title={`Çalışan Aktarım Şablonunu Yükle`}>
                              <Button
                                variant='outlined'
                                onClick={handleButtonClick}
                                size='small'><SiMicrosoftexcel size={20} /><input
                                  type='file'
                                  accept='.xlsx, .xls'
                                  onChange={handleFileChange}
                                  ref={fileInputRef}
                                  style={{ display: 'none' }}
                                />
                              </Button>
                            </Tooltip>
                            }
                          </div>
                        </div>
                        <GridContainer>
                          <StyledDataGrid rows={filteredEmployees.filter(x => x.is_active === active)} columns={columns} />
                        </GridContainer>
                      </div>
                    </TabPanel>
                  </div>

                )
              ).paddingTop("10px")
            ).padding("0 10px 0 20px")
          )
        })

    )
  }
}