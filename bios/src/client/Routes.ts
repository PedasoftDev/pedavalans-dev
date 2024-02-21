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
import { ParametersController } from './pages/Parameters/Controllers/ParametersController';
import { OrganizationStructureController } from './pages/OrganizationStructure/Controllers/OrganizationStructureController';
import { OrganizationStructureViewController } from './pages/OrganizationStructure/Controllers/OrganizationStructureViewController';
import { CreateCompetencyController } from './pages/Competency/Controllers/CreateCompetencyController';
import { CompetencyController } from './pages/Competency/Controllers/CompetencyController';
import { CompetencyListController } from './pages/Competency/Controllers/CompetencyListController';
import { UpdateCompetencyController } from './pages/Competency/Controllers/UpdateCompetencyController';
import { PolyvalenceUnitController } from './pages/PolyvalenceUnit/Controllers/PolyvalenceUnitController';
import { PolyvalenceUnitListController } from './pages/PolyvalenceUnit/Controllers/PolyvalenceUnitListController';
import { CreatePolyvalenceUnitController } from './pages/PolyvalenceUnit/Controllers/CreatePolyvalenceUnitController';
import { UpdatePolyvalenceUnitController } from './pages/PolyvalenceUnit/Controllers/UpdatePolyvalenceUnitController';
import { CompetencyTargetDataEntryController } from './pages/CompetencyTargetDataEntry/Controllers/CompetencyTargetDataEntryController';
import { CompetencyTargetDataEntryViewController } from './pages/CompetencyTargetDataEntry/Controllers/CompetencyTargetDataEntryViewController';
import { CompetencyRealDataEntryController } from './pages/CompetencyRealDataEntry/Controllers/CompetencyRealDataEntryController';
import { CompetencyRealDataEntryViewController } from './pages/CompetencyRealDataEntry/Controllers/CompetencyRealDataEntryViewController';
import { CompetencyReportDataController } from './pages/CompetencyReportData/Controllers/CompetencyReportDataController';
import { CompetencyReportDataViewController } from './pages/CompetencyReportData/Controllers/CompetencyReportDataViewController';
import { AccountManagementController } from './pages/AccountManagement/Controllers/AccountManagementController';
import { AccountManagementViewController } from './pages/AccountManagement/Controllers/AccountManagementViewController';
import { CompetencyStatusReportController } from './pages/CompetencyStatusReport/Controllers/CompetencyStatusReportController';
import { CompetencyStatusReportViewController } from './pages/CompetencyStatusReport/Controllers/CompetencyStatusReportViewController';
import { ResetPasswordController } from './controllers/ResetPasswordController';
import { LogoutController } from './controllers/LogoutController';
import { ReportPolyvalenceUnitList } from './pages/PolyvalenceUnit/Controllers/ReportPolyvalenceUnitList';
import { UpdatePasswordController } from './controllers/UpdatePasswordController';
import { AuthorizationProfileController } from './pages/AuthorizationProfile/Controllers/AuthorizationProfileController';
import { AuthorizationProfileViewController } from './pages/AuthorizationProfile/Controllers/AuthorizationProfileViewController';

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
                    UIRoute("list", CompetencyListController),
                    UIRoute("edit/:id", UpdateCompetencyController)
                ),

                // polyvalence unit
                UIRoute('polyvalence-unit', PolyvalenceUnitController).children(
                    UIRoute('create', CreatePolyvalenceUnitController),
                    UIRoute('edit/:id', UpdatePolyvalenceUnitController),
                    UIRoute('list', PolyvalenceUnitListController),
                    UIRoute('report/:id', ReportPolyvalenceUnitList)
                ),

                // competency target data entry
                UIRoute('competency-target-data-entry', CompetencyTargetDataEntryController).children(
                    UIRoute('view', CompetencyTargetDataEntryViewController)
                ),

                // competency real data entry
                UIRoute('competency-real-data-entry', CompetencyRealDataEntryController).children(
                    UIRoute('view', CompetencyRealDataEntryViewController)
                ),
                // competency report data
                UIRoute('competency-report-data', CompetencyReportDataController).children(
                    UIRoute('view', CompetencyReportDataViewController)
                ),

                // settings
                UIRoute('account-management', AccountManagementController).children(
                    UIRoute('view', AccountManagementViewController)
                ),

                // competency status report
                UIRoute('competency-status-report', CompetencyStatusReportController).children(
                    UIRoute('view', CompetencyStatusReportViewController)
                ),

                // authorization profile
                UIRoute('authorization-profile', AuthorizationProfileController).children(
                    UIRoute('view', AuthorizationProfileViewController)
                ),

                // not found
                UIRoute('*', NotFoundController),
            ),

            UIRoute('', LoginController),
            UIRoute('/login', LoginController),
            UIRoute('/signup', SignupController),
            UIRoute('/reset-password', ResetPasswordController),
            UIRoute('/update-password', UpdatePasswordController),
            UIRoute('/logout', LogoutController)
        )
    )
}