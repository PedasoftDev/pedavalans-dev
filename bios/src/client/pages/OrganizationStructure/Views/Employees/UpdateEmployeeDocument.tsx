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
import Form from './Views/Form'
import React from 'react'
import { useGetMe } from '@realmocean/sdk'
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure'
import VocationalQualificationType from '../../../../../server/hooks/vocationalQualificationType/main'
import OrganizationEmployeeDocument from '../../../../../server/hooks/organizationEmployeeDocument/main'
import removeDollarProperties from '../../../../assets/Functions/removeDollarProperties'
import VocationalQualification from '../../../../../server/hooks/vocationalQualification/main'
import { Toast } from '../../../../components/Toast'
import AppInfo from '../../../../../AppInfo'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';

const resetFormDocument: IOrganizationStructure.IEmployeeVocationalQualificationRelation.IBase = {
    employee_id: "",
    document_id: "",
    document_name: "",
    document_type_id: "",
    document_type_name: "",
    end_date: "",
    tenant_id: "",
    is_active: true,
    is_deleted: false,
}

export class UpdateEmployeeDocument extends UIController {
    public LoadView(): UIView {
        const navigate = useNavigate()
        const { id } = useParams()

        const { me, isLoading } = useGetMe('console')

        const { documentList, isLoadingDocument } = OrganizationEmployeeDocument.Get(id)
        const { organizationEmployeeDocumentList, isLoading: isLoadingDocumentList } = OrganizationEmployeeDocument.GetList(me?.prefs?.organization)
        const { updateOrganizationEmployeeDocument: updateDocument, isLoading: updateIsLoading, isError: updateIsError } = OrganizationEmployeeDocument.Update()

        const { documentTypeGetList, isLoading: isLoadingDocumentType } = VocationalQualificationType.GetList(me?.prefs?.organization)
        const { documentGetList, isLoading: isLoadingDocumentGetList } = VocationalQualification.GetList(me?.prefs?.organization)

        return isLoading || isLoadingDocument || isLoadingDocumentList || isLoadingDocumentGetList || isLoadingDocumentType
            ? VStack(Spinner())
            : UIViewBuilder(() => {
                const [formDocument, setFormDocument] = useState<IOrganizationStructure.IEmployeeVocationalQualificationRelation.IBase>(resetFormDocument)
                const [document, setDocument] = useState<IOrganizationStructure.IEmployeeVocationalQualificationRelation.ICreate[]>([])
                const [showValidityPeriod, setShowValidityPeriod] = useState<boolean>(false)
                const [isActive, setIsActive] = useState<boolean>(true)

                useEffect(() => {
                    setFormDocument(removeDollarProperties(documentList))

                    setIsActive(documentList.is_active)
                }, [])

                const handleSelectType = (e: SelectChangeEvent<string>) => {
                    const selectedValue = e.target.value;
                    const selectedDocumentType = documentGetList.find((type) => type.document_type_id === selectedValue);

                    if (selectedDocumentType.document_validity_period === "Süresiz") {
                        setShowValidityPeriod(false);
                        setFormDocument({
                            ...formDocument,
                            [e.target.name]: selectedValue,
                            document_type_name: selectedDocumentType.document_type_name
                        });
                    } else {
                        setShowValidityPeriod(true);
                        setFormDocument({
                            ...formDocument,
                            [e.target.name]: selectedValue,
                            document_type_name: selectedDocumentType.document_type_name
                        });
                    }
                };
                const handleSelectDocumentName = (e: SelectChangeEvent<string>) => {
                    const selectedValue = e.target.value;
                    const selectedDocument = documentGetList.find((doc) => doc.document_id === selectedValue);

                    setFormDocument({
                        ...formDocument,
                        [e.target.name]: selectedValue,
                        document_name: selectedDocument.document_name
                    });

                };

                const handleDocument = () => {
                    setDocument([...document, { ...formDocument }])
                    setFormDocument(resetFormDocument)
                    setShowValidityPeriod(false);
                }

                const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault()

                    Toast.fire({
                        icon: 'info',
                        title: 'Belge düzenleniyor...',
                        timer: 5000,
                    })

                    updateDocument(
                        {
                            databaseId: AppInfo.Database,
                            collectionId: 'organization_employee_document',
                            documentId: id,
                            data: formDocument,
                        },
                        () => {
                            Toast.fire({
                                icon: 'success',
                                title: 'Belge başarıyla düzenlendi.',
                            })
                            navigate('/app/organization')
                        }
                    )
                }

                const onCancel = () => {
                    navigate('/app/organization')
                }

                const onDelete = () => {
                    Swal.fire({
                        title: 'Belge Silme',
                        text: 'Belgeyi silmek istediğinize emin misiniz?',
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
                                title: 'Belge siliniyor...',
                                timer: 5000,
                            })
                            updateDocument(
                                {
                                    databaseId: AppInfo.Database,
                                    collectionId: 'organization_employee_document',
                                    documentId: id,
                                    data: {
                                        ...formDocument,
                                        is_deleted: true,
                                    },
                                },
                                () => {
                                    Toast.fire({
                                        icon: 'success',
                                        title: 'Belge başarıyla silindi.',
                                    })
                                    navigate('/app/organization')
                                }
                            )
                        }
                    })
                }

                return VStack({ alignment: cTop })(
                    ReactView(
                        <Form
                            title="Tanımlı Belge Düzenleme"
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
                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%" }}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Belge Türü</InputLabel>
                                            <Select
                                                name="document_type_id"
                                                value={formDocument.document_type_id}
                                                label="Belge Türü"
                                                onChange={handleSelectType}
                                                size="small"
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
                                        {formDocument.document_type_id &&
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Belge Adı</InputLabel>
                                                <Select
                                                    name="document_id"
                                                    value={formDocument.document_id}
                                                    label="Belge Türü"
                                                    onChange={handleSelectDocumentName}
                                                    size="small"
                                                >
                                                    {documentGetList.filter((d) => d.document_type_id === formDocument.document_type_id).map((document) => (
                                                        <MenuItem
                                                            value={document.document_id}
                                                            key={document.document_id}
                                                        >
                                                            {document.document_name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        }
                                        {showValidityPeriod && (
                                            <div style={{ display: "flex", gap: "10px", }}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker label="Belge Bitiş Tarihi"
                                                        format="DD/MM/YYYY"
                                                        value={dayjs(formDocument.end_date)}
                                                        slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                        onChange={(e: any) => {
                                                            setFormDocument({ ...formDocument, end_date: e.$d });
                                                        }} />
                                                </LocalizationProvider>
                                            </div>
                                        )}

                                    </div>
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
