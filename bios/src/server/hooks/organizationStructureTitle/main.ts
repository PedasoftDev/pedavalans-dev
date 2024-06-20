import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import { IOrganizationStructure } from '../../../client/interfaces/IOrganizationStructure';

namespace OrganizationStructureTitle {
    export const Create = () => {
        const { createDocument, error, isError, isLoading, isSuccess } = useCreateDocument(AppInfo.Name, AppInfo.Database, "organization_title")
        return {
            create: createDocument,
            error,
            isError,
            isLoading,
            isSuccess
        }
    }

    export const Update = () => {
        const { updateDocument, error, isError, isLoading, isSuccess } = useUpdateDocument(AppInfo.Name)
        return {
            update: updateDocument,
            error,
            isError,
            isLoading,
            isSuccess
        }
    }

    export const GetList = (tenant_id: string): { titles: IOrganizationStructure.ITitles.ITitle[], isLoadingTitles: boolean, totalTitles: Number } => {
        const { documents, isLoading, total } = useListDocuments(AppInfo.Name, AppInfo.Database, "organization_title", [Query.limit(10000), Query.equal("is_deleted", false), Query.equal("tenant_id", tenant_id)])
        return {
            titles: documents as any,
            isLoadingTitles: isLoading,
            totalTitles: total
        }
    }

    export const Get = (id: string): { title: IOrganizationStructure.ITitles.ITitle, isLoadingTitle: boolean } => {
        const { document, isLoading } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: "organization_title", documentId: id })
        return {
            title: document as any,
            isLoadingTitle: isLoading
        }
    }
}

export default OrganizationStructureTitle;