import {
  ReactView,
  Spinner,
  UIController,
  UIView,
  UIViewBuilder,
  VStack,
  cTop,
  useEffect,
  useNavigate,
  useParams,
  useState,
} from '@tuval/forms'
import Swal from 'sweetalert2'
import { Toast } from '../../../components/Toast'
import {
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material'
import Form from '../Views/Form'
import React from 'react'
import { useDeleteCache, useGetMe } from '@realmocean/sdk'
import removeDollarProperties from '../../../assets/Functions/removeDollarProperties'
import AppInfo from '../../../../AppInfo'
import IVocationalQualificationType from '../../../interfaces/IVocationalQualificationType'
import VocationalQualificationType from '../../../../server/hooks/vocationalQualificationType/main'
import { PedavalansServiceBroker } from '../../../../server/brokers/PedavalansServiceBroker'

const formReset: IVocationalQualificationType.IBase = {
  document_type_id: '',
  document_type_name: '',
  document_type_code: '',
  document_is_validity_period: "YOK",
  is_active: true,
  is_deleted: false,
}

export class UpdateVocationalQualificationTypeController extends UIController {
  public LoadView(): UIView {
    const navigate = useNavigate()
    const { id } = useParams()

    const { me, isLoading } = useGetMe('console')
    const { documentType, isLoadingDocumentType } = VocationalQualificationType.Get(id)
    const { documentTypeGetList, isLoading: isLoadingDocumentTypeGetList } = VocationalQualificationType.GetList(me?.prefs?.organization)
    const { updateVQType } = VocationalQualificationType.Update()
    const { deleteCache } = useDeleteCache(AppInfo.Name);

    return isLoading || isLoadingDocumentType || isLoadingDocumentTypeGetList ? VStack(Spinner()) :
      UIViewBuilder(() => {
        const [form, setForm] = useState<IVocationalQualificationType.IBase>(formReset)
        const [isActive, setIsActive] = useState<boolean>(true)

        useEffect(() => {
          setForm(removeDollarProperties(documentType))

          setIsActive(documentType.is_active)
        }, [])

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setForm({
            ...form,
            [e.target.name as string]: e.target.value,
          })
        }

        const onSubmit = (e) => {
          e.preventDefault()
          Toast.fire({
            icon: 'info',
            title: 'Mesleki Yeterlilik Türü düzenleniyor...',
            timer: 5000,
          })

          if (documentTypeGetList.find((x) => x.document_type_code === form.document_type_code && x.document_type_id !== form.document_type_id)) {
            Toast.fire({
              icon: 'error',
              title: 'Belge Türü Kodu zaten mevcut.',
            })
            return
          }

          const success = () => {
            Toast.fire({
              icon: 'success',
              title: 'Mesleki Yeterlilik Türü başarıyla düzenlendi.',
            })
            navigate('/app/vocational-qualification-type/list')
          }

          updateVQType(
            {
              databaseId: AppInfo.Database,
              collectionId: 'vocational_qualification_type',
              documentId: id,
              data: form,
            },
            () => {
              PedavalansServiceBroker.Default.updateVocationQualificationTypeNames(id, form.document_type_name).then(() => {
                success()
                deleteCache();
              })
            }
          )
        }

        const onCancel = () => {
          navigate('/app/vocational-qualification-type/list')
        }

        const onDelete = () => {
          Swal.fire({
            title: 'Mesleki Yeterlilik Türü Silme',
            text: 'Mesleki Yeterlilik Türünü silmek istediğinize emin misiniz?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sil',
            cancelButtonText: 'İptal',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
          }).then((result) => {
            if (result.isConfirmed) {
              Toast.fire({
                icon: 'info',
                title: 'Mesleki Yeterlilik Türü siliniyor...',
                timer: 5000,
              })
              updateVQType(
                {
                  databaseId: AppInfo.Database,
                  collectionId: 'vocational_qualification_type',
                  documentId: id,
                  data: {
                    ...form,
                    is_deleted: true,
                  },
                },
                () => {
                  Toast.fire({
                    icon: 'success',
                    title: 'Mesleki Yeterlilik Türü başarıyla silindi.',
                  })
                  deleteCache();
                  navigate('/app/vocational-qualification-type/list')
                }
              )
            }
          })
        }

        return VStack({ alignment: cTop })(
          ReactView(
            <Form
              title="Tanımlı Yetkinliği Düzenleyin"
              form={
                <form
                  onSubmit={onSubmit}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    width: '60%',
                    height: 'calc(100vh - 200px)',
                  }}
                >
                  <TextField
                    size="small"
                    fullWidth
                    onChange={handleChange}
                    value={form.document_type_code}
                    name="document_type_code"
                    inputProps={{ maxLength: 50 }}
                    label="Belge Türü Kodu"
                    required
                  />
                  <TextField
                    fullWidth
                    onChange={handleChange}
                    value={form.document_type_name}
                    name="document_type_name"
                    label="Belge Türü Adı"
                    required
                    size='small'
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
                  <FormControlLabel
                    sx={{ width: "100%", alignContent: "end" }}
                    onChange={(e: any) => setForm({ ...form, is_active: e.target.checked })}
                    value={form.is_active}
                    control={<Switch color="primary" checked={form.is_active} />}
                    label="Aktif mi?"
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
                      Güncelle
                    </Button>
                    {!isActive && (
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={onDelete}
                      >
                        Sil
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      onClick={onCancel}
                    >
                      İptal
                    </Button>
                  </div>
                </form>
              }
            />
          )
        ).padding('30px 20px')
      })
  }
}
