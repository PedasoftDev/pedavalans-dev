import XLSX from 'xlsx-js-style';

export function competencyTransferTemplateByExcel(line_is_active: boolean) {
    const wb = XLSX.utils.book_new();
    const headers = [
        "YETKINLIK_ADI",
        "YETKINLIK_GRUBU_ADI",
        "DEPARTMAN_ADLARI",
    ];
    if (line_is_active) {
        headers.push("HAT_ADLARI");
    }

    const ws = XLSX.utils.aoa_to_sheet([headers]);

    const colWidth = headers.map(() => ({ wpx: 100 }));
    ws["!cols"] = colWidth;

    XLSX.utils.book_append_sheet(wb, ws, "Yetkinlik Transfer Şablonu");
    XLSX.writeFile(wb, "Yetkinlik Transfer Şablonu.xlsx");
}
