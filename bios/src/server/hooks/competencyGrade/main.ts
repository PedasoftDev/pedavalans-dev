import { useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo'

namespace CompetencyGrade {
    export const CreateCompetencyGrade = () => {
        const { createDocument, isLoading, isSuccess, isError, error } = useCreateDocument(AppInfo.Name, AppInfo.Database, "competency_grade")
        return { createDocument, isLoading, isSuccess, isError, error }
    }

    export const GetCompetencyGrade = (id: string): { grade: ICompetencyGrade.ICompetencyGrade, isLoading: boolean } => {
        const { document, isLoading } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: "competency_grade", documentId: id })
        return {
            grade: document as any,
            isLoading
        }
    }

    export const GetCompetencyGrades = (): { grades: ICompetencyGrade.ICompetencyGrade[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "competency_grade")
        return {
            grades: documents as any[],
            isLoading: isLoading
        }
    }

    export const UpdateCompetencyGrade = () => {
        const { updateDocument, isLoading, isSuccess, isError, error } = useUpdateDocument(AppInfo.Name)
        return { updateDocument, isLoading, isSuccess, isError, error }
    }



}


export default CompetencyGrade;