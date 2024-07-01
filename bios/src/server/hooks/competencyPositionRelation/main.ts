import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import Collections from '../../core/Collections';

namespace CompetencyPositionRelation {
  export const Create = () => {
    const { createDocument, error, isError, isLoading, isSuccess } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.CompetencyPositionRelation)
    return { createCompetencyPositionRelation: createDocument, error, isError, isLoading, isSuccess }
  }

  export const GetList = () => {
    const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.CompetencyPositionRelation, [Query.limit(10000)])
    return { competencyPositionRelationList: documents as any, isLoading }
  }

  export const Update = () => {
    const { updateDocument, error, isError, isLoading, isSuccess } = useUpdateDocument(AppInfo.Name)
    return { updateCompetencyPositionRelation: updateDocument, error, isError, isLoading, isSuccess }
  }

  export const Get = (id: string) => {
    const { document, isLoading } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: Collections.CompetencyPositionRelation, documentId: id })
    return { competencyPositionRelation: document as any, isLoading }
  }

  export const GetByCompetencyId = (competencyId: string) => {
    const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.CompetencyPositionRelation, [Query.equal('competencyId', competencyId)])
    return { competencyPositionRelationList: documents as any, isLoading }
  }
}

export default CompetencyPositionRelation;