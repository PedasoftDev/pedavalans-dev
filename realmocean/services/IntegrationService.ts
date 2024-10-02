interface IEmployee {
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
  photo_type?: string;
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

namespace IntegrationAppInfo {
  export const Name = "pedavalans";
  export const Database = "pedavalans";
}

namespace IntegrationCollections {
  export const Department = "organization_department";
  export const Title = "organization_title";
  export const Position = "organization_position";
  export const Line = "organization_line";
  export const Employee = "organization_employee";
  export const Competency = "competency";
  export const CompetencyGroup = "competency_group";
  export const CompetencyDepartment = "competency_department";
  export const Parameter = "pedavalans_parameter";
  export const CompetencyLineRelation = "competency_line_relation";
  export const CompetencyWorkPlace = "competency_work_place";
  export const OrganizationStructureWorkPlace = "organization_workplace";
}

class IntegrationService extends RealmoceanService {
  public get uid(): string {
    return 'com.pedavalans.service.integration';
  }

  async init() {
    console.log("Integration Service is running...");
    this.taskOrganizationIntegration();
    this.scheduleService.addJob("*/10 * * * *", () => this.taskOrganizationIntegration());
  }

  async taskOrganizationIntegration() {
    const settings = await this.getOrganizationIntegrationSettings();
    if (!settings) return;

    try {
      const data = await this.fetchOrganizationData(settings);
      if (!data) {
        console.warn("Veri boş döndü.");
        return;
      }

      const resultData = settings.response_data_attribute ? data[settings.response_data_attribute] : data;
      if (!resultData) {
        console.warn("Veri işlenemedi.");
        return;
      }

      const employeeData = this.mapEmployeeData(resultData, settings);
      console.log(employeeData);
    } catch (error) {
      console.error('İstek sırasında hata oluştu:', error);
    }
  }

  async fetchOrganizationData(settings) {
    const response = await fetch(settings.link, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(JSON.parse(settings.body)),
    });

    if (!response.ok) {
      console.error(`İstek hatalı: ${response.statusText}`);
      return null;
    }

    return await response.json();
  }

  mapEmployeeData(data: any[], settings: any): IEmployee[] {
    return data.map(item => ({
      id: item[settings.id],
      id_number: item[settings.id_number],
      first_name: item[settings.first_name],
      last_name: item[settings.last_name],
      title_id: item[settings.title_id],
      title_name: item[settings.title_name],
      position_id: item[settings.position_id],
      position_name: item[settings.position_name],
      workplace_id: item[settings.workplace_id],
      workplace_name: item[settings.workplace_name],
      line_id: item[settings.line_id],
      line_name: item[settings.line_name],
      manager_id: item[settings.manager_id],
      manager_name: item[settings.manager_name],
      department_id: item[settings.department_id],
      department_name: item[settings.department_name],
      photo: item[settings.photo],
      job_start_date: item[settings.job_start_date],
      birth_date: item[settings.birth_date],
      gender: item[settings.gender],
      department_start_date: item[settings.department_start_date],
      position_start_date: item[settings.position_start_date],
      phone: item[settings.phone],
      email: item[settings.email],
      proxy_employee_id: item[settings.proxy_employee_id],
      educational_status: item[settings.educational_status],
    }));
  }

  async getOrganizationIntegrationSettings() {
    return this.databaseService.getDocument(
      IntegrationAppInfo.Name,
      IntegrationAppInfo.Database,
      'organization_integration',
      "organization_integration"
    );
  }

  async getDepartments() {
    return this.fetchDocuments(IntegrationCollections.Department);
  }

  async getTitles() {
    return this.fetchDocuments(IntegrationCollections.Title);
  }

  async getPositions() {
    return this.fetchDocuments(IntegrationCollections.Position);
  }

  async getLines() {
    return this.fetchDocuments(IntegrationCollections.Line);
  }

  async getWorkplaces() {
    return this.fetchDocuments(IntegrationCollections.OrganizationStructureWorkPlace);
  }

  async getEmployees() {
    return this.fetchDocuments(IntegrationCollections.Employee);
  }

  async fetchDocuments(collection: string) {
    return this.databaseService.listDocuments(IntegrationAppInfo.Name, IntegrationAppInfo.Database, collection, [
      this.databaseService.Query.limit(1000),
      this.databaseService.Query.equal('is_deleted', false)
    ]).then(res => res.documents);
  }
}

module.exports = IntegrationService;