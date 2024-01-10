import ICompetencyEvaluationPeriod from '../../../client/interfaces/ICompetencyEvaluationPeriod';
import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';

namespace CompetencyEvaluationPeriod {
    export const CreateCompetencyEvaluationPeriod = () => {
        const { createDocument, isLoading, isSuccess, isError, error } = useCreateDocument(AppInfo.Name, AppInfo.Database, "competency_evaluation_period")
        return { createDocument, isLoading, isSuccess, isError, error }
    }

    export const GetCompetencyEvaluationPeriod = (id: string) => {
        const { document, isLoading } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: "competency_evaluation_period", documentId: id })
        return { document, isLoading }
    }

    export const GetCompetencyEvaluationPeriods = (): { periods: ICompetencyEvaluationPeriod.ICompetencyEvaluationPeriod[], isLoading: boolean, total: Number } => {
        const { documents, isLoading, total } = useListDocuments(AppInfo.Name, AppInfo.Database, "competency_evaluation_period", [Query.equal("is_deleted_period", false)])
        return {
            periods: documents as any,
            isLoading,
            total
        }
    }

    export const GetDefaultCompetencyEvaluationPeriod = (): { periods: ICompetencyEvaluationPeriod.ICompetencyEvaluationPeriod[], isLoading: boolean, total: Number } => {
        const { documents, isLoading, total } = useListDocuments(AppInfo.Name, AppInfo.Database, "competency_evaluation_period", [Query.equal("is_default_year", "true")])
        return {
            periods: documents as any,
            isLoading,
            total
        }
    }

}

export default CompetencyEvaluationPeriod;