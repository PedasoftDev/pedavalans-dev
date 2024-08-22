import { Button, TextField, Tooltip } from '@mui/material'
import { GridColDef, } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { MdDisplaySettings } from 'react-icons/md'
import StyledDataGrid from '../../../../components/StyledDataGrid'
import { Resources } from '../../../../assets/Resources'
import { HStack, ReactView, Spinner, UIController, UIView, UIViewBuilder, VStack, cLeading, cTop, useNavigate } from '@tuval/forms';
import { Query, Services, useGetMe } from '@realmocean/sdk'
import { Views } from '../../../../components/Views'
import AccountRelation from '../../../../../server/hooks/accountRelation/main'
import { GridContainer } from '../../Views/Views'
import OrganizationStructureLine from '../../../../../server/hooks/organizationStructureLine/main'
import { AntTab, AntTabs, TabPanel, a11yProps } from '../../../../components/Tabs'
import AppInfo from '../../../../../AppInfo'
import Collections from '../../../../../server/core/Collections'


export class LineListController extends UIController {


  public LoadView(): UIView {

    const { me, isLoading } = useGetMe("console");
    const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id)
    const { lines, isLoadingLines } = OrganizationStructureLine.GetList(me?.prefs?.organization)

    const navigate = useNavigate();

    return (
      isLoading || isLoadingResult || isLoadingLines ? VStack(Spinner()) :
        UIViewBuilder(() => {
          const accountRelation = accountRelations[0]
          const value = 3;

          const [filterKey, setFilterKey] = useState("");
          const [active, setActive] = useState(true);
          const [workPlaceDefination, setWorkPlaceDefination] = useState<boolean>(false);


          const columns: GridColDef[] = [
            {
              field: 'record_id',
              headerName: 'Kayıt Kodu',
              width: 200,
              flex: 1
            },
            {
              field: 'name',
              headerName: 'Hat Adı',
              width: 200,
              flex: 1
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
                  navigate(Resources.OrganizationStructureTabValues.find(x => x.value === value)?.link + "/" + params.row.$id);
                }}>Düzenle</Button>
              )
            }
          ];

          const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: any) => {
            navigate(Resources.OrganizationStructureTabValues.find(x => x.value === newValue)?.link + "/list");
          }

          useEffect(() => {
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
          }, [])
          return (
            VStack({ alignment: cTop })(
              HStack({ alignment: cLeading })(
                Views.Title(active ? "Organizasyon Yapısı" : "Organizasyon Yapısı / Pasif Hatlar").paddingTop("20px")
              ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
              VStack({ alignment: cTop })(
                ReactView(
                  <div style={{ width: "100%", height: "100%" }}>
                    <AntTabs value={value} onChange={handleChange}>
                      {Resources.OrganizationStructureTabValues.map((tabValue) => (
                        <AntTab key={tabValue.value} label={tabValue.label} disabled={tabValue.value === 5 && !workPlaceDefination} // "Hatlar" sekmesi devre dışı bırakılır
                          {...a11yProps(tabValue.value)} />
                      ))}
                    </AntTabs>
                    <TabPanel value={value} index={value}>
                      <div style={{ display: "flex", flexDirection: "column", padding: "8px 0", gap: "5px" }
                      }>
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                          <div style={{ width: "60%" }}>
                            <TextField size='small' label='Hat Arayın' variant='outlined' fullWidth onChange={(e) => setFilterKey(e.target.value)} />
                          </div>
                          <div style={{ width: "10%" }}>
                            {
                              <Tooltip title={`${active ? "Pasif" : "Aktif"} Hatları Göster`}>
                                <Button variant='contained' fullWidth onClick={() => setActive(!active)} size='small'><MdDisplaySettings size={20} /></Button>
                              </Tooltip>
                            }
                          </div>
                          <div style={{ width: "30%", display: "flex", gap: "5px" }}>
                            <Button variant='contained' fullWidth size='small' onClick={() => {
                              navigate(Resources.OrganizationStructureTabValues.find(x => x.value === value)?.link + "/create");
                            }}>Yeni Hat</Button>
                          </div>
                        </div>
                        <GridContainer>
                          <StyledDataGrid
                            rows={lines.filter(x => x.is_active === active).filter(x => x.name.toLowerCase().indexOf(filterKey.toLowerCase()) > -1)}
                            columns={columns} />
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