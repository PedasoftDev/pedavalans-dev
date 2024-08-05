import { IRoot } from './main'

namespace IAssignedEducationResult {
  export interface ICreate {
    row_id?: string,
    assigned_education_id: string
    education_id: string
    employee_id: string
    employee_name: string
    educator_id: string
    educator_name: string
    educator_comment: string
    is_education_completed: boolean
    tenant_id: string
    attendance_status?: boolean
    point?: number
  }

  export interface IBase extends IRoot {
    row_id?: string,
    assigned_education_id: string
    education_id: string
    employee_id: string
    employee_name: string
    educator_id: string
    educator_name: string
    educator_comment: string
    is_education_completed: boolean
    tenant_id: string
    attendance_status?: boolean
    point?: number
    is_active: boolean
    is_deleted: boolean
  }
}

export default IAssignedEducationResult
