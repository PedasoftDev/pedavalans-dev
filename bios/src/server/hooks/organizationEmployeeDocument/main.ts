import { Query, useCreateDocument, useListDocuments, useUpdateDocument, useGetDocument } from "@realmocean/sdk"
import AppInfo from "../../../AppInfo"
import Collections from "../../core/Collections"
import { IOrganizationStructure } from "../../../client/interfaces/IOrganizationStructure"

namespace OrganizationEmployeeDocument {
    export const Create = () => {
        const { createDocument, error, isError, isLoading, isSuccess } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationEmployeeDocument)
        return { createOrganizationEmployeeDocument: createDocument, error, isError, isLoading, isSuccess }
    }
    export const GetList = (tenant_id: string): { organizationEmployeeDocumentList: IOrganizationStructure.IEmployeeVocationalQualificationRelation.IBase[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.OrganizationEmployeeDocument,
            [Query.equal("tenant_id", tenant_id), Query.equal("is_active", true), Query.equal("is_deleted", false), Query.limit(10000)])
        return { organizationEmployeeDocumentList: documents as any, isLoading }
    }

    export const Update = () => {
        const { updateDocument, error, isError, isLoading, isSuccess } = useUpdateDocument(AppInfo.Name)
        return { updateOrganizationEmployeeDocument: updateDocument, error, isError, isLoading, isSuccess }
    }

    export const Get = (id: string): {
        documentList: IOrganizationStructure.IEmployeeVocationalQualificationRelation.IBase
        isLoadingDocument: boolean
    } => {
        const { document, isLoading } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: Collections.OrganizationEmployeeDocument, documentId: id, })
        return { documentList: document as any, isLoadingDocument: isLoading, }
    }

    export const ListByEmployeeId = (employee_id: string): {
        documentList: IOrganizationStructure.IEmployeeVocationalQualificationRelation.IBase[]
        isLoadingDocument: boolean
    } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.OrganizationEmployeeDocument,
            [Query.equal("employee_id", employee_id), Query.equal("is_active", true), Query.equal("is_deleted", false), Query.limit(10000)])
        return { documentList: documents as any, isLoadingDocument: isLoading, }
    }
}

export default OrganizationEmployeeDocument;