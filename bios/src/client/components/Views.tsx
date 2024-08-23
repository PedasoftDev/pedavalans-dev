import { Button, ButtonGroup, IconButton, Menu, MenuItem } from "@mui/material";
import { GridMoreVertIcon } from "@mui/x-data-grid";
import { Color, ForEach, HStack, Icon, ReactView, Spacer, Text, TextAlignment, UIButton, UIContextMenu, UIRouteLink, VStack, cLeading, cTop } from "@tuval/forms";
import React, { useEffect } from "react";
import styled from "styled-components";
import { HiOutlinePencilAlt, HiOutlineDocumentReport } from "react-icons/hi";
import MenuMain from "./Menu";
import { Query, Services } from "@realmocean/sdk";
import AppInfo from "../../AppInfo";
import Collections from "../../server/core/Collections";

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
            HStack({ alignment: cLeading, spacing: 10 })(
                VStack(
                    Icon("\\e3c9").tooltip("Düzenle").cursor("pointer").onClick(() => uiDropdownItems[0].action()).size(20)
                )
                    .background({ hover: "#dddddd" })
                    .cursor("pointer")
                    .cornerRadius("50%")
                    .width()
                    .padding(5),
                VStack(
                    Icon("\\e267").tooltip("Düzey Skalası").cursor("pointer").onClick(() => uiDropdownItems[1].action()).size(20)
                ).background({ hover: "#dddddd" })
                    .cursor("pointer")
                    .cornerRadius("50%")
                    .width()
                    .padding(5)
            ).width().height()
        ).minHeight(70).height(70).height(70).width("100%").shadow("rgba(0, 0, 0, 0.15) 0px 2px 8px").paddingLeft("20px").marginTop("20px")

    export const YearCard = (year: string, period_name: string, is_active_period: string, uiDropdownItems: { action: Function, title: string }) => {

        const YearCardButton = styled.div`
            cursor: pointer;
            font-size: 11px;
            &:hover {
                text-decoration: underline;
            }
        `;

        return (
            VStack({ alignment: cTop, spacing: 20 })(
                HStack(
                    PedaText(year).fontSize(22).fontWeight("300").padding("0 0 10px 10px"),
                    Spacer(),
                    ReactView(
                        <YearCardButton onClick={() => { uiDropdownItems.action() }}>
                            Düzenle
                        </YearCardButton>
                    )
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
                .cornerRadius(10))
    }


    export const PolyvalenceUnitCard = (table_name: string, department_name: string, period_name: string, item: { title: string, action: Function } | null, report: Function) => {
        return (
            VStack({ alignment: cTop, spacing: 10 })(
                HStack(
                    VStack({ alignment: cLeading })(
                        PedaText("Polivalans Tablosu").fontSize("10px").foregroundColor("gray"),
                        HStack(PedaText(table_name.length > 30 ? table_name.substring(0, 30) + "..." : table_name)).width().height().tooltip(table_name)
                    ),
                    Spacer(),
                    ReactView(
                        <HiOutlineDocumentReport cursor={"pointer"} size={"18px"} onClick={() => report()} style={{ marginRight: "10px" }} />
                    ).tooltip("Yetkinlik Matrisi"),
                    item != null ?
                        ReactView(
                            <HiOutlinePencilAlt cursor={"pointer"} size={"18px"} onClick={() => item.action()} />
                        ).tooltip("Düzenle") : null,
                ).height(),
                HStack({ alignment: cLeading })(
                    VStack({ alignment: cLeading })(
                        PedaText("Departman").fontSize("10px").foregroundColor("gray"),
                        PedaText(department_name)
                    )
                ).height(),
                HStack({ alignment: cLeading })(
                    VStack({ alignment: cLeading })(
                        PedaText("Değerlendirme Sıklığı").fontSize("10px").foregroundColor("gray"),
                        PedaText(period_name)
                    )
                ).height()
            ).width(350)
                .height(150)
                .padding(12)
                .shadow("rgba(0, 0, 0, 0.35) 0px 5px 15px")
                .cornerRadius(10)
        )
    }
    export const PolyvalenceUnitCardWithWorkPlace = (table_name: string, work_place_name: string, department_name: string, period_name: string, item: { title: string, action: Function } | null, report: Function) => {
        return (
            VStack({ alignment: cTop, spacing: 10 })(
                HStack(
                    VStack({ alignment: cLeading })(
                        PedaText("Polivalans Tablosu").fontSize("10px").foregroundColor("gray"),
                        HStack(PedaText(table_name.length > 30 ? table_name.substring(0, 30) + "..." : table_name)).width().height().tooltip(table_name)
                    ),
                    Spacer(),
                    ReactView(
                        <HiOutlineDocumentReport cursor={"pointer"} size={"18px"} onClick={() => report()} style={{ marginRight: "10px" }} />
                    ).tooltip("Yetkinlik Matrisi"),
                    item != null ?
                        ReactView(
                            <HiOutlinePencilAlt cursor={"pointer"} size={"18px"} onClick={() => item.action()} />
                        ).tooltip("Düzenle") : null,
                ).height(),
                HStack({ alignment: cLeading })(
                    VStack({ alignment: cLeading })(
                        PedaText("İşyeri").fontSize("10px").foregroundColor("gray"),
                        PedaText(work_place_name ? work_place_name : "İşyeri Yok")
                    )
                ).height(),
                HStack({ alignment: cLeading })(
                    VStack({ alignment: cLeading })(
                        PedaText("Departman").fontSize("10px").foregroundColor("gray"),
                        PedaText(department_name)
                    )
                ).height(),
                HStack({ alignment: cLeading })(
                    VStack({ alignment: cLeading })(
                        PedaText("Değerlendirme Sıklığı").fontSize("10px").foregroundColor("gray"),
                        PedaText(period_name)
                    )
                ).height()
            ).width(350)
                .height(200)
                .padding(12)
                .shadow("rgba(0, 0, 0, 0.35) 0px 5px 15px")
                .cornerRadius(10)
        )
    }

    export const PolyvalenceUnitCardPosition = (table_name: string, positions: string, period_name: string, item: { title: string, action: Function } | null, report: Function) => {
        return (
            VStack({ alignment: cTop, spacing: 10 })(
                HStack(
                    VStack({ alignment: cLeading })(
                        PedaText("Polivalans Tablosu").fontSize("10px").foregroundColor("gray"),
                        HStack(PedaText(table_name.length > 30 ? table_name.substring(0, 30) + "..." : table_name)).width().height().tooltip(table_name)
                    ),
                    Spacer(),
                    ReactView(
                        <HiOutlineDocumentReport cursor={"pointer"} size={"18px"} onClick={() => report()} style={{ marginRight: "10px" }} />
                    ).tooltip("Yetkinlik Matrisi"),
                    item != null ?
                        ReactView(
                            <HiOutlinePencilAlt cursor={"pointer"} size={"18px"} onClick={() => item.action()} />
                        ).tooltip("Düzenle") : null,
                ).height(),
                HStack({ alignment: cLeading })(
                    VStack({ alignment: cLeading })(
                        PedaText("Pozisyonlar").fontSize("10px").foregroundColor("gray"),
                        HStack(PedaText(positions.length > 30 ? positions.substring(0, 30) + "..." : positions)).width().height().tooltip(positions)
                    )
                ).height(),
                HStack({ alignment: cLeading })(
                    VStack({ alignment: cLeading })(
                        PedaText("Değerlendirme Sıklığı").fontSize("10px").foregroundColor("gray"),
                        PedaText(period_name)
                    )
                ).height()
            ).width(350)
                .height(150)
                .padding(12)
                .shadow("rgba(0, 0, 0, 0.35) 0px 5px 15px")
                .cornerRadius(10)
        )
    }

    export const NewPolyvalenceUnitCard = (link: string) =>
        VStack(
            UIRouteLink(
                link
            )(
                UIButton(
                    Icon("\\e39d").size(18).paddingRight("5px"),
                    PedaText("Yeni Tablo Ekleyin")
                )
                    .padding("10px 15px 10px 10px")
                    .cornerRadius(5)
                    .foregroundColor({ hover: Color.gray400 })
            )
        ).width(350)
            .height(150)
            .transition(".5s")
            .padding(12)
            .background({ hover: "rgba(0,0,0,0.05)" })
            .border("1px dashed gray")
            .cornerRadius(10)
}