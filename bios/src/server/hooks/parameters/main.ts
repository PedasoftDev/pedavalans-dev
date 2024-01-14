import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import IParameters from '../../../client/interfaces/IParameters';
namespace Parameters {
    export const GetParameters = (): { parameters: IParameters.IParameter[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "pedavalans_parameter",)
        return {
            parameters: documents as any,
            isLoading
        }
    }
}

export default Parameters;