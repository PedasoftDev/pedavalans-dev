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
        const { documents, isLoading, total } = useListDocuments(AppInfo.Name, AppInfo.Database, "competency_department", [Query.equal("tenant_id", tenant_id)])
        return {
            competencyDepartmentList: documents as any,
            isLoadingCompetencyDepartmentList: isLoading,
            totalCompetencyDepartmentList: total
        }
    }
}

export default CompetencyDepartment;