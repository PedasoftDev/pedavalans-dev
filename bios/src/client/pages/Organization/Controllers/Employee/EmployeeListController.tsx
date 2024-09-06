import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Tooltip } from '@mui/material'
import { GridColDef, GridToolbarContainer, GridToolbarExport, trTR } from '@mui/x-data-grid'
import React, { useEffect, useRef, useState } from 'react'
import { MdDisplaySettings } from 'react-icons/md'
import StyledDataGrid from '../../../../components/StyledDataGrid'
import { SiMicrosoftexcel } from 'react-icons/si'
import { employeeTransferTemplateByExcel } from '../../../../assets/Functions/employeeTransferTemplateByExcel'
import { Resources } from '../../../../assets/Resources'
import excelToJson from '../../../../assets/Functions/excelToJson'
import { HStack, ReactView, Spinner, UIController, UIView, UIViewBuilder, VStack, cLeading, cTop, nanoid, useNavigate } from '@tuval/forms';
import { Query, Services, useGetMe } from '@realmocean/sdk'
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
import employeeListExport from '../../../../assets/Functions/employeeListExport'
import Parameters from '../../../../../server/hooks/parameters/main'
import { DataImportBroker } from '../../../../../server/brokers/DataImportBroker'



export interface IEmployeeImportFromExcel {
  sicil_no: string;
  adi: string;
  soyadi: string;
  dogum_tarihi: string;
  telefon_no: string;
  cinsiyet: string;
  egitim_durumu: string;
  ise_baslama_tarihi: string;
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
  let jsDate = new Date((excelDate - (25567 + 1)) * 86400 * 1000);
  jsDate.setDate(jsDate.getDate() - 1);
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
    const { parameters: lineBased, isLoading: isLoadingParameter } = Parameters.GetParameterByName(Resources.ParameterLocalStr.line_based_competency_relationship)

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

          const [lineRelationState, setLineRelationState] = useState<boolean>(false);
          const [workPlaceDefination, setWorkPlaceDefination] = useState<boolean>(false);


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
            DataImportBroker.Default.employeeImport(excelData, me.prefs.organization).then((res) => {
              setIsTransfer(false);
              handleClose();
              Toast.fire({
                icon: 'success',
                title: 'Çalışanlar başarıyla aktarıldı.'
              });
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }).catch((error) => {
              setOpen(false);
              setIsTransfer(false);
              Swal.fire({
                icon: 'error',
                title: 'Hata Oluştu',
                text: error.message,
                showCloseButton: true,
                closeButtonAriaLabel: 'Tamam',
              })
            })
          }

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

          const employeeExport = () => {
            employeeListExport(localStorage.getItem(Resources.ParameterLocalStr.line_based_competency_relationship) == "true" ? true : false, filteredEmployees.filter(x => x.is_active === active), propDepartments, propTitles, propPositions, propLines)
          }
          useEffect(() => {
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
            })
          }, [])
          return (
            VStack({ alignment: cTop })(
              HStack({ alignment: cLeading })(
                Views.Title(active ? "Organizasyon Yapısı" : "Organizasyon Yapısı / Pasif Çalışanlar").paddingTop("20px")
              ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
              VStack({ alignment: cTop })(
                ReactView(
                  <div style={{ width: "100%", height: "100%" }}>
                    <AntTabs value={value} onChange={handleChange}>
                      {Resources.OrganizationStructureTabValues.map((tabValue) => (
                        <AntTab
                          key={tabValue.value}
                          label={tabValue.label}
                          disabled={tabValue.value === 3 && !lineRelationState || tabValue.value === 5 && !workPlaceDefination} // "Hatlar" sekmesi devre dışı bırakılır
                          {...a11yProps(tabValue.value)} />
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
                            <Tooltip title={`Çalışan Listesini İndir`}>
                              <Button
                                variant='contained'
                                color='success'
                                onClick={employeeExport}
                                size='small'><SiMicrosoftexcel size={20} />
                              </Button>
                            </Tooltip>
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
                          <StyledDataGrid rows={filteredEmployees.filter(x => x.is_active === active)} columns={columns} columnVisibilityModel={{
                            line_id: lineRelationState ? true : false,
                          }}
                          // slots={{ toolbar: CustomToolbar }}
                          />
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