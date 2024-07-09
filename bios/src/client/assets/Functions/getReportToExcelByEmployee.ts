
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

export function getReportToExcelByEmployee(employeName: string, data: IData[]) {
    const wb = XLSX.utils.book_new();
    const appendData = [];
    const rowHeights: { hpx: number }[] = [];

    const alignCenter = { vertical: "center", horizontal: "center" };
    const headerStyle = { font: { bold: true, color: { rgb: "FFFFFF" } }, fill: { fgColor: { rgb: "1F82F9" } }, alignment: alignCenter }

    const firstHeaderRow = [
        { v: 'Çalışan Adı', t: 's', s: headerStyle },
        { v: 'Departman', t: 's', s: headerStyle },
        { v: 'Değerlendirme Dönemi', t: 's', s: headerStyle },
        { v: 'Tarih', t: 's', s: headerStyle },
    ];
    appendData.push(firstHeaderRow);
    rowHeights[0] = { hpx: 40 };

    const secondRow = [
        { v: employeName, t: 's', s: { alignment: alignCenter } },
        { v: data[0].competency_department_name, t: 's', s: { alignment: alignCenter } },
        { v: data[0].competency_evaluation_period, t: 's', s: { alignment: alignCenter } },
        { v: new Date().toLocaleDateString(), t: 's', s: { alignment: alignCenter } },
    ];
    appendData.push(secondRow);
    rowHeights[1] = { hpx: 30 };

    appendData.push([]);


    const thirdHeaderRow = [
        { v: 'Yetkinlik', t: 's', s: headerStyle },
        { v: 'Hedef Değer', t: 's', s: headerStyle },
        { v: 'Gerçekleşen Değer', t: 's', s: headerStyle },
        { v: 'Açıklama', t: 's', s: headerStyle },
    ];

    appendData.push(thirdHeaderRow);
    rowHeights[3] = { hpx: 40 };


    data.forEach((item, index) => {
        const row = [
            { v: item.competency_name, t: 's', s: { alignment: { vertical: "center" } } },
            {
                v: item.competency_target_value == "no-target" ? "Hedefi Yok" : item.competency_target_value,
                t: 's',
                s: { alignment: alignCenter }
            },
            {
                v: item.competency_target_value == "no-target" ? "Hedefi Yok" : item.competency_real_value,
                t: 's',
                s: { alignment: alignCenter }
            },
            { v: item.competency_value_desc, t: 's', s: { alignment: { vertical: "center" } } },
        ];
        appendData.push(row);
    });



    const ws = XLSX.utils.aoa_to_sheet(appendData);

    ws['!cols'] = [
        { wch: 50 },
        { wch: 40 },
        { wch: 40 },
        { wch: 40 },
    ];
    ws['!rows'] = rowHeights;


    XLSX.utils.book_append_sheet(wb, ws, "Rapor");

    // STEP 4: Write Excel file to browser
    XLSX.writeFile(wb, employeName + '-' + data[0].competency_department_name + '.xlsx');
}
