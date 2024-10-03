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

interface IOrganizationStructureEmployee extends IRoot {
  id: string;
  id_number: string;
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
  record_type: string;
}

interface IRoot {
  $id?: string;
  $updatedAt?: string;
  $createdAt?: string;
  $updatedBy?: string;
  $createdBy?: string;
}

interface IOrganizationStructureDepartment extends IRoot {
  id: string;
  tenant_id: string;
  realm_id: string;
  record_id: string;
  name: string;
  is_active: boolean;
  is_deleted: boolean;
}

interface IOrganizationStructureTitle extends IRoot {
  id: string;
  tenant_id: string;
  realm_id: string;
  record_id: string;
  name: string;
  is_active: boolean;
  is_deleted: boolean;
}

interface IOrganizationStructurePosition extends IRoot {
  id: string;
  tenant_id: string;
  realm_id: string;
  record_id: string;
  name: string;
  is_active: boolean;
  is_deleted: boolean;
}

interface IOrganizationStructureLine extends IRoot {
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

interface IOrganizationStructureWorkPlace extends IRoot {
  id: string;
  tenant_id: string;
  realm_id: string;
  record_id: string;
  name: string;
  is_active: boolean;
  is_deleted: boolean;
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

function generateId(size = 21): string {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let id = '';
  const randomValues = new Uint8Array(size);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < size; i++) {
    id += alphabet[randomValues[i] % alphabet.length];
  }
  return id;
}

function removeDollarProperties(obj: Record<string, any>): Record<string, any> {
  const result = { ...obj };
  for (const key in result) {
    if (key.startsWith('$')) {
      delete result[key];
    }
  }
  return result;
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

      interface IBaseData {
        id: string;
        name: string;
      }

      const departments: IBaseData[] = [];
      const titles: IBaseData[] = [];
      const positions: IBaseData[] = [];

      employeeData.forEach(employee => {
        if (!departments.find(d => d.id === employee.department_id) && employee.department_id) {
          departments.push({ id: employee.department_id, name: employee.department_name });
        }
        if (!titles.find(t => t.id === employee.title_id) && employee.title_id) {
          titles.push({ id: employee.title_id, name: employee.title_name });
        }
        if (!positions.find(p => p.id === employee.position_id) && employee.position_id) {
          positions.push({ id: employee.position_id, name: employee.position_name });
        }
      });

      const departmentsDb = await this.getDepartments();
      const titlesDb = await this.getTitles();
      const positionsDb = await this.getPositions();
      const employeesDb = await this.getEmployees();

      // UPDATE
      const departmentsToUpdate = departments.filter(d => departmentsDb.find(db => db.record_id === d.id && db.name !== d.name));
      const titlesToUpdate = titles.filter(t => titlesDb.find(db => db.record_id === t.id && db.name !== t.name));
      const positionsToUpdate = positions.filter(p => positionsDb.find(db => db.record_id === p.id && db.name !== p.name));
      const employeesToUpdate = employeeData.filter(e => employeesDb.find(db => db.id_number === e.id_number));

      Promise.all([
        departmentsToUpdate.map(d => this.databaseService.updateDocument(IntegrationAppInfo.Name, IntegrationAppInfo.Database, IntegrationCollections.Department, departmentsDb.find(db => db.record_id === d.id).$id, {
          name: d.name,
        })),
        titlesToUpdate.map(t => this.databaseService.updateDocument(IntegrationAppInfo.Name, IntegrationAppInfo.Database, IntegrationCollections.Title, titlesDb.find(db => db.record_id === t.id).$id, {
          name: t.name,
        })),
        positionsToUpdate.map(p => this.databaseService.updateDocument(IntegrationAppInfo.Name, IntegrationAppInfo.Database, IntegrationCollections.Position, positionsDb.find(db => db.record_id === p.id).$id, {
          name: p.name,
        }))
      ]).then(() => {
        console.log("Departman, Ünvan ve Pozisyonlar güncellendi.");
      });

      employeesToUpdate.forEach(employee => {
        const dbEmployee: IOrganizationStructureEmployee = employeesDb.find(db => db.id_number === employee.id_number && db.record_type === "integration");
        if (dbEmployee) {
          const date = (input: string): string | null => {
            if (input) {
              const isValidDate = Date.parse(input);
              if (!isValidDate || input.split('-')[0].startsWith("0") || input.split('/')[0].startsWith("0")) {
                return null;
              }
              try {
                return new Date(input).toISOString();
              } catch (error) {
                console.error("Geçersiz tarih:", input);
                return null;
              }
            } else {
              return null;
            }
          };
          const updatedEmployee: IOrganizationStructureEmployee = {
            ...dbEmployee,
            first_name: employee.first_name,
            last_name: employee.last_name,
            title_id: titlesDb.find(t => t.record_id === employee.title_id)?.$id,
            position_id: positionsDb.find(p => p.record_id === employee.position_id)?.$id,
            manager_id: employee.manager_id,
            line_id: employee.line_id,
            department_id: departmentsDb.find(d => d.record_id === employee.department_id)?.$id,
            job_start_date: date(employee?.job_start_date),
            birth_date: date(employee?.birth_date),
            gender: (employee.gender === "1" || employee.gender === "male" || employee.gender === "erkek" || employee.gender === "m") ? "male" : "female",
            department_start_date: date(employee?.department_start_date),
            position_start_date: date(employee?.position_start_date),
            phone: employee.phone,
            id: employee.id,
            record_type: "integration"
          };
          this.databaseService.updateDocument(IntegrationAppInfo.Name, IntegrationAppInfo.Database, IntegrationCollections.Employee, dbEmployee.$id, removeDollarProperties(updatedEmployee));
        }
      });

      // INSERT
      const departmentsToInsert = departments.filter(d => !departmentsDb.find(db => db.record_id === d.id));
      const titlesToInsert = titles.filter(t => !titlesDb.find(db => db.record_id === t.id));
      const positionsToInsert = positions.filter(p => !positionsDb.find(db => db.record_id === p.id));
      const employeesToInsert = employeeData.filter(e => !employeesDb.find(db => db.id_number === e.id_number));

      Promise.all([
        departmentsToInsert.map(d => {
          const uid = generateId();
          this.databaseService.createDocument(IntegrationAppInfo.Name, IntegrationAppInfo.Database, IntegrationCollections.Department, uid, {
            id: uid,
            record_id: d.id,
            name: d.name,
            tenant_id: settings.tenant_id,
            realm_id: settings.tenant_id,
          });
        }),
        titlesToInsert.map(t => {
          const uid = generateId();
          this.databaseService.createDocument(IntegrationAppInfo.Name, IntegrationAppInfo.Database, IntegrationCollections.Title, uid, {
            id: uid,
            record_id: t.id,
            name: t.name,
            tenant_id: settings.tenant_id,
            realm_id: settings.tenant_id,
          });
        }),
        positionsToInsert.map(p => {
          const uid = generateId();
          this.databaseService.createDocument(IntegrationAppInfo.Name, IntegrationAppInfo.Database, IntegrationCollections.Position, uid, {
            id: uid,
            record_id: p.id,
            name: p.name,
            tenant_id: settings.tenant_id,
            realm_id: settings.tenant_id,
          });
        }),
      ]).then(() => {
        console.log("Departman, Ünvan ve Pozisyonlar eklendi.");
      });

      const getPositionsDb = await this.getPositions();
      const getDepartmentsDb = await this.getDepartments();
      const getTitlesDb = await this.getTitles();

      employeesToInsert.forEach(employee => {
        const date = (input: string): string | null => {
          if (input) {
            const isValidDate = Date.parse(input);
            if (!isValidDate || input.split('-')[0].startsWith("0") || input.split('/')[0].startsWith("0")) {
              return null;
            }
            try {
              return new Date(input).toISOString();
            } catch (error) {
              console.error("Geçersiz tarih:", input);
              return null;
            }
          } else {
            return null;
          }
        };
        const newEmployee: IOrganizationStructureEmployee = {
          id: employee.id,
          id_number: employee.id_number,
          first_name: employee.first_name,
          last_name: employee.last_name,
          title_id: getTitlesDb.find(t => t.record_id === employee.title_id)?.$id,
          position_id: getPositionsDb.find(p => p.record_id === employee.position_id)?.$id,
          manager_id: employee.manager_id,
          line_id: employee.line_id,
          department_id: getDepartmentsDb.find(d => d.record_id === employee.department_id)?.$id,
          job_start_date: date(employee?.job_start_date),
          birth_date: date(employee?.birth_date),
          department_start_date: date(employee?.department_start_date),
          gender: (employee.gender === "1" || employee.gender === "male" || employee.gender === "erkek" || employee.gender === "m") ? "male" : "female",
          phone: employee.phone,
          position_start_date: date(employee?.position_start_date),
          realm_id: settings.tenant_id,
          tenant_id: settings.tenant_id,
          record_type: "integration",
          is_active: true,
          is_deleted: false
        };
        this.databaseService.createDocument(IntegrationAppInfo.Name, IntegrationAppInfo.Database, IntegrationCollections.Employee, generateId(), newEmployee);
      });

      // DELETE
      const departmentsToDelete = departmentsDb.filter(d => !departments.find(db => db.id === d.record_id));
      const titlesToDelete = titlesDb.filter(t => !titles.find(db => db.id === t.record_id));
      const positionsToDelete = positionsDb.filter(p => !positions.find(db => db.id === p.record_id));
      const employeesToDelete = employeesDb.filter(e => !employeeData.find(db => db.id_number === e.id_number) && e.record_type === "integration");

      Promise.all([
        departmentsToDelete.map(d => this.databaseService.updateDocument(IntegrationAppInfo.Name, IntegrationAppInfo.Database, IntegrationCollections.Department, d.$id, {
          is_active: false,
          is_deleted: true,
        })),
        titlesToDelete.map(t => this.databaseService.updateDocument(IntegrationAppInfo.Name, IntegrationAppInfo.Database, IntegrationCollections.Title, t.$id, {
          is_active: false,
          is_deleted: true,
        })),
        positionsToDelete.map(p => this.databaseService.updateDocument(IntegrationAppInfo.Name, IntegrationAppInfo.Database, IntegrationCollections.Position, p.$id, {
          is_active: false,
          is_deleted: true,
        }))
      ]).then(() => {
        console.log("Departman, Ünvan ve Pozisyonlar silindi.");
      });

      employeesToDelete.forEach(employee => {
        this.databaseService.updateDocument(IntegrationAppInfo.Name, IntegrationAppInfo.Database, IntegrationCollections.Employee, employee.$id, {
          is_active: false,
          is_deleted: true,
        });
      });

    } catch (error) {
      console.error('İstek sırasında hata oluştu:', error);
    }
  }

  async fetchOrganizationData(settings: any) {
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
      id: String(item[settings.id]),
      id_number: String(item[settings.id_number]),
      first_name: String(item[settings.first_name]),
      last_name: String(item[settings.last_name]),
      title_id: String(item[settings.title_id]),
      title_name: String(item[settings.title_name]),
      position_id: String(item[settings.position_id]),
      position_name: String(item[settings.position_name]),
      workplace_id: String(item[settings.workplace_id]),
      workplace_name: String(item[settings.workplace_name]),
      line_id: String(item[settings.line_id]),
      line_name: String(item[settings.line_name]),
      manager_id: String(item[settings.manager_id]),
      manager_name: String(item[settings.manager_name]),
      department_id: String(item[settings.department_id]),
      department_name: String(item[settings.department_name]),
      photo: item[settings.photo],
      job_start_date: String(item[settings.job_start_date]),
      birth_date: String(item[settings.birth_date]),
      gender: String(item[settings.gender]),
      department_start_date: String(item[settings.department_start_date]),
      position_start_date: String(item[settings.position_start_date]),
      phone: String(item[settings.phone]),
      email: String(item[settings.email]),
      proxy_employee_id: String(item[settings.proxy_employee_id]),
      educational_status: String(item[settings.educational_status])
    }));
  }

  async getOrganizationIntegrationSettings() {
    return this.databaseService.getDocument(IntegrationAppInfo.Name, IntegrationAppInfo.Database, 'organization_integration', "organization_integration");
  }

  async getDepartments(): Promise<IOrganizationStructureDepartment[]> {
    return this.fetchDocuments(IntegrationCollections.Department);
  }

  async getTitles(): Promise<IOrganizationStructureTitle[]> {
    return this.fetchDocuments(IntegrationCollections.Title);
  }

  async getPositions(): Promise<IOrganizationStructurePosition[]> {
    return this.fetchDocuments(IntegrationCollections.Position);
  }

  async getLines(): Promise<IOrganizationStructureLine[]> {
    return this.fetchDocuments(IntegrationCollections.Line);
  }

  async getWorkplaces(): Promise<IOrganizationStructureWorkPlace[]> {
    return this.fetchDocuments(IntegrationCollections.OrganizationStructureWorkPlace);
  }

  async getEmployees(): Promise<IOrganizationStructureEmployee[]> {
    return this.fetchDocuments(IntegrationCollections.Employee);
  }

  async fetchDocuments(collection: string) {
    return this.databaseService.listDocuments(IntegrationAppInfo.Name, IntegrationAppInfo.Database, collection, [
      this.databaseService.Query.limit(10000),
      this.databaseService.Query.equal('is_deleted', false)
    ]).then((res: any) => res.documents);
  }
}

module.exports = IntegrationService;