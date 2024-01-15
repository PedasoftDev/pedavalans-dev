import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import { IOrganizationStructure } from '../../../client/interfaces/IOrganizationStructure';

namespace OrganizationStructureLine {
    export const Create = () => {
        const { createDocument, isLoading, isSuccess, isError, error } = useCreateDocument(AppInfo.Name, AppInfo.Database, "organization_line")
        return { createDocument, isLoading, isSuccess, isError, error }
    }

    export const GetList = (tenant_id: string) => {
        const { documents, isLoading, total } = useListDocuments(AppInfo.Name, AppInfo.Database, "organization_line", [Query.equal("is_deleted", false), Query.equal("tenant_id", tenant_id)])
        return {
            lines: documents as any,
            isLoadingLines: isLoading,
            totalLines: total
        }
    }

    export const Update = () => {
        const { updateDocument, isLoading, isSuccess, isError, error } = useUpdateDocument(AppInfo.Name)
        return { updateDocument, isLoading, isSuccess, isError, error }
    }
}

export default OrganizationStructureLine