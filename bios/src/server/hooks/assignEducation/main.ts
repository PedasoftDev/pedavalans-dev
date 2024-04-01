import { Query, useCreateDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
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
}

export default AssignEducation