import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import ICompetencyDepartment from '../../../client/interfaces/ICompetencyDepartment';

namespace CompetencyDepartment {
    export const CreateCompetencyDepartment = () => {
        const { createDocument, error, isError, isLoading, isSuccess } = useCreateDocument(AppInfo.Name, AppInfo.Database, "competency_department")
        return {
            createCompetencyDepartment: createDocument,
            errorCreateCompetencyDepartment: error,
            isErrorCreateCompetencyDepartment: isError,
            isLoadingCreateCompetencyDepartment: isLoading,
            isSuccessCreateCompetencyDepartment: isSuccess
        }
    }

    export const GetList = (tenant_id: string): { competencyDepartmentList: ICompetencyDepartment.ICompetencyDepartment[], isLoadingCompetencyDepartmentList: boolean, totalCompetencyDepartmentList: Number } => {
        const { documents, isLoading, total } = useListDocuments(AppInfo.Name, AppInfo.Database, "competency_department", [Query.equal("tenant_id", tenant_id), Query.equal("is_deleted", false)])
        return {
            competencyDepartmentList: documents as any,
            isLoadingCompetencyDepartmentList: isLoading,
            totalCompetencyDepartmentList: total
        }
    }

    export const GetByCompetencyId = (competency_id: string): { competencyDepartments: ICompetencyDepartment.ICompetencyDepartment[], isLoadingCompetencyDepartments: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "competency_department", [Query.equal("competency_id", competency_id), Query.equal("is_deleted", false)])
        return {
            competencyDepartments: documents as any,
            isLoadingCompetencyDepartments: isLoading
        }
    }
    
    export const GetByDepartmentId = (department_id: string): { competencyDepartments: ICompetencyDepartment.ICompetencyDepartment[], isLoadingCompetencyDepartments: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "competency_department", [Query.equal("competency_department_id", department_id), Query.equal("is_deleted", false)])
        return {
            competencyDepartments: documents as any,
            isLoadingCompetencyDepartments: isLoading
        }
    }

    export const Update = (): {
        updateCompetencyDepartment: ({ databaseId, collectionId, documentId, data, permissions }: {
            databaseId: string;
            collectionId: string;
            documentId: string;
            data?: any;
            permissions?: string[];
        }, onSuccess?: (data: any) => void) => void,
        errorUpdateCompetencyDepartment: { message: string },
        isErrorUpdateCompetencyDepartment: boolean,
        isLoadingUpdateCompetencyDepartment: boolean,
        isSuccessUpdateCompetencyDepartment: boolean
    } => {
        const { updateDocument, error, isError, isLoading, isSuccess } = useUpdateDocument(AppInfo.Name)
        return { updateCompetencyDepartment: updateDocument, errorUpdateCompetencyDepartment: error, isErrorUpdateCompetencyDepartment: isError, isLoadingUpdateCompetencyDepartment: isLoading, isSuccessUpdateCompetencyDepartment: isSuccess }
    }
}

export default CompetencyDepartment;