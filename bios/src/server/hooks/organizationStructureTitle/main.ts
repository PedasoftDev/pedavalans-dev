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
        const { documents, isLoading, total } = useListDocuments(AppInfo.Name, AppInfo.Database, "organization_title", [Query.equal("is_deleted", false), Query.equal("tenant_id", tenant_id)])
        return {
            titles: documents as any,
            isLoadingTitles: isLoading,
            totalTitles: total
        }
    }
}

export default OrganizationStructureTitle;