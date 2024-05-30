import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import Collections from '../../core/Collections';
import IEducation from '../../../client/interfaces/IEducation';

namespace Education {
    export const Create = () => {
        const { createDocument, error, isError, isLoading, isSuccess } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.Education)
        return { createEducation: createDocument, error, isError, isLoading, isSuccess }
    }
    export const GetList = (): { educationList: IEducation.IBase[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.Education, [Query.limit(10000)])
        return { educationList: documents as any, isLoading }
    }

    export const Update = () => {
        const { updateDocument, error, isError, isLoading, isSuccess } = useUpdateDocument(AppInfo.Name)
        return { updateEducation: updateDocument, error, isError, isLoading, isSuccess }
    }

    export const Get = (id: string): { education: IEducation.IBase, isLoading: boolean } => {
        const { document, isLoading } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: Collections.Education, documentId: id })
        return { education: document as any, isLoading }
    }
}

export default Education;