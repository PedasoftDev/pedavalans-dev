import { int } from '@tuval/core';
import { useState, cLeading, cTop, ForEach, Text, HStack, Spacer, UIImage, UIRouteLink, VStack, ScrollView, ReactViewClass, ReactView } from '@tuval/forms';
import { Resources } from '../assets/Resources';
import React from 'react';
import { RxDashboard, RxTable, RxColorWheel } from "react-icons/rx";
import { IoGitNetworkOutline } from "react-icons/io5";
import { FaLayerGroup, FaSignal } from "react-icons/fa";
import { BsCalendar4Week } from "react-icons/bs";
import { TbHeartRateMonitor, TbReportAnalytics } from "react-icons/tb";
import { BiCalendarPlus, BiCalendarCheck } from "react-icons/bi";
import { VscOrganization } from "react-icons/vsc";
import { MdOutlineSettings } from "react-icons/md";
import { useGetCurrentTeam, useGetMe, useGetOrganization } from '@realmocean/sdk';

const CustomIcons = Resources.Icons
export interface PortalSideMenuParams {
    items: PortalSideMenuItem[];
    selectedAction: (index: int) => void;
    second?: boolean;
}

export interface PortalSideMenuItem {
    title: string;
    iconGray: string;
    iconWhite: string;
    link?: string;
    subMenu?: PortalSideMenuItem[];
    isVisible?: boolean;
}


export interface menuModel {
    title: string;
    icon?: ReactViewClass;
    link?: string;
    subMenu?: any[];
    isVisible: boolean;
}


export const PortalMenu = (selectedMenuTitle: string) => {
    const [machineBased, setMachineBased] = useState(localStorage.getItem("pedavalans_machine_based") == "true" ? true : false)

    const [responsibleUserPolyvalanceTable, setResponsinleUserPolyvalanceTable] = useState(
        (localStorage.getItem("pedavalans_unit_table_authorization") == "true" &&
            localStorage.getItem("polyvalenceUnitTableAuth") == "responsible_user") || localStorage.getItem("pedavalans_unit_table_authorization") == "false" ? true : false
    )

    const { me, isLoading } = useGetMe("console")

    const { organization } = useGetOrganization({ organizationId: me?.prefs?.organization })

    // hiding


    const sideBarMenuModel: menuModel[] = [
        {
            title: "Dashboard",
            link: "/app/dashboard",
            icon: ReactView(
                <RxDashboard size={25} />
            ),
            isVisible: true
        },
        {
            title: "Birim Polivalans",
            link: "/app/polyvalenceUnit/list",
            icon: ReactView(
                <RxTable size={25} />
                //import { FaRegObjectGroup } from "react-icons/fa";
            ),
            isVisible: true
        },
        {
            title: "Makineler",
            link: "/app/machines/list",
            icon: ReactView(
                <RxColorWheel size={25} />
            ),
            isVisible: machineBased
        },
        {
            title: "İzleme",
            link: "/app/lowPerformingStaffController/view",
            icon: ReactView(
                <TbHeartRateMonitor size={25} />
            ),
            isVisible: true
        },
        {
            title: "Yetkinlik Değerlendirmeleri",
            subMenu: [
                {
                    title: "Yetkinlik Hedef Girişi",
                    link: "/app/competencyTargetDataEntry/view",
                    icon: ReactView(
                        <BiCalendarPlus size={25} />
                    ),
                    isVisible: responsibleUserPolyvalanceTable || localStorage.getItem("polyvalenceUnitTableAuth") === "admin"
                },
                {
                    title: "Yetkinlik Gerçekleşme Girişi",
                    link: "/app/competencyDataEntry/view",
                    icon: ReactView(
                        <BiCalendarCheck size={25} />
                    ),
                    isVisible: responsibleUserPolyvalanceTable || localStorage.getItem("polyvalenceUnitTableAuth") === "admin"
                },
                {
                    title: "Çalışan Yetkinlik Karnesi",
                    link: "/app/competencyDataReport/view",
                    icon: ReactView(
                        <TbReportAnalytics size={25} />
                    ),
                    isVisible: true
                }
            ],
            isVisible: true
        },
        {
            title: "Altyapı Tanımları",
            subMenu: [
                {
                    title: "Yetkinlikler",
                    link: "/app/competency/list",
                    icon: ReactView(
                        <IoGitNetworkOutline size={25} />
                    ),
                    isVisible: localStorage.getItem("polyvalenceUnitTableAuth") == "admin" ? true : false
                },
                {
                    title: "Yetkinlik Grupları",
                    link: "/app/competency-group/list",
                    icon: ReactView(
                        <FaLayerGroup size={25} />
                    ),
                    isVisible: localStorage.getItem("polyvalenceUnitTableAuth") == "admin" ? true : false
                },
                {
                    title: "Değerlendirme Dönemi",
                    link: "/app/competency-evaluation-period/list",
                    icon: ReactView(
                        <BsCalendar4Week size={25} />
                    ),
                    isVisible: localStorage.getItem("polyvalenceUnitTableAuth") == "admin" ? true : false
                },
                {
                    title: "Yetkinlik Düzeyleri",
                    link: "/app/competency-grade/list",
                    icon: ReactView(
                        <FaSignal size={25} />
                    ),
                    isVisible: localStorage.getItem("polyvalenceUnitTableAuth") == "admin" ? true : false
                },
                {
                    title: "Organizasyon Yapısı",
                    link: "/app/organizationStructure/view",
                    icon: ReactView(
                        <VscOrganization size={25} />
                    ),
                    isVisible: localStorage.getItem("polyvalenceUnitTableAuth") == "admin" &&
                        localStorage.getItem("/app_based_organization_structure") == "true" ? true : false
                },
                {
                    title: "Parametreler",
                    link: "/app/parameters/view",
                    icon: ReactView(
                        <MdOutlineSettings size={25} />
                    ),
                    isVisible: localStorage.getItem("polyvalenceUnitTableAuth") == "admin" ? true : false
                }
            ],
            isVisible: localStorage.getItem("polyvalenceUnitTableAuth") == "admin" ? true : false
        }
    ]

    return (
        isLoading ? VStack() :
            VStack({ alignment: cTop })(
                HStack({ spacing: 15 })(
                    UIImage(CustomIcons.customLogo).width(60),
                    VStack({ alignment: cLeading })(
                        Text("Pedavalans").fontFamily("Poppins")
                            .foregroundColor(Resources.Colors.themeColor)
                            .fontWeight("400").fontSize("30px"),
                        Text(organization?.name).fontFamily("Poppins").fontSize("13px").fontWeight("500").foregroundColor(Resources.Colors.themeColor)
                    ).height().width()
                ).height().width().padding(20),
                ScrollView({ axes: "cVertical" })(
                    VStack({ alignment: cTop })(
                        ...ForEach(sideBarMenuModel)((menuItem, index) =>
                            menuItem.subMenu == null ?
                                menuItem.isVisible &&
                                UIRouteLink(menuItem.link)(
                                    HStack({ alignment: cLeading })(
                                        menuItem.icon,
                                        Text(menuItem.title).paddingLeft(".5rem")
                                    ).height("45px").width("256px").cornerRadius(".5rem").paddingLeft("1rem")
                                        .transition("all .2s ease-in-out")
                                        .background({ default: menuItem.title == selectedMenuTitle ? Resources.Colors.themeColor : "", hover: menuItem.title === selectedMenuTitle ? "" : Resources.Colors.themeColor })
                                        .foregroundColor({ default: menuItem.title == selectedMenuTitle ? "white" : Resources.Colors.themeColor, hover: "white" })
                                        .shadow(menuItem.title == selectedMenuTitle ? `0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 4px 6px -1px ${Resources.Colors.themeColor}, 0 2px 4px -2px ${Resources.Colors.themeColor}` : "")
                                ).paddingTop("0.5rem")
                                :
                                menuItem.isVisible &&
                                VStack({ alignment: cTop })(
                                    HStack({ alignment: cLeading })(
                                        Text(menuItem.title).textTransform("uppercase").fontWeight("900").fontSize("13px").foregroundColor("#2e5bc7")
                                    ).height().paddingLeft("20px"),
                                    VStack(
                                        ...ForEach(menuItem.subMenu)(subItem =>
                                            subItem.isVisible &&
                                            UIRouteLink(subItem.link)(
                                                HStack({ alignment: cLeading })(
                                                    subItem.icon,
                                                    Text(subItem.title).paddingLeft(".5rem")
                                                ).height("45px").width("256px").cornerRadius(".5rem").paddingLeft("1rem")
                                                    .transition("all .2s ease-in-out")
                                                    .background({ default: subItem.title == selectedMenuTitle ? Resources.Colors.themeColor : "", hover: subItem.title === selectedMenuTitle ? "" : Resources.Colors.themeColor })
                                                    .foregroundColor({ default: subItem.title == selectedMenuTitle ? "white" : Resources.Colors.themeColor, hover: "white" })
                                                    .shadow(subItem.title == selectedMenuTitle ? `0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 4px 6px -1px ${Resources.Colors.themeColor}, 0 2px 4px -2px ${Resources.Colors.themeColor}` : "")
                                            ).paddingTop("0.5rem")
                                        )
                                    )
                                ).paddingTop("1.5rem").height()
                        )
                    ).paddingTop("10px").width("100%"),
                ),
                HStack({ alignment: cLeading })(Text("v1.1.0").fontSize("10px").paddingLeft("10px").paddingBottom("5px")).height()
            ).shadow("5px 0 10px -5px #3BA2EE").width(290).minWidth('290px').maxWidth('290px')
    )
}