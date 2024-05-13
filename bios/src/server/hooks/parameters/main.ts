import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import IParameters from '../../../client/interfaces/IParameters';
namespace Parameters {
    export const GetParameters = (): { parameters: IParameters.IParameter[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "pedavalans_parameter", [Query.limit(10000)])
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

    export const GetParameterByName = (name: string): { parameters: IParameters.IParameter[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "pedavalans_parameter", [Query.equal("name", name)])
        return {
            parameters: documents as any,
            isLoading
        }
    }
}

export default Parameters;