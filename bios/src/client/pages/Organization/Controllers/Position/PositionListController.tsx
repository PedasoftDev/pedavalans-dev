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
import OrganizationStructurePosition from '../../../../../server/hooks/organizationStructrePosition/main'
import { AntTab, AntTabs, TabPanel, a11yProps } from '../../../../components/Tabs'
import AppInfo from '../../../../../AppInfo'
import Collections from '../../../../../server/core/Collections'


export class PositionListController extends UIController {


  public LoadView(): UIView {

    const { me, isLoading } = useGetMe("console");
    const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id)
    const { positions, isLoadingPositions } = OrganizationStructurePosition.GetList(me?.prefs?.organization)

    const navigate = useNavigate();

    return (
      isLoading || isLoadingResult || isLoadingPositions ? VStack(Spinner()) :
        UIViewBuilder(() => {
          const accountRelation = accountRelations[0]
          const value = 2;

          const [filterKey, setFilterKey] = useState("");
          const [active, setActive] = useState(true);
          const [lineRelationState, setLineRelationState] = useState<boolean>(false);
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
              headerName: 'Pozisyon Adı',
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
                  navigate(Resources.OrganizationStructureTabValues.find(x => x.value === 2)?.link + "/" + params.row.$id);
                }}>Düzenle</Button>
              )
            }
          ];

          const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: any) => {
            navigate(Resources.OrganizationStructureTabValues.find(x => x.value === newValue)?.link + "/list");
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
                Views.Title(active ? "Organizasyon Yapısı" : "Organizasyon Yapısı / Pasif Pozisyonlar").paddingTop("20px")
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
                    <TabPanel value={value} index={2}>
                      <div style={{ display: "flex", flexDirection: "column", padding: "8px 0", gap: "5px" }
                      }>
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                          <div style={{ width: "60%" }}>
                            <TextField size='small' label='Pozisyon Arayın' variant='outlined' fullWidth onChange={(e) => setFilterKey(e.target.value)} />
                          </div>
                          <div style={{ width: "10%" }}>
                            {
                              <Tooltip title={`${active ? "Pasif" : "Aktif"} Pozisyonları Göster`}>
                                <Button variant='contained' fullWidth onClick={() => setActive(!active)} size='small'><MdDisplaySettings size={20} /></Button>
                              </Tooltip>
                            }
                          </div>
                          <div style={{ width: "30%", display: "flex", gap: "5px" }}>
                            <Button variant='contained' fullWidth size='small' onClick={() => {
                              navigate(Resources.OrganizationStructureTabValues.find(x => x.value === value)?.link + "/create");
                            }}>Yeni Pozisyon</Button>
                          </div>
                        </div>
                        <GridContainer>
                          <StyledDataGrid
                            rows={positions.filter(x => x.is_active === active).filter(x => x.name.toLowerCase().indexOf(filterKey.toLowerCase()) > -1)}
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