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
            [Query.equal("tenant_id", tenant_id), Query.equal("is_active", true), Query.equal("is_deleted", false)])
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
        const { document, isLoading } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: 'organization_employee_document', documentId: id, })
        return { documentList: document as any, isLoadingDocument: isLoading, }
    }
}

export default OrganizationEmployeeDocument;