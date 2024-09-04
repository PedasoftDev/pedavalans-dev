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
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  SelectChangeEvent,
  Switch,
  TextField
} from '@mui/material'
import Form from '../Views/Form'
import React from 'react'
import { useDeleteCache, useGetMe } from '@realmocean/sdk'
import removeDollarProperties from '../../../assets/Functions/removeDollarProperties'
import AppInfo from '../../../../AppInfo'
import IVocationalQualification from '../../../interfaces/IVocationalQualification'
import VocationalQualification from '../../../../server/hooks/vocationalQualification/main'
import VocationalQualificationType from '../../../../server/hooks/vocationalQualificationType/main'
import { PedavalansServiceBroker } from '../../../../server/brokers/PedavalansServiceBroker'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from "styled-components";
import BucketFiles from '../../../../server/hooks/bucketFiles/Main'
import { MdEdit } from 'react-icons/md'
import { FaEye, FaRegTrashAlt } from 'react-icons/fa'
import { IoMdDownload } from 'react-icons/io'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const formReset: IVocationalQualification.IBase = {
  document_id: '',
  document_name: '',
  document_code: '',
  document_validity_period: "",
  document_type_id: "",
  document_type_name: "",
  is_active: true,
  is_deleted: false,
}

export class UpdateVocationalQualificationController extends UIController {
  public LoadView(): UIView {
    const navigate = useNavigate()
    const { id } = useParams()

    const { me, isLoading } = useGetMe('console')

    const { document, isLoadingDocument } = VocationalQualification.Get(id)
    const { documentGetList, isLoading: isLoadingDocuments } = VocationalQualification.GetList(me?.prefs?.organization)
    const { updateVQ } = VocationalQualification.Update()
    const { deleteCache } = useDeleteCache(AppInfo.Name);


    const { documentTypeGetList } = VocationalQualificationType.GetList(me?.prefs?.organization)

    const { getFilePage, isLoadingFile } = BucketFiles.GetList(AppInfo.Name, "vocational_qualification_bucket", document.$id)
    const { getFileDownload, isLoadingDownloadFile } = BucketFiles.GetDownload(AppInfo.Name, "vocational_qualification_bucket", document.$id)
    const { getFilePreview, isLoadingPreviewFile } = BucketFiles.GetPreview(AppInfo.Name, "vocational_qualification_bucket", document.$id)

    return isLoading || isLoadingDocument || isLoadingFile || isLoadingPreviewFile || isLoadingDocuments || isLoadingDownloadFile ? VStack(Spinner())
      : UIViewBuilder(() => {
        const [form, setForm] = useState<IVocationalQualification.IBase>(formReset)
        const [showValidityPeriod, setShowValidityPeriod] = useState<boolean>(false)
        const [isActive, setIsActive] = useState<boolean>(true)

        useEffect(() => {
          setForm(removeDollarProperties(document))

          setIsActive(document.is_active)

          if (document.document_validity_period === "Süresiz") {
            setShowValidityPeriod(false);
          } else {
            setShowValidityPeriod(true);
          }
        }, [])

        const handleChangeText = (e: any) => {
          setForm({ ...form, [e.target.name]: e.target.value })
        }

        const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()

          if (documentGetList.find((document) => document.document_code === form.document_code && document.document_id !== id)) {
            Toast.fire({
              icon: 'error',
              title: 'Belge kodu zaten tanımlı.',
            })
            return;
          }

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
              if (form.document_name !== document.document_name) {
                PedavalansServiceBroker.Default.updateVocationQualificationNames(id, form.document_name).then((res) => {
                  Toast.fire({
                    icon: 'success',
                    title: 'Mesleki Yeterlilik başarıyla düzenlendi.',
                  })
                  navigate('/app/vocational-qualification/list')
                })
              } else {
                Toast.fire({
                  icon: 'success',
                  title: 'Mesleki Yeterlilik başarıyla düzenlendi.',
                })
                navigate('/app/vocational-qualification/list')
              }
            }
          )
        }

        const onCancel = () => {
          navigate('/app/vocational-qualification/list')
        }

        const onDelete = () => {
          Swal.fire({
            title: 'Mesleki Yeterlilik Silme',
            text: 'Mesleki Yeterliliği silmek istediğinize emin misiniz?',
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
                title: 'Mesleki Yeterlilik siliniyor...',
                timer: 5000,
              })
              updateVQ(
                {
                  databaseId: AppInfo.Database,
                  collectionId: 'vocational_qualification',
                  documentId: id,
                  data: {
                    ...form,
                    is_deleted: true,
                  },
                },
                () => {
                  Toast.fire({
                    icon: 'success',
                    title: 'Mesleki Yeterlilik başarıyla silindi.',
                  })
                  deleteCache();
                  navigate('/app/vocational-qualification/list')
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
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    borderBottom: '1px solid #ccc',
                  }
                  }>
                    {getFilePage?.name}
                    <div style={{
                      display: 'flex',
                      gap: '3px',
                    }}>
                      <IconButton color="primary" aria-label="add an alarm">
                        <a href={getFilePreview as any} target="_blank"><FaEye /></a>
                      </IconButton>
                      <IconButton color="primary" aria-label="add an alarm">
                        <a href={getFileDownload as any}><IoMdDownload /></a>
                      </IconButton>
                    </div>
                  </div>
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
                    <Button component="label" variant="contained" size='small' tabIndex={-1} startIcon={<CloudUploadIcon />}>Belge Yükle<VisuallyHiddenInput type="file" /> </Button>
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
                </form >
              }
            />
          )
        ).padding('30px 20px')
      })
  }
}
