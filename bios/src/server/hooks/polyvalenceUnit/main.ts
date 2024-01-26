import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import IPolyvalenceUnit from '../../../client/interfaces/IPolyvalenceUnit';
namespace PolyvalenceUnit {
    export const GetList = (tenant_id: string): { polyvalenceUnitList: IPolyvalenceUnit.IPolyvalenceUnit[], isLoadingPolyvalenceUnit: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "polyvalence_unit_table", [Query.equal("tenant_id", tenant_id), Query.equal("is_deleted_table", false)])
        return {
            polyvalenceUnitList: documents as any,
            isLoadingPolyvalenceUnit: isLoading
        }
    }

    export const Create = () => {
        const { createDocument, error, isError, isLoading, isSuccess } = useCreateDocument(AppInfo.Name, AppInfo.Database, "polyvalence_unit_table")
        return {
            createPolyvalenceUnit: createDocument,
            errorPolyvalenceUnit: error,
            isErrorPolyvalenceUnit: isError,
            isLoadingPolyvalenceUnit: isLoading,
            isSuccessPolyvalenceUnit: isSuccess
        }
    }

    export const Get = (id: string): { polyvalenceUnit: IPolyvalenceUnit.IPolyvalenceUnit, isLoadingPolyvalenceUnit: boolean } => {
        const { document, isLoading } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: "polyvalence_unit_table", documentId: id })
        return {
            polyvalenceUnit: document as any,
            isLoadingPolyvalenceUnit: isLoading
        }
    }

    export const Update = () => {
        const { updateDocument, error, isError, isLoading, isSuccess } = useUpdateDocument(AppInfo.Name)
        return {
            updatePolyvalenceUnit: updateDocument,
            errorPolyvalenceUnit: error,
            isErrorPolyvalenceUnit: isError,
            isLoadingPolyvalenceUnitUpdate: isLoading,
            isSuccessPolyvalenceUnit: isSuccess
        }
    }
}

export default PolyvalenceUnit;