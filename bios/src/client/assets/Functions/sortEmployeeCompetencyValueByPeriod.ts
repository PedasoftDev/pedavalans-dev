function getEvaluationPeriodValue(period: string, frequency: string): number {
    const [year, descriptor] = period.split(" ");
    const yearNum = parseInt(year, 10);
   
    switch (frequency) {
        case 'Yıl':
            return yearNum;
        case 'Yarıyıl':
            return descriptor.startsWith("1.") ? yearNum * 10 + 1 : yearNum * 10 + 2;
        case 'Çeyrekyıl':
            return descriptor.startsWith("1.") ? yearNum * 10 + 1 :
                   descriptor.startsWith("2.") ? yearNum * 10 + 2 :
                   descriptor.startsWith("3.") ? yearNum * 10 + 3 : yearNum * 10 + 4;
        case 'Ay':
            const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
            const monthIndex = months.indexOf(descriptor.split(" ")[0]) + 1;
            return yearNum * 100 + monthIndex;
        default:
            throw new Error("Invalid frequency");
    }
}

function sortEvaluations(evaluations: IEmployeeCompetencyValue.IEmployeeCompetencyValue[], frequency: string): IEmployeeCompetencyValue.IEmployeeCompetencyValue[] {
    return evaluations.sort((a, b) => {
        const aValue = getEvaluationPeriodValue(a.competency_evaluation_period, frequency);
        const bValue = getEvaluationPeriodValue(b.competency_evaluation_period, frequency);
        return aValue - bValue;
    });
}

export { getEvaluationPeriodValue, sortEvaluations };
