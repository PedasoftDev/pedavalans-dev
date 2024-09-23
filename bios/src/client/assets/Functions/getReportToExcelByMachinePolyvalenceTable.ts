import ICompetency from '../../interfaces/ICompetency';
import XLSX from 'xlsx-js-style';
import ICompetencyGroup from '../../interfaces/ICompetencyGroup';
import { IOrganizationStructure } from '../../interfaces/IOrganizationStructure';
import IMachine from '../../interfaces/IMachine';
import ICompetencyMachineAssociation from '../../interfaces/ICompetencyMachineAssociation';


const borderStyles = {
    header: {
        topBottomLeft: { top: { style: "thick", color: "000000" }, bottom: { style: "thick", color: "000000" }, left: { style: "thick", color: "000000" } },
        topBottom: { top: { style: "thick", color: "000000" }, bottom: { style: "thick", color: "000000" } },
        topBottomRight: { top: { style: "thick", color: "000000" }, bottom: { style: "thick", color: "000000" }, right: { style: "thick", color: "000000" } },
        fragment: { top: { style: "thick", color: "000000" }, bottom: { style: "thick", color: "000000" }, left: { style: "thick", color: "000000" }, right: { style: "thick", color: "000000" } }
    }
}

export function getReportToExcelByMachinePolyvalenceTable(machines: IMachine.IBase[], competencyMachineAssocation: ICompetencyMachineAssociation.IBase[], competenciesDb: ICompetency.ICompetency[], competencyGroups: ICompetencyGroup.IGetCompetencyGroup[], employeeCompetencyValues: IEmployeeCompetencyValue.IEmployeeCompetencyValue[], polyvalence_table_name: string, positionList: IOrganizationStructure.IPositions.IPosition[], employeeList: IOrganizationStructure.IEmployees.IEmployee[]) {
    const wb = XLSX.utils.book_new();



    // Tanımlamalar
    const appendData: any[] = [];
    const rowHeights: { hpx: number }[] = [];
    const colWidths: { wpx: number }[] = [];
    const merge: { s: { r: number, c: number }, e: { r: number, c: number } }[] = [];
    const alignCenter = { vertical: "center", horizontal: "center" };
    const headerStyle = { font: { bold: true }, fill: { fgColor: { rgb: "D9D9D9" } }, alignment: alignCenter };
    const competencies: (ICompetency.ICompetency & IMachine.IBase)[] = []
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
                workplace_id: "",
                job_start_date: "",
                birth_date: "",
                gender: "",
                realm_id: "",
                department_start_date: "",
                phone: "",
                email: "",
                proxy_employee_id: "",
                position_start_date: "",
                is_active: true,
                is_deleted: false,
                tenant_id: "",
                title_id: ""
            })
        }
        if (!competencies.some(y => y.competency_id === x.competency_id)) {
            let machineAssoc: any = competencyMachineAssocation.find(z => z.competency_id === x.competency_id)
            if (!machineAssoc) {
                machineAssoc = {
                    machine_id: ""
                }
            }
            const machine = machines.find(m => m.$id == machineAssoc.machine_id)
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
                tenant_id: "",
                code: machine?.code || "",
                department_id: machine?.department_id || "",
                is_active_machine: machine?.is_active_machine || "true",
                is_deleted: machine?.is_deleted || false,
                difficulty_coefficient: machine?.difficulty_coefficient || "1",
                id: machine?.$id || "",
                is_active: machine?.is_active || true,
                name: machine?.name || "",
            })
        }
    })
    competencies.sort((a, b) => a.name.localeCompare(b.name)).sort((a, b) => a.competency_group_name.localeCompare(b.competency_group_name));
    competencyGroups = competencyGroups.sort((a, b) => a.competency_group_name.localeCompare(b.competency_group_name));

    const alreadyCompetencyGroups: {
        id: string,
        name: string
    }[] = [];

    competencies.forEach((competency, index) => {
        if (!alreadyCompetencyGroups.some(x => x.id === competency.competency_group_id)) {
            alreadyCompetencyGroups.push({
                id: competency.competency_group_id,
                name: competency.competency_group_name
            })
        }
    })

    // ilk satır -- Değerlendirme Dönemi - - - - Polivalans Tablosu Adı - - - - Başarı Oranı
    const firstRow: any[] = []
    firstRow[0] = { v: employeeCompetencyValues[0].competency_evaluation_period, t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomLeft } }
    firstRow[1] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
    firstRow[2] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
    firstRow[3] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }
    firstRow[4] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }
    colWidths[1] = { wpx: 300 };

    merge.push({ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } })

    // tablo adının yazılması ve yetkinliklerin uzunluğu kadar merge edilmesi
    for (let i = 0; i < competencies.length + alreadyCompetencyGroups.length; i++) {
        if (i === 0) {
            firstRow[5 + i] = { v: polyvalence_table_name, t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomLeft } }
        } else if (i === competencies.length - 1) {
            firstRow[5 + i] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }
        } else {
            firstRow[5 + i] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
        }
        colWidths[5 + i] = { wpx: 140 };
    }


    // yüzdelik hesaplama toplam
    let totalPercentage = 0;
    let totalRealValue = 0;
    let totalTargetValue = 0;

    competencies.forEach((competencyWithValue) => {
        employeeCompetencyValues.forEach(employeeCompetencyValue => {
            if (employeeCompetencyValue.competency_id === competencyWithValue.competency_id && employeeCompetencyValue.competency_target_value != "no-target") {
                const selectedMachine = machines.find(x => x.$id === competencyWithValue.id);
                let difficultyCoefficient = 1;
                if (selectedMachine) {
                    difficultyCoefficient = parseFloat(selectedMachine.difficulty_coefficient);
                }
                if (employeeCompetencyValue && employeeCompetencyValue.competency_real_value !== "" && employeeCompetencyValue.competency_target_value !== "no-target" && employeeCompetencyValue.competency_target_value !== "") {
                    totalRealValue += parseInt(employeeCompetencyValue.competency_real_value) * difficultyCoefficient;
                    totalTargetValue += parseInt(employeeCompetencyValue.competency_target_value);
                }
            }
        });
    });

    if (totalTargetValue > 0) {
        totalPercentage = (totalRealValue / totalTargetValue) * 100;
    }



    firstRow[5 + competencies.length + alreadyCompetencyGroups.length] = { v: `${totalPercentage.toFixed(2)}%`, t: 's', s: { ...headerStyle, border: borderStyles.header.fragment } }
    colWidths[5 + competencies.length + alreadyCompetencyGroups.length] = { wpx: 100 };

    merge.push({ s: { r: 0, c: 5 }, e: { r: 0, c: 5 + competencies.length + alreadyCompetencyGroups.length - 1 } })

    appendData.push(firstRow);

    rowHeights[0] = { hpx: 60 };

    // ikinci satır --

    // makine
    const machineRow: any[] = []
    machineRow[0] = { v: 'Makineler', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomLeft } }
    machineRow[1] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
    machineRow[2] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
    machineRow[3] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
    machineRow[4] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }

    rowHeights[1] = { hpx: 60 };

    merge.push({ s: { r: 1, c: 0 }, e: { r: 1, c: 4 } })

    const writingMachines: string[] = [];
    let lastWritingMachineIndex = 5;
    competencies.forEach((competency, _i) => {

        const machineByCompetency = machines.find(x => x.$id === competency.id);

        if (!writingMachines.some(x => x === machineByCompetency?.id)) {

            const machineAssociation = competencyMachineAssocation.filter(x => x.machine_id === machineByCompetency?.id);
            if (machineAssociation.length > 0) {
                writingMachines.push(machineByCompetency?.id || "");
                machineAssociation.forEach((machineAssoc, index) => {
                    if (index === 0) {
                        machineRow[lastWritingMachineIndex] = { v: machineByCompetency?.name, t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomLeft } }

                    }
                    else if (index === machineAssociation.length - 1) {
                        machineRow[lastWritingMachineIndex + index] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }
                    }
                    else {
                        machineRow[lastWritingMachineIndex + index] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
                    }
                })
                merge.push({ s: { r: 1, c: lastWritingMachineIndex }, e: { r: 1, c: lastWritingMachineIndex + machineAssociation.length - 1 } })
                lastWritingMachineIndex += machineAssociation.length;
            } else {
                machineRow[lastWritingMachineIndex] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
                lastWritingMachineIndex++;
            }
        }
    })

    for (let i = 0; i < alreadyCompetencyGroups.length + 1; i++) {
        machineRow[lastWritingMachineIndex + i] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.fragment } }
    }

    merge.push({ s: { r: 1, c: lastWritingMachineIndex }, e: { r: 1, c: lastWritingMachineIndex + alreadyCompetencyGroups.length } })



    appendData.push(machineRow);

    // yetkinlik gruplarının yazılması ve yetkinliklerin uzunluğu kadar merge edilmesi

    const competencyGroupRow: any[] = []
    competencyGroupRow[0] = { v: 'Yetkinlik Grupları', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomLeft } }
    competencyGroupRow[1] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
    competencyGroupRow[2] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
    competencyGroupRow[3] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }
    competencyGroupRow[4] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }

    let startCompetencyGroupIndex = 5;
    competencyGroups.forEach((group, index) => {
        const groupCompetencyLength = competencies.filter(x => x.competency_group_id === group.competency_group_id).length;
        if (groupCompetencyLength > 0) {
            if (index === 0) {

                competencyGroupRow[startCompetencyGroupIndex] = { v: group.competency_group_name, t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomLeft } }
                for (let i = 1; i < groupCompetencyLength; i++) {
                    if (i === groupCompetencyLength - 1) {
                        competencyGroupRow[startCompetencyGroupIndex + i] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }
                    } else {
                        competencyGroupRow[startCompetencyGroupIndex + i] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
                    }
                }
                merge.push({ s: { r: 2, c: startCompetencyGroupIndex }, e: { r: 2, c: startCompetencyGroupIndex + groupCompetencyLength - 1 } })
                startCompetencyGroupIndex += groupCompetencyLength;
            } else {
                competencyGroupRow[startCompetencyGroupIndex] = { v: group.competency_group_name, t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomLeft } }
                for (let i = 1; i < groupCompetencyLength; i++) {
                    if (i === groupCompetencyLength - 1) {
                        competencyGroupRow[startCompetencyGroupIndex + i] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }
                    } else {
                        competencyGroupRow[startCompetencyGroupIndex + i] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
                    }
                }
                merge.push({ s: { r: 2, c: startCompetencyGroupIndex }, e: { r: 2, c: startCompetencyGroupIndex + groupCompetencyLength - 1 } })
                startCompetencyGroupIndex += groupCompetencyLength;
            }
        }
    })

    merge.push({ s: { r: 2, c: 0 }, e: { r: 2, c: 4 } })
    alreadyCompetencyGroups.forEach((group, index) => {
        if (index === 0) {
            competencyGroupRow[startCompetencyGroupIndex] = { v: 'Yetkinlik Grupları Ortalaması', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }
        } else {
            competencyGroupRow[startCompetencyGroupIndex + index] = {
                v: '',
                t: 's',
                s: index === alreadyCompetencyGroups.length - 1 ? { ...headerStyle, border: borderStyles.header.topBottomRight } :
                    { ...headerStyle, border: borderStyles.header.topBottom }
            }
        }
    })

    competencyGroupRow[startCompetencyGroupIndex + alreadyCompetencyGroups.length] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }
    appendData.push(competencyGroupRow);

    merge.push({ s: { r: 2, c: startCompetencyGroupIndex }, e: { r: 2, c: startCompetencyGroupIndex + alreadyCompetencyGroups.length - 1 } })

    // personel -- durum -- yetkinlikler -- beklentiyi karşılama oranı -- geliştirmesi gereken yetkinlikler
    // row tanımlamaları

    // sabit
    const competenciesRow: any[] = []
    // yükseklik
    rowHeights[2] = { hpx: 60 };

    //// personel -- yazma
    competenciesRow[0] = { v: 'Personel', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomLeft } }
    competenciesRow[1] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
    //// personel -- merge
    merge.push({ s: { r: 3, c: 0 }, e: { r: 3, c: 1 } })

    //// position -- yazma
    competenciesRow[2] = { v: 'Pozisyon', t: 's', s: { ...headerStyle, border: borderStyles.header.fragment } }
    colWidths[2] = { wpx: 200 };

    //// durum -- yazma
    competenciesRow[3] = { v: 'Durum', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomLeft } }
    competenciesRow[4] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }

    //// durum -- merge
    merge.push({ s: { r: 3, c: 3 }, e: { r: 3, c: 4 } })

    //// yetkinlikler -- yazma
    let startCompetencyIndex = 5;
    const writingCompetencies: { competency_id: string, index: number }[] = [];
    let competencyStyle = { font: { bold: true }, alignment: { textRotation: 90, wrapText: true, ...alignCenter }, border: borderStyles.header.fragment };
    competencies.forEach((competency, index) => {
        competenciesRow[startCompetencyIndex + index] = { v: competency.competency_name, t: 's', s: competencyStyle }
        writingCompetencies.push({ competency_id: competency.competency_id, index: startCompetencyIndex + index })
    })

    // gruplar yazma
    alreadyCompetencyGroups.forEach((group, index) => {
        competenciesRow[startCompetencyIndex + competencies.length + index] = { v: group.name, t: 's', s: { font: { bold: true }, alignment: { wrapText: true, ...alignCenter }, border: borderStyles.header.fragment } }
    })

    competenciesRow[startCompetencyIndex + competencies.length + alreadyCompetencyGroups.length] = { v: 'Beklentiyi Karşılama Oranı', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight, alignment: { wrapText: true, ...alignCenter } } }
    colWidths[startCompetencyIndex + competencies.length + alreadyCompetencyGroups.length] = { wpx: 150 };

    competenciesRow[startCompetencyIndex + competencies.length + 1 + alreadyCompetencyGroups.length] = { v: 'Geliştirilmesi Gereken Yetkinlik Sayısı', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight, alignment: { wrapText: true, ...alignCenter } } }
    colWidths[startCompetencyIndex + competencies.length + 1 + alreadyCompetencyGroups.length] = { wpx: 150 };

    appendData.push(competenciesRow);




    let startEmployeeIndex = 4;
    employees.forEach((employee, index) => {
        let expectationMeetingRate = 0;
        let competencyToBeImprovedCount = 0;

        // beklentiyi karşılama oranı
        let totalTargetValue = 0;
        let totalRealValue = 0;
        competencies.forEach((competencyWithValue, index) => {
            const employeeCompetencyValue = employeeCompetencyValues.find(x => x.competency_id === competencyWithValue.competency_id && x.employee_id === employee.id);
            const selectedMachine = machines.find(x => x.$id === competencyWithValue.id);
            let difficultyCoefficient = 1;
            if (selectedMachine) {
                difficultyCoefficient = parseFloat(selectedMachine.difficulty_coefficient);
            }
            if (employeeCompetencyValue && employeeCompetencyValue.competency_real_value !== "" && employeeCompetencyValue.competency_target_value != "no-target") {
                totalTargetValue += parseInt(employeeCompetencyValue.competency_target_value);
                totalRealValue += parseInt(employeeCompetencyValue.competency_real_value) * difficultyCoefficient;
            }
        });
        if (totalTargetValue > 0) {
            expectationMeetingRate = (totalRealValue / totalTargetValue) * 100;
        }

        // geliştirilmesi gereken yetkinlik sayısı
        competencies.forEach((competencyWithValue, index) => {
            const employeeCompetencyValue = employeeCompetencyValues.find(x => x.competency_id === competencyWithValue.competency_id && x.employee_id === employee.id);
            const selectedMachine = machines.find(x => x.$id === competencyWithValue.id);
            let difficultyCoefficient = 1;
            if (selectedMachine) {
                difficultyCoefficient = parseFloat(selectedMachine.difficulty_coefficient);
            }
            if (employeeCompetencyValue && employeeCompetencyValue.competency_target_value != "no-target") {
                if (parseInt(employeeCompetencyValue.competency_real_value) * difficultyCoefficient < parseInt(employeeCompetencyValue.competency_target_value)) {
                    competencyToBeImprovedCount++;
                }
            }
        });




        const competencyGroupPercentage: {
            group_id: string,
            expectationMeetingRate: number
        }[] = [];
        let expectationMeetingRateGroup = 0;
        alreadyCompetencyGroups.forEach((group, index) => {
            let totalCompetencyTargetValueGroup = 0;
            let totalCompetencyRealValueGroup = 0;
            competencies.forEach((competencyWithValue, index) => {
                const employeeCompetencyValue = employeeCompetencyValues.find(x => x.competency_id === competencyWithValue.competency_id
                    && x.employee_id === employee.id && competencyWithValue.competency_group_id === group.id);
                const selectedMachine = machines.find(x => x.$id === competencyWithValue.id);
                let difficultyCoefficient = 1;
                if (selectedMachine) {
                    difficultyCoefficient = parseFloat(selectedMachine.difficulty_coefficient);
                }
                if (employeeCompetencyValue && employeeCompetencyValue.competency_real_value !== "" && employeeCompetencyValue.competency_target_value != "no-target") {
                    totalCompetencyTargetValueGroup += parseInt(employeeCompetencyValue.competency_target_value);
                    totalCompetencyRealValueGroup += parseInt(employeeCompetencyValue.competency_real_value) * difficultyCoefficient;
                }

            })

            if (totalCompetencyTargetValueGroup > 0) {
                expectationMeetingRateGroup = (totalCompetencyRealValueGroup / totalCompetencyTargetValueGroup) * 100;
            }
            competencyGroupPercentage.push({
                group_id: group.id,
                expectationMeetingRate: expectationMeetingRateGroup
            })
            expectationMeetingRateGroup = 0;
        })








        const waitingValueTextStyle = { border: { bottom: { style: "thin", color: "000000" } }, font: { bold: true }, alignment: alignCenter, fill: { fgColor: { rgb: "FCD5B4" } } };
        const waitingValueStyle = { border: { bottom: { style: "thin", color: "000000" }, right: { style: "thick", color: "000000" } }, alignment: alignCenter, fill: { fgColor: { rgb: "FCD5B4" } } }

        const realValueTextStyle = { border: { bottom: { style: "thick", color: "000000" } }, font: { bold: true }, alignment: alignCenter, fill: { fgColor: { rgb: "DBEEF4" } } };
        const realValueStyle = { border: { bottom: { style: "thick", color: "000000" }, right: { style: "thick", color: "000000" } }, alignment: alignCenter, fill: { fgColor: { rgb: "DBEEF4" } } }

        // first row
        const employeeRow: any[] = []

        // çalışanın pozisyonunu bulma
        let employeePosition = ""
        const employeeDbFind = employeeList.find(x => x.$id === employee.id);
        employeePosition = positionList.find(x => x.$id === employeeDbFind?.position_id)?.name || "-";

        employeeRow[0] = { v: index + 1, t: 's', s: { border: borderStyles.header.fragment, font: { bold: true }, alignment: alignCenter } }
        employeeRow[1] = { v: employee.first_name + ' ' + employee.last_name, t: 's', s: { border: borderStyles.header.fragment, font: { bold: true }, alignment: alignCenter } }
        employeeRow[2] = { v: employeePosition, t: 's', s: { border: borderStyles.header.fragment, font: { bold: true }, alignment: alignCenter } }
        employeeRow[3] = { v: 'Beklenen', t: 's', s: waitingValueTextStyle }
        employeeRow[4] = { v: '', t: 's', s: waitingValueStyle }

        // second row
        const employeeRowPlusOne: any[] = []
        employeeRowPlusOne[0] = { v: '', t: 's', s: { border: borderStyles.header.fragment, font: { bold: true }, alignment: alignCenter } }
        employeeRowPlusOne[1] = { v: '', t: 's', s: { border: borderStyles.header.fragment, font: { bold: true }, alignment: alignCenter } }
        employeeRowPlusOne[2] = { v: '', t: 's', s: { border: borderStyles.header.fragment, font: { bold: true }, alignment: alignCenter } }
        employeeRowPlusOne[3] = { v: 'Gerçekleşen', t: 's', s: realValueTextStyle }
        employeeRowPlusOne[4] = { v: '', t: 's', s: realValueStyle }

        // yetkinlikler
        let startFirstCompetencyIndex = 5;
        competencies.forEach((competencyWithValue, index) => {
            const employeeCompetencyValue = employeeCompetencyValues.find(x => x.competency_id === competencyWithValue.competency_id && x.employee_id === employee.id);
            let difficultyCoefficient = 1;
            const selectedMachine = machines.find(x => x.$id === competencyWithValue.id);
            if (selectedMachine) {
                difficultyCoefficient = parseFloat(selectedMachine.difficulty_coefficient);
            }

            if (employeeCompetencyValue) {
                employeeRow[startFirstCompetencyIndex + index] = {
                    v: employeeCompetencyValue.competency_target_value === "no-target" ? "Hedefi Yok" : employeeCompetencyValue.competency_target_value,
                    t: 's',
                    s: waitingValueStyle
                }
                employeeRowPlusOne[startFirstCompetencyIndex + index] = {
                    v: employeeCompetencyValue.competency_target_value === "no-target" ? "Hedefi Yok" : difficultyCoefficient === 1 ? employeeCompetencyValue.competency_real_value : (parseInt(employeeCompetencyValue.competency_real_value) * difficultyCoefficient).toFixed(1),
                    t: 's',
                    s: realValueStyle
                }
            } else {
                employeeRow[startFirstCompetencyIndex + index] = { v: '', t: 's', s: waitingValueStyle }
                employeeRowPlusOne[startFirstCompetencyIndex + index] = { v: '', t: 's', s: realValueStyle }
            }
        });

        // grup ortalamaları
        const groupExpectationMeetingRateTextStyle = { border: borderStyles.header.fragment, font: { bold: true }, alignment: alignCenter, fill: { fgColor: { rgb: "FCBA03" } } };
        const groupExpectationMeetingRateStyle = { border: borderStyles.header.fragment, alignment: alignCenter, fill: { fgColor: { rgb: "FCBA03" } } }


        alreadyCompetencyGroups.forEach((group, index) => {


            employeeRow[startFirstCompetencyIndex + competencies.length + index] = { v: competencyGroupPercentage.find(x => x.group_id === group.id)?.expectationMeetingRate.toFixed(2) + '%', t: 's', s: groupExpectationMeetingRateTextStyle }
            employeeRowPlusOne[startFirstCompetencyIndex + competencies.length + index] = { v: '', t: 's', s: groupExpectationMeetingRateStyle }
            merge.push({ s: { r: startEmployeeIndex, c: startFirstCompetencyIndex + competencies.length + index }, e: { r: startEmployeeIndex + 1, c: startFirstCompetencyIndex + competencies.length + index } })
        })


        // beklentiyi karşılama oranı
        employeeRow[startFirstCompetencyIndex + competencies.length + alreadyCompetencyGroups.length] = { v: expectationMeetingRate.toFixed(2) + '%', t: 's', s: { ...realValueStyle, border: { bottom: { style: "thick", color: "000000" }, right: { style: "thick", color: "000000" } } } }
        employeeRowPlusOne[startFirstCompetencyIndex + competencies.length + alreadyCompetencyGroups.length] = { v: '', t: 's', s: { ...realValueStyle, border: { bottom: { style: "thick", color: "000000" }, right: { style: "thick", color: "000000" } } } }

        // geliştirilmesi gereken yetkinlik sayısı
        employeeRow[startFirstCompetencyIndex + competencies.length + 1 + alreadyCompetencyGroups.length] = { v: competencyToBeImprovedCount, t: 's', s: { ...realValueStyle, border: { bottom: { style: "thick", color: "000000" }, right: { style: "thick", color: "000000" } } } }
        employeeRowPlusOne[startFirstCompetencyIndex + competencies.length + 1 + alreadyCompetencyGroups.length] = { v: '', t: 's', s: { ...realValueStyle, border: { bottom: { style: "thick", color: "000000" }, right: { style: "thick", color: "000000" } } } }

        // append
        appendData[startEmployeeIndex] = employeeRow;
        appendData[startEmployeeIndex + 1] = employeeRowPlusOne;

        //// merge
        // personel index
        merge.push({ s: { r: startEmployeeIndex, c: 0 }, e: { r: startEmployeeIndex + 1, c: 0 } })
        // personel adı
        merge.push({ s: { r: startEmployeeIndex, c: 1 }, e: { r: startEmployeeIndex + 1, c: 1 } })
        //pozisyon
        merge.push({ s: { r: startEmployeeIndex, c: 2 }, e: { r: startEmployeeIndex + 1, c: 2 } })
        // beklenen
        merge.push({ s: { r: startEmployeeIndex, c: 3 }, e: { r: startEmployeeIndex, c: 4 } })
        // gerçekleşen
        merge.push({ s: { r: startEmployeeIndex + 1, c: 3 }, e: { r: startEmployeeIndex + 1, c: 4 } })

        merge.push({ s: { r: startEmployeeIndex, c: startFirstCompetencyIndex + competencies.length + alreadyCompetencyGroups.length }, e: { r: startEmployeeIndex + 1, c: startFirstCompetencyIndex + competencies.length + alreadyCompetencyGroups.length } })
        merge.push({ s: { r: startEmployeeIndex, c: startFirstCompetencyIndex + competencies.length + 1 + alreadyCompetencyGroups.length }, e: { r: startEmployeeIndex + 1, c: startFirstCompetencyIndex + competencies.length + 1 + alreadyCompetencyGroups.length } })

        startEmployeeIndex += 2;
    })


    const numberOfEmployeesDontExpectedCompetencyLevelRow: any[] = []
    numberOfEmployeesDontExpectedCompetencyLevelRow[0] = { v: 'Beklentiyi Karşılamayan Personel Sayısı', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomLeft }, align: alignCenter }
    numberOfEmployeesDontExpectedCompetencyLevelRow[1] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
    numberOfEmployeesDontExpectedCompetencyLevelRow[2] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
    numberOfEmployeesDontExpectedCompetencyLevelRow[3] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }
    numberOfEmployeesDontExpectedCompetencyLevelRow[4] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }

    merge.push({ s: { r: employees.length * 2 + 6, c: 0 }, e: { r: employees.length * 2 + 6, c: 4 } })


    const numberOfEmployeesExpectedCompetencyLevelRow: any[] = []

    numberOfEmployeesExpectedCompetencyLevelRow[0] = { v: 'Beklentiyi Karşılayan Personel Sayısı', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomLeft }, align: alignCenter }
    numberOfEmployeesExpectedCompetencyLevelRow[1] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
    numberOfEmployeesExpectedCompetencyLevelRow[2] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
    numberOfEmployeesExpectedCompetencyLevelRow[3] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottom } }
    numberOfEmployeesExpectedCompetencyLevelRow[4] = { v: '', t: 's', s: { ...headerStyle, border: borderStyles.header.topBottomRight } }

    merge.push({ s: { r: employees.length * 2 + 9, c: 0 }, e: { r: employees.length * 2 + 9, c: 4 } })


    merge.push({ s: { r: employees.length * 2 + 9, c: 0 }, e: { r: employees.length * 2 + 10, c: 3 } })

    merge.push({ s: { r: employees.length * 2 + 9, c: 0 }, e: { r: employees.length * 2 + 10, c: 3 } })

    writingCompetencies.forEach((competency, index) => {
        // beklentiyi karşılamayan personel sayısı
        let employeeCount = 0;
        // beklentiyi karşılayan personel sayısı
        let employeeCountExpected = 0;
        employeeCompetencyValues.forEach(employeeCompetencyValue => {
            if (employeeCompetencyValue.competency_id === competency.competency_id) {
                const selectedMachine = machines.find(x => x.$id === competencies.find(x => x.competency_id === competency.competency_id)?.id);
                let difficultyCoefficient = 1;
                const realValue = parseInt(employeeCompetencyValue.competency_real_value);
                if (selectedMachine) {
                    difficultyCoefficient = parseFloat(selectedMachine.difficulty_coefficient);
                }
                if (employeeCompetencyValue.competency_target_value != "no-target" && (realValue * difficultyCoefficient) < parseInt(employeeCompetencyValue.competency_target_value)) {
                    employeeCount++;
                }
                else {
                    employeeCountExpected++;
                }
            }
        });

        // beklentiyi karşılamayan personel sayısı - yazma
        numberOfEmployeesDontExpectedCompetencyLevelRow[5 + index] = { v: employeeCount, t: 's', s: { ...headerStyle, border: borderStyles.header.fragment } }
        // beklentiyi karşılayan personel sayısı - yazma
        numberOfEmployeesExpectedCompetencyLevelRow[5 + index] = { v: employeeCountExpected, t: 's', s: { ...headerStyle, border: borderStyles.header.fragment } }

    })


    appendData[employees.length * 2 + 6] = numberOfEmployeesDontExpectedCompetencyLevelRow;
    rowHeights[employees.length * 2 + 6] = { hpx: 60 };

    appendData[employees.length * 2 + 9] = numberOfEmployeesExpectedCompetencyLevelRow;
    rowHeights[employees.length * 2 + 9] = { hpx: 60 };



    competencyGroups.forEach((group, index) => {

        let totalPercentage = 0;
        let totalTargetValue = 0;
        let totalRealValue = 0;
        employeeCompetencyValues.forEach(employeeCompetencyValue => {
            if (competencies.find(x => x.competency_id === employeeCompetencyValue.competency_id)?.competency_group_id === group.competency_group_id && employeeCompetencyValue.competency_target_value != "no-target") {
                const selectedMachine = machines.find(x => x.$id === employeeCompetencyValue.competency_id);
                let difficultyCoefficient = 1;
                if (selectedMachine) {
                    difficultyCoefficient = parseFloat(selectedMachine.difficulty_coefficient);
                }
                if (employeeCompetencyValue && employeeCompetencyValue.competency_real_value !== "" && employeeCompetencyValue.competency_target_value !== "no-target") {
                    totalTargetValue += parseInt(employeeCompetencyValue.competency_target_value);
                    totalRealValue += parseInt(employeeCompetencyValue.competency_real_value) * difficultyCoefficient;
                }
            }
        })

        if (totalTargetValue > 0) {
            totalPercentage = (totalRealValue / totalTargetValue) * 100
        }

        let competencyGroupPercentageRow: any[] = [];
        competencyGroupPercentageRow[competencies.length + 5] = { v: group.competency_group_name, t: 's', s: { ...headerStyle, border: borderStyles.header.fragment } }
        competencyGroupPercentageRow[competencies.length + 6] = { v: totalPercentage.toFixed(2), t: 's', s: { ...headerStyle, border: borderStyles.header.fragment } }

        appendData[employees.length * 2 + 11 + index * 2] = competencyGroupPercentageRow;
    })


    const ws = XLSX.utils.aoa_to_sheet(appendData);

    ws["!rows"] = rowHeights;
    ws["!cols"] = colWidths;
    ws["!merges"] = merge;

    XLSX.utils.book_append_sheet(wb, ws, "Rapor");

    // STEP 4: Write Excel file to browser
    XLSX.writeFile(wb, polyvalence_table_name + '-' + new Date().toLocaleDateString() + '.xlsx');
}
