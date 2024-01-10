import { IRoot } from "./main";

namespace ICompetencyEvaluationPeriod {
    export interface ICreateCompetencyEvaluationPeriod {
        evaluation_period_id: string;
        evaluation_period_name: string;
        evaluation_period_year: string;
        is_default_year: string;
        tenant_id: string;
        realm_id: string;
    }

    export interface ICompetencyEvaluationPeriod extends IRoot {
        evaluation_period_id: string;
        evaluation_period_name: string;
        evaluation_period_year: string;
        is_default_year: string;
        is_deleted_period: boolean;
        tenant_id: string;
        realm_id: string;
    }
}

export default ICompetencyEvaluationPeriod;