import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import { IOrganizationStructure } from '../../../client/interfaces/IOrganizationStructure';

namespace OrganizationStructureWorkPlace {
    export const Create = () => {
        const { createDocument } = useCreateDocument(AppInfo.Name, AppInfo.Database, "organization_workplace")
        return { createDocument}
    }

    export const Update = () => {
        const { updateDocument} = useUpdateDocument(AppInfo.Name)
        return { updateDocument}
    }


    export const GetList = (tenant_id: string): (
        { workPlaces: IOrganizationStructure.IWorkPlace.IWorkPlace[], isLoadingWorkPlace: boolean}

    ) => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "organization_workplace", [Query.limit(10000), Query.equal("is_deleted", false), Query.equal("tenant_id", tenant_id)])
        return {
            workPlaces: documents as any,
            isLoadingWorkPlace: isLoading,
        }
    }
    export const Get = (id: string) => {
        const { document, isLoading } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: "organization_workplace", documentId: id })
        return { document, isLoading }
    }

}

export default OrganizationStructureWorkPlace