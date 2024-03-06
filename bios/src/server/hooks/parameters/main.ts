import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import IParameters from '../../../client/interfaces/IParameters';
namespace Parameters {
    export const GetParameters = (tenant_id: string): { parameters: IParameters.IParameter[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "pedavalans_parameter", [Query.limit(10000), Query.equal("tenant_id", tenant_id)])
        return {
            parameters: documents as any,
            isLoading
        }
    }

    export const UpdateParameter = () => {
        const { updateDocument, error, isError, isLoading, isSuccess } = useUpdateDocument(AppInfo.Name)
        return {
            updateParameter: updateDocument,
            error,
            isError,
            isLoading,
            isSuccess
        }
    }

    export const GetParameterByName = (name: string, tenant_id: string): { parameters: IParameters.IParameter[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "pedavalans_parameter", [Query.equal("name", name), Query.equal("tenant_id", tenant_id)])
        return {
            parameters: documents as any,
            isLoading
        }
    }
}

export default Parameters;