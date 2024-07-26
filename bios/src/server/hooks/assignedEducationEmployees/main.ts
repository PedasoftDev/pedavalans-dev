import {
  Query,
  useCreateDocument,
  useGetDocument,
  useListDocuments,
  useUpdateDocument,
} from '@realmocean/sdk'
import AppInfo from '../../../AppInfo'
import Collections from '../../core/Collections'
import IAssignedEducationEmployees from '../../../client/interfaces/IAssignedEducationEmployees'

namespace AssignedEducationEmployees {
  export const Create = () => {
    const { createDocument } = useCreateDocument(
      AppInfo.Name,
      AppInfo.Database,
      Collections.AssignedEducationEmployees
    )
    return {
      createAssignedEducationEmp: createDocument,
    }
  }

  export const ListByMainAssignedEmp = (
    main_assigned_education_id: string
  ): {
    assingedEducationEmployeesByMainId: IAssignedEducationEmployees.IBase[]
    isLoading: boolean
  } => {
    const { documents, isLoading } = useListDocuments(
      AppInfo.Name,
      AppInfo.Database,
      Collections.AssignedEducationEmployees,
      [
        Query.limit(10000),
        Query.equal('main_assigned_education_id', main_assigned_education_id),
        Query.equal('is_active', true),
        Query.equal('is_deleted', false),
      ]
    )
    return { assingedEducationEmployeesByMainId: documents as any, isLoading }
  }

  export const GetList = (
    tenant_id: string
  ): {
    assignedEducationEmpList: IAssignedEducationEmployees.IBase[]
    isLoadingAssignedEducationEmpList: boolean
  } => {
    const { documents, isLoading } = useListDocuments(
      AppInfo.Name,
      AppInfo.Database,
      Collections.AssignedEducationEmployees,
      [
        Query.equal('tenant_id', tenant_id),
        Query.equal('is_deleted', false),
        Query.limit(10000),
      ]
    )
    return {
      assignedEducationEmpList: documents as any,
      isLoadingAssignedEducationEmpList: isLoading,
    }
  }

  export const Update = () => {
    const { updateDocument } = useUpdateDocument(AppInfo.Name)
    return {
      updateAssignedEducationEmp: updateDocument,
    }
  }
}

export default AssignedEducationEmployees
