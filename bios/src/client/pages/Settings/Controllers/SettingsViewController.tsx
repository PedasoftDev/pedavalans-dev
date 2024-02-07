import { Text, UIController } from "@tuval/forms";


export class SettingsViewController extends UIController {

    public LoadView(): any {
        return (
            Text("Settings View")
        )
    }
}