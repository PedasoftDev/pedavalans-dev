import { Button, IconButton, TextField, Tooltip } from '@mui/material'
import {
  HStack,
  ReactView,
  Spinner,
  UIFormController,
  UINavigate,
  UIView,
  UIViewBuilder,
  VStack,
  cLeading,
  cTop,
  cTopLeading,
  useNavigate,
} from '@tuval/forms'
import React, { useState } from 'react'
import { Views } from '../../../components/Views'
import StyledDataGrid from '../../../components/StyledDataGrid'
import { GridColDef, trTR } from '@mui/x-data-grid'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { useGetMe } from '@realmocean/sdk'
import VocationalQualificationType from '../../../../server/hooks/vocationalQualificationType/main'
import { Resources } from '../../../assets/Resources'
import { GridContainer } from '../Views/View'

export class VocationalQualificationTypeListController extends UIFormController {
  public LoadView(): UIView {
    const navigate = useNavigate()
    const { me, isLoading } = useGetMe('console')
    const { documentTypeGetList, isLoading: isLoadingDocumentType } =
      VocationalQualificationType.GetList(me?.prefs?.organization)

    const [rowsActive, setRowsActive] = useState(true)
    const [filterKey, setFilterKey] = useState('')

    return isLoading || isLoadingDocumentType
      ? VStack(Spinner())
      : me === null
        ? UINavigate('/login')
        : UIViewBuilder(() => {
          const columns: GridColDef[] = [
            {
              field: 'document_type_code',
              headerName: 'Belge Türü Kodu',
              width: 150,
            },
            {
              field: 'document_type_name',
              headerName: 'Belge Türü Adı',
              flex: 1,
            },
            {
              field: 'document_is_validity_period',
              headerName: 'Belgenin Geçerliliği',
              type: 'string',
              width: 200,
              editable: false,
            },
            {
              field: 'document_type_id',
              headerName: 'İşlemler',
              minWidth: 70,
              editable: false,
              disableColumnMenu: true,
              renderCell: (params) => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      variant="text"
                      size="small"
                      onClick={() =>
                        navigate(
                          `/app/vocational-qualification-type/edit/${params.value}`
                        )
                      }
                    >
                      Düzenle
                    </Button>
                  </div>
                )
              },
            },
          ]

          const handleSetActiveRows = () => {
            setRowsActive(!rowsActive)
          }

          const handleSearch = (e: any) => {
            setFilterKey(e.target.value)
          }

          return VStack({ spacing: 15, alignment: cTopLeading })(
            HStack({ alignment: cLeading })(
              Views.Title(rowsActive ? 'Mesleki Yeterlilik Belge Türleri' : 'Pasif Mesleki Yeterlilik Belge Türleri').paddingTop('10px')
            )
              .height(70)
              .shadow('rgb(0 0 0 / 5%) 0px 4px 2px -2px'),
            HStack({ alignment: cTop })(
              ReactView(
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ width: '70%' }}>
                      <TextField
                        placeholder="Belge Türü Arayın..."
                        size="small"
                        fullWidth
                        onChange={handleSearch}
                      />
                    </div>
                    <Tooltip
                      title={`${rowsActive ? 'Pasif' : 'Aktif'
                        } Belge Türlerini Göster`}
                    >
                      <IconButton onClick={handleSetActiveRows}>
                        <FilterAltOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <div
                      style={{
                        width: '30%',
                        display: 'flex',
                        gap: '10px',
                      }}
                    >
                      <Button
                        size="small"
                        fullWidth
                        variant="outlined"
                        onClick={() =>
                          navigate('/app/vocational-qualification-type/create')
                        }
                      >
                        Yeni Belge Türü Ekle
                      </Button>
                      <Button
                        size="small"
                        fullWidth
                        variant="outlined"
                        onClick={() =>
                          navigate('/app/vocational-qualification/list')
                        }
                      >
                        Belge ve Sertifikalar
                      </Button>
                    </div>
                  </div>
                  <GridContainer>
                    <StyledDataGrid
                      rows={
                        documentTypeGetList
                          ? documentTypeGetList
                            .filter((item) => item.is_active === rowsActive)
                            .filter(
                              (item) =>
                                item.document_type_name
                                  .toLowerCase()
                                  .indexOf(filterKey.toLowerCase()) > -1
                            )
                          : []
                      }
                      columns={columns}
                      getRowId={(row) => row.$id}
                      localeText={
                        trTR.components.MuiDataGrid.defaultProps.localeText
                      }
                    />
                  </GridContainer>
                </div>
              )
            )
          ).padding('0 20px')
        })
  }
}
