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
import { CreateCompetencyGroupController } from './pages/CompetencyGroup/Controllers/CreateCompetencyGroup';
import { CompetencyGroupListController } from './pages/CompetencyGroup/Controllers/CompetencyGroupListController';
import { UpdateCompetencyGroupController } from './pages/CompetencyGroup/Controllers/UpdateCompetencyGroupController';

export const Routes = () => {
    return (
        UIRoutes(
            UIRoute('/app', LayoutController).children(
                // setup
                UIRoute('setup', SetupController),

                // dashboard
                UIRoute('dashboard', DashboardController),

                // competencyGrade
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


                UIRoute('*', NotFoundController),
            ),

            UIRoute('', LoginController),
            UIRoute('login', LoginController),
            UIRoute('signup', SignupController),
            UIRoute('logout', LoginController)
        )
    )
}