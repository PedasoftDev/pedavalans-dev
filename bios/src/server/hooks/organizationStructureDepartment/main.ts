import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import { IOrganizationStructure } from '../../../client/interfaces/IOrganizationStructure';

namespace OrganizationStructureDepartment {
    export const Create = () => {
        const { createDocument, isSuccess, isError, error } = useCreateDocument(AppInfo.Name, AppInfo.Database, "organization_department")
        return { createDocument, isSuccess, isError, error }
    }

    export const Update = () => {
        const { updateDocument, error, isError, isLoading, isSuccess } = useUpdateDocument(AppInfo.Name)
        return { updateDocument, error, isError, isLoading, isSuccess }
    }

    export const Get = (id: string) => {
        const { document, isLoading } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: "organization_department", documentId: id })
        return { document, isLoading }
    }

    export const GetList = (tenant_id: string): (
        { departments: IOrganizationStructure.IDepartments.IDepartment[], isLoadingDepartments: boolean, totalDepartments: number }

    ) => {
        const { documents, isLoading, total } = useListDocuments(AppInfo.Name, AppInfo.Database, "organization_department", [Query.equal("is_deleted", false), Query.equal("tenant_id", tenant_id)])
        return {
            departments: documents as any,
            isLoadingDepartments: isLoading,
            totalDepartments: total
        }
    }

}

export default OrganizationStructureDepartment