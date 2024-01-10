import { Color, ForEach, HStack, Icon, Spacer, Text, TextAlignment, UIContextMenu, VStack, cLeading, cTop } from "@tuval/forms";
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
            Icon("\\e267").fontSize("30px").width("30px").height("30px"),
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

    export const YearCard = (year: string, period_name: string, is_active_period: string, uiDropdownItems: any[]) =>
        VStack({ alignment: cTop, spacing: 20 })(
            HStack(
                PedaText(year).fontSize(22).fontWeight("300").padding("0 0 10px 10px"),
                Spacer(),
                VStack(
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
                        Icon("\\e5d4").size(20).padding("0 0 10px 0")
                            .background({ hover: "rgba(137, 199, 245, .5)" })
                            .cursor("pointer")
                            .cornerRadius("50%")
                            .padding(5)
                            .transition(".3s")
                    ),
                ).width().height()
            ).height().borderBottom("1px solid rgba(137, 199, 245, .5)"),
            VStack(
                is_active_period == "true" ?
                    HStack({ alignment: cLeading, spacing: 10 })(
                        PedaText("Varsayılan Dönem").height(),
                        Icon("\\e614").foregroundColor("green").size(22)
                    ).height()
                    :
                    HStack({ alignment: cLeading })(
                        PedaText("Varsayılan Değil").height()
                    ).height(),
            ).height(),
            VStack({ alignment: cLeading })(
                PedaText("Dönem Adı").fontSize("10px").foregroundColor("gray"),
                PedaText(period_name).multilineTextAlignment(TextAlignment.leading)
            ).height(),
            VStack({ alignment: cLeading })(
                PedaText("Dönem Aralığı").fontSize("10px").foregroundColor("gray"),
                PedaText(`01.01.${year} - 31.12.${year}`)
            ).height()
        ).width(250).height(250).padding(10)
            .shadow("rgb(0 0 0 / 24%) 0px 3px 8px")
            .background({ default: "", hover: "rgba(137, 199, 245, .3)" })
            .transition(".6s")
            .cornerRadius(10)
}