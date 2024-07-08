interface IRoot {
  $id?: string;
  $updatedAt?: string;
  $createdAt?: string;
  $updatedBy?: string;
  $createdBy?: string;
}
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
interface IPolyvalenceUnitTable extends IRoot {
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
interface IPolyvalenceUnitTableDataResponsible extends IRoot {
  data_responsible_id: string;
  responsible_employee_id: string;
  responsible_employee_name: string;
  polyvalence_table_id: string;
  tenant_id: string;
  realm_id: string;
  is_active: boolean;
  is_deleted: boolean;
}
interface IEmployeeCompetencyValue extends IRoot {
  employee_competency_value_id: string;
  employee_id: string;
  employee_name: string;
  polyvalence_table_id: string;
  polyvalence_table_name: string;
  competency_department_id: string;
  competency_department_name: string;
  competency_evaluation_period: string;
  competency_id: string;
  competency_name: string;
  competency_target_value: string;
  competency_real_value: string;
  competency_value_desc: string;
  is_active_competency_value: boolean;
  is_deleted_competency_value: boolean;
  tenant_id: string;
  realm_id: string;
}
interface IOrganizationStructureEmployee extends IRoot {
  id: string;
  first_name: string;
  last_name: string;
  title_id: string;
  position_id: string;
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
}

export interface IOrganizationStructureDepartment extends IRoot {
  id: string;
  tenant_id: string;
  realm_id: string;
  record_id: string;
  name: string;
  is_active: boolean;
  is_deleted: boolean;
}

export interface IOrganizationStructureTitle extends IRoot {
  id: string;
  tenant_id: string;
  realm_id: string;
  record_id: string;
  name: string;
  is_active: boolean;
  is_deleted: boolean;
}
export interface IOrganizationStructurePosition extends IRoot {
  id: string;
  tenant_id: string;
  realm_id: string;
  record_id: string;
  name: string;
  is_active: boolean;
  is_deleted: boolean;
}
export interface IOrganizationStructureLine extends IRoot {
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

interface ICompetency extends IRoot {
  competency_id: string;
  competency_name: string;
  competency_group_id: string;
  competency_group_name: string;
  competency_target_value: string;
  competency_real_value: string;
  competency_value_desc: string;
  employee_id: string;
  employee_name: string;
  polyvalence_table_id: string;
  polyvalence_table_name: string;
  competency_evaluation_period: string;
  is_active_competency: boolean;
  is_deleted_competency: boolean;
  tenant_id: string;
  realm_id: string;
}
interface ICompetencyDepartment extends IRoot {
  competency_department_table_id: string;
  competency_department_id: string;
  competency_department_name: string;
  competency_id: string;
  tenant_id: string;
}

interface ICompetencyWithDepartment extends ICompetency {
  department_id: string;
  department_name: string;
}


interface IVocationalQualification {
  document_id: string
  document_code: string
  document_name: string
  document_validity_period: string
  document_type_id: string
  document_type_name: string
  is_active: boolean
  is_deleted: boolean
}
interface IOrganizationEmployeeDocument {
  employee_id: string
  document_id: string
  document_name: string
  end_date?: string
  document_type_id: string
  document_type_name: string
  tenant_id: string
  is_active: boolean
  is_deleted: boolean
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

class PedavalansService extends RealmoceanService {
  public get uid(): string {
    return 'com.pedavalans.service.main';
  }

  get displayName(): string {
    return 'Pedavalans Service'
  }

  readonly appName = 'pedavalans';
  readonly databaseName = 'pedavalans';

  // collection names
  readonly Competency = "competency";
  readonly CompetencyGroup = "competency_group";
  readonly CompetencyGrade = "competency_grade";
  readonly CompetencyDepartment = "competency_department";
  readonly CompetencyMachineAssociation = "competency_machine_association";
  readonly AccountRelation = "account_relation";
  readonly PolyvalenceUnitTableDataResponsible = "polyvalence_unit_table_data_respon";
  readonly PolyvalenceUnitTableDataViewer = "polyvalence_unit_table_data_viewer";
  readonly PolyvalenceUnitTable = "polyvalence_unit_table";
  readonly Parameter = "pedavalans_parameter";
  readonly CompetencyGradeLevel = "competency_grade_level";
  readonly Education = "education";
  readonly EducationCompetencyRelation = "education_competency_relation";
  readonly Machine = "machine";
  readonly OrganizationStructureDepartment = "organization_department";
  readonly OrganizationStructureTitle = "organization_title";
  readonly OrganizationStructurePosition = "organization_position";
  readonly OrganizationStructureLine = "organization_line";
  readonly OrganizationStructureEmployee = "organization_employee";
  readonly OrganizationStructureEmployeeLog = "organization_employee_log";
  readonly AssignedEducation = "assigned_education";
  readonly AssignedEducationResult = "assigned_education_result";
  readonly CompetencyGradeValue = "competency_grade_value";
  readonly CollectionVersion = "collection_version";
  readonly CollectionAttributeVersion = "collection_attribute_version";
  readonly DatabaseVersion = "database_version";
  readonly EmployeeCompetencyValue = "employee_competency_value";
  readonly VocationalQualificationType = 'vocational_qualification_type';
  readonly VocationalQualification = 'vocational_qualification';
  readonly OrganizationEmployeeDocument = 'organization_employee_document';
  readonly PositionVocationalQualificationRelation = "position_vocational_qualification";
  readonly StringParameter = "string_parameter";
  readonly ChartValue = "chart_value";


  async init() {
    console.log('PedavalansService running...');
    await this.updateDashboardChartData();
    await this.checkPositionBasedPolyvalenceManagement();
    this.scheduleService.addJob('0 0 7 * * *', async () => {
      await this.checkVocationQualification();
      await this.checkTargetDateForReminder();
      await this.checkRealDataForReminder();


    })

    const router = this.webServer.getRouter();
    // localhost/v1/service/com.pedavalans.service.main/

    router.post("/com.pedavalans.service.main/updateCompetencyDepartmentNames", async (req, res) => {
      const { departmentId, departmentName } = req.body;


      try {
        const result = await this.updateCompetencyDepartmentNames(departmentId, departmentName);
        return res.json({ result });

      } catch (e) {
        return res.status(500).json({ message: e.message });
      }
    });

    router.post("/com.pedavalans.service.main/updateVocationQualificationTypeNames", async (req, res) => {
      const { documentTypeId, documentTypeName } = req.body;

      try {
        const result = await this.updateVocationQualificationTypeNames(documentTypeId, documentTypeName);
        return res.json({ result });

      } catch (e) {
        return res.status(500).json({ message: e.message });
      }
    });



    this.scheduleService.addJob('0 0 * * * *', async () => {
      await this.updateDashboardChartData();
    })
  }

  async updateVocationQualificationTypeNames(documentTypeId: string, documentTypeName: string): Promise<any> {
    const vocationalQualifications: IVocationalQualification[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.VocationalQualification, [this.databaseService.Query.equal("document_type_id", documentTypeId)]).then((res) => res.documents);
    const employeeVocationalQualificationDocuments: IOrganizationEmployeeDocument[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.OrganizationEmployeeDocument, [this.databaseService.Query.equal("document_type_id", documentTypeId)]).then((res) => res.documents);

    vocationalQualifications.forEach(async (vocationalQualification) => {
      try {
        await this.databaseService.updateDocument(this.appName, this.databaseName, this.VocationalQualification, vocationalQualification.$id, { document_type_name: documentTypeName });
      } catch (error) {
        console.log(error);
      }
    })

    employeeVocationalQualificationDocuments.forEach(async (employeeVocationalQualificationDocument) => {
      try {
        await this.databaseService.updateDocument(this.appName, this.databaseName, this.OrganizationEmployeeDocument, employeeVocationalQualificationDocument.$id, { document_type_name: documentTypeName });
      } catch (error) {
        console.log(error);
      }
    })
  }


  async updateCompetencyDepartmentNames(departmentId: string, departmentName: string): Promise<any> {
    const competencyDepartments: ICompetencyDepartment[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.CompetencyDepartment, [this.databaseService.Query.equal("competency_department_id", departmentId)]).then((res) => res.documents);
    competencyDepartments.forEach(async (competencyDepartment) => {
      await this.databaseService.updateDocument(this.appName, this.databaseName, this.CompetencyDepartment, competencyDepartment.$id, { competency_department_name: departmentName });
    })
  }

  async updateDashboardChartData() {
    try {
      const isAlreadyDataPieForChart = await this.databaseService.listDocuments(this.appName, this.databaseName, this.ChartValue, [this.databaseService.Query.equal("key", "dashboard_pie")]).then((res) => res.documents);
      if (isAlreadyDataPieForChart) {
        const employeePerformanceData: { name: string, performance: number }[] = [];
        const queryLimit = this.databaseService.Query.limit(100000)
        const employees = await this.databaseService.listDocuments(this.appName, this.databaseName, this.OrganizationStructureEmployee, [queryLimit, this.databaseService.Query.equal("is_deleted", false), this.databaseService.Query.equal("is_active", true)]).then((res) => res.documents);
        const competencies = await this.databaseService.listDocuments(this.appName, this.databaseName, this.Competency, [queryLimit, this.databaseService.Query.equal("is_deleted_competency", false), this.databaseService.Query.equal("is_active_competency", true)]).then((res) => res.documents);
        const employeeCompetencyValues = await this.databaseService.listDocuments(this.appName, this.databaseName, this.EmployeeCompetencyValue, [queryLimit]).then((res) => res.documents);
        employees.forEach((employee) => {
          const employeeCompetencyValue = employeeCompetencyValues.filter((competency) => competency.employee_id === employee.$id)
          let target = 0;
          let current = 0;
          employeeCompetencyValue.forEach((competency) => {
            const competencyIsActive = competencies.find((comp) => comp.$id === competency.competency_id)
            if (competencyIsActive) {
              if (competency.competency_target_value != "no-target" && competency.competency_real_value != "") {
                target += Number(competency.competency_target_value);
                current += Number(competency.competency_real_value);
              }
            }
          })
          if (target > 0 && current > 0) {
            let performance = (current / target) * 100;
            if (performance > 100) {
              performance = 100;
            } else {
              performance = Math.round(performance);
            }
            employeePerformanceData.push({ name: employee.first_name + " " + employee.last_name, performance })
          }
        })
        if (employeePerformanceData.length > 0) {
          const performData: any = [
            {
              name: "100% - 80%",
              value: 0,
            },
            {
              name: "80% - 60%",
              value: 0,
            },
            {
              name: "60% - 40%",
              value: 0,
            },
            {
              name: "40% - 20%",
              value: 0,
            },
            {
              name: "20% - 0%",
              value: 0,
            },
          ];

          employeePerformanceData.forEach((employee) => {
            if (employee.performance >= 80) {
              performData.find((x: any) => x.name === "100% - 80%").value += 1;
            } else if (employee.performance < 80 && employee.performance >= 60) {
              performData.find((x: any) => x.name === "80% - 60%").value += 1;
            } else if (employee.performance < 60 && employee.performance >= 40) {
              performData.find((x: any) => x.name === "60% - 40%").value += 1;
            } else if (employee.performance < 40 && employee.performance >= 20) {
              performData.find((x: any) => x.name === "40% - 20%").value += 1;
            } else if (employee.performance < 20 && employee.performance >= 0) {
              performData.find((x: any) => x.name === "20% - 0%").value += 1;
            }
          });

          const resultData = []
          performData.forEach((data) => {
            if (data.value > 0) {
              resultData.push(data)
            }
          })

          if (isAlreadyDataPieForChart[0]) {
            console.log("update")
            await this.databaseService.updateDocument(this.appName, this.databaseName, this.ChartValue, "dashboard_pie", { value: JSON.stringify(resultData) });
          } else {
            await this.databaseService.createDocument(this.appName, this.databaseName, this.ChartValue, "dashboard_pie", { key: "dashboard_pie", value: JSON.stringify(resultData) });
            console.log("create")
          }
        }

        // bar chart section
        const isAlreadyDataBarForChart = await this.databaseService.listDocuments(this.appName, this.databaseName, this.ChartValue, [this.databaseService.Query.equal("key", "dashboard_bar_1")]).then((res) => res.documents);

        const departments = await this.databaseService.listDocuments(this.appName, this.databaseName, this.OrganizationStructureDepartment, [this.databaseService.Query.limit(10000), this.databaseService.Query.equal("is_deleted", false)]).then((res) => res.documents);
        const polyvalenceUnitList = await this.databaseService.listDocuments(this.appName, this.databaseName, this.PolyvalenceUnitTable, [this.databaseService.Query.limit(10000), this.databaseService.Query.equal("is_deleted_table", false), , this.databaseService.Query.equal("is_active_table", true)]).then((res) => res.documents);
        const departmentsData = []
        departments.forEach((department) => {
          const employeeValuesByDepartment = employeeCompetencyValues.filter((competency) => competency.competency_department_id === department.$id)
          let target = 0;
          let current = 0;
          employeeValuesByDepartment.forEach((competency) => {
            const competencyIsActive = competencies.find((comp) => comp.$id === competency.competency_id)
            const employeeIsActive = employees.find((emp) => emp.$id === competency.employee_id && emp.department_id === department.$id)
            if (competencyIsActive && employeeIsActive && competency.competency_target_value != "no-target") {
              target += Number(competency.competency_target_value);
              current += Number(competency.competency_real_value);
            }
          })
          if (target > 0 && current > 0) {
            const percentage = (current / target) * 100
            const haveAnyTable = polyvalenceUnitList.find((unit) => unit.polyvalence_department_id === department.$id)
            if (haveAnyTable) {
              departmentsData.push({ departmentName: department.name, percentage: percentage.toFixed(2) })
            }
          }
        })
        if (departmentsData.length > 0) {
          if (isAlreadyDataBarForChart[0]) {
            await this.databaseService.updateDocument(this.appName, this.databaseName, this.ChartValue, "dashboard_bar_1", { value: JSON.stringify(departmentsData.sort((a, b) => b.percentage - a.percentage).slice(0, 5)) });
            await this.databaseService.updateDocument(this.appName, this.databaseName, this.ChartValue, "dashboard_bar_2", { value: JSON.stringify(departmentsData.sort((a, b) => a.percentage - b.percentage).slice(0, 5)) });
            console.log("update")
          } else {
            await this.databaseService.createDocument(this.appName, this.databaseName, this.ChartValue, "dashboard_bar_1", { key: "dashboard_bar_1", value: JSON.stringify(departmentsData.sort((a, b) => b.percentage - a.percentage).slice(0, 5)) });
            await this.databaseService.createDocument(this.appName, this.databaseName, this.ChartValue, "dashboard_bar_2", { key: "dashboard_bar_2", value: JSON.stringify(departmentsData.sort((a, b) => a.percentage - b.percentage).slice(0, 5)) });
            console.log("create")
          }
        }
      }




    } catch (error) {
      console.log(error);
    }
  }

  async checkRealDataForReminder() {
    const queryLimit = this.databaseService.Query.limit(10000)
    const mailTemplate = (userList: string[]) => `<!DOCTYPE html>
    <html>
    <head>
      <style>
        /* Font Family */
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    
        body {
          font-family: 'Roboto', sans-serif;
          padding: 40px;
          background-color: #f4f4f9;
          color: #333;
        }
    
        h1 {
          color: #004085;
          font-size: 24px;
          margin-bottom: 20px;
          border-bottom: 2px solid #004085;
          padding-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
    
        p {
          margin: 10px 0;
          line-height: 1.6;
        }
    
        .highlight {
          color: #0056b3;
          font-weight: 500;
        }
    
        .signature {
          margin-top: 40px;
          font-size: 14px;
          color: #666;
        }
    
        .container {
          max-width: 600px;
          margin: auto;
          background-color: #ffffff;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }
        ul {
          list-style-type: none;
          padding: 0;
      }
       ul li {
          background-color: #f4f4f4;
          margin: 5px 0;
          padding: 10px;
          border: 1px solid #dddddd;
      }

        .footer {
          text-align: center;
          background-color: #f4f4f9;
          color: #666666;
          padding: 10px 0;
          margin-top: 20px;
          border-top: 1px solid #dddddd;
      }
      </style>
    </head>
    
    <body>
      <div class="container">
        <h1>Polivalans Dönemsel Değerlendirme Veri Girişi Hatırlatma <img src="data:image/png;base64,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" width="40px"/></h1>
        <p>Merhaba,</p>
        <p>
          <span class="highlight">{{polyvalenceTableName}}</span> için aşağıdaki kullanıcıların dönemsel değerlendirme verilerinin giriş tarihi yaklaşmıştır. 
          Bilginize
        </p>
          <p style="margin: 0;">Personel Listesi</p>
        	<hr style="margin: 0 0 10px 0;">
          <ul>
          ${userList.map((user) => `<li>${user}</li>`).join("")}
          </ul>
        <div class="footer">
            <p>İyi çalışmalar,<br>Pedavalans Ekibi</p>
        </div>
      </div>
    </body>
    
    </html>`

    const Parameters = [
      {
        name: "Polivalans tablolarında yetkilendirme kullanılsın mı?",
        localStr: "polyvalence_unit_table_auth",
        type: "boolean",
      },
      {
        name: "Makine bazlı polivalans yönetimi uygulanacak mı?",
        localStr: "machine_based_polyvalence_management",
        type: "boolean",
      },
      {
        name: "Hat bazlı yetkinlik ilişkilendirmesi kullanılsın mı?",
        localStr: "line_based_competency_relationship",
        type: "boolean",
      },
      {
        name: "Birim polivalans tablosu veri girişleri tamamlandığı anda tüm polivalans tablosu veri girişçi ve görebilecek kişilere mail atılsın mı?",
        localStr: "polyvalence_unit_table_mail",
        type: "boolean",
      },
      {
        name: "Veri girişi yapılmayan tablolar için hatırlatma maili gönderilsin mi?",
        localStr: "reminder_mail_for_unfilled_tables",
        type: "boolean",
      }
    ];

    const StringParameters = [
      {
        name: "Birim polivalans tablosu veri sorumlularına kaç gün öncesinden mail gönderilsin?",
        localStr: "polyvalence_unit_table_responsible_users_mail_day",
        type: "string",
      },
      {
        name: "Veri girişi yapılmayan tablolar için hatırlatma maili kaç gün öncesinden gönderilsin?",
        localStr: "reminder_mail_for_unfilled_tables_day",
        type: "string",
      }
    ];


    const parameters: { name: string; is_active: string }[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.Parameter, [queryLimit]).then(x => x.documents);
    const authParameterIsActive: boolean = parameters.find(x => x.name === Parameters[0].localStr)?.is_active as any;
    const reminderDayParameterIsActive: boolean = parameters.find(x => x.name === Parameters[4].localStr)?.is_active as any;
    const employees: IOrganizationStructureEmployee[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.OrganizationStructureEmployee, [queryLimit,
      this.databaseService.Query.equal('is_active', true),
      this.databaseService.Query.equal('is_deleted', false)
    ]).then(x => x.documents);
    const parametersString: { name: string; value: string }[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.StringParameter, [queryLimit]).then(x => x.documents);
    const reminderDayCount = Number(parametersString.find(x => x.name === StringParameters[1].localStr)?.value);
    const accountRelations: IAccountRelation[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.AccountRelation, [queryLimit, this.databaseService.Query.equal('is_active', true)]).then(x => x.documents);
    const polyvalenceTables: IPolyvalenceUnitTable[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.PolyvalenceUnitTable, [queryLimit, this.databaseService.Query.equal('is_active_table', true)]).then(x => x.documents);
    const polyvalenceTableDataResponsible: IPolyvalenceUnitTableDataResponsible[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.PolyvalenceUnitTableDataResponsible, [queryLimit, this.databaseService.Query.equal('is_active', true), this.databaseService.Query.equal("is_deleted", false)]).then(x => x.documents);
    const employeeCompetencyValues: IEmployeeCompetencyValue[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.EmployeeCompetencyValue, [queryLimit]).then(x => x.documents);
    const competencies: ICompetency[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.Competency, [queryLimit, this.databaseService.Query.equal('is_active_competency', true),
      this.databaseService.Query.equal('is_deleted_competency', false)]).then(x => x.documents);
    const competenciesWithDepartmentRelation: ICompetencyDepartment[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.CompetencyDepartment, [queryLimit, this.databaseService.Query.equal('is_active', true),
      this.databaseService.Query.equal('is_deleted', false)]).then(x => x.documents);
    if (reminderDayCount > 0 && reminderDayParameterIsActive) {
      for (let i = 0; i < polyvalenceTables.length; i++) {
        const table = polyvalenceTables[i];
        const responsibleUsers = polyvalenceTableDataResponsible.filter(x => x.polyvalence_table_id === table.$id);
        const period = await this.getPeriodFromCurrentDate(table.polyvalence_evaluation_frequency);
        const employeesByTable = employees.filter(x => x.department_id === table.polyvalence_department_id);
        const employeeCompetencyValueByPeriodAndTable = employeeCompetencyValues.filter(x => x.polyvalence_table_id === table.$id && x.competency_evaluation_period === period.period);
        const periodEndDate = new Date(period.endDate);
        const reminderDate = new Date(periodEndDate);
        reminderDate.setDate(periodEndDate.getDate() - reminderDayCount);

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        reminderDate.setHours(0, 0, 0, 0);

        // Yetkinlikleri departmanları ile birlikte getir
        const competenciesWithDepartment: ICompetencyWithDepartment[] = [];
        // Atama işlemi
        const competenciesWithDepartmentRelationByTable = competenciesWithDepartmentRelation.filter(x => x.competency_department_id === table.polyvalence_department_id);
        competenciesWithDepartmentRelationByTable.forEach((competencyRel) => {
          const competency = competencies.find(x => x.competency_id === competencyRel.competency_id);
          if (competency) {
            competenciesWithDepartment.push({ ...competency, department_id: competencyRel.competency_department_id, department_name: competencyRel.competency_department_name });
          }
        });

        // Veri girişi yapılmayanlar
        const unfilledEmployees = [];
        employeesByTable.forEach((employee) => {
          const employeeCompetencyValue = employeeCompetencyValueByPeriodAndTable.filter(x => x.employee_id === employee.$id);
          let unfilledCount = 0;
          employeeCompetencyValue.forEach((competencyValue) => {
            if ((competencyValue.competency_target_value != "no-target" && competencyValue.competency_real_value === "") || competencyValue.competency_real_value == null) {
              unfilledCount++;
            }
          })
          if (unfilledCount > 0) {
            unfilledEmployees.push(`${employee.first_name} ${employee.last_name} (${unfilledCount} adet yetkinlik)`);
          }
        });

        if (reminderDate.getTime() === today.getTime() && unfilledEmployees.length > 0) {
          const mailTemplateWithEmployees = mailTemplate(unfilledEmployees)
          if (authParameterIsActive) {
            responsibleUsers.forEach(async (responsibleUser) => {
              const account = accountRelations.find(x => x.account_id === responsibleUser.responsible_employee_id);
              if (account) {
                try {
                  await this.emailSender(account.mail, "Polivalans Tablosu Veri Girişi Hatırlatma", mailTemplateWithEmployees, {
                    day: reminderDayCount,
                    polyvalenceTableName: table.polyvalence_table_name
                  })
                } catch (error) {
                  console.log(error);
                }
              }
            })
          }
          //  else {
          //   accountRelations.forEach(async (account) => {
          //     try {
          //       await this.emailSender(account.mail, "Polivalans Tablosu Veri Girişi Hatırlatma", mailTemplateWithEmployees, {
          //         day: reminderDayCount
          //       })
          //     } catch (error) {
          //       console.log(error);
          //     }
          //   })
          // }
        }
      }
    }

  }

  async checkTargetDateForReminder() {
    const queryLimit = this.databaseService.Query.limit(10000)
    const mailTemplate = (userList: string[]) => `<!DOCTYPE html>
    <html>
    <head>
      <style>
        /* Font Family */
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    
        body {
          font-family: 'Roboto', sans-serif;
          padding: 40px;
          background-color: #f4f4f9;
          color: #333;
        }
    
        h1 {
          color: #004085;
          font-size: 24px;
          margin-bottom: 20px;
          border-bottom: 2px solid #004085;
          padding-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
    
        p {
          margin: 10px 0;
          line-height: 1.6;
        }
    
        .highlight {
          color: #0056b3;
          font-weight: 500;
        }
    
        .signature {
          margin-top: 40px;
          font-size: 14px;
          color: #666;
        }
    
        .container {
          max-width: 600px;
          margin: auto;
          background-color: #ffffff;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }
        ul {
          list-style-type: none;
          padding: 0;
      }
       ul li {
          background-color: #f4f4f4;
          margin: 5px 0;
          padding: 10px;
          border: 1px solid #dddddd;
      }

        .footer {
          text-align: center;
          background-color: #f4f4f9;
          color: #666666;
          padding: 10px 0;
          margin-top: 20px;
          border-top: 1px solid #dddddd;
      }
      </style>
    </head>
    
    <body>
      <div class="container">
        <h1>Polivalans Hedef Veri Girişi Hatırlatma <img src="data:image/png;base64,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" width="40px"/></h1>
        <p>Merhaba,</p>
        <p>
          <span class="highlight">{{polyvalenceTableName}}</span> için aşağıdaki kullanıcıların hedef verilerinin giriş tarihi yaklaşmıştır ({{day}} gün kaldı). 
          Bilginize
        </p>
          <p style="margin: 0;">Personel Listesi</p>
        	<hr style="margin: 0 0 10px 0;">
          <ul>
          ${userList.map((user) => `<li>${user}</li>`).join("")}
          </ul>
        <div class="footer">
            <p>İyi çalışmalar,<br>Pedavalans Ekibi</p>
        </div>
      </div>
    </body>
    
    </html>`

    const Parameters = [
      {
        name: "Polivalans tablolarında yetkilendirme kullanılsın mı?",
        localStr: "polyvalence_unit_table_auth",
        type: "boolean",
      },
      {
        name: "Makine bazlı polivalans yönetimi uygulanacak mı?",
        localStr: "machine_based_polyvalence_management",
        type: "boolean",
      },
      {
        name: "Hat bazlı yetkinlik ilişkilendirmesi kullanılsın mı?",
        localStr: "line_based_competency_relationship",
        type: "boolean",
      },
      {
        name: "Birim polivalans tablosu veri girişleri tamamlandığı anda tüm polivalans tablosu veri girişçi ve görebilecek kişilere mail atılsın mı?",
        localStr: "polyvalence_unit_table_mail",
        type: "boolean",
      },
      {
        name: "Veri girişi yapılmayan tablolar için hatırlatma maili gönderilsin mi?",
        localStr: "reminder_mail_for_unfilled_tables",
        type: "boolean",
      }
    ];

    const StringParameters = [
      {
        name: "Birim polivalans tablosu veri sorumlularına kaç gün öncesinden mail gönderilsin?",
        localStr: "polyvalence_unit_table_responsible_users_mail_day",
        type: "string",
      },
      {
        name: "Veri girişi yapılmayan tablolar için hatırlatma maili kaç gün öncesinden gönderilsin?",
        localStr: "reminder_mail_for_unfilled_tables_day",
        type: "string",
      }
    ];


    const parameters: { name: string; is_active: string }[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.Parameter, [queryLimit]).then(x => x.documents);
    const authParameterIsActive: boolean = parameters.find(x => x.name === Parameters[0].localStr)?.is_active as any;
    const employees: IOrganizationStructureEmployee[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.OrganizationStructureEmployee, [queryLimit,
      this.databaseService.Query.equal('is_active', true),
      this.databaseService.Query.equal('is_deleted', false)
    ]).then(x => x.documents);
    const parametersString: { name: string; value: string }[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.StringParameter, [queryLimit]).then(x => x.documents);
    const accountRelations: IAccountRelation[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.AccountRelation, [queryLimit, this.databaseService.Query.equal('is_active', true)]).then(x => x.documents);
    const polyvalenceTables: IPolyvalenceUnitTable[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.PolyvalenceUnitTable, [queryLimit, this.databaseService.Query.equal('is_active_table', true)]).then(x => x.documents);
    const polyvalenceTableDataResponsible: IPolyvalenceUnitTableDataResponsible[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.PolyvalenceUnitTableDataResponsible, [queryLimit, this.databaseService.Query.equal('is_active', true), this.databaseService.Query.equal("is_deleted", false)]).then(x => x.documents);
    const reminderDayCount = Number(parametersString.find(x => x.name === StringParameters[0].localStr)?.value);
    const employeeCompetencyValues: IEmployeeCompetencyValue[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.EmployeeCompetencyValue, [queryLimit]).then(x => x.documents);
    const competencies: ICompetency[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.Competency, [queryLimit, this.databaseService.Query.equal('is_active_competency', true),
      this.databaseService.Query.equal('is_deleted_competency', false)]).then(x => x.documents);
    const competenciesWithDepartmentRelation: ICompetencyDepartment[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.CompetencyDepartment, [queryLimit, this.databaseService.Query.equal('is_active', true),
      this.databaseService.Query.equal('is_deleted', false)]).then(x => x.documents);
    if (reminderDayCount > 0) {
      console.log('reminderDayCount', reminderDayCount);
      for (let i = 0; i < polyvalenceTables.length; i++) {
        const table = polyvalenceTables[i];
        const responsibleUsers = polyvalenceTableDataResponsible.filter(x => x.polyvalence_table_id === table.$id);
        const nextPeriod = await this.getNextPeriodFromCurrentDate(table.polyvalence_evaluation_frequency);
        const employeesByTable = employees.filter(x => x.department_id === table.polyvalence_department_id);
        const employeeCompetencyValueByPeriodAndTable = employeeCompetencyValues.filter(x => x.polyvalence_table_id === table.$id && x.competency_evaluation_period === nextPeriod.period);
        const nextPeriodStartDate = new Date(nextPeriod.startDate);
        const reminderDate = new Date(nextPeriodStartDate);
        reminderDate.setDate(nextPeriodStartDate.getDate() - reminderDayCount);

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        reminderDate.setHours(0, 0, 0, 0);

        // Yetkinlikleri departmanları ile birlikte getir
        const competenciesWithDepartment: ICompetencyWithDepartment[] = [];
        // Atama işlemi
        const competenciesWithDepartmentRelationByTable = competenciesWithDepartmentRelation.filter(x => x.competency_department_id === table.polyvalence_department_id);
        competenciesWithDepartmentRelationByTable.forEach((competencyRel) => {
          const competency = competencies.find(x => x.competency_id === competencyRel.competency_id);
          if (competency) {
            competenciesWithDepartment.push({ ...competency, department_id: competencyRel.competency_department_id, department_name: competencyRel.competency_department_name });
          }
        });

        // Veri girişi yapılmayanlar
        const unfilledEmployees = [];
        employeesByTable.forEach((employee) => {
          const employeeCompetencyValue = employeeCompetencyValueByPeriodAndTable.filter(x => x.employee_id === employee.$id);
          if (employeeCompetencyValue.length !== competenciesWithDepartment.length) {
            unfilledEmployees.push(employee.first_name + ' ' + employee.last_name);
          }
        });



        if (reminderDate.getTime() === today.getTime() && unfilledEmployees.length > 0) {
          console.log('reminderDate === today', reminderDate, today, 'reminderDate === today');
          const mailTemplateWithEmployees = mailTemplate(unfilledEmployees)
          if (authParameterIsActive) {
            responsibleUsers.forEach(async (responsibleUser) => {
              const account = accountRelations.find(x => x.account_id === responsibleUser.responsible_employee_id);
              if (account) {
                try {
                  await this.emailSender(account.mail, "Polivalans Tablosu Veri Girişi Hatırlatma", mailTemplateWithEmployees, {
                    day: reminderDayCount,
                    polyvalenceTableName: table.polyvalence_table_name
                  })
                } catch (error) {
                  console.log(error);
                }
              }
            })
          }
          // else {
          //   accountRelations.forEach(async (account) => {
          //     try {
          //       await this.emailSender(account.mail, "Polivalans Tablosu Veri Girişi Hatırlatma", mailTemplateWithEmployees, {
          //         day: reminderDayCount
          //       })
          //     } catch (error) {
          //       console.log(error);
          //     }
          //   })
          // }
        }
      }
    }


  }

  async getNextPeriodFromCurrentDate(frequency: string) {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const startDate = new Date();
    const endDate = new Date();
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];

    if (frequency === 'Yıl') {
      startDate.setFullYear(currentYear + 1, 0, 1);
      endDate.setFullYear(currentYear + 1, 11, 31);
      return { period: (currentYear + 1) + ' Yılı Dönemi', startDate, endDate };
    } else if (frequency === 'Yarıyıl') {
      if (currentMonth >= 1 && currentMonth <= 6) {
        startDate.setFullYear(currentYear, 6, 1);
        endDate.setFullYear(currentYear, 11, 31);
        return { period: currentYear + ' 2. Yarıyılı Dönemi', startDate, endDate };
      } else {
        startDate.setFullYear(currentYear + 1, 0, 1);
        endDate.setFullYear(currentYear + 1, 5, 30);
        return { period: (currentYear + 1) + ' 1. Yarıyılı Dönemi', startDate, endDate };
      }
    } else if (frequency === 'Çeyrekyıl') {
      if (currentMonth >= 1 && currentMonth <= 3) {
        startDate.setFullYear(currentYear, 3, 1);
        endDate.setFullYear(currentYear, 5, 30);
        return { period: currentYear + ' 2. Çeyrekyılı Dönemi', startDate, endDate };
      } else if (currentMonth >= 4 && currentMonth <= 6) {
        startDate.setFullYear(currentYear, 6, 1);
        endDate.setFullYear(currentYear, 8, 30);
        return { period: currentYear + ' 3. Çeyrekyılı Dönemi', startDate, endDate };
      } else if (currentMonth >= 7 && currentMonth <= 9) {
        startDate.setFullYear(currentYear, 9, 1);
        endDate.setFullYear(currentYear, 11, 30);
        return { period: currentYear + ' 4. Çeyrekyılı Dönemi', startDate, endDate };
      } else {
        startDate.setFullYear(currentYear + 1, 0, 1);
        endDate.setFullYear(currentYear + 1, 2, 31);
        return { period: (currentYear + 1) + ' 1. Çeyrekyılı Dönemi', startDate, endDate };
      }
    } else if (frequency === 'Ay') {
      if (currentMonth === 12) {
        startDate.setFullYear(currentYear + 1, 0, 1);
        endDate.setFullYear(currentYear + 1, 0, 31);
      } else {
        startDate.setFullYear(currentYear, currentMonth, 1);
        endDate.setFullYear(currentYear, currentMonth, new Date(currentYear, currentMonth, 0).getDate());
      }
      return { period: months[currentMonth % 12] + ' Dönemi', startDate, endDate };
    }

    return null;
  }

  async getPeriodFromCurrentDate(frequency: string) {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const startDate = new Date();
    const endDate = new Date();

    if (frequency === 'Yıl') {
      startDate.setFullYear(currentYear, 0, 1);
      endDate.setFullYear(currentYear, 11, 31);
      return { period: currentYear + ' Yılı Dönemi', startDate, endDate };
    } else if (frequency === 'Yarıyıl') {
      if (currentMonth >= 1 && currentMonth <= 6) {
        startDate.setFullYear(currentYear, 0, 1);
        endDate.setFullYear(currentYear, 5, 30);
        return { period: currentYear + ' 1. Yarıyılı Dönemi', startDate, endDate };
      } else {
        startDate.setFullYear(currentYear, 6, 1);
        endDate.setFullYear(currentYear, 11, 31);
        return { period: currentYear + ' 2. Yarıyılı Dönemi', startDate, endDate };
      }
    } else if (frequency === 'Çeyrekyıl') {
      if (currentMonth >= 1 && currentMonth <= 3) {
        startDate.setFullYear(currentYear, 0, 1);
        endDate.setFullYear(currentYear, 2, 31);
        return { period: currentYear + ' 1. Çeyrekyılı Dönemi', startDate, endDate };
      } else if (currentMonth >= 4 && currentMonth <= 6) {
        startDate.setFullYear(currentYear, 3, 1);
        endDate.setFullYear(currentYear, 5, 30);
        return { period: currentYear + ' 2. Çeyrekyılı Dönemi', startDate, endDate };
      } else if (currentMonth >= 7 && currentMonth <= 9) {
        startDate.setFullYear(currentYear, 6, 1);
        endDate.setFullYear(currentYear, 8, 30);
        return { period: currentYear + ' 3. Çeyrekyılı Dönemi', startDate, endDate };
      } else {
        startDate.setFullYear(currentYear, 9, 1);
        endDate.setFullYear(currentYear, 11, 31);
        return { period: currentYear + ' 4. Çeyrekyılı Dönemi', startDate, endDate };
      }
    } else if (frequency === 'Ay') {
      startDate.setFullYear(currentYear, currentMonth - 1, 1);
      endDate.setFullYear(currentYear, currentMonth - 1, new Date(currentYear, currentMonth, 0).getDate());
      const months = [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
      ];
      return { period: currentYear + ' ' + months[currentMonth - 1] + ' Dönemi', startDate, endDate };
    }

    return null;
  }

  // Mesleki Yeterlilik Belgesi/Sertifikası Son Kullanma Tarihi Hatırlatma Mail İşlemi
  async checkVocationQualification() {
    // Belge hatırlatma html
    const documentRemainderHtml = `<!DOCTYPE html>
    <html>
    
    <head>
      <style>
        /* Font Family */
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    
        body {
          font-family: 'Roboto', sans-serif;
          padding: 40px;
          background-color: #f4f4f9;
          color: #333;
        }
    
        h1 {
          color: #004085;
          font-size: 24px;
          margin-bottom: 20px;
          border-bottom: 2px solid #004085;
          padding-bottom: 10px;
        }
    
        p {
          margin: 10px 0;
          line-height: 1.6;
        }
    
        .highlight {
          color: #0056b3;
          font-weight: 500;
        }
    
        .signature {
          margin-top: 40px;
          font-size: 14px;
          color: #666;
        }
    
        .container {
          max-width: 600px;
          margin: auto;
          background-color: #ffffff;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }

        .footer {
          text-align: center;
          background-color: #f4f4f9;
          color: #666666;
          padding: 10px 0;
          margin-top: 20px;
          border-top: 1px solid #dddddd;
      }
      </style>
    </head>
    
    <body>
      <div class="container">
        <h1>Belge Son Kullanma Tarihi Hatırlatma</h1>
        <p>Merhaba,</p>
        <p>
          <span class="highlight">{{employeeName}}</span> adlı çalışanın 
          <span class="highlight">{{documentName}}</span> isimli Mesleki Yeterlilik Belgesi/Sertifikasının geçerlilik süresi dolmak üzeredir 
          (<span class="highlight">{{endDate}}</span>). Lütfen belgeyi güncelleyiniz.
        </p>
        <p><strong>Personel Adı Soyadı:</strong> <span class="highlight">{{employeeName}}</span></p>
        <p><strong>Belge No:</strong> <span class="highlight">{{documentNo}}</span></p>
        <p><strong>Belge Adı:</strong> <span class="highlight">{{documentName}}</span></p>
        <p><strong>Bitiş Tarihi:</strong> <span class="highlight">{{endDate}}</span></p>
        <div class="footer">
            <p>İyi çalışmalar,<br>Pedavalans Ekibi</p>
        </div>
      </div>
    </body>
    
    </html>
    `;
    try {
      const accountRelation: IAccountRelation[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.AccountRelation, [this.databaseService.Query.limit(10000)]).then(x => x.documents);
      const employees: IOrganizationStructureEmployee[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.OrganizationStructureEmployee, [this.databaseService.Query.limit(10000)]
      ).then(x => x.documents);

      let vocationalQualification: IVocationalQualification[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.VocationalQualification, [this.databaseService.Query.limit(10000)]).then(x => x.documents);
      vocationalQualification = vocationalQualification.filter(x => x.document_validity_period !== "Süresiz")
      let organizationEmployeeDocument: IOrganizationEmployeeDocument[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.OrganizationEmployeeDocument, [this.databaseService.Query.limit(10000)]).then(x => x.documents);
      organizationEmployeeDocument = organizationEmployeeDocument.filter(x => x.end_date !== "")
      if (organizationEmployeeDocument.length > 0) {
        organizationEmployeeDocument.forEach(async (doc) => {
          const employee = employees.find(x => x.$id === doc.employee_id);
          // eğer çalışan bulunamazsa işlemi durdur eklenecek
          // if (employee) { } else { console.log('Çalışan bulunamadı'); } 
          const documentRemainderDay = Number(vocationalQualification.find(x => x.document_id === doc.document_id)?.document_validity_period);
          let endDateMail = new Date(doc.end_date)
          if (doc.end_date.split('T')[1].startsWith('21')) endDateMail.setDate(endDateMail.getDate() + 1);
          let endDate = new Date(doc.end_date)
          if (doc.end_date.split('T')[1].startsWith('21')) endDate.setDate(endDate.getDate() + 1);
          const today = new Date();

          endDate.setDate(endDate.getDate() - documentRemainderDay);


          // Eğer bugün hatırlatma günü ise console'a yazdır
          if (today.toDateString() === endDate.toDateString()) {
            accountRelation.forEach(async (account) => {
              if (account.authorization_profile === 'admin' || account.is_admin) {
                await this.emailSender(account.mail, "Belge Hatırlatma", documentRemainderHtml, {
                  employeeName: employee?.first_name + " " + employee?.last_name,  // query ile employee name alınacak ** query şuanda çalışmıyor
                  documentName: doc.document_name,
                  documentNo: vocationalQualification.find(x => x.document_id === doc.document_id)?.document_code,
                  endDate: endDateMail.toLocaleDateString("tr-TR")
                })
              }
            })
          } else {
            console.log('Bugün hatırlatma günü değil');
          }
        })

      }



    } catch (error) {
      console.log(error)
    }
  }

  // Email gönderme fonksiyonu
  async emailSender(to_email: string, subject: string, html: string, values: any) {
    try {
      const key = await this.emailService.createKey({
        smtpServer: "smtp-mail.outlook.com",
        smtpPort: "587",
        password: "V%443989818492ug",
        username: "notification@pedabilisim.com",
        tls: false
      })
      await this.emailService.sendEmail(key, "notification@pedabilisim.com", to_email, subject, html, values)
    } catch (error) {
      console.log(error)
    }
  }

  // posizyon bazlı polivalans yönetimi parametresi kontrolü
  async checkPositionBasedPolyvalenceManagement() {
    const parameter = await this.databaseService.listDocuments(this.appName, this.databaseName, this.StringParameter, [this.databaseService.Query.equal('name', 'position_based_polyvalence_management')]).then(x => x.documents);
    if (!parameter[0]) {
      await this.databaseService.createDocument(this.appName, this.databaseName, this.StringParameter, nanoid(), {
        name: "position_based_polyvalence_management",
        value: "false"
      });
    } else {
      console.log('position_based_polyvalence_management Parameter already exists');
    }
  }


}

module.exports = PedavalansService;