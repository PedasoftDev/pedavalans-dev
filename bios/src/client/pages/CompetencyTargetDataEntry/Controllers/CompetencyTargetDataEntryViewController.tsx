import { Text, UIController, UIView, VStack } from "@tuval/forms";


export class CompetencyTargetDataEntryViewController extends UIController {

    public LoadView(): UIView {
        return (
            VStack(
                Text("Hello World")
            )
        )
    }
}