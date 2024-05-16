import { Query, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import IParameterString from '../../../client/interfaces/IStringParameter';
namespace StringParameter {
    export const GetList = (): { stringParameters: IParameterString.IBase[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "string_parameter", [Query.limit(10000)])
        return {
            stringParameters: documents as any,
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

    export const GetParameterByName = (name: string): { stringParameters: IParameterString.IBase[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "string_parameter", [Query.equal("name", name)])
        return {
            stringParameters: documents as any,
            isLoading
        }
    }
}

export default StringParameter;