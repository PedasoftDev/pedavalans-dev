import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import ICompetencyGradeValue from '../../../client/interfaces/ICompetencyGradeValue';

namespace CompetencyGradeValue {
    export const CreateCompetencyGradeValue = () => {
        const { createDocument, error, isError, isLoading, isSuccess } = useCreateDocument(AppInfo.Name, AppInfo.Database, "competency_grade_value")
        return {
            createCompetencyGradeValue: createDocument,
            errorCreateCompetencyGradeValue: error,
            isErrorCreateCompetencyGradeValue: isError,
            isLoadingCreateCompetencyGradeValue: isLoading,
            isSuccessCreateCompetencyGradeValue: isSuccess
        }
    }

    export const GetList = (tenant_id: string): { competencyGradeValueList: ICompetencyGradeValue.ICompetencyGradeValue[], isLoadingCompetencyGradeValueList: boolean } => {
        const { documents, isLoading, total } = useListDocuments(AppInfo.Name, AppInfo.Database, "competency_grade_value", [Query.limit(10000), Query.equal("tenant_id", tenant_id)])
        return {
            competencyGradeValueList: documents as any,
            isLoadingCompetencyGradeValueList: isLoading
        }
    }
}

export default CompetencyGradeValue;