import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo'
import Collections from '../../core/Collections'
import IAssignedEducation from '../../../client/interfaces/IAssignedEducation'

namespace AssignEducation {
    export const Create = () => {
        const { createDocument } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.AssignedEducation)
        return {
            createAssignedEducation: createDocument
        }
    }

    export const Get = (id: string): {
        assignedEducation: IAssignedEducation.IBase,
        isLoadingAssignedEducation: boolean
    } => {
        const { document, isLoading } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: Collections.AssignedEducation, documentId: id })
        return {
            assignedEducation: document as any,
            isLoadingAssignedEducation: isLoading
        }
    }

    export const GetList = (tenant_id: string): {
        assignedEducationList: IAssignedEducation.IBase[],
        isLoadingAssignedEducationList: boolean

    } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.AssignedEducation, [Query.equal("tenant_id", tenant_id), Query.equal("is_deleted", false), Query.limit(10000)])
        return {
            assignedEducationList: documents as any,
            isLoadingAssignedEducationList: isLoading
        }
    }

    export const Update = () => {
        const { updateDocument } = useUpdateDocument(AppInfo.Name)
        return {
            updateAssignedEducation: updateDocument
        }
    }

    export const GetOpenListByEducator = (educator_id: string): {
        assignedEducationList: IAssignedEducation.IBase[],
        isLoadingAssignedEducationList: boolean,
        totalAssignedEducation: number
    } => {
        const { documents, isLoading, total } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.AssignedEducation, [Query.equal("educator_id", educator_id), Query.equal("status", "open"), Query.equal("is_deleted", false), Query.limit(10000)])
        return {
            assignedEducationList: documents as any,
            isLoadingAssignedEducationList: isLoading,
            totalAssignedEducation: total
        }
    }

    export const GetByEmployeeId = (employee_id: string): {
        assignedEducationList: IAssignedEducation.IBase[],
        isLoadingAssignedEducationList: boolean,
    } => {
        const { documents, isLoading, total } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.AssignedEducation, [Query.equal("employee_id", employee_id), Query.equal("status", "completed"), Query.equal("is_deleted", false), Query.limit(10000)])
        return {
            assignedEducationList: documents as any,
            isLoadingAssignedEducationList: isLoading,
        }
    }

}

export default AssignEducation

