import ICompetency from '../../interfaces/ICompetency';
import XLSX from 'xlsx-js-style';
import ICompetencyGroup from '../../interfaces/ICompetencyGroup';
import { IOrganizationStructure } from '../../interfaces/IOrganizationStructure';


const borderStyles = {
    header: {
        topBottomLeft: { top: { style: "thick", color: "000000" }, bottom: { style: "thick", color: "000000" }, left: { style: "thick", color: "000000" } },
        topBottom: { top: { style: "thick", color: "000000" }, bottom: { style: "thick", color: "000000" } },
        topBottomRight: { top: { style: "thick", color: "000000" }, bottom: { style: "thick", color: "000000" }, right: { style: "thick", color: "000000" } },
        fragment: { top: { style: "thick", color: "000000" }, bottom: { style: "thick", color: "000000" }, left: { style: "thick", color: "000000" }, right: { style: "thick", color: "000000" } }
    }
}

export function getReportToExcelByPolyvalenceTable(competenciesDb: ICompetency.ICompetency[], competencyGroups: ICompetencyGroup.IGetCompetencyGroup[], employeeCompetencyValues: IEmployeeCompetencyValue.IEmployeeCompetencyValue[], polyvalence_table_name: string) {
    const wb = XLSX.utils.book_new();



    // Tanımlamalar
    const appendData: any[] = [];
    const rowHeights: { hpx: number }[] = [];
    const colWidths: { wpx: number }[] = [];
    const merge: { s: { r: number, c: number }, e: { r: number, c: number } }[] = [];
    const alignCenter = { vertical: "center", horizontal: "center" };
    const headerStyle = { font: { bold: true }, fill: { fgColor: { rgb: "D9D9D9" } }, alignment: alignCenter };
    const competencies: ICompetency.ICompetency[] = []
    const employees: IOrganizationStructure.IEmployees.IEmployee[] = []

    employeeCompetencyValues.forEach(x => {
        if (!employees.some(y => y.id === x.employee_id)) {
            employees.push({
                id: x.employee_id,
                first_name: x.employee_name,
                last_name: "",
                department_id: x.competency_department_id,
                line_id: "",
                manager_id: "",
                position_id: "",
                realm_id: "",
                job_start_date: "",
                is_active: true,
                is_deleted: false,
                tenant_id: "",
                title_id: ""
            })
        }
        if (!competencies.some(y => y.competency_id === x.competency_id)) {
            competencies.push({
                competency_evaluation_period: x.competency_evaluation_period,
                competency_id: x.competency_id,
                competency_name: x.competency_name,
                competency_group_id: competenciesDb.find(z => z.competency_id === x.competency_id)?.competency_group_id || "",
                competency_group_name: competenciesDb.find(z => z.competency_id === x.competency_id)?.competency_group_name || "",
                competency_real_value: x.competency_real_value,
                competency_target_value: x.competency_target_value,
                competency_value_desc: x.competency_value_desc,
                employee_id: x.employee_id,
                employee_name: x.employee_name,
                is_active_competency: true,
                is_deleted_competency: false,
                polyvalence_table_id: x.polyvalence_table_id,
                polyvalence_table_name: x.polyvalence_table_name,
                realm_id: "",
                tenant_id: ""
            })
        }
    })
    competencies.sort((a, b) => a.competency_group_name.localeCompare(b.competency_group_name));
    competencyGroups = competencyGroups.sort((a, b) => a.competency_group_name.localeCompare(b.competency_group_name));

    // ilk satır -- Değerlendirme Dönemi - - - - Polivalans Tablosu Adı - - - - Başarı Oranı
    const firstRow: any[] = []
    firstRow[0] = { v: employeeCompetencyValues[0].competency_evaluation_period, t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomLeft } }
    firstRow[1] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
    firstRow[2] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
    firstRow[3] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }
    colWidths[1] = { wpx: 300 };

    merge.push({ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } })

    // tablo adının yazılması ve yetkinliklerin uzunluğu kadar merge edilmesi
    for (let i = 0; i < competencies.length; i++) {
        if (i === 0) {
            firstRow[4 + i] = { v: polyvalence_table_name, t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomLeft } }
        } else if (i === competencies.length - 1) {
            firstRow[4 + i] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }
        } else {
            firstRow[4 + i] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
        }
        colWidths[4 + i] = { wpx: 140 };
    }


    // yüzdelik hesaplama toplam
    let totalPercentage = 0;

    let totalCompetencyCount = 0;
    let totalRealValue = 0;
    let totalTargetValue = 0;

    competencies.forEach((competencyWithValue, index) => {
        employeeCompetencyValues.forEach(employeeCompetencyValue => {
            if (employeeCompetencyValue.competency_id === competencyWithValue.competency_id && employeeCompetencyValue.competency_target_value !== "no-target") {
                totalCompetencyCount++;
                totalRealValue += parseInt(employeeCompetencyValue.competency_real_value);
                totalTargetValue += parseInt(employeeCompetencyValue.competency_target_value);
            }
        });
    });

    if (totalTargetValue > 0) {
        totalPercentage = (totalRealValue / totalTargetValue) * 100;
    }



    firstRow[4 + competencies.length] = { v: `${totalPercentage.toFixed(2)}%`, t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }
    colWidths[4 + competencies.length] = { wpx: 100 };

    merge.push({ s: { r: 0, c: 4 }, e: { r: 0, c: 4 + competencies.length - 1 } })

    appendData.push(firstRow);

    rowHeights[0] = { hpx: 60 };

    // ikinci satır --
    const secondRow: any[] = []
    secondRow[0] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomLeft } }
    secondRow[1] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
    secondRow[2] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
    secondRow[3] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }

    rowHeights[1] = { hpx: 60 };

    merge.push({ s: { r: 1, c: 0 }, e: { r: 1, c: 3 } })

    // yetkinlik gruplarının yazılması ve yetkinliklerin uzunluğu kadar merge edilmesi
    let startCompetencyGroupIndex = 4;
    competencyGroups.forEach((group, index) => {
        const groupCompetencyLength = competencies.filter(x => x.competency_group_id === group.competency_group_id).length;
        if (groupCompetencyLength > 0) {
            if (index === 0) {

                secondRow[startCompetencyGroupIndex] = { v: group.competency_group_name, t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomLeft } }
                for (let i = 1; i < groupCompetencyLength; i++) {
                    if (i === groupCompetencyLength - 1) {
                        secondRow[startCompetencyGroupIndex + i] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }
                    } else {
                        secondRow[startCompetencyGroupIndex + i] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
                    }
                }
                merge.push({ s: { r: 1, c: startCompetencyGroupIndex }, e: { r: 1, c: startCompetencyGroupIndex + groupCompetencyLength - 1 } })
                startCompetencyGroupIndex += groupCompetencyLength;
            } else {
                secondRow[startCompetencyGroupIndex] = { v: group.competency_group_name, t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomLeft } }
                for (let i = 1; i < groupCompetencyLength; i++) {
                    if (i === groupCompetencyLength - 1) {
                        secondRow[startCompetencyGroupIndex + i] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }
                    } else {
                        secondRow[startCompetencyGroupIndex + i] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
                    }
                }
                merge.push({ s: { r: 1, c: startCompetencyGroupIndex }, e: { r: 1, c: startCompetencyGroupIndex + groupCompetencyLength - 1 } })
                startCompetencyGroupIndex += groupCompetencyLength;
            }
        }
    })
    secondRow[startCompetencyGroupIndex] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }
    secondRow[startCompetencyGroupIndex + 1] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }
    appendData.push(secondRow);


    // personel -- durum -- yetkinlikler -- beklentiyi karşılama oranı -- geliştirmesi gereken yetkinlikler
    // row tanımlamaları

    // sabit
    const thirdRow: any[] = []
    // yükseklik
    rowHeights[2] = { hpx: 120 };

    //// personel -- yazma
    thirdRow[0] = { v: 'Personel', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomLeft } }
    thirdRow[1] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
    //// personel -- merge
    merge.push({ s: { r: 2, c: 0 }, e: { r: 2, c: 1 } })

    //// durum -- yazma
    thirdRow[2] = { v: 'Durum', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomLeft } }
    thirdRow[3] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }
    //// durum -- merge
    merge.push({ s: { r: 2, c: 2 }, e: { r: 2, c: 3 } })

    //// yetkinlikler -- yazma
    let startCompetencyIndex = 4;
    const writingCompetencies: { competency_id: string, index: number }[] = [];
    let competencyStyle = { font: { bold: true }, alignment: { textRotation: 90, wrapText: true, ...alignCenter }, border: borderStyles.header.fragment };
    competencies.forEach((competency, index) => {
        thirdRow[startCompetencyIndex + index] = { v: competency.competency_name, t: 's', s: competencyStyle }
        writingCompetencies.push({ competency_id: competency.competency_id, index: startCompetencyIndex + index })
    })

    thirdRow[startCompetencyIndex + competencies.length] = { v: 'Beklentiyi Karşılama Oranı', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight, alignment: { wrapText: true, ...alignCenter } } }
    colWidths[startCompetencyIndex + competencies.length] = { wpx: 150 };

    thirdRow[startCompetencyIndex + competencies.length + 1] = { v: 'Geliştirilmesi Gereken Yetkinlik Sayısı', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight, alignment: { wrapText: true, ...alignCenter } } }
    colWidths[startCompetencyIndex + competencies.length + 1] = { wpx: 150 };

    appendData.push(thirdRow);




    let startEmployeeIndex = 3;
    employees.forEach((employee, index) => {
        let expectationMeetingRate = 0;
        let competencyToBeImprovedCount = 0;

        // beklentiyi karşılama oranı
        let totalTargetValue = 0;
        let totalRealValue = 0;
        competencies.forEach((competencyWithValue, index) => {
            const employeeCompetencyValue = employeeCompetencyValues.find(x => x.competency_id === competencyWithValue.competency_id && x.employee_id === employee.id);
            if (employeeCompetencyValue && employeeCompetencyValue.competency_target_value !== "no-target") {
                totalTargetValue += parseInt(employeeCompetencyValue.competency_target_value);
                totalRealValue += parseInt(employeeCompetencyValue.competency_real_value);
            }
        });
        if (totalTargetValue > 0) {
            expectationMeetingRate = (totalRealValue / totalTargetValue) * 100;
        }

        // geliştirilmesi gereken yetkinlik sayısı
        competencies.forEach((competencyWithValue, index) => {
            const employeeCompetencyValue = employeeCompetencyValues.find(x => x.competency_id === competencyWithValue.competency_id && x.employee_id === employee.id);
            if (employeeCompetencyValue && employeeCompetencyValue.competency_target_value !== "no-target") {
                if (parseInt(employeeCompetencyValue.competency_real_value) < parseInt(employeeCompetencyValue.competency_target_value)) {
                    competencyToBeImprovedCount++;
                }
            }
        });


        const waitingValueTextStyle = { border: { bottom: { style: "thin", color: "000000" } }, font: { bold: true }, alignment: alignCenter, fill: { fgColor: { rgb: "FCD5B4" } } };
        const waitingValueStyle = { border: { bottom: { style: "thin", color: "000000" }, right: { style: "thick", color: "000000" } }, alignment: alignCenter, fill: { fgColor: { rgb: "FCD5B4" } } }

        const realValueTextStyle = { border: { bottom: { style: "thick", color: "000000" } }, font: { bold: true }, alignment: alignCenter, fill: { fgColor: { rgb: "DBEEF4" } } };
        const realValueStyle = { border: { bottom: { style: "thick", color: "000000" }, right: { style: "thick", color: "000000" } }, alignment: alignCenter, fill: { fgColor: { rgb: "DBEEF4" } } }

        // first row
        const employeeRow: any[] = []
        employeeRow[0] = { v: index + 1, t: 's', s: { border: borderStyles.header.fragment, font: { bold: true }, alignment: alignCenter } }
        employeeRow[1] = { v: employee.first_name + ' ' + employee.last_name, t: 's', s: { border: borderStyles.header.fragment, font: { bold: true }, alignment: alignCenter } }
        employeeRow[2] = { v: 'Beklenen', t: 's', s: waitingValueTextStyle }
        employeeRow[3] = { v: '', t: 's', s: waitingValueStyle }

        // second row
        const employeeRowPlusOne: any[] = []
        employeeRowPlusOne[0] = { v: '', t: 's', s: { border: borderStyles.header.fragment, font: { bold: true }, alignment: alignCenter } }
        employeeRowPlusOne[1] = { v: '', t: 's', s: { border: borderStyles.header.fragment, font: { bold: true }, alignment: alignCenter } }
        employeeRowPlusOne[2] = { v: 'Gerçekleşen', t: 's', s: realValueTextStyle }
        employeeRowPlusOne[3] = { v: '', t: 's', s: realValueStyle }

        // yetkinlikler
        let startFirstCompetencyIndex = 4;
        competencies.forEach((competencyWithValue, index) => {
            const employeeCompetencyValue = employeeCompetencyValues.find(x => x.competency_id === competencyWithValue.competency_id && x.employee_id === employee.id);
            if (employeeCompetencyValue) {
                employeeRow[startFirstCompetencyIndex + index] = {
                    v: employeeCompetencyValue.competency_target_value === "no-target" ? "Hedefi Yok" : employeeCompetencyValue.competency_target_value,
                    t: 's',
                    s: waitingValueStyle
                }
                employeeRowPlusOne[startFirstCompetencyIndex + index] = {
                    v: employeeCompetencyValue.competency_target_value === "no-target" ? "Hedefi Yok" : employeeCompetencyValue.competency_real_value,
                    t: 's',
                    s: realValueStyle
                }
            } else {
                employeeRow[startFirstCompetencyIndex + index] = { v: '', t: 's', s: waitingValueStyle }
                employeeRowPlusOne[startFirstCompetencyIndex + index] = { v: '', t: 's', s: realValueStyle }
            }
        });

        // beklentiyi karşılama oranı
        employeeRow[startFirstCompetencyIndex + competencies.length] = { v: expectationMeetingRate.toFixed(2) + '%', t: 's', s: { ...realValueStyle, border: { bottom: { style: "thick", color: "000000" }, right: { style: "thick", color: "000000" } } } }
        employeeRowPlusOne[startFirstCompetencyIndex + competencies.length] = { v: '', t: 's', s: { ...realValueStyle, border: { bottom: { style: "thick", color: "000000" }, right: { style: "thick", color: "000000" } } } }

        // geliştirilmesi gereken yetkinlik sayısı
        employeeRow[startFirstCompetencyIndex + competencies.length + 1] = { v: competencyToBeImprovedCount, t: 's', s: { ...realValueStyle, border: { bottom: { style: "thick", color: "000000" }, right: { style: "thick", color: "000000" } } } }
        employeeRowPlusOne[startFirstCompetencyIndex + competencies.length + 1] = { v: '', t: 's', s: { ...realValueStyle, border: { bottom: { style: "thick", color: "000000" }, right: { style: "thick", color: "000000" } } } }

        // append
        appendData[startEmployeeIndex] = employeeRow;
        appendData[startEmployeeIndex + 1] = employeeRowPlusOne;

        // merge
        merge.push({ s: { r: startEmployeeIndex, c: 0 }, e: { r: startEmployeeIndex + 1, c: 0 } })
        merge.push({ s: { r: startEmployeeIndex, c: 1 }, e: { r: startEmployeeIndex + 1, c: 1 } })
        merge.push({ s: { r: startEmployeeIndex, c: 2 }, e: { r: startEmployeeIndex, c: 3 } })
        merge.push({ s: { r: startEmployeeIndex + 1, c: 2 }, e: { r: startEmployeeIndex + 1, c: 3 } })
        merge.push({ s: { r: startEmployeeIndex, c: startFirstCompetencyIndex + competencies.length }, e: { r: startEmployeeIndex + 1, c: startFirstCompetencyIndex + competencies.length } })
        merge.push({ s: { r: startEmployeeIndex, c: startFirstCompetencyIndex + competencies.length + 1 }, e: { r: startEmployeeIndex + 1, c: startFirstCompetencyIndex + competencies.length + 1 } })

        startEmployeeIndex += 2;
    })


    const numberOfEmployeesDontExpectedCompetencyLevelRow: any[] = []
    const numberOfEmployeesDontExpectedCompetencyLevelRowPlusOne: any[] = []
    numberOfEmployeesDontExpectedCompetencyLevelRow[0] = { v: 'Beklentiyi Karşılamayan Personel Sayısı', t: 's', s: { ...headerStyle, border: { top: { style: "thick", color: "000000" }, left: { style: "thick", color: "000000" } } }, align: alignCenter }
    numberOfEmployeesDontExpectedCompetencyLevelRow[1] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
    numberOfEmployeesDontExpectedCompetencyLevelRow[2] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
    numberOfEmployeesDontExpectedCompetencyLevelRow[3] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }

    numberOfEmployeesDontExpectedCompetencyLevelRowPlusOne[0] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomLeft } }
    numberOfEmployeesDontExpectedCompetencyLevelRowPlusOne[1] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
    numberOfEmployeesDontExpectedCompetencyLevelRowPlusOne[2] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
    numberOfEmployeesDontExpectedCompetencyLevelRowPlusOne[3] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }

    merge.push({ s: { r: employees.length * 2 + 5, c: 0 }, e: { r: employees.length * 2 + 6, c: 3 } })

    writingCompetencies.forEach((competency, index) => {
        // beklentiyi karşılamayan personel sayısı
        let employeeCount = 0;
        employeeCompetencyValues.forEach(employeeCompetencyValue => {
            if (employeeCompetencyValue.competency_id === competency.competency_id && employeeCompetencyValue.competency_target_value !== "no-target") {
                if (parseInt(employeeCompetencyValue.competency_real_value) < parseInt(employeeCompetencyValue.competency_target_value)) {
                    employeeCount++;
                }
            }
        });

        numberOfEmployeesDontExpectedCompetencyLevelRow[4 + index] = { v: employeeCount, t: 's', s: { ...headerStyle, border: borderStyles.header.fragment } }
        numberOfEmployeesDontExpectedCompetencyLevelRowPlusOne[4 + index] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.fragment } }

        merge.push({ s: { r: employees.length * 2 + 5, c: 4 + index }, e: { r: employees.length * 2 + 5 + 1, c: 4 + index } })
    })


    appendData[employees.length * 2 + 5] = numberOfEmployeesDontExpectedCompetencyLevelRow;
    appendData[employees.length * 2 + 6] = numberOfEmployeesDontExpectedCompetencyLevelRowPlusOne;

    //  yetkinlik grubu başarı oranı


    competencyGroups.forEach((group, index) => {

        let totalPercentage = 0;
        let totalTargetValue = 0;
        let totalRealValue = 0;
        employeeCompetencyValues.forEach(employeeCompetencyValue => {
            if (competencies.find(x => x.competency_id === employeeCompetencyValue.competency_id)?.competency_group_id === group.competency_group_id && employeeCompetencyValue.competency_target_value !== "no-target") {
                totalTargetValue += parseInt(employeeCompetencyValue.competency_target_value);
                totalRealValue += parseInt(employeeCompetencyValue.competency_real_value);
            }
        })

        if (totalTargetValue > 0) {
            totalPercentage = (totalRealValue / totalTargetValue) * 100
        }

        let competencyGroupPercentageRow: any[] = [];
        competencyGroupPercentageRow[competencies.length + 4] = { v: group.competency_group_name, t: 's', s: { ...headerStyle, border: borderStyles.header.fragment } }
        competencyGroupPercentageRow[competencies.length + 5] = { v: totalPercentage.toFixed(2), t: 's', s: { ...headerStyle, border: borderStyles.header.fragment } }

        appendData[employees.length * 2 + 7 + index * 2] = competencyGroupPercentageRow;
    })


    const ws = XLSX.utils.aoa_to_sheet(appendData);

    ws["!rows"] = rowHeights;
    ws["!cols"] = colWidths;
    ws["!merges"] = merge;

    XLSX.utils.book_append_sheet(wb, ws, "Rapor");

    // STEP 4: Write Excel file to browser
    XLSX.writeFile(wb, polyvalence_table_name + '-' + new Date().toLocaleDateString() + '.xlsx');
}
