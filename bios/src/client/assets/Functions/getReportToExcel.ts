import { Workbook } from 'exceljs';

export const getReportToExcel = (employee: any, data) => {
    const fileName = `${employee.first_name}_${employee.last_name}_yetkinlik_raporu`;
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Rapor');
    worksheet.columns = [
        { header: 'Yetkinlik Adı', key: 'competency_name', width: 100 },
        { header: 'Hedef Değer', key: 'competency_target_value', width: 10 },
        { header: 'Mevcut Değer', key: 'competency_real_value', width: 10 },
        { header: 'Açıklama', key: 'competency_value_desc', width: 50 },
    ];
    worksheet.addRows(data);
    workbook.xlsx.writeBuffer().then((buffer: any
    ) => {
        const blob = new Blob([buffer], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${fileName}.xlsx`;
        link.click();
    });
}