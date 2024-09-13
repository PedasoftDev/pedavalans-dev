import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import Collections from '../../core/Collections';


namespace EmployeeMultipleLines {
    export const Create = () => {
        const { createDocument } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.EmployeeLineRelation)
        return { createEmployeeMultipleLines: createDocument }
    }
    export const GetList = (): { employeeMultipleLinesList, isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.EmployeeLineRelation, [Query.limit(10000), Query.equal("is_deleted", false)])
        return { employeeMultipleLinesList: documents as any, isLoading }
    }

    export const Update = () => {
        const { updateDocument } = useUpdateDocument(AppInfo.Name)
        return { updateEmployeeMultipeLines: updateDocument}
    }

    // export const Get = (id: string): { education: IEducation.IBase, isLoading: boolean } => {
    //     const { document, isLoading } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: Collections.Education, documentId: id })
    //     return { education: document as any, isLoading }
    // }
}

export default EmployeeMultipleLines;