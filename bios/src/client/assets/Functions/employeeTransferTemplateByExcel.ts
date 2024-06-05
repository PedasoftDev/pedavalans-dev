import XLSX from 'xlsx-js-style';

export function employeeTransferTemplateByExcel(line_is_active: boolean) {
    const wb = XLSX.utils.book_new();
    const headers = [
        "SICIL_NO",
        "ADI",
        "SOYADI",
        "UNVAN_KODU",
        "UNVAN_TANIMI",
        "DEPARTMAN_KODU",
        "DEPARTMAN_ADI",
        "DEPARTMANA_BASLAMA_TARIHI",
        "POZISYON_KODU",
        "POZISYON_TANIMI",
        "POZISYONA_BASLAMA_TARIHI"
    ];
    if (line_is_active) {
        headers.push("HAT_KODU");
        headers.push("HAT_ADI");
    }

    const ws = XLSX.utils.aoa_to_sheet([headers]);

    const colWidth = headers.map(() => ({ wpx: 100 }));
    ws["!cols"] = colWidth;

    XLSX.utils.book_append_sheet(wb, ws, "Çalışan Transfer Şablonu");
    XLSX.writeFile(wb, "Çalışan Transfer Şablonu.xlsx");
}
