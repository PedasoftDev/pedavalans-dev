

export namespace IOrganizationEmployeeLog {
  export interface List {

  }
  export interface Create {
    employee_id: string
    employee_name: string
    log_date: string
    log_type: string
    job_start_date: string
    department_id: string
    department_name: string
    position_id: string
    position_name: string
    line_id: string
    line_name: string
    title_id: string
    title_name: string
    manager_id: string
    manager_name: string
    tenant_id: string
    is_active: boolean
    is_deleted: boolean
  }
}