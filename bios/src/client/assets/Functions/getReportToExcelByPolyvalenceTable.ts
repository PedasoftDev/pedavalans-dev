import ICompetency from '../../interfaces/ICompetency';
import XLSX from 'xlsx-js-style';

interface IData extends ICompetency.ICompetency {
    employee_id: string;
    employee_name: string;
    polyvalence_table_id: string;
    polyvalence_table_name: string;
    competency_evaluation_period: string;
    competency_department_id: string;
    competency_department_name: string;
    competency_target_value: string;
    competency_real_value: string;
    competency_value_desc: string;
}


export function getReportToExcelByPolyvalenceTable(polyvalence_table_name: string, data: IData[]) {
    const wb = XLSX.utils.book_new();

    const appendData = [];

    const rowHeights: { hpx: number }[] = [];

    const alignCenter = { vertical: "center", horizontal: "center" };
    const headerStyle = { font: { bold: true, color: { rgb: "FFFFFF" } }, fill: { fgColor: { rgb: "D9D9D9" } }, alignment: alignCenter };

    appendData.push([
        { v: null, t: 's', s: headerStyle },
        { v: data[0].competency_evaluation_period, t: 's', s: { alignment: alignCenter } },
        { v: null, t: 's', s: headerStyle },
    ]);

    rowHeights[0] = { hpx: 40 };

    const ws = XLSX.utils.aoa_to_sheet(appendData);

    XLSX.utils.book_append_sheet(wb, ws, "Rapor");

    // STEP 4: Write Excel file to browser
    XLSX.writeFile(wb, polyvalence_table_name + '-' + new Date().toLocaleDateString() + '.xlsx');
}