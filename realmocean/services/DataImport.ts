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
  export const Competency: string = "competency";
  export const CompetencyGroup: string = "competency_group";
  export const CompetencyDepartment: string = "competency_department";
  export const Parameter: string = "pedavalans_parameter";
  export const CompetencyLineRelation: string = "competency_line_relation";
  export const CompetencyWorkPlace: string = "competency_work_place";
  export const OrganizationStructureWorkPlace: string = "organization_workplace";
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

interface ICompetencyImportFromExcel {
  yetkinlik_adi: string;
  yetkinlik_aciklamasi: string;
  yetkinlik_grubu_adi: string;
  departman_adlari: string;
  hat_adlari?: string;
  isyeri_adlari?: string;
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

    router.post("/com.pedavalans.service.import/employeeImport", async (req, res) => {
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

    router.post("/com.pedavalans.service.import/competencyImport", async (req, res) => {
      const { data, organization } = req.body;
      try {
        if (!data || !organization) {
          return res.status(400).json({ message: "Data or organization is missing" });
        }
        const result = await this.competencyImport(data as any, organization);
        return res.json({ result });

      } catch (e) {
        return res.status(500).json({ message: e.message });
      }
    });

    router.post("/com.pedavalans.service.import/transferEmployeeCompetencyValuesToNewPeriodTargetData", async (req, res) => {
      const { polyvalence_table_id, previous_evaluation_period, current_evaluation_period, write_on_it } = req.body;
      try {

        if (!polyvalence_table_id || !previous_evaluation_period || !current_evaluation_period) {
          return res.status(400).json({ message: "Missing required parameters" });
        }

        const result = await this.transferEmployeeCompetencyValuesToNewPeriodTargetData(current_evaluation_period, previous_evaluation_period, polyvalence_table_id, write_on_it);
        return res.json({ result });
      }
      catch (e) {
        return res.status(500).json({ message: e.message });
      }

    });

    router.post("/com.pedavalans.service.import/transferEmployeeCompetencyValuesToNewPeriodAllData", async (req, res) => {
      const { polyvalence_table_id, previous_evaluation_period, current_evaluation_period, write_on_it } = req.body;
      try {

        if (!polyvalence_table_id || !previous_evaluation_period || !current_evaluation_period) {
          return res.status(400).json({ message: "Missing required parameters" });
        }

        const result = await this.transferEmployeeCompetencyValuesToNewPeriodAllData(current_evaluation_period, previous_evaluation_period, polyvalence_table_id, write_on_it);
        return res.json({ result });
      }
      catch (e) {
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
            gender: employee.cinsiyet ? (employee.cinsiyet.toLowerCase() === "e" || employee.cinsiyet.toLowerCase() === "erkek") ? "male" : "female" : null,
            phone: employee.telefon_no ? String(employee.telefon_no) : "",
            educational_status: employee.egitim_durumu ? employee.egitim_durumu.toLowerCase() === "lise" ? "high school" :
              employee.egitim_durumu.toLowerCase() === "üniversite" ? "university" :
                employee.egitim_durumu.toLowerCase() === "ilkokul" ? "elementary school" :
                  employee.egitim_durumu.toLowerCase() === "ortaokul" ? "secondary school" : null : null,
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
              manager_id: managerId.account_id
            });
          }
        }
      }))

    } catch (e) {
      throw e;
    }
  }

  async competencyImport(data: ICompetencyImportFromExcel[], organization: string) {
    const [lineBasedCompetencyRelationship, workPlaceParameterCompetency, competencyGroups, departments, lines, workplaces] = await Promise.all([
      this.databaseService.listDocuments(AppInfo.Name, AppInfo.Database, Collections.Parameter,
        [this.databaseService.Query.equal("name", "line_based_competency_relationship")]).then((res) => res.documents[0]?.is_active),
      this.databaseService.listDocuments(AppInfo.Name, AppInfo.Database, Collections.Parameter,
        [this.databaseService.Query.equal("name", "work_place_definition")]).then((res) => res.documents[0]?.is_active),
      this.databaseService.listDocuments(AppInfo.Name, AppInfo.Database, Collections.CompetencyGroup, [
        this.databaseService.Query.equal("tenant_id", organization),
        this.databaseService.Query.equal("is_active_group", true),
        this.databaseService.Query.equal("is_deleted_group", false),
        this.databaseService.Query.limit(10000),
      ]).then((res) => res.documents),
      this.getDepartments(),
      this.getLines(),
      this.databaseService.listDocuments(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureWorkPlace, [
        this.databaseService.Query.limit(10000),
        this.databaseService.Query.equal("is_deleted", false),
        this.databaseService.Query.equal("is_active", true),
      ]).then((res) => res.documents)
    ]);

    const competencyGroupMap = new Map(competencyGroups.map((item: any) => [item.competency_group_name.trim(), item])) as Map<string, { $id: string; competency_group_name: string }>;
    const departmentMap = new Map(departments.map((item: any) => [item.name.trim(), item])) as Map<string, { id: string; name: string }>;
    const lineMap = new Map(lines.map((item: any) => [item.name.trim(), item])) as Map<string, { id: string; name: string }>;;
    const workplaceMap = new Map(workplaces.map((item: any) => [item.name.trim(), item])) as Map<string, { id: string; name: string }>;

    const bulkCompetencies = [];
    const bulkCompetencyDepartments = [];
    const bulkCompetencyLines = [];
    const bulkCompetencyWorkplaces = [];

    for (const competencyItem of data) {
      const competencyDepartments = competencyItem.departman_adlari.split(",").map((item) => item.trim());
      const competencyGroup = competencyGroupMap.get(competencyItem.yetkinlik_grubu_adi.trim());

      const competencyLineNames = lineBasedCompetencyRelationship
        ? competencyItem.hat_adlari?.split(",").map((item) => item.trim()) || []
        : [];

      const competencyWorkPlaceNames = workPlaceParameterCompetency
        ? competencyItem.isyeri_adlari?.split(",").map((item) => item.trim()) || []
        : [];

      const createCompetency = {
        competency_id: nanoid(),
        competency_name: competencyItem.yetkinlik_adi.trim(),
        competency_description: competencyItem.yetkinlik_aciklamasi.trim(),
        competency_group_name: competencyItem.yetkinlik_grubu_adi.trim(),
        tenant_id: organization,
        competency_group_id: competencyGroup?.$id,
        realm_id: organization,
      };

      // Competency ekle
      bulkCompetencies.push(createCompetency);

      // Competency-Department ilişkilerini ekle
      competencyDepartments.forEach((departmentName) => {
        const department = departmentMap.get(departmentName);
        if (department) {
          const comp_dep_id = nanoid();
          bulkCompetencyDepartments.push({
            competency_department_table_id: comp_dep_id,
            competency_department_id: department.id,
            competency_department_name: department.name.trim(),
            competency_id: createCompetency.competency_id,
            tenant_id: organization,
          });
        }
      });

      // Competency-Line ilişkilerini ekle
      competencyLineNames.forEach((lineName) => {
        const line = lineMap.get(lineName);
        if (line) {
          const comp_line_id = nanoid();
          bulkCompetencyLines.push({
            id: comp_line_id,
            competency_id: createCompetency.competency_id,
            line_id: line.id,
            tenant_id: organization,
          });
        }
      });

      // Competency-WorkPlace ilişkilerini ekle
      competencyWorkPlaceNames.forEach((workPlaceName) => {
        const workplace = workplaceMap.get(workPlaceName);
        if (workplace) {
          const comp_work_place_id = nanoid();
          bulkCompetencyWorkplaces.push({
            id: comp_work_place_id,
            competency_id: createCompetency.competency_id,
            work_place_id: workplace.id,
            work_place_name: workplace.name.trim(),
            tenant_id: organization,
          });
        }
      });
    }

    // Verileri toplu olarak ekliyoruz (paralel olarak)
    try {
      await Promise.all([
        ...bulkCompetencies.map((competency) =>
          this.databaseService.createDocument(
            AppInfo.Name,
            AppInfo.Database,
            Collections.Competency,
            competency.competency_id,
            competency
          )
        ),
        ...bulkCompetencyDepartments.map((compDep) =>
          this.databaseService.createDocument(
            AppInfo.Name,
            AppInfo.Database,
            Collections.CompetencyDepartment,
            compDep.competency_department_table_id,
            compDep
          )
        ),
        ...bulkCompetencyLines.map((compLine) =>
          this.databaseService.createDocument(
            AppInfo.Name,
            AppInfo.Database,
            Collections.CompetencyLineRelation,
            compLine.id,
            compLine
          )
        ),
        ...bulkCompetencyWorkplaces.map((compWorkPlace) =>
          this.databaseService.createDocument(
            AppInfo.Name,
            AppInfo.Database,
            Collections.CompetencyWorkPlace,
            compWorkPlace.id,
            compWorkPlace
          )
        ),
      ]);
    } catch (error) {
      throw new Error(`Toplu kayıt sırasında bir hata oluştu: ${error.message}`);
    }
  }

  async getEmployeeCompetencyValuesByPolyvalenceTableIdAndPeriod(polyvalenceTableId: string, period: string) {
    const data = await this.databaseService.listDocuments(AppInfo.Name, AppInfo.Database, "employee_competency_value", [this.databaseService.Query.equal("polyvalence_table_id", polyvalenceTableId),
    this.databaseService.Query.equal("competency_evaluation_period", period), this.databaseService.Query.equal("is_deleted_competency_value", false), this.databaseService.Query.limit(20000)]).then(res => res.documents);
    return data;
  }

  async transferEmployeeCompetencyValuesToNewPeriodTargetData(current_evaluation_period: string, previous_evaluation_period: string, polyvalence_table_id: string, write_on_it: boolean) {
    try {
      const data = await this.getEmployeeCompetencyValuesByPolyvalenceTableIdAndPeriod(polyvalence_table_id, previous_evaluation_period);
      if (write_on_it) {
        const nextData = await this.getEmployeeCompetencyValuesByPolyvalenceTableIdAndPeriod(polyvalence_table_id, current_evaluation_period);
        nextData.forEach(async (value: any) => {
          await this.databaseService.updateDocument(AppInfo.Name, AppInfo.Database, "employee_competency_value", value.$id,
            { is_active_competency_value: false, is_deleted_competency_value: true });
        });
      }

      data.forEach(async (value: any) => {
        const docId: string = nanoid();
        const createObj = {
          competency_department_id: value.competency_department_id,
          competency_department_name: value.competency_department_name,
          competency_evaluation_period: current_evaluation_period,
          competency_id: value.competency_id,
          competency_name: value.competency_name,
          competency_real_value: "",
          competency_target_value: value.competency_target_value,
          competency_value_desc: "",
          employee_id: value.employee_id,
          employee_name: value.employee_name,
          polyvalence_table_id: value.polyvalence_table_id,
          polyvalence_table_name: value.polyvalence_table_name,
          tenant_id: value.tenant_id,
          employee_competency_value_id: docId,
          realm_id: value.realm_id,
        }

        await this.databaseService.createDocument(AppInfo.Name, AppInfo.Database, "employee_competency_value", docId, createObj)
      })

      return "Transfer işlemi başarılı";
    } catch (error) {
      throw new Error(`Toplu kayıt sırasında bir hata oluştu: ${error.message}`);
    }

  }

  async transferEmployeeCompetencyValuesToNewPeriodAllData(current_evaluation_period: string, previous_evaluation_period: string, polyvalence_table_id: string, write_on_it: boolean) {
    try {
      const data = await this.getEmployeeCompetencyValuesByPolyvalenceTableIdAndPeriod(polyvalence_table_id, previous_evaluation_period);
      if (write_on_it) {
        const nextData = await this.getEmployeeCompetencyValuesByPolyvalenceTableIdAndPeriod(polyvalence_table_id, current_evaluation_period);
        nextData.forEach(async (value: any) => {
          await this.databaseService.updateDocument(AppInfo.Name, AppInfo.Database, "employee_competency_value", value.$id,
            { is_active_competency_value: false, is_deleted_competency_value: true });
        });
      }

      data.forEach(async (value: any) => {
        const docId: string = nanoid();
        const createObj = {
          competency_department_id: value.competency_department_id,
          competency_department_name: value.competency_department_name,
          competency_evaluation_period: current_evaluation_period,
          competency_id: value.competency_id,
          competency_name: value.competency_name,
          competency_real_value: value.competency_real_value,
          competency_target_value: value.competency_target_value,
          competency_value_desc: value.competency_value_desc,
          employee_id: value.employee_id,
          employee_name: value.employee_name,
          polyvalence_table_id: value.polyvalence_table_id,
          polyvalence_table_name: value.polyvalence_table_name,
          tenant_id: value.tenant_id,
          employee_competency_value_id: docId,
          realm_id: value.realm_id,
        }

        await this.databaseService.createDocument(AppInfo.Name, AppInfo.Database, "employee_competency_value", docId, createObj)
      })

      return "Transfer işlemi başarılı";
    } catch (error) {
      throw new Error(`Toplu kayıt sırasında bir hata oluştu: ${error.message}`);
    }
  }


}

module.exports = DataImport