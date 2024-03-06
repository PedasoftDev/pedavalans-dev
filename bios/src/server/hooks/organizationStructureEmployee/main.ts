import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import { IOrganizationStructure } from '../../../client/interfaces/IOrganizationStructure';

namespace OrganizationStructureEmployee {

    export const Create = () => {
        const { createDocument, error, isError, isLoading, isSuccess } = useCreateDocument(AppInfo.Name, AppInfo.Database, "organization_employee")
        return {
            createEmployee: createDocument,
            createError: error,
            createIsError: isError,
            createIsLoading: isLoading,
            createIsSuccess: isSuccess
        }
    }

    export const GetList = (tenant_id: string): { employees: IOrganizationStructure.IEmployees.IEmployee[], isLoadingEmployees: boolean, totalEmployees: Number } => {
        const { documents, isLoading, total } = useListDocuments(AppInfo.Name, AppInfo.Database, "organization_employee", [Query.limit(10000), Query.equal("is_deleted", false), Query.equal("tenant_id", tenant_id)])
        return {
            employees: documents as any,
            isLoadingEmployees: isLoading,
            totalEmployees: total
        }
    }

    export const Update = () => {
        const { updateDocument, error, isError, isLoading, isSuccess } = useUpdateDocument(AppInfo.Name)
        return {
            updateEmployee: updateDocument,
            updateError: error,
            updateIsError: isError,
            updateIsLoading: isLoading,
            updateIsSuccess: isSuccess
        }
    }
}

export default OrganizationStructureEmployee