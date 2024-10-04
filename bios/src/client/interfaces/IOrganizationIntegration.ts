interface IOrganizationIntegration {
  link: string;
  body: string;
  response_data_attribute: string;
  // data attributes
  id: string;
  id_number: string;
  first_name: string;
  last_name: string;
  title_id: string;
  title_name: string;
  position_id: string;
  position_name: string;
  workplace_id: string;
  workplace_name: string;
  line_id: string;
  line_name: string;
  manager_id: string;
  manager_name: string;
  department_id: string;
  department_name: string;
  photo: string;
  photo_type: string;
  job_start_date: string;
  birth_date: string;
  gender: string;
  department_start_date: string;
  position_start_date: string;
  phone: string;
  email: string;
  proxy_employee_id: string;
  educational_status: string;
}

export default IOrganizationIntegration;