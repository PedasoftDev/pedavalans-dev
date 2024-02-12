import ICompetencyEvaluationPeriod from '../../../client/interfaces/ICompetencyEvaluationPeriod';
import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';

namespace CompetencyEvaluationPeriod {
    export const CreateCompetencyEvaluationPeriod = () => {
        const { createDocument, isLoading, isSuccess, isError, error } = useCreateDocument(AppInfo.Name, AppInfo.Database, "competency_evaluation_period")
        return { createDocument, isLoading, isSuccess, isError, error }
    }

    export const GetCompetencyEvaluationPeriod = (id: string): { period: ICompetencyEvaluationPeriod.ICompetencyEvaluationPeriod, isLoading: boolean } => {
        const { document, isLoading } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: "competency_evaluation_period", documentId: id })
        return { period: document as any, isLoading }
    }

    export const GetCompetencyEvaluationPeriods = (tenant_id: string): { periods: ICompetencyEvaluationPeriod.ICompetencyEvaluationPeriod[], isLoading: boolean, total: Number } => {
        const { documents, isLoading, total } = useListDocuments(AppInfo.Name, AppInfo.Database, "competency_evaluation_period", [Query.equal("is_deleted_period", false), Query.equal("tenant_id", tenant_id)])
        return {
            periods: documents as any,
            isLoading,
            total
        }
    }

    export const GetDefaultCompetencyEvaluationPeriod = (tenant_id: string): { periods: ICompetencyEvaluationPeriod.ICompetencyEvaluationPeriod[], isLoading: boolean, total: number } => {
        const { documents, isLoading, total } = useListDocuments(AppInfo.Name, AppInfo.Database, "competency_evaluation_period", [Query.equal("is_default_year", "true"), Query.equal("tenant_id", tenant_id)])
        return {
            periods: documents as any,
            isLoading,
            total
        }
    }

    export const UpdateCompetencyEvaluationPeriod = () => {
        const { updateDocument, isLoading, isSuccess, isError, error } = useUpdateDocument(AppInfo.Name)
        return { updateDocument, isLoading, isSuccess, isError, error }
    }

}

export default CompetencyEvaluationPeriod;