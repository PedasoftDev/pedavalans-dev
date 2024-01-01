import { Spinner, Text, UIController, UINavigate, UIView, VStack } from "@tuval/forms";
import Main from "../../../../server/hooks/main/Main";


export class HomeController extends UIController {



    public LoadView(): UIView {

        const { required, isLoading } = Main.SetupRequired();

        

        return (
            VStack(
                isLoading ? VStack(Spinner()) :
                    required ? UINavigate("/setup") :
                        Text("Hello World")
            )
        )
    }
}