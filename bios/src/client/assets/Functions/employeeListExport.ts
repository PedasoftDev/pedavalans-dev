import { IOrganizationStructure } from "../../interfaces/IOrganizationStructure";
import XLSX from 'xlsx-js-style';
import { Resources } from "../Resources";

const employeeListExport = (lineBased: boolean, employees: IOrganizationStructure.IEmployees.IEmployee[], departments: IOrganizationStructure.IDepartments.IDepartment[],
  positions: IOrganizationStructure.IPositions.IPosition[], titles: IOrganizationStructure.ITitles.ITitle[], lines: IOrganizationStructure.ILines.ILine[]) => {
  const wb = XLSX.utils.book_new();
  const appendData = [];
  const rowHeights: { hpx: number }[] = [];

  const alignCenter = { vertical: "center", horizontal: "center" };
  const headerStyle = { font: { bold: true, color: { rgb: "FFFFFF" } }, fill: { fgColor: { rgb: "1F82F9" } }, alignment: alignCenter }

  const headers = [
    "SİCİL NO",
    "ADI",
    "SOYADI",
    "DOĞUM TARİHİ",
    "TELEFON NUMARASI",
    "CİNSİYET",
    "İŞE BAŞLAMA TARİHİ",
    "ÜNVAN KODU",
    "ÜNVAN TANIMI",
    "DEPARTMAN KODU",
    "DEPARTMAN ADI",
    "DEPARTMANA BAŞLAMA TARİHİ",
    "POZİSYON KODU",
    "POZİSYON TANIMI",
    "POZİSYONA BAŞLAMA TARİHİ"
  ];
  if (lineBased) {
    headers.push("HAT_KODU");
    headers.push("HAT_ADI");
  }
  const firstHeaderRow = headers.map(header => ({ v: header, t: 's', s: headerStyle }));

  appendData.push(firstHeaderRow);
  rowHeights[0] = { hpx: 30 };

  employees.forEach((employee, index) => {

    const row = [
      { v: employee.id, t: 's', s: { alignment: alignCenter } },
      { v: employee.first_name, t: 's', s: { alignment: alignCenter } },
      { v: employee.last_name, t: 's', s: { alignment: alignCenter } },
      { v: employee.birth_date ? Resources.Functions.formatDate(employee.birth_date) : "", t: 's', s: { alignment: alignCenter } },
      { v: employee.phone ? employee.phone : "", t: 's', s: { alignment: alignCenter } },
      { v: employee.gender === "male" ? "Erkek" : "Kadın", t: 's', s: { alignment: alignCenter } },
      { v: employee.job_start_date ? Resources.Functions.formatDate(employee.job_start_date) : "", t: 's', s: { alignment: alignCenter } }, // burada
      { v: titles.find(title => title.id === employee.title_id)?.record_id, t: 's', s: { alignment: alignCenter } },
      { v: titles.find(title => title.id === employee.title_id)?.name, t: 's', s: { alignment: alignCenter } },
      { v: departments.find(department => department.id === employee.department_id)?.record_id, t: 's', s: { alignment: alignCenter } },
      { v: departments.find(department => department.id === employee.department_id)?.name, t: 's', s: { alignment: alignCenter } },
      { v: employee.department_start_date ? Resources.Functions.formatDate(employee.department_start_date) : "", t: 's', s: { alignment: alignCenter } },
      { v: positions.find(position => position.id === employee.position_id)?.record_id, t: 's', s: { alignment: alignCenter } },
      { v: positions.find(position => position.id === employee.position_id)?.name, t: 's', s: { alignment: alignCenter } },
      { v: employee.position_start_date ? Resources.Functions.formatDate(employee.position_start_date) : "", t: 's', s: { alignment: alignCenter } }
    ]

    if (lineBased) {
      row.push({ v: lines.find(line => line.id === employee.line_id)?.record_id, t: 's', s: { alignment: alignCenter } })
      row.push({ v: lines.find(line => line.id === employee.line_id)?.name, t: 's', s: { alignment: alignCenter } })
    }

    appendData.push(row);
    rowHeights[index + 1] = { hpx: 20 };


  })

  const ws = XLSX.utils.aoa_to_sheet(appendData);
  const cols = [{ wpx: 150 }, { wpx: 300 }, { wpx: 300 }, { wpx: 200 }, { wpx: 200 }, { wpx: 200 },
  { wpx: 200 }, { wpx: 200 }, { wpx: 200 }, { wpx: 200 }, { wpx: 200 }, { wpx: 200 }, { wpx: 200 }, { wpx: 200 }, { wpx: 200 }];
  if (lineBased) {
    cols.push({ wpx: 200 }, { wpx: 200 });
  }
  ws['!cols'] = cols
  ws['!rows'] = rowHeights;

  XLSX.utils.book_append_sheet(wb, ws, "Çalışan Listesi");
  XLSX.writeFile(wb, "Çalışan Listesi.xlsx");
}

export default employeeListExport;