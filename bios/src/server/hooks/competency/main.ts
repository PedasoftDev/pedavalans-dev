import ICompetencyEvaluationPeriod from '../../../client/interfaces/ICompetencyEvaluationPeriod';
import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import ICompetency from '../../../client/interfaces/ICompetency';

namespace Competency {
    export const Create = () => {
        const { createDocument, isLoading, isSuccess, isError, error } = useCreateDocument(AppInfo.Name, AppInfo.Database, "competency")
        return {
            createCompetency: createDocument,
            isLoadingCreateCompetency: isLoading,
            isSuccessCreateCompetency: isSuccess,
            isErrorCreateCompetency: isError,
            errorCreateCompetency: error
        }
    }

    export const GetList = (tenant_id: string): { competencyList: ICompetency.ICompetency[], isLoadingCompetencyList: boolean, totalCompetencyList: Number } => {
        const { documents, isLoading, total } = useListDocuments(AppInfo.Name, AppInfo.Database, "competency", [Query.equal("tenant_id", tenant_id)])
        return {
            competencyList: documents as any,
            isLoadingCompetencyList: isLoading,
            totalCompetencyList: total
        }
    }
}

export default Competency;