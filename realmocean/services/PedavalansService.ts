
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


  async init() {
    this.scheduleService.addJob('0 0 7 * * *', async () => {
      await this.checkVocationQualification();
    })
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
        <p class="signature">İyi günler dileriz.</p>
        <p class="signature">Pedavalans Ekibi</p>
      </div>
    </body>
    
    </html>
    `;
    try {
      const accountRelation: IAccountRelation[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.AccountRelation).then(x => x.documents);
      const employees: IOrganizationStructureEmployee[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.OrganizationStructureEmployee).then(x => x.documents);

      let vocationalQualification: IVocationalQualification[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.VocationalQualification).then(x => x.documents);
      vocationalQualification = vocationalQualification.filter(x => x.document_validity_period !== "Süresiz")
      let organizationEmployeeDocument: IOrganizationEmployeeDocument[] = await this.databaseService.listDocuments(this.appName, this.databaseName, this.OrganizationEmployeeDocument).then(x => x.documents);
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