import {
  Query,
  useCreateDocument,
  useGetDocument,
  useListDocuments,
  useUpdateDocument,
} from '@realmocean/sdk'
import AppInfo from '../../../AppInfo'
import Collections from '../../core/Collections'
import IVocationalQualification from '../../../client/interfaces/IVocationalQualification'

namespace VocationalQualification {
  export const Create = () => {
    const { createDocument, error, isError, isLoading, isSuccess } =
      useCreateDocument(
        AppInfo.Name,
        AppInfo.Database,
        Collections.VocationalQualification
      )
    return {
      createVocationalQualification: createDocument,
      error,
      isError,
      isLoading,
      isSuccess,
    }
  }
  export const GetList = (
    tenant_id: string
  ): {
    documentGetList: IVocationalQualification.IBase[]
    isLoading: boolean
  } => {
    const { documents, isLoading } = useListDocuments(
      AppInfo.Name,
      AppInfo.Database,
      Collections.VocationalQualification,
      [Query.equal('tenant_id', tenant_id), Query.equal('is_deleted', false)]
    )
    return { documentGetList: documents as any, isLoading }
  }

  export const Get = (
    id: string
  ): {
    documentList: IVocationalQualification.IBase
    isLoadingDocument: boolean
  } => {
    const { document, isLoading } = useGetDocument({
      projectId: AppInfo.Name,
      databaseId: AppInfo.Database,
      collectionId: 'vocational_qualification',
      documentId: id,
    })
    return {
      documentList: document as any,
      isLoadingDocument: isLoading,
    }
  }

  export const Update = (): {
    updateVQ: (
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
    errorUpdateVQ: { message: string }
    isErrorUpdateVQ: boolean
    isLoadingUpdateVQ: boolean
    isSuccessUpdateVQ: boolean
  } => {
    const { updateDocument, error, isError, isLoading, isSuccess } =
      useUpdateDocument(AppInfo.Name)
    return {
      updateVQ: updateDocument,
      errorUpdateVQ: error,
      isErrorUpdateVQ: isError,
      isLoadingUpdateVQ: isLoading,
      isSuccessUpdateVQ: isSuccess,
    }
  }
}

export default VocationalQualification
