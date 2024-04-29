import {
  Query,
  useCreateDocument,
  useGetDocument,
  useListDocuments,
  useUpdateDocument,
} from '@realmocean/sdk'
import AppInfo from '../../../AppInfo'
import Collections from '../../core/Collections'
import IVocationalQualificationType from '../../../client/interfaces/IVocationalQualificationType'

namespace VocationalQualificationType {
  export const Create = () => {
    const { createDocument, error, isError, isLoading, isSuccess } =
      useCreateDocument(
        AppInfo.Name,
        AppInfo.Database,
        Collections.VocationalQualificationType
      )
    return {
      createVocationalQualificationType: createDocument,
      error,
      isError,
      isLoading,
      isSuccess,
    }
  }
  export const GetList = (
    tenant_id: string
  ): {
    documentTypeGetList: IVocationalQualificationType.IBase[]
    isLoading: boolean
  } => {
    const { documents, isLoading } = useListDocuments(
      AppInfo.Name,
      AppInfo.Database,
      Collections.VocationalQualificationType,
      [Query.equal('tenant_id', tenant_id)]
    )
    return { documentTypeGetList: documents as any, isLoading }
  }

  export const Get = (
    id: string
  ): {
    documentTypeList: IVocationalQualificationType.IBase
    isLoadingDocumentType: boolean
  } => {
    const { document, isLoading } = useGetDocument({
      projectId: AppInfo.Name,
      databaseId: AppInfo.Database,
      collectionId: 'vocational_qualification_type',
      documentId: id,
    })
    return {
      documentTypeList: document as any,
      isLoadingDocumentType: isLoading,
    }
  }

  export const Update = (): {
    updateVQType: (
      {
        databaseId,
        collectionId,
        documentId,
        data,
        permissions,
      }: {
        databaseId: string
        collectionId: string
        documentId: string
        data?: any
        permissions?: string[]
      },
      onSuccess?: (data: any) => void
    ) => void
    errorUpdateVQType: { message: string }
    isErrorUpdateVQType: boolean
    isLoadingUpdateVQType: boolean
    isSuccessUpdateVQType: boolean
  } => {
    const { updateDocument, error, isError, isLoading, isSuccess } =
      useUpdateDocument(AppInfo.Name)
    return {
      updateVQType: updateDocument,
      errorUpdateVQType: error,
      isErrorUpdateVQType: isError,
      isLoadingUpdateVQType: isLoading,
      isSuccessUpdateVQType: isSuccess,
    }
  }
}

export default VocationalQualificationType
