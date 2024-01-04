import { Color, ForEach, HStack, Icon, Text, TextAlignment, UIContextMenu, VStack, cLeading } from "@tuval/forms";
import React from "react";

export namespace Views {
    export const Title = (title: string) =>
        Text(title).fontWeight("400").textTransform("capitalize")
            .fontFamily("Poppins")
            .fontSize("25px");

    export const PedaText = (text: string) =>
        Text(text).fontFamily("Poppins")

    export const GradeCard = (grade_name: string, uiDropdownItems: any[]) =>
        HStack({ spacing: 10 })(
            Icon("\\e267").width("30px").height("30px"),
            VStack({ alignment: cLeading })(
                PedaText("Düzey Adı").fontSize("10px").foregroundColor("gray"),
                PedaText(grade_name).multilineTextAlignment(TextAlignment.leading)
            ),
            VStack({ alignment: cLeading })(
                UIContextMenu(
                    ...ForEach(uiDropdownItems)((item) =>
                        item.title == "Sil" ?
                            VStack({ alignment: cLeading })(
                                Views.PedaText(item.title).foregroundColor(Color.red)
                            ).width("100%")
                                .onClick(() => item.action())
                            :
                            VStack({ alignment: cLeading })(
                                Views.PedaText(item.title)
                            ).width("100%")
                                .onClick(() => item.action())
                    )
                )(
                    Icon("\\e5d4")
                        .size(20)
                        .background({ hover: "#dddddd" })
                        .cursor("pointer")
                        .cornerRadius("50%")
                        .padding(5)
                ).width(),
            ).width("30px")
        ).minHeight(70).height(70).height(70).width("100%").shadow("rgba(0, 0, 0, 0.15) 0px 2px 8px").paddingLeft("20px").marginTop("20px")
}