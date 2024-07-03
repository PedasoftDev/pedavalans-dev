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
import VocationalQualification from '../../../../server/hooks/vocationalQualification/main'
import VocationalQualificationType from '../../../../server/hooks/vocationalQualificationType/main'
import { GridContainer } from '../Views/View'

export class VocationalQualificationListController extends UIFormController {
  public LoadView(): UIView {
    const navigate = useNavigate()
    const { me, isLoading } = useGetMe('console')
    const { documentGetList, isLoading: isLoadingDocument } = VocationalQualification.GetList(me?.prefs?.organization)
    const { documentTypeGetList, isLoading: isLoadingDocumentType } = VocationalQualificationType.GetList(me?.prefs?.organization)

    const [rowsActive, setRowsActive] = useState(true)
    const [filterKey, setFilterKey] = useState('')

    return isLoading || isLoadingDocument || isLoadingDocumentType
      ? VStack(Spinner())
      : me === null
        ? UINavigate('/login')
        : UIViewBuilder(() => {
          const columns: GridColDef[] = [
            {
              field: 'document_code',
              headerName: 'Belge Kodu',
              width: 150,
            },
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
              field: 'document_validity_period',
              headerName: 'Belgenin Bitiş Ön Hatırlatması(Gün)',
              type: 'number',
              width: 200,
              editable: true,
            },
            {
              field: 'document_id',
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
                          `/app/vocational-qualification/edit/${params.value}`
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
              Views.Title(
                'Mesleki Yeterlilik Belge ve Sertifikalar'
              ).paddingTop('10px')
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
                        placeholder="Belge ve Sertifikaları Arayın..."
                        size="small"
                        fullWidth
                        onChange={handleSearch}
                      />
                    </div>
                    <Tooltip
                      title={`${rowsActive ? 'Pasif' : 'Aktif'
                        } Belgeleri Göster`}
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
                          navigate('/app/vocational-qualification/create')
                        }
                      >
                        Yeni Belge Ekle
                      </Button>
                      <Button
                        size="small"
                        fullWidth
                        variant="outlined"
                        onClick={() =>
                          navigate('/app/vocational-qualification-type/list')
                        }
                      >
                        Belge Türleri
                      </Button>
                    </div>
                  </div>
                  <GridContainer>
                    <StyledDataGrid
                      rows={
                        documentGetList
                          ? documentGetList
                            .filter((item) => item.is_active === rowsActive)
                            .filter(
                              (item) =>
                                item.document_name
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
