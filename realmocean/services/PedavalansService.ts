
class PedavalansService extends RealmoceanService {
  static Name = 'pedavalans-service';
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


  async init() {
    this.scheduleService.addJob('0 0 7 * * *', async () => {
      await this.checkVocationQualification();
    })
    this.scheduleService.addJob('*/5 * * * * *', async () => {
      const queryLimit = [this.databaseService.Query.limit(10000)]
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
      const parameters: any = await this.databaseService.listDocuments(this.appName, this.databaseName, this.Parameter, queryLimit).then(x => x.documents);
      const parametersString: any = await this.databaseService.listDocuments(this.appName, this.databaseName, this.StringParameter, queryLimit).then(x => x.documents);
      const accountRelations: IAccountRelation[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.AccountRelation, queryLimit).then(x => x.documents);
      const polyvalenceTables: IPolyvalenceUnitTable[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.PolyvalenceUnitTable, queryLimit).then(x => x.documents);
      const polyvalenceTableDataResponsible: IPolyvalenceUnitTableDataResponsible[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.PolyvalenceUnitTableDataResponsible, queryLimit).then(x => x.documents);
      const employeeCompetencyValues: IEmployeeCompetencyValue[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.EmployeeCompetencyValue, queryLimit).then(x => x.documents);
      for (let i = 0; i < polyvalenceTables.length; i++) {
        const table = polyvalenceTables[i];
        const responsibleUsers = polyvalenceTableDataResponsible.filter(x => x.polyvalence_table_id === table.$id);
        const employeeCompetencyValuesTable = employeeCompetencyValues.filter(x => x.polyvalence_table_id === table.$id);
        const currentPeriod = await this.getPeriodFromCurrentDate(table.polyvalence_evaluation_frequency);
        console.log('currentPeriod', currentPeriod)
        console.log('table', table)
        console.log('responsibleUsers', responsibleUsers)
        console.log('accountRelationsWithResponsibleUsers', accountRelations.filter(x => responsibleUsers.map(y => y.responsible_employee_id).includes(x.account_id)))
        console.log('employeeCompetencyValuesTable', employeeCompetencyValuesTable);
        console.log('parameters', parameters)
        console.log('parametersString', parametersString)
      }
    })
  }

  async getPeriodFromCurrentDate(frequency: string) {
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()
    if (frequency === 'Yıl') {
      return currentYear + ' Yılı Dönemi'
    } else if (frequency === 'Yarıyıl') {
      if (currentMonth >= 1 && currentMonth <= 6) {
        return currentYear + ' 1. Yarıyılı Dönemi'
      } else {
        return currentYear + ' 2. Yarıyılı Dönemi'
      }
    } else if (frequency === 'Çeyrekyıl') {
      if (currentMonth >= 1 && currentMonth <= 3) {
        return currentYear + ' 1. Çeyrekyılı Dönemi'
      } else if (currentMonth >= 4 && currentMonth <= 6) {
        return currentYear + ' 2. Çeyrekyılı Dönemi'
      } else if (currentMonth >= 7 && currentMonth <= 9) {
        return currentYear + ' 3. Çeyrekyılı Dönemi'
      } else {
        return currentYear + ' 4. Çeyrekyılı Dönemi'
      }
    } else if (frequency === 'Ay') {
      switch (currentMonth) {
        case 1:
          return currentYear + ' Ocak Dönemi'
        case 2:
          return currentYear + ' Şubat Dönemi'
        case 3:
          return currentYear + ' Mart Dönemi'
        case 4:
          return currentYear + ' Nisan Dönemi'
        case 5:
          return currentYear + ' Mayıs Dönemi'
        case 6:
          return currentYear + ' Haziran Dönemi'
        case 7:
          return currentYear + ' Temmuz Dönemi'
        case 8:
          return currentYear + ' Ağustos Dönemi'
        case 9:
          return currentYear + ' Eylül Dönemi'
        case 10:
          return currentYear + ' Ekim Dönemi'
        case 11:
          return currentYear + ' Kasım Dönemi'
        case 12:
          return currentYear + ' Aralık Dönemi'
        default:
          return currentYear + ' Ocak Dönemi'
      }
    }
  }

  // Mesleki Yeterlilik Belgesi/Sertifikası Son Kullanma Tarihi Hatırlatma Mail İşlemi
  async checkVocationQualification() {

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
      is_active: boolean;
      is_deleted: boolean;
      tenant_id: string;
      realm_id: string;
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
        password: "Pedasoft?2024_PDV",
        username: "info@pedabilisim.com",
        tls: false
      })
      await this.emailService.sendEmail(key, "info@pedabilisim.com", to_email, subject, html, values)
    } catch (error) {
      console.log(error)
    }
  }


}

module.exports = PedavalansService;