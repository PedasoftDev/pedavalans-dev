import { Query, useCreateDocument, useListDocuments } from "@realmocean/sdk"
import AppInfo from "../../../AppInfo"
import Collections from "../../core/Collections"


namespace OrganizationStructureEmployeeLog {


    export const List = (tenant_id: string) => {
        const { documents, isLoading, total } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureEmployeeLog, [Query.limit(10000), Query.equal("is_deleted", false), Query.equal("tenant_id", tenant_id)])
        return {
            employeeLog: documents as any,
            isLoadingEmployeeLog: isLoading,
        }
    }

    export const ListByEmployeeId = (employee_id: string) => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureEmployeeLog, [Query.limit(10000), Query.equal("is_deleted", false), Query.equal("employee_id", employee_id)])
        return {
            employeeLog: documents as any,
            isLoadingEmployeeLog: isLoading,
        }
    }

    export const Create = () => {
        const { createDocument: createLog } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureEmployeeLog)
        return {
            createLog
        }
    }
}

export default OrganizationStructureEmployeeLog

