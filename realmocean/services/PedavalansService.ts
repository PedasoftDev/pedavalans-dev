
class PedavalansService extends RealmoceanService {
  static Name = 'pedavalans-service';

  async init() {

    const schedule = this.services.get('schedule-service');
    const appName = 'pedavalans';
    const databaseName = 'pedavalans';
    const Competency: string = "competency";
    const CompetencyGroup: string = "competency_group";
    const CompetencyGrade: string = "competency_grade";
    const CompetencyDepartment: string = "competency_department";
    const CompetencyMachineAssociation: string = "competency_machine_association";
    const AccountRelation: string = "account_relation";
    interface IAccountRelation {
      id: string;
      tenant_id: string;
      account_id: string;
      mail: string;
      authorization_profile: string;
      is_admin: boolean;
      is_active: boolean;
      is_deleted: boolean;
    }
    const PolyvalenceUnitTableDataResponsible: string = "polyvalence_unit_table_data_respon";
    interface IPolyvalenceUnitTableDataResponsible {
      data_responsible_id: string;
      responsible_employee_id: string;
      responsible_employee_name: string;
      polyvalence_table_id: string;
      tenant_id: string;
      realm_id: string;
      is_active: boolean;
      is_deleted: boolean;
    }
    const PolyvalenceUnitTableDataViewer: string = "polyvalence_unit_table_data_viewer";
    const PolyvalenceUnitTable: string = "polyvalence_unit_table";
    interface IPolyvalenceUnitTable {
      polyvalence_table_id: string;
      polyvalence_table_name: string;
      polyvalence_department_id: string;
      polyvalence_department_name: string;
      polyvalence_evaluation_frequency: string;
      is_active_table: boolean;
      is_deleted_table: boolean;
      tenant_id: string;
      realm_id: string;
    }
    const Parameter: string = "pedavalans_parameter";
    const CompetencyGradeLevel: string = "competency_grade_level";
    const Education: string = "education";
    const EducationCompetencyRelation: string = "education_competency_relation";
    const Machine: string = "machine";
    const OrganizationStructureDepartment: string = "organization_department";
    const OrganizationStructureTitle: string = "organization_title";
    const OrganizationStructurePosition: string = "organization_position";
    const OrganizationStructureLine: string = "organization_line";
    const OrganizationStructureEmployee: string = "organization_employee";
    const OrganizationStructureEmployeeLog: string = "organization_employee_log";
    const AssignedEducation = "assigned_education";
    const AssignedEducationResult = "assigned_education_result";
    const CompetencyGradeValue = "competency_grade_value";
    const CollectionVersion = "collection_version";
    const CollectionAttributeVersion = "collection_attribute_version";
    const DatabaseVersion = "database_version";
    const EmployeeCompetencyValue = "employee_competency_value";
    const VocationalQualificationType: string = 'vocational_qualification_type'
    const VocationalQualification: string = 'vocational_qualification'
    const OrganizationEmployeeDocument: string = 'organization_employee_document'
    const PositionVocationalQualificationRelation: string = "position_vocational_qualification";

    schedule.addJob('*/5 * * * * *', async () => {
      const accountRelation: IAccountRelation[] = await this.databaseService.listDocuments(appName, databaseName, AccountRelation).then(x => x.documents);
      const polyvalenceUnitTables: IPolyvalenceUnitTable[] = await this.databaseService.listDocuments(appName, databaseName, PolyvalenceUnitTable).then(x => x.documents);
      const polyvalenceUnitTableDataResponsibles: IPolyvalenceUnitTableDataResponsible[] = await this.databaseService.listDocuments(appName, databaseName, PolyvalenceUnitTableDataResponsible).then(x => x.documents);
      const competencies: any[] = await this.databaseService.listDocuments(appName, databaseName, Competency).then(x => x.documents);
      // console.log(polyvalenceUnitTables);
      // console.log(accountRelation);
      console.log(competencies.length)
    })
  }


}

module.exports = PedavalansService;