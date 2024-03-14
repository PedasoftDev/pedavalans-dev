import { Query, useCreateDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import Collections from '../../core/Collections';
import IEducation from '../../../client/interfaces/IEducation';

namespace Education {
    export const Create = () => {
        const { createDocument, error, isError, isLoading, isSuccess } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.Education)
        return { createEducation: createDocument, error, isError, isLoading, isSuccess }
    }
    export const GetList = (tenant_id: string): { educationList: IEducation.IBase[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.Education, [Query.equal("tenant_id", tenant_id)])
        return { educationList: documents as any, isLoading }
    }
}

export default Education;