import { useState, cLeading, cTop, ForEach, Text, HStack, UIImage, UIRouteLink, VStack, ScrollView, ReactViewClass, ReactView, UIViewBuilder, Icon, cCenter, Spacer, useNavigate } from '@tuval/forms';
import { Resources } from '../assets/Resources';
import React, { useEffect } from 'react';
import { RxColorWheel, RxDashboard, RxTable } from "react-icons/rx";
import { IoGitNetworkOutline } from "react-icons/io5";
import { FaLayerGroup, FaSignal } from "react-icons/fa";
import { BsCalendar4Week } from "react-icons/bs";
import { TbHeartRateMonitor, TbReportAnalytics } from "react-icons/tb";
import { BiCalendarPlus, BiCalendarCheck } from "react-icons/bi";
import { VscOrganization } from "react-icons/vsc";
import { useGetMe, useGetOrganization } from '@realmocean/sdk';
import { TiFlowParallel } from "react-icons/ti";
import { MdOutlineManageAccounts, MdOutlineLibraryBooks } from "react-icons/md";
import Database from '../../server/core/Database';

const CustomIcons = Resources.Icons
export interface PortalSideMenuParams {
    items: PortalSideMenuItem[];
    selectedAction: (index: number) => void;
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


    const { me, isLoading } = useGetMe("console")

    const navigate = useNavigate()

    const [tableAuth, setTableAuth] = useState(null)
    const [isAdmin, setIsAdmin] = useState(null)
    const [isResponsible, setIsResponsible] = useState(null)
    const [isViewer, setIsViewer] = useState(null)
    const [machineBased, setMachineBased] = useState(null)


    const logout = () => {
        navigate('/logout')
    }


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
            link: "/app/polyvalence-unit/list",
            icon: ReactView(
                <RxTable size={25} />
            ),
            isVisible: true
        },
        {
            title: "Makineler",
            link: "/app/machine/list",
            icon: ReactView(
                <RxColorWheel size={25} />
            ),
            isVisible: machineBased
        },
        {
            title: "Yetkinlik Durum İzleme Raporu",
            link: "/app/competency-status-report/view",
            icon: ReactView(
                <TbHeartRateMonitor size={25} />
            ),
            isVisible: true
        },
        {
            title: "Eğitimler",
            link: "/app/education/list",
            icon: ReactView(
                <MdOutlineLibraryBooks size={25} />
            ),
            isVisible: true
        },
        {
            title: "Yetkinlik Değerlendirmeleri",
            subMenu: [
                {
                    title: "Yetkinlik Hedef Girişi",
                    link: "/app/competency-target-data-entry/view",
                    icon: ReactView(
                        <BiCalendarPlus size={25} />
                    ),
                    isVisible: tableAuth ? isResponsible || isAdmin : true
                },
                {
                    title: "Yetkinlik Değerlendirme Girişi",
                    link: "/app/competency-real-data-entry/view",
                    icon: ReactView(
                        <BiCalendarCheck size={25} />
                    ),
                    isVisible: tableAuth ? isResponsible || isAdmin : true
                },
                {
                    title: "Çalışan Yetkinlik Karnesi",
                    link: "/app/competency-report-data/view",
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
                    isVisible: tableAuth ? isAdmin : true
                },
                {
                    title: "Yetkinlik Grupları",
                    link: "/app/competency-group/list",
                    icon: ReactView(
                        <FaLayerGroup size={25} />
                    ),
                    isVisible: tableAuth ? isAdmin : true
                },
                {
                    title: "Değerlendirme Dönemi",
                    link: "/app/competency-evaluation-period/list",
                    icon: ReactView(
                        <BsCalendar4Week size={25} />
                    ),
                    isVisible: tableAuth ? isAdmin : true
                },
                {
                    title: "Yetkinlik Düzeyleri",
                    link: "/app/competency-grade/list",
                    icon: ReactView(
                        <FaSignal size={25} />
                    ),
                    isVisible: tableAuth ? isAdmin : true
                },
                {
                    title: "Organizasyon Yapısı",
                    link: "/app/organization-structure/view",
                    icon: ReactView(
                        <VscOrganization size={25} />
                    ),
                    isVisible: tableAuth ? isAdmin : true
                },
                {
                    title: "Parametreler",
                    link: "/app/parameters",
                    icon: ReactView(
                        <TiFlowParallel size={25} />
                    ),
                    isVisible: tableAuth ? isAdmin : true
                },
                {
                    title: "Hesap Yönetimi",
                    link: "/app/account-management/view",
                    icon: ReactView(
                        <MdOutlineManageAccounts size={25} />
                    ),
                    isVisible: true
                }
            ],
            isVisible: true
        }
    ];

    useEffect(() => {
        setMachineBased(localStorage.getItem("machine_based_polyvalence_management") === "true" ? true : false)
        setIsAdmin(localStorage.getItem("isAdmin") === "true" ? true : false)
        setIsResponsible(localStorage.getItem("isResponsible") === "true" ? true : false)
        setIsViewer(localStorage.getItem("isViewer") === "true" ? true : false)
        setTableAuth(localStorage.getItem("tableAuth") === "true" ? true : false)
    }, [])


    return (
        isLoading || !me || tableAuth == null ? VStack().shadow("5px 0 10px -5px #3BA2EE").width(290).minWidth('290px').maxWidth('290px') :
            VStack({ alignment: cTop })(
                HStack({ spacing: 15 })(
                    UIImage(CustomIcons.customLogo).width(60),
                    VStack({ alignment: cLeading })(
                        Text("Pedavalans").fontFamily("Poppins")
                            .foregroundColor(Resources.Colors.themeColor)
                            .fontWeight("400").fontSize("30px"),
                        UIViewBuilder(() => {
                            const { organization } = useGetOrganization({ organizationId: me?.prefs?.organization })
                            return Text(organization?.name).fontFamily("Poppins").fontSize("13px").fontWeight("500").foregroundColor(Resources.Colors.themeColor)
                        }),
                        Text(me?.name).fontFamily("Poppins").fontSize("11px").fontWeight("400").foregroundColor(Resources.Colors.themeColor)
                    ).height().width()
                ).height().width().padding("20px 20px 10px 20px"),
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
                    ).paddingTop("10px").width("100%")
                ),
                HStack({ alignment: cCenter })(
                    VStack(Icon("\\e9ba")).fontSize("20px").transition("all .2s ease-in-out").cornerRadius("3px")
                        .cursor("pointer").padding("5px").background({ hover: "lightgray" }).onClick(() => logout()).height().width(),
                    Spacer(),
                    Text("v" + Database.version).fontSize("10px")
                ).height().padding("10px")
            ).shadow("5px 0 10px -5px #3BA2EE").width(290).minWidth('290px').maxWidth('290px')
    )
}