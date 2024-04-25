
import { BiosController, ReactView, UIView } from "@tuval/forms";
import { Routes } from "../Routes";
import { Provider } from 'react-redux'
import store from "../store";
import React, { Fragment } from "react";
export class MainController extends BiosController {
    public override LoadBiosView(): UIView {
        // title
        window.document.title = "Pedavalans";
        const theme = localStorage.getItem("pedavalans_theme")
        if (!theme) {
            localStorage.setItem("pedavalans_theme", "false")
        }
        // burada me yok o yüzden parametreleri alamıyor

        return (
            ReactView(
                <Provider store={store}>
                    <Fragment>
                        {Routes().render()}
                    </Fragment>
                </Provider>
            )
        )
    }
}