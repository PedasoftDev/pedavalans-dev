import { Query, useCreateDocument, useListDocuments } from "@realmocean/sdk"
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
}

export default AssignEducationResult