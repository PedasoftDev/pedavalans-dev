import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import { IOrganizationStructure } from '../../../client/interfaces/IOrganizationStructure';
import Collections from '../../core/Collections';

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
        const { documents, isLoading, total } = useListDocuments(AppInfo.Name, AppInfo.Database, "organization_position", [Query.limit(10000), Query.equal("is_deleted", false), Query.equal("tenant_id", tenant_id)])
        return {
            positions: documents as any,
            isLoadingPositions: isLoading,
            totalPositions: total
        }
    }

    export const Get = (id: string): { position: IOrganizationStructure.IPositions.IPosition, isLoadingPosition: boolean } => {
        const { document, isLoading } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: Collections.OrganizationStructurePosition, documentId: id })
        return { position: document as any, isLoadingPosition: isLoading }
    }
}

export default OrganizationStructurePosition;