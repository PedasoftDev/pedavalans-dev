import { UIRoute, UIRoutes } from "@tuval/forms"
import { LayoutController } from "./controllers/LayoutController"
import { LoginController } from "./controllers/LoginController"
import { SignupController } from "./controllers/SignupController"
import { NotFoundController } from "./pages/NotFound/Controllers/NotFoundController"
import { SetupController } from "./pages/Setup/Controllers/SetupController"
import { HomeController } from "./pages/Home/Controllers/HomeController"

export const Routes = () => {
    return (
        UIRoutes(
            UIRoute('/', LayoutController).children(
                // setup
                UIRoute('setup', SetupController),

                // home
                UIRoute('home', HomeController),

                UIRoute('', LoginController),
                UIRoute('login', LoginController),
                UIRoute('signup', SignupController),
                UIRoute('logout', LoginController),


                UIRoute('*', NotFoundController),
            ),
            UIRoute('*', NotFoundController)
        )
    )
}