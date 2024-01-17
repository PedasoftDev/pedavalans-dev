import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import { IOrganizationStructure } from '../../../client/interfaces/IOrganizationStructure';

namespace OrganizationStructurePosition {
    export const Create = () => {
        const { createDocument, error, isError, isLoading, isSuccess } = useCreateDocument(AppInfo.Name, AppInfo.Database, "organization_position")
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

    export const GetList = (tenant_id: string): { positions: IOrganizationStructure.IPositions.IPosition[], isLoadingPositions: boolean, totalPositions: Number } => {
        const { documents, isLoading, total } = useListDocuments(AppInfo.Name, AppInfo.Database, "organization_position", [Query.equal("is_deleted", false), Query.equal("tenant_id", tenant_id)])
        return {
            positions: documents as any,
            isLoadingPositions: isLoading,
            totalPositions: total
        }
    }
}

export default OrganizationStructurePosition;