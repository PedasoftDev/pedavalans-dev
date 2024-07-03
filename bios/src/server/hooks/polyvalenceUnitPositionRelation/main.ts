import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import Collections from '../../core/Collections';
namespace PolyvalenceUnitPositionRelation {
  export const Create = () => {
    const { createDocument } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitPositionRelation)
    return {
      createPolyvalenceUnitPositionRelation: createDocument
    }
  }

  export const GetByPolyvalenceUnitId = (polyvalenceUnitId: string) => {
    const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitPositionRelation,
      [Query.equal("polyvalence_unit_id", polyvalenceUnitId), Query.equal("is_active", true), Query.equal("is_deleted", false), Query.limit(100)])
    return {
      polyvalenceUnitPositionRelations: documents,
      isLoading
    }
  }

  export const List = () => {
    const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitPositionRelation, [Query.equal("is_active", true), Query.equal("is_deleted", false), Query.limit(1000)])
    return {
      polyvalenceUnitPositionRelations: documents,
      isLoading
    }
  }
}

export default PolyvalenceUnitPositionRelation;