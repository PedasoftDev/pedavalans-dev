import { UpdateCompetencyGradeController } from './pages/CompetencyGrade/Controllers/UpdateCompetencyGradeController';
import { UIRoute, UIRoutes } from "@tuval/forms"
import { LayoutController } from "./controllers/LayoutController"
import { LoginController } from "./controllers/LoginController"
import { SignupController } from "./controllers/SignupController"
import { NotFoundController } from "./pages/NotFound/Controllers/NotFoundController"
import { SetupController } from "./pages/Setup/Controllers/SetupController"
import { DashboardController } from "./pages/Dashboard/DashboardController"
import { CompetencyGradeController } from "./pages/CompetencyGrade/Controllers/CompetencyGradeController"
import { CompetencyGradeListController } from "./pages/CompetencyGrade/Controllers/CompetencyGradeListController"
import { CreateCompetencyGradeController } from "./pages/CompetencyGrade/Controllers/CreateCompetencyGradeController"
import { CompetencyGradeLevelController } from './pages/CompetencyGrade/Controllers/CompetencyGradeLevelController';
import { CompetencyGroupController } from './pages/CompetencyGroup/Controllers/CompetencyGroupController';
import { CreateCompetencyGroupController } from './pages/CompetencyGroup/Controllers/CreateCompetencyGroupController';
import { CompetencyGroupListController } from './pages/CompetencyGroup/Controllers/CompetencyGroupListController';
import { UpdateCompetencyGroupController } from './pages/CompetencyGroup/Controllers/UpdateCompetencyGroupController';
import { CompetencyEvaluationPeriodController } from './pages/CompetencyEvaluationPeriod/Controllers/CompetencyEvaluationPeriodController';
import { CreateCompetencyEvaluationPeriodController } from './pages/CompetencyEvaluationPeriod/Controllers/CreateCompetencyEvaluationPeriodController';
import { CompetencyEvaluationListController } from './pages/CompetencyEvaluationPeriod/Controllers/CompetencyEvaluationPeriodListController';
import { UpdateCompetenyEvaluationPeriodController } from './pages/CompetencyEvaluationPeriod/Controllers/UpdateCompetencyEvaluationPeriodController';
import { ParametersController } from './pages/Parameters/ParametersController';
import { OrganizationStructureController } from './pages/OrganizationStructure/OrganizationStructureController';
import { OrganizationStructureViewController } from './pages/OrganizationStructure/OrganizationStructureViewController';
import { CreateCompetencyController } from './pages/Competency/Controllers/CreateCompetencyController';
import { CompetencyController } from './pages/Competency/Controllers/CompetencyController';
import { CompetencyListController } from './pages/Competency/Controllers/CompetencyListController';

export const Routes = () => {
    return (
        UIRoutes(
            UIRoute('/app', LayoutController).children(
                // setup
                UIRoute('setup', SetupController),

                // dashboard
                UIRoute('dashboard', DashboardController),

                // competency grade
                UIRoute("competency-grade", CompetencyGradeController).children(
                    UIRoute("create", CreateCompetencyGradeController),
                    UIRoute("edit/:id", UpdateCompetencyGradeController),
                    UIRoute("list", CompetencyGradeListController),
                    UIRoute("level/:id", CompetencyGradeLevelController)
                ),

                // competency group
                UIRoute("competency-group", CompetencyGroupController).children(
                    UIRoute("create", CreateCompetencyGroupController),
                    UIRoute("edit/:id", UpdateCompetencyGroupController),
                    UIRoute("list", CompetencyGroupListController),
                ),

                // competency evaluation period
                UIRoute("competency-evaluation-period", CompetencyEvaluationPeriodController).children(
                    UIRoute("create", CreateCompetencyEvaluationPeriodController),
                    UIRoute("list", CompetencyEvaluationListController),
                    UIRoute("edit/:id", UpdateCompetenyEvaluationPeriodController),
                ),

                // parameters
                UIRoute('parameters', ParametersController),

                // organization structure
                UIRoute('organization-structure', OrganizationStructureController).children(
                    UIRoute('view', OrganizationStructureViewController)
                ),

                // competency
                UIRoute("competency", CompetencyController).children(
                    UIRoute("create", CreateCompetencyController),
                    UIRoute("list", CompetencyListController)
                ),

                UIRoute('*', NotFoundController),
            ),

            UIRoute('', LoginController),
            UIRoute('login', LoginController),
            UIRoute('signup', SignupController),
            UIRoute('logout', LoginController)
        )
    )
}