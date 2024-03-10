import ICompetency from '../../interfaces/ICompetency';
import XLSX from 'xlsx-js-style';
import ICompetencyGroup from '../../interfaces/ICompetencyGroup';



export function getReportToExcelByPolyvalenceTable(competencies: ICompetency.ICompetency[], competency_groups: ICompetencyGroup.IGetCompetencyGroup[], data: any[], polyvalence_table_name: string) {

    const wb = XLSX.utils.book_new();

    const appendData = [];


    const rowHeights: { hpx: number }[] = [];
    const colWidths: { wpx: number }[] = [];

    const alignCenter = { vertical: "center", horizontal: "center" };
    const headerStyle = { font: { bold: true }, fill: { fgColor: { rgb: "D9D9D9" } }, alignment: alignCenter };

    const firstRow = []
    firstRow[0] = { v: data[0].competency_evaluation_period, t: 's', s: { font: { bold: true }, fill: { fgColor: { rgb: "D9D9D9" } }, alignment: alignCenter, border: { left: { style: "medium" }, top: { style: "medium" }, bottom: { style: "medium" } } } };
    firstRow[1] = { v: "", t: 's', s: headerStyle };
    firstRow[2] = { v: "", t: 's', s: headerStyle };
    firstRow[3] = { v: "", t: 's', s: headerStyle };

    appendData.push([
        { v: data[0].competency_evaluation_period, t: 's', s: headerStyle },
    ]);

    rowHeights[0] = { hpx: 40 };


    const ws = XLSX.utils.aoa_to_sheet(appendData);

    const merge = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }, { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } },
    ];


    ws["!rows"] = rowHeights;
    ws["!cols"] = colWidths;
    ws["!merges"] = merge;

    XLSX.utils.book_append_sheet(wb, ws, "Rapor");

    // STEP 4: Write Excel file to browser
    XLSX.writeFile(wb, polyvalence_table_name + '-' + new Date().toLocaleDateString() + '.xlsx');
}