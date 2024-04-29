import {
  ReactView,
  Spinner,
  UIController,
  UIView,
  UIViewBuilder,
  VStack,
  cTop,
  nanoid,
  useEffect,
  useNavigate,
  useParams,
  useState,
} from '@tuval/forms'
import Swal from 'sweetalert2'
import { Toast } from '../../../components/Toast'
import { GridColDef, trTR } from '@mui/x-data-grid'

import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import Form from '../Views/Form'
import React from 'react'
import StyledDataGrid from '../../../components/StyledDataGrid'
import { useGetMe } from '@realmocean/sdk'
import removeDollarProperties from '../../../assets/Functions/removeDollarProperties'
import AppInfo from '../../../../AppInfo'
import Parameters from '../../../../server/hooks/parameters/main'
import { Resources } from '../../../assets/Resources'
import IVocationalQualification from '../../../interfaces/IVocationalQualification'
import IVocationalQualificationType from '../../../interfaces/IVocationalQualificationType'
import VocationalQualification from '../../../../server/hooks/vocationalQualification/main'
import VocationalQualificationType from '../../../../server/hooks/vocationalQualificationType/main'

const formReset: IVocationalQualification.IBase = {
  document_id: '',
  document_name: '',
  document_code: '',
  document_validity_period: "",
  document_type_id: "",
  document_type_name: "",
  is_active: false,
  is_deleted: false,
}

export class UpdateVocationalQualificationController extends UIController {
  public LoadView(): UIView {
    const navigate = useNavigate()
    const { id } = useParams()

    const { me, isLoading } = useGetMe('console')

    const { documentList, isLoadingDocument } = VocationalQualification.Get(id)
    const { documentGetList } = VocationalQualification.GetList(me?.prefs?.organization)
    const { updateVQ } = VocationalQualification.Update()


    const { documentTypeGetList } = VocationalQualificationType.GetList(me?.prefs?.organization)

    return isLoading || isLoadingDocument
      ? VStack(Spinner())
      : UIViewBuilder(() => {
        const [form, setForm] = useState<IVocationalQualification.IBase>(formReset)
        const [showValidityPeriod, setShowValidityPeriod] = useState<boolean>(false)
        const [isActive, setIsActive] = useState<boolean>(true)

        useEffect(() => {
          setForm(removeDollarProperties(documentList))

          setIsActive(documentList.is_active)
        }, [])

        const handleChangeText = (e: any) => {
          setForm({ ...form, [e.target.name]: e.target.value })
        }

        const handleSelectType = (e: SelectChangeEvent<string>) => {
          const selectedValue = e.target.value;
          const selectedDocumentType = documentTypeGetList.find((type) => type.document_type_id === selectedValue);

          if (selectedDocumentType.document_is_validity_period === "VAR") {
            setShowValidityPeriod(true);
            setForm({
              ...form,
              [e.target.name]: selectedValue,
              document_type_name: selectedDocumentType.document_type_name, document_validity_period: ""
            });
          } else {
            setShowValidityPeriod(false);
            setForm({
              ...form, [e.target.name]: selectedValue, document_type_name: selectedDocumentType.document_type_name,
              document_validity_period: "Süresiz"
            });
          }
        };

        const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()

          Toast.fire({
            icon: 'info',
            title: 'Mesleki Yeterlilik düzenleniyor...',
            timer: 5000,
          })

          updateVQ(
            {
              databaseId: AppInfo.Database,
              collectionId: 'vocational_qualification',
              documentId: id,
              data: form,
            },
            () => {
              Toast.fire({
                icon: 'success',
                title: 'Mesleki Yeterlilik başarıyla düzenlendi.',
              })
              navigate('/app/vocational-qualification/list')
            }
          )
        }

        const onCancel = () => {
          navigate('/app/vocational-qualification/list')
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
              updateVQ(
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
                  navigate('/app/vocational-qualification-type/list')
                }
              )
            }
          })
        }

        return VStack({ alignment: cTop })(
          ReactView(
            <Form
              title="Tanımlı Mesleki Yeterlilik Belgesini Düzenleme"
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
                    onChange={handleChangeText}
                    value={form.document_code}
                    name="document_code"
                    inputProps={{ maxLength: 50 }}
                    label="Belge Kodu"
                    required
                  />
                  <FormControl fullWidth size="small" required>
                    <InputLabel>Belge Türü</InputLabel>
                    <Select
                      name='document_type_id'
                      label="Belge Türü"
                      onChange={handleSelectType}
                      size="small"
                      value={form.document_type_id}
                      required
                    >
                      {documentTypeGetList.map((document_type) => (
                        <MenuItem
                          value={document_type.document_type_id}
                          key={document_type.document_type_id}
                        >
                          {document_type.document_type_name}
                        </MenuItem>
                      ))}
                    </Select>
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
