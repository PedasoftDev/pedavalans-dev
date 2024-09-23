namespace AppInfo {
  export const Name = "pedavalans";
  export const Version = "1.0.0";
  export const Description = "A simple, yet powerful, web-based database management system.";
  export const Author = "Pedasoft";
  export const License = "MIT";
  export const Homepage = "https://pedasoft.com";
  export const Database = "pedavalans";
}

namespace Collections {
  export const Competency: string = "competency";
  export const CompetencyGroup: string = "competency_group";
  export const CompetencyGrade: string = "competency_grade";
  export const CompetencyDepartment: string = "competency_department";
  export const CompetencyMachineAssociation: string = "competency_machine_association";
  export const CompetencyWorkPlace: string = "competency_work_place";
  export const AccountRelation: string = "account_relation";
  export const PolyvalenceUnitTableDataResponsible: string = "polyvalence_unit_table_data_respon";
  export const PolyvalenceUnitTableDataViewer: string = "polyvalence_unit_table_data_viewer";
  export const PolyvalenceUnitTable: string = "polyvalence_unit_table";
  export const Parameter: string = "pedavalans_parameter";
  export const CompetencyGradeLevel: string = "competency_grade_level";
  export const Education: string = "education";
  export const EducationPlan: string = "education_plan";
  export const EducationCompetencyRelation: string = "education_competency_relation";
  export const Machine: string = "machine";
  export const OrganizationStructureDepartment: string = "organization_department";
  export const OrganizationStructureWorkPlace: string = "organization_workplace";
  export const OrganizationStructureTitle: string = "organization_title";
  export const OrganizationStructurePosition: string = "organization_position";
  export const OrganizationStructureLine: string = "organization_line";
  export const OrganizationStructureEmployee: string = "organization_employee";
  export const OrganizationStructureEmployeeLog: string = "organization_employee_log";
  export const AssignedEducation = "assigned_education";
  export const AssignedEducationResult = "assigned_education_result";
  export const CompetencyGradeValue = "competency_grade_value";
  export const CollectionVersion = "collection_version";
  export const CollectionAttributeVersion = "collection_attribute_version";
  export const DatabaseVersion = "database_version";
  export const EmployeeCompetencyValue = "employee_competency_value";
  export const VocationalQualificationType: string = 'vocational_qualification_type'
  export const VocationalQualification: string = 'vocational_qualification'
  export const OrganizationEmployeeDocument: string = 'organization_employee_document'
  export const PositionVocationalQualificationRelation: string = "position_vocational_qualification";
  export const StringParameter = "string_parameter";
  export const CompetencyLineRelation = "competency_line_relation";
  export const PolyvalenceUnitPositionRelation = "polyvalence_unit_position_relation";
  export const CompetencyPositionRelation = "competency_position_relation";
  export const Trainers = "trainers";
  export const TrainerEducations = "trainer_educations";
  export const PositionRelationDepartments = "position_relation_departments";
  export const AssignedEducationEmployees = "assigned_education_employees";
  export const MailSettings = "mail_settings";
  export const EmailMessage = "email_message";
  export const EducationCompetencyStatusInfos = "education_competency_status_infos";
  export const Related_Departments_Workplaces = "related_departments_workplaces";
  export const Related_Position_Workplaces = "related_position_workplaces";
  export const Related_Workplaces_To_Trainer = "related_workplaces_to_trainer";
  export const EmployeeLineRelation = "employee_line_relation";
  export const EmployeeDepartmentRelation = "employee_department_relation";
}

export namespace IOrganizationStructure {

  export namespace IEmployees {

    export interface IEmployee {
      id: string;
      first_name: string;
      last_name: string;
      title_id: string;
      position_id: string;
      workplace_id: string;
      manager_id: string;
      line_id: string;
      department_id: string;
      job_start_date: string;
      birth_date: string;
      gender: string;
      department_start_date: string;
      position_start_date: string;
      phone: string;
      is_active: boolean;
      is_deleted: boolean;
      tenant_id: string;
      realm_id: string;
      educational_status?: string;
    }

  }

  export namespace IDepartments {

    export interface IDepartment {
      id: string;
      tenant_id: string;
      realm_id: string;
      record_id: string;
      name: string;
      parent_department_id?: string;
      parent_department_name?: string;
      is_active: boolean;
      is_deleted: boolean;
    }
  }

  export namespace ILines {

    export interface ILine {
      id: string;
      tenant_id: string;
      realm_id: string;
      record_id: string;
      name: string;
      is_active: boolean;
      is_deleted: boolean;
      department_id: string;
      department_name: string;
    }

  }

}


namespace IAccountRelation {
  export interface IBase {
    id: string;
    tenant_id: string;
    account_id: string;
    registration_number: string,
    mail: string;
    authorization_profile: string;
    is_admin: boolean;
    is_active: boolean;
    is_deleted: boolean;
  }

}



function nanoid(size = 21) {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let id = '';
  const randomValues = new Uint8Array(size);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < size; i++) {
    id += alphabet[randomValues[i] % alphabet.length];
  }
  return id;
}

class EmailService extends RealmoceanService {
  public get uid(): string {
    return 'com.pedavalans.service.email';
  }

  async init() {
    console.log("Email Service is running...");

    const router = this.webServer.getRouter();
    // localhost/v1/service/com.pedavalans.service.email/

    // every day at 07:00
    this.scheduleService.addJob('0 7 * * *', this.newEmployeeEvaluationDayReminder.bind(this));
  }

  // Yeni çalışanların işe girdikten + (parametre) gün kadar sonra amirine mail gönderir
  async newEmployeeEvaluationDayReminder() {

    const day = await this.getNewEmployeeEvaluationDayIsDefine();
    if (day === 0) {
      return;
    }

    const employees: IOrganizationStructure.IEmployees.IEmployee[] = await this.getEmployees();
    const accountRelation: IAccountRelation.IBase[] = await this.getAccountRelation();
    const emailSettings = await this.getEmailSettings();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Her çalışan için kontrol
    employees.forEach(async (employee) => {
      if (!employee.job_start_date || isNaN(Date.parse(employee.job_start_date))) {
        return;
      }

      const jobStartDate = new Date(employee.job_start_date);
      jobStartDate.setHours(0, 0, 0, 0);

      // İşe başlama tarihine belirlenen gün sayısını ekliyoruz
      const evaluationDate = new Date(jobStartDate);
      evaluationDate.setDate(evaluationDate.getDate() + day);

      // Sadece yıl, ay ve günü karşılaştırıyoruz
      const isSameDate = (
        evaluationDate.getFullYear() === today.getFullYear() &&
        evaluationDate.getMonth() === today.getMonth() &&
        evaluationDate.getDate() === today.getDate()
      );

      // Tarihler eşit mi kontrol ediyoruz
      if (isSameDate) {
        // Eğer tarihler eşitse çalışanın amirine mail gönderiyoruz
        const manager = accountRelation.find((ar) => ar.account_id === employee.manager_id);
        if (manager) {
          await this.databaseService.createDocument(AppInfo.Name, AppInfo.Database, Collections.EmailMessage, nanoid(), {
            sender: emailSettings.username,
            recipient: manager.mail,
            subject: "employee_assessment_reminder",
            content: JSON.stringify({
              employeeName: `${employee.first_name} ${employee.last_name}`,
            }),
            status: "pending",
          })
        }
      }
    });
  }


  //// DEFAULT FUNCTIONS FOR SERVICE - START ////
  async getEmployees() {
    const employees = await this.databaseService.listDocuments(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureEmployee,
      [this.databaseService.Query.limit(10000), this.databaseService.Query.equal('is_active', true), this.databaseService.Query.equal('is_deleted', false)]).then((res) => res.documents);
    return employees;
  }

  async getAccountRelation() {
    const accountRelation = await this.databaseService.listDocuments(AppInfo.Name, AppInfo.Database, Collections.AccountRelation,
      [this.databaseService.Query.limit(10000), this.databaseService.Query.equal('is_active', true), this.databaseService.Query.equal('is_deleted', false)]).then((res) => res.documents);
    return accountRelation;
  }

  async getEmailSettings() {
    const emailSettings = await this.databaseService.getDocument(AppInfo.Name, AppInfo.Database, Collections.MailSettings, "mail_settings");
    return emailSettings;
  }

  async getNewEmployeeEvaluationDayIsDefine(): Promise<number> {
    const parameter = await this.databaseService.listDocuments(AppInfo.Name, AppInfo.Database, Collections.StringParameter, [this.databaseService.Query.equal('name', 'new_employee_evaluation_day')]).then((res) => res.documents[0]);
    if (parameter && parameter.value) {
      return Number(parameter.value);
    }
    return 0;
  }

  async createEmailKey(smtp_server: string, smtp_port: string, username: string, password: string, tls: boolean) {
    function decrypt(encryptedText: string): string {
      const decodedText = atob(encryptedText);
      let decrypted = '';
      for (let i = 0; i < decodedText.length; i++) {
        const keyChar = "mysecretkey12345".charCodeAt(i % "mysecretkey12345".length);
        const textChar = decodedText.charCodeAt(i);
        decrypted += String.fromCharCode(textChar ^ keyChar);
      }
      return decrypted;
    }

    const key = await this.emailService.createKey({
      smtpServer: smtp_server,
      smtpPort: smtp_port,
      password: decrypt(password),
      username: username,
      tls: tls
    })
    return key;
  }
  //// DEFAULT FUNCTIONS FOR SERVICE - END ////



}

module.exports = EmailService