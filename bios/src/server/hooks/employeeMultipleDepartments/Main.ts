import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import Collections from '../../core/Collections';


namespace EmployeeMultipleDepartments {
    export const Create = () => {
        const { createDocument } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.EmployeeDepartmentRelation)
        return { createEmployeeMultipleDepartments: createDocument }
    }
    export const GetList = (): { employeeMultipleDepartmentsList, isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.EmployeeDepartmentRelation, [Query.limit(10000), Query.equal("is_deleted", false)])
        return { employeeMultipleDepartmentsList: documents as any, isLoading }
    }

    export const Update = () => {
        const { updateDocument } = useUpdateDocument(AppInfo.Name)
        return { updateEmployeeMultipleDepartments: updateDocument}
    }

    // export const Get = (id: string): { education: IEducation.IBase, isLoading: boolean } => {
    //     const { document, isLoading } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: Collections.Education, documentId: id })
    //     return { education: document as any, isLoading }
    // }
}

export default EmployeeMultipleDepartments;