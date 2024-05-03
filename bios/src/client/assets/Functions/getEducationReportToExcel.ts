import XLSX from 'xlsx-js-style';
import IEducation from '../../interfaces/IEducation';
import IEducationCompetencyRelation from '../../interfaces/IEducationCompetencyRelation';
import ICompetency from '../../interfaces/ICompetency';
import IAssignedEducation from '../../interfaces/IAssignedEducation';



const getEducationReportToExcel = (educations: IEducation.IBase[], competencies: ICompetency.ICompetency[], educationCompetencyRelations: IEducationCompetencyRelation.IBase[], assignedEducations: IAssignedEducation.IBase[]) => {
  const wb = XLSX.utils.book_new();
  const appendData = [];
  const rowHeights: { hpx: number }[] = [];
  const mergeCells: { s: { r: number, c: number }, e: { r: number, c: number } }[] = [];

  const alignCenter = { vertical: "center", horizontal: "center" };
  const mainStyle = { font: { bold: true, color: { rgb: "FFFFFF" } }, fill: { fgColor: { rgb: "0F243E" } }, alignment: alignCenter }
  const headerStyle = { font: { bold: true, color: { rgb: "FFFFFF" } }, fill: { fgColor: { rgb: "1F82F9" } }, alignment: alignCenter }

  const firstHeaderRow = [{ v: "Eğitim Katılım Raporu", t: 's', s: mainStyle }]
  const secondHeaderRow = [
    { v: 'Eğitim Kodu', t: 's', s: headerStyle },
    { v: 'Eğitim Tanımı', t: 's', s: headerStyle },
    { v: 'İlgili Yetkinlikler', t: 's', s: headerStyle },
    { v: 'Eğitim Alan Personel', t: 's', s: headerStyle },
    { v: 'Eğitim Sorumlusu', t: 's', s: headerStyle },
    { v: 'Eğitim Süresi', t: 's', s: headerStyle },
    { v: 'Eğitim Gerçekleşme Tarihi', t: 's', s: headerStyle },
    { v: 'Eğitim Durumu (Açık/Tamamlandı)', t: 's', s: headerStyle },
  ];

  appendData.push(firstHeaderRow);
  rowHeights[0] = { hpx: 30 };
  mergeCells.push({ s: { r: 0, c: 0 }, e: { r: 0, c: 7 } });

  appendData.push(secondHeaderRow);
  rowHeights[1] = { hpx: 20 };


  assignedEducations.forEach((assignedEducation, index) => {
    const education = educations.find(education => education.$id === assignedEducation.education_id);
    const educationCompetencyRelation = educationCompetencyRelations.filter(educationCompetencyRelation => educationCompetencyRelation.education_id === assignedEducation.education_id);
    const competencyNames = educationCompetencyRelation.map(educationCompetencyRelation => competencies.find(competency => competency.$id === educationCompetencyRelation.competency_id).competency_name).join(', ');

    const row = [
      { v: education.code, t: 's', s: { alignment: alignCenter } },
      { v: education.name, t: 's', s: { alignment: alignCenter } },
      { v: competencyNames, t: 's', s: { alignment: alignCenter } },
      { v: assignedEducation.employee_name, t: 's', s: { alignment: alignCenter } },
      { v: assignedEducation.educator_name, t: 's', s: { alignment: alignCenter } },
      { v: assignedEducation.hour, t: 's', s: { alignment: alignCenter } },
      { v: assignedEducation.status != "open" ? new Date(assignedEducation.$updatedAt).toLocaleString("tr-TR") : "", t: 's', s: { alignment: alignCenter } },
      { v: assignedEducation.status == "open" ? "Açık" : "Tamamlandı", t: 's', s: { alignment: alignCenter } },
    ];

    appendData.push(row);
    rowHeights[index + 2] = { hpx: 20 };
  })

  const ws = XLSX.utils.aoa_to_sheet(appendData);
  ws['!merges'] = mergeCells;
  ws['!cols'] = [{ wpx: 150 }, { wpx: 300 }, { wpx: 300 }, { wpx: 200 }, { wpx: 200 }, { wpx: 200 }, { wpx: 200 }, { wpx: 200 }];
  ws['!rows'] = rowHeights;

  XLSX.utils.book_append_sheet(wb, ws, "Eğitim Katılım Raporu");
  XLSX.writeFile(wb, "Eğitim Katılım Raporu.xlsx");

}

export default getEducationReportToExcel