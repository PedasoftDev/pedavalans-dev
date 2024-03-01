
import ICompetency from '../../interfaces/ICompetency';
import { utils, writeFile } from 'xlsx';
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

export function getReportToExcel(employeName: string, data: IData[]) {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Competency');
    writeFile(wb, employeName + '.xlsx');
}