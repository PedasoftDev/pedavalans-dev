import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import ITrainerEducations from '../../../client/interfaces/ITrainerEducations';
import Collections from '../../core/Collections';
import IPositionRelationDepartments from '../../../client/interfaces/IPositionRelationDepartments';

namespace PositionRelationDepartments {
  export const GetList = (): { positionRelationDepartmentsList: IPositionRelationDepartments.IBase[], isLoadingPositionRelationDepartmentsList: boolean } => {
    const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "position_relation_departments", [Query.equal("is_deleted", false), Query.limit(10000)])
    return {
        positionRelationDepartmentsList: documents as any,
        isLoadingPositionRelationDepartmentsList: isLoading
    }
  }

  export const Create = () => {
    const { createDocument } = useCreateDocument(AppInfo.Name, AppInfo.Database, "position_relation_departments")
    return {
      createPositionRelationDepartments: createDocument
    }
  }


  export const Update = () => {
    const { updateDocument } = useUpdateDocument(AppInfo.Name)
    return {
      updatePositionRelationDepartments: updateDocument,
    }
  }

  export const ListByDepartments = (parent_department_id: string): { positionRelationDepartmentsByDepartment: IPositionRelationDepartments.IBase[], isLoading: boolean } => {
    const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.PositionRelationDepartments,
      [Query.limit(10000), Query.equal("parent_department_id", parent_department_id), Query.equal("is_active", true), Query.equal("is_deleted", false)])
    return { positionRelationDepartmentsByDepartment: documents as any, isLoading }
  }

}

export default PositionRelationDepartments;