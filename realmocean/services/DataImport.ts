namespace AppInfo {
  export const Name = "pedavalans";
  export const Database = "pedavalans";
}

namespace Collections {
  export const Department = "organization_department";
  export const Title = "organization_title";
  export const Position = "organization_position";
  export const Line = "organization_line";
  export const Employee = "organization_employee";
}

export interface IEmployeeImportFromExcel {
  sicil_no: string;
  adi: string;
  soyadi: string;
  dogum_tarihi: string;
  telefon_no: string;
  cinsiyet: string;
  egitim_durumu: string;
  ise_baslama_tarihi: string;
  amir_sicil_no: string;
  departman_kodu: string;
  departman_adi: string;
  departmana_baslama_tarihi: string;
  unvan_kodu: string;
  unvan_tanimi: string;
  pozisyon_kodu: string;
  pozisyon_tanimi: string;
  pozisyona_baslama_tarihi: string;
  hat_kodu: string | null;
  hat_adi: string | null;
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

class DataImport extends RealmoceanService {
  public get uid(): string {
    return 'com.pedavalans.service.import';
  }

  async init() {
    console.log("Data Import Service is running...");

    const router = this.webServer.getRouter();
    // localhost/v1/service/com.pedavalans.service.import/

    router.post("/com.pedavalans.service.main/employeeImport", async (req, res) => {
      const { data, organization } = req.body;
      try {
        if (!data || !organization) {
          return res.status(400).json({ message: "Data or organization is missing" });
        }
        const result = await this.employeeImport(data as any, organization);
        return res.json({ result });

      } catch (e) {
        return res.status(500).json({ message: e.message });
      }
    });
  }

  async getDepartments() {
    return this.databaseService.listDocuments(AppInfo.Name, AppInfo.Database, Collections.Department, [
      this.databaseService.Query.limit(1000),
      this.databaseService.Query.equal('is_deleted', false)
    ]).then((res) => res.documents);
  }

  async getTitles() {
    return this.databaseService.listDocuments(AppInfo.Name, AppInfo.Database, Collections.Title, [
      this.databaseService.Query.limit(1000),
      this.databaseService.Query.equal('is_deleted', false)
    ]).then((res) => res.documents);
  }

  async getPositions() {
    return this.databaseService.listDocuments(AppInfo.Name, AppInfo.Database, Collections.Position, [
      this.databaseService.Query.limit(1000),
      this.databaseService.Query.equal('is_deleted', false)
    ]).then((res) => res.documents);
  }

  async getLines() {
    return this.databaseService.listDocuments(AppInfo.Name, AppInfo.Database, Collections.Line, [
      this.databaseService.Query.limit(1000),
      this.databaseService.Query.equal('is_deleted', false)
    ]).then((res) => res.documents);
  }

  async employeeImport(data: IEmployeeImportFromExcel[], organization: string) {
    let departments: { code: string; name: string }[] = [];
    let titles: typeof departments = [];
    let positions: typeof departments = [];
    let lines: { department_code: string; code: string; name: string }[] = [];

    let dbDepartments = await this.getDepartments();
    let dbTitles = await this.getTitles();
    let dbPositions = await this.getPositions();
    let dbLines = await this.getLines();

    let dbEmployees = await this.databaseService.listDocuments(AppInfo.Name, AppInfo.Database, Collections.Employee, [
      this.databaseService.Query.limit(10000),
      this.databaseService.Query.equal('is_deleted', false)
    ]).then((res) => res.documents);

    let departmentCodes = new Set(dbDepartments.map(d => d.record_id));
    let titleCodes = new Set(dbTitles.map(t => t.record_id));
    let positionCodes = new Set(dbPositions.map(p => p.record_id));
    let lineCodes = new Set(dbLines.map(l => l.record_id));
    let employeeCodes = new Set(dbEmployees.map(e => e.record_id));

    for (const row of data) {
      if (!departments.some(d => d.code === row.departman_kodu)) {
        departments.push({ code: row.departman_kodu, name: row.departman_adi });
      }
      if (!titles.some(t => t.code === row.unvan_kodu)) {
        titles.push({ code: row.unvan_kodu, name: row.unvan_tanimi });
      }
      if (!positions.some(p => p.code === row.pozisyon_kodu)) {
        positions.push({ code: row.pozisyon_kodu, name: row.pozisyon_tanimi });
      }
      if (!lines.some(l => l.code === row.hat_kodu)) {
        lines.push({ department_code: row.departman_kodu, code: row.hat_kodu, name: row.hat_adi });
      }
    }

    try {
      await Promise.all(departments.map(async department => {
        if (!departmentCodes.has(department.code)) {
          const createDep = {
            id: nanoid(),
            name: department.name,
            record_id: department.code,
            tenant_id: organization,
            realm_id: organization
          };
          if (createDep.name && createDep.record_id) {
            await this.databaseService.createDocument(AppInfo.Name, AppInfo.Database, Collections.Department, createDep.id, createDep);

            const newDepartment = await this.databaseService.getDocument(AppInfo.Name, AppInfo.Database, Collections.Department, createDep.id);
            dbDepartments.push(newDepartment);
            departmentCodes.add(createDep.record_id); // Set'e ekle
          }
        }
      }));

      await Promise.all(titles.map(async title => {
        if (!titleCodes.has(title.code)) {
          const createTitle = {
            id: nanoid(),
            name: title.name,
            record_id: title.code,
            tenant_id: organization,
            realm_id: organization
          };
          if (createTitle.name && createTitle.record_id) {
            await this.databaseService.createDocument(AppInfo.Name, AppInfo.Database, Collections.Title, createTitle.id, createTitle);

            const newTitle = await this.databaseService.getDocument(AppInfo.Name, AppInfo.Database, Collections.Title, createTitle.id);
            dbTitles.push(newTitle);
            titleCodes.add(createTitle.record_id); // Set'e ekle
          }
        }
      }));

      await Promise.all(positions.map(async position => {
        if (!positionCodes.has(position.code)) {
          const createPos = {
            id: nanoid(),
            name: position.name,
            record_id: position.code,
            tenant_id: organization,
            realm_id: organization
          };
          if (createPos.name && createPos.record_id) {
            await this.databaseService.createDocument(AppInfo.Name, AppInfo.Database, Collections.Position, createPos.id, createPos);

            const newPosition = await this.databaseService.getDocument(AppInfo.Name, AppInfo.Database, Collections.Position, createPos.id);
            dbPositions.push(newPosition);
            positionCodes.add(createPos.record_id); // Set'e ekle
          }
        }
      }));

      await Promise.all(lines.map(async line => {
        if (!lineCodes.has(line.code)) {
          const department = dbDepartments.find(d => d.record_id === line.department_code);
          const createLine = {
            id: nanoid(),
            name: line.name,
            record_id: line.code,
            department_id: department?.id,
            department_name: department?.name,
            tenant_id: organization,
            realm_id: organization
          };
          if (createLine.name && createLine.record_id) {
            await this.databaseService.createDocument(AppInfo.Name, AppInfo.Database, Collections.Line, createLine.id, createLine);

            const newLine = await this.databaseService.getDocument(AppInfo.Name, AppInfo.Database, Collections.Line, createLine.id);
            dbLines.push(newLine);
            lineCodes.add(createLine.record_id); // Set'e ekle
          }
        }
      }));

      // Employee import
      await Promise.all(data.map(async employee => {
        if (!employeeCodes.has(employee.sicil_no)) {
          const department = dbDepartments.find(d => d.record_id === employee.departman_kodu);
          const title = dbTitles.find(t => t.record_id === employee.unvan_kodu);
          const position = dbPositions.find(p => p.record_id === employee.pozisyon_kodu);
          const line = dbLines.find(l => l.record_id === employee.hat_kodu);
          const employeeId = nanoid();

          const createEmp = {
            id: employee.sicil_no,
            first_name: employee.adi,
            last_name: employee.soyadi,
            department_id: department?.id,
            title_id: title?.id,
            position_id: position?.id,
            workplace_id: null,
            job_start_date: employee.ise_baslama_tarihi,
            line_id: line?.id,
            manager_id: null,
            birth_date: employee.dogum_tarihi,
            gender: (employee.cinsiyet.toLowerCase() === "e" || employee.cinsiyet.toLowerCase() === "erkek") ? "male" : "female",
            phone: employee.telefon_no ? String(employee.telefon_no) : "",
            educational_status: employee.egitim_durumu.toLowerCase() === "lise" ? "high school" :
              employee.egitim_durumu.toLowerCase() === "üniversite" ? "university" :
                employee.egitim_durumu.toLowerCase() === "ilkokul" ? "elementary school" :
                  employee.egitim_durumu.toLowerCase() === "ortaokul" ? "secondary school" : null,
            department_start_date: employee.departmana_baslama_tarihi,
            position_start_date: employee.pozisyona_baslama_tarihi,
            realm_id: organization,
            tenant_id: organization
          };

          if (createEmp.first_name && createEmp.last_name) {
            await this.databaseService.createDocument(AppInfo.Name, AppInfo.Database, Collections.Employee, employeeId, createEmp);
            const newEmployee = await this.databaseService.getDocument(AppInfo.Name, AppInfo.Database, Collections.Employee, employeeId);
            dbEmployees.push(newEmployee);
            employeeCodes.add(employee.sicil_no); // Set'e ekle
          }
        }
      }));
      const accounts: any[] = await this.databaseService.listDocuments(AppInfo.Name, AppInfo.Database, "account_relation", [this.databaseService.Query.limit(10000)]).then(res => res.documents);
      await Promise.all(dbEmployees.map(async employee => {
        const excelData = data.find(d => d.sicil_no === employee.id);
        if (excelData) {
          const managerId = accounts.find(x => x.registration_number === excelData.amir_sicil_no);
          if (managerId) {
            await this.databaseService.updateDocument(AppInfo.Name, AppInfo.Database, Collections.Employee, employee.$id, {
              manager_id: managerId.$id
            });
          }
        }
      }))

    } catch (e) {
      throw e;
    }
  }


}

module.exports = DataImport