import { IOrganizationStructure } from "./IOrganizationStructure";


namespace IEmployeeDashboard {
    export interface IBase extends IOrganizationStructure.IEmployees.IEmployee{
        polyvalence_table_id: string;
        competency_evaluation_period: string;
        frequency:string;  
    }
}

export default IEmployeeDashboard;
