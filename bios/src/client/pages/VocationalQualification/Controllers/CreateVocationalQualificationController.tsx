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
  Autocomplete,
} from '@mui/material'
import { useGetMe } from '@realmocean/sdk'
import Competency from '../../../../server/hooks/competency/main'
import { Resources } from '../../../assets/Resources'
import Form from '../../Competency/Views/Form'
import StyledDataGrid from '../../../components/StyledDataGrid'
import { GridColDef, trTR } from '@mui/x-data-grid'

import VocationalQualification from '../../../../server/hooks/vocationalQualification/main'
import { Toast } from '../../../components/Toast'
import IVocationalQualification from '../../../interfaces/IVocationalQualification'
import VocationalQualificationType from '../../../../server/hooks/vocationalQualificationType/main'

const resetForm: IVocationalQualification.IAddDocument = {
  document_id: '',
  document_code: '',
  document_type_id: "",
  document_type_name: "",
  document_name: '',
  document_validity_period: "",
  tenant_id: '',
}

export class CreateVocationalQualificationController extends UIFormController {
  public LoadView(): UIView {

    const navigate = useNavigate()

    const { me, isLoading } = useGetMe('console')

    const { createVocationalQualification } = VocationalQualification.Create()
    const { documentGetList, isLoading: isLoadingDocument } = VocationalQualification.GetList(me?.prefs?.organization)

    const { documentTypeGetList, isLoading: isLoadingDocumentType } = VocationalQualificationType.GetList(me?.prefs?.organization)

    return VStack({ alignment: cTop })(
      isLoading || isLoadingDocument || isLoadingDocumentType
        ? VStack(Spinner())
        : UIViewBuilder(() => {
          const [form, setForm] = useState<IVocationalQualification.IAddDocument>(resetForm)
          const [showValidityPeriod, setShowValidityPeriod] = useState<boolean>(false)

          const navigateToList = () => navigate('/app/vocational-qualification/list')

          const handleChangeText = (e: any) => {
            setForm({ ...form, [e.target.name]: e.target.value })
          }

          const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault()

            if (documentGetList.filter((document) => document.document_code === form.document_code).length > 0) {
              Toast.fire({
                icon: 'error',
                title: 'Bu yeterlilik belge kodu zaten mevcut!',
              })
              return
            }
            

            Toast.fire({
              icon: "info",
              title: "Mesleki Yeterlilik Belgesi Oluşturuluyor..."
            })


            const createDocumentId: string = nanoid()
            form.document_id = createDocumentId;
            form.tenant_id = me?.prefs?.organization
            createVocationalQualification(
              {
                documentId: createDocumentId,
                data: {
                  ...form,
                },
              },
              () => {
                Toast.fire({
                  icon: 'success',
                  title:
                    'Mesleki Yeterlilik Belgesi başarıyla oluşturuldu.',
                })
                setTimeout(() => {
                  navigate('/app/vocational-qualification/list')
                }, 2000)
              }
            )
          }

          return ReactView(
            <Form
              title="Yeni Belge Ekle"
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
                    value={form.document_code}
                    name="document_code"
                    inputProps={{ maxLength: 50 }}
                    label="Belge Kodu"
                    required
                  />
                  <FormControl fullWidth size="small" required>
                    <Autocomplete
                      options={documentTypeGetList}
                      getOptionLabel={(document_type) => document_type.document_type_name}
                      value={documentTypeGetList.find((document_type) => document_type.document_type_id === form.document_type_id) || null}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          const showValidityPeriod = newValue.document_is_validity_period === "VAR";
                          setShowValidityPeriod(showValidityPeriod);
                          setForm({
                            ...form,
                            document_type_id: newValue.document_type_id,
                            document_type_name: newValue.document_type_name,
                            document_validity_period: showValidityPeriod ? "" : "Süresiz"
                          });
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Belge Türü"
                          size="small"
                          required
                        />
                      )}
                    />
                  </FormControl>
                  <TextField
                    size="small"
                    fullWidth
                    onChange={handleChangeText}
                    value={form.document_name}
                    name="document_name"
                    label="Belge Adı"
                  />
                  {showValidityPeriod && (
                    <TextField
                      size="small"
                      fullWidth
                      onChange={handleChangeText}
                      value={form.document_validity_period}
                      name="document_validity_period"
                      label="Belge Bitiş Tarihi Ön Hatırlatması Kaç Gün Önce Yapılsın?"
                    />
                  )}
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
