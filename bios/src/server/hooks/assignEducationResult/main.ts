import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from "@realmocean/sdk"
import AppInfo from "../../../AppInfo"
import Collections from "../../core/Collections"
import IAssignedEducationResult from "../../../client/interfaces/IAssignedEducationResult"


namespace AssignEducationResult {
    export const Create = () => {
        const { createDocument } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.AssignedEducationResult)
        return {
            createAssignedEducationResult: createDocument
        }
    }

    export const GetList = (tenant_id: string): {
        assignedEducationResultList: IAssignedEducationResult.IBase[],
        isLoadingAssignedEducationResultList: boolean

    } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.AssignedEducationResult, [Query.equal("tenant_id", tenant_id), Query.equal("is_deleted", false), Query.limit(10000)])
        return {
            assignedEducationResultList: documents as any,
            isLoadingAssignedEducationResultList: isLoading
        }
    }

    export const Get = (education_id: string): {
        assignedEducationResult: IAssignedEducationResult.IBase[],
        isLoadingAssignedEducationResult: boolean

    } => {
        const { document, isLoading } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: Collections.AssignedEducationResult, documentId: education_id })
        return {
            assignedEducationResult: document as any,
            isLoadingAssignedEducationResult: isLoading
        }
    }
    export const Update = () => {
        const { updateDocument } = useUpdateDocument(AppInfo.Name)
        return {
          updateAssignedEducationResult: updateDocument,
        }
      }
}

export default AssignEducationResult