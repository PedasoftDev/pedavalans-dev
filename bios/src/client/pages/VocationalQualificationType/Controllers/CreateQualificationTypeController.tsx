import {
  ReactView,
  Spinner,
  UIFormController,
  UIView,
  UIViewBuilder,
  VStack,
  cTop,
  nanoid,
  useNavigate,
} from '@tuval/forms'
import React, { useState } from 'react'
import {
  Button,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Typography,
  Switch,
  FormControlLabel,
} from '@mui/material'
import { useGetMe } from '@realmocean/sdk'
import Competency from '../../../../server/hooks/competency/main'
import { Resources } from '../../../assets/Resources'
import Form from '../../Competency/Views/Form'
import StyledDataGrid from '../../../components/StyledDataGrid'
import { GridColDef, trTR } from '@mui/x-data-grid'

import VocationalQualificationType from '../../../../server/hooks/vocationalQualificationType/main'
import { Toast } from '../../../components/Toast'
import IVocationalQualificationType from '../../../interfaces/IVocationalQualificationType'

const resetForm: IVocationalQualificationType.IAddDocumentType = {
  document_type_id: '',
  document_type_code: '',
  document_type_name: '',
  document_is_validity_period: "YOK",
  tenant_id: '',
}

export class CreateQualificationTypeController extends UIFormController {
  public LoadView(): UIView {
    const navigate = useNavigate()

    const { me, isLoading } = useGetMe('console')

    const { createVocationalQualificationType } =
      VocationalQualificationType.Create()

    const { documentTypeGetList, isLoading: isLoadingDocumentType } =
      VocationalQualificationType.GetList(me?.prefs?.organization)

    return VStack({ alignment: cTop })(
      isLoading || isLoadingDocumentType
        ? VStack(Spinner())
        : UIViewBuilder(() => {
          const [form, setForm] =
            useState<IVocationalQualificationType.IAddDocumentType>(resetForm)

          const navigateToList = () =>
            navigate('/app/vocational-qualification-type/list')

          const handleChangeText = (e: any) => {
            setForm({ ...form, [e.target.name]: e.target.value })
          }

          const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault()
            Toast.fire({
              icon: 'info',
              title: 'Mesleki Yeterlilik Türü ekleniyor...',
              timer: 5000,
            })
            if (
              documentTypeGetList.some(
                (document) =>
                  document.document_type_code === form.document_type_code
              )
            ) {
              Toast.fire({
                icon: 'error',
                title: 'Bu yeterlilik türünün kodu zaten mevcut!',
              })
              return
            }
            const document_type_id: string = nanoid()
            createVocationalQualificationType(
              {
                documentId: document_type_id,
                data: {
                  ...form,
                  document_type_id: document_type_id,
                  tenant_id: me?.prefs?.organization,
                },
              },
              (res) => {
                Toast.fire({
                  icon: 'success',
                  title: 'Mesleki Yeterlilik Türü başarıyla oluşturuldu.',
                })
                setTimeout(() => {
                  navigate('/app/vocational-qualification-type/list')
                }, 2000)
              }
            )
          }

          return ReactView(
            <Form
              title="Yeni Belge Türü Ekle"
              form={
                <form
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    width: '60%',
                  }}
                  onSubmit={handleSubmit}
                >
                  <TextField
                    size="small"
                    fullWidth
                    onChange={handleChangeText}
                    value={form.document_type_code}
                    name="document_type_code"
                    inputProps={{ maxLength: 50 }}
                    label="Belge Türü Kodu"
                    required
                  />
                  <TextField
                    fullWidth
                    onChange={handleChangeText}
                    value={form.document_type_name}
                    name="document_type_name"
                    label="Belge Türü Adı"
                    required
                  />
                  <FormControlLabel
                    sx={{
                      width: '100%',
                      alignContent: 'end',
                      padding: '0 5px 0 0',
                    }}
                    onChange={(e: any) =>
                      setForm({
                        ...form,
                        document_is_validity_period: e.target.checked ? "VAR" : "YOK",
                      })
                    }
                    control={
                      <Switch
                        color="primary"
                        checked={form.document_is_validity_period === "VAR" ? true : false}
                      />
                    }
                    label="Belgenin Geçerlilik Süresi Var mı?"
                    labelPlacement="start"
                  />
                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                      flexDirection: 'column',
                      marginTop: '10px',
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      Kaydet
                    </Button>
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      onClick={navigateToList}
                    >
                      İptal
                    </Button>
                  </div>
                </form>
              }
            />
          )
        })
    ).padding('30px 20px')
  }
}
