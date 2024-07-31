import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { GrCertificate, GrUserWorker } from "react-icons/gr";
import {
    useNavigate,
    ReactView,
    VStack,
    UIViewBuilder,
    Text,
} from '@tuval/forms';
import { NavbarDiv, PortalMenuLink } from '../components/Navbar';
import MenuIcon from '@mui/icons-material/Menu';
import { Resources } from '../assets/Resources';
import { RxColorWheel, RxDashboard, RxTable } from 'react-icons/rx';
import { IoGitNetworkOutline } from 'react-icons/io5';
import { FaLayerGroup, FaSignal } from 'react-icons/fa';
import { BsCalendar4Week } from 'react-icons/bs';
import { TbHeartRateMonitor, TbReportAnalytics } from 'react-icons/tb';
import { BiCalendarPlus, BiCalendarCheck } from 'react-icons/bi';
import { VscOrganization } from 'react-icons/vsc';
import { TiFlowParallel } from 'react-icons/ti';
import { MdOutlineManageAccounts, MdOutlineLibraryBooks, MdPendingActions } from 'react-icons/md';
import { GrPlan } from "react-icons/gr";
import { useGetMe, useGetOrganization } from '@realmocean/sdk';
import LogoutIcon from '@mui/icons-material/Logout';

const CustomIcons = Resources.Icons
export interface PortalSideMenuParams {
    items: PortalSideMenuItem[]
    selectedAction: (index: number) => void
    second?: boolean
}

export interface PortalSideMenuItem {
    title: string
    iconGray: string
    iconWhite: string
    link?: string
    subMenu?: PortalSideMenuItem[]
    isVisible?: boolean
}

export interface menuModel {
    title: string
    icon?: ReactElement
    link?: string
    subMenu?: any[]
    isVisible: boolean
}

export const PortalMenu = (selectedMenuTitle: string) => {
    const [open, setOpen] = useState(false)
    const [windowSize, setWindowSize] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const toggleDrawer = () => {
        setOpen(!open)
    }

    const { me, isLoading } = useGetMe('console')

    const navigate = useNavigate()

    const [tableAuth, setTableAuth] = useState<any>(null)
    const [isAdmin, setIsAdmin] = useState<any>(null)
    const [isResponsible, setIsResponsible] = useState<any>(null)
    const [isViewer, setIsViewer] = useState<any>(null)
    const [machineBased, setMachineBased] = useState<any>(null)

    const logout = () => {
        navigate('/logout')
    }

    const sideBarMenuModel: menuModel[] = [
        {
            title: 'Dashboard',
            link: '/app/dashboard',
            icon: <RxDashboard size={25} />,
            isVisible: tableAuth ? isAdmin : true,
        },
        {
            title: 'Polivalans Tabloları',
            link: '/app/polyvalence-unit/list',
            icon: <RxTable size={25} />,
            isVisible: true,
        },
        {
            title: 'Makineler',
            link: '/app/machine/list',
            icon: <RxColorWheel size={25} />,
            isVisible: machineBased,
        },
        {
            title: "Bekleyen Görevler",
            link: "/app/pending-task/list",
            icon: <MdPendingActions size={25} />,
            isVisible: true
        },
        {
            title: 'Yetkinlik Durum İzleme Raporu',
            link: '/app/competency-status-report/view',
            icon: <TbHeartRateMonitor size={25} />,
            isVisible: true,
        },
        {
            title: 'Yetkinlik Değerlendirmeleri',
            subMenu: [
                {
                    title: 'Yetkinlik Hedef Girişi',
                    link: '/app/competency-target-data-entry/view',
                    icon: <BiCalendarPlus size={25} />,
                    isVisible: tableAuth ? isResponsible || isAdmin : true,
                },
                {
                    title: 'Yetkinlik Değerlendirme Girişi',
                    link: '/app/competency-real-data-entry/view',
                    icon: <BiCalendarCheck size={25} />,
                    isVisible: tableAuth ? isResponsible || isAdmin : true,
                },
                {
                    title: 'Çalışan Yetkinlik Karnesi',
                    link: '/app/competency-report-data/view',
                    icon: <TbReportAnalytics size={25} />,
                    isVisible: true,
                },
            ],
            isVisible: true,
        },
        {
            title: 'Eğitim Yönetimi',
            subMenu: [
                {
                    title: 'Eğitim Katalogu',
                    link: '/app/education/list',
                    icon: <MdOutlineLibraryBooks size={25} />,
                    isVisible: true,
                },
                {
                    title: 'Eğitim Planları',
                    link: '/app/education-plan/plans',
                    icon: <GrPlan size={25} />,
                    isVisible: true,
                },
                {
                    title: 'Eğiticiler',
                    link: '/app/trainer/list',
                    icon: <GrUserWorker size={25} />,
                    isVisible: true,
                },
            ],
            isVisible: true,
        },
        {
            title: 'Altyapı Tanımları',
            subMenu: [
                {
                    title: 'Yetkinlikler',
                    link: '/app/competency/list',
                    icon: <IoGitNetworkOutline size={25} />,
                    isVisible: tableAuth ? isAdmin : true,
                },
                {
                    title: 'Yetkinlik Grupları',
                    link: '/app/competency-group/list',
                    icon: <FaLayerGroup size={25} />,
                    isVisible: tableAuth ? isAdmin : true,
                },
                {
                    title: 'Değerlendirme Dönemi',
                    link: '/app/competency-evaluation-period/list',
                    icon: <BsCalendar4Week size={25} />,
                    isVisible: tableAuth ? isAdmin : true,
                },
                {
                    title: 'Yetkinlik Düzeyleri',
                    link: '/app/competency-grade/list',
                    icon: <FaSignal size={25} />,
                    isVisible: tableAuth ? isAdmin : true,
                },
                {
                    title: 'Mesleki Belge ve Sertifikalar',
                    link: '/app/vocational-qualification/list',
                    icon: <GrCertificate size={25} />,
                    isVisible: tableAuth ? isAdmin : true,
                },
                {
                    title: 'Organizasyon Yapısı',
                    link: '/app/organization-structure/employee/list',
                    icon: <VscOrganization size={25} />,
                    isVisible: tableAuth ? isAdmin : true,
                },
                {
                    title: 'Parametreler',
                    link: '/app/parameters',
                    icon: <TiFlowParallel size={25} />,
                    isVisible: tableAuth ? isAdmin : true,
                },
                {
                    title: 'Hesap Yönetimi',
                    link: '/app/account-management/view',
                    icon: <MdOutlineManageAccounts size={25} />,
                    isVisible: true,
                },
            ],
            isVisible: true,
        },
    ]

    useEffect(() => {
        setMachineBased(
            localStorage.getItem('machine_based_polyvalence_management') === 'true'
                ? true
                : false
        )
        setIsAdmin(localStorage.getItem('isAdmin') === 'true' ? true : false)
        setIsResponsible(
            localStorage.getItem('isResponsible') === 'true' ? true : false
        )
        setIsViewer(localStorage.getItem('isViewer') === 'true' ? true : false)
        setTableAuth(localStorage.getItem('tableAuth') === 'true' ? true : false)
    }, [])

    return isLoading || !me || tableAuth == null
        ? VStack()
        : VStack(
            ReactView(
                <div>
                    {windowSize > 1200 ? (
                        <NavbarDiv>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    minWidth: 'fit-content',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    justifyItems: 'center',
                                    alignContent: 'center',
                                    gap: '15px',
                                    padding: '20px 20px 10px 20px',
                                }}
                            >
                                <img
                                    src={CustomIcons.customLogo}
                                    alt="Logo"
                                    style={{ width: '60px', paddingBottom: '15px', cursor: "pointer" }}
                                    onClick={() => navigate("/")}
                                />
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'start',
                                        justifyContent: 'center',
                                        maxWidth: 'fit-content',
                                        height: 'fit-content',
                                    }}
                                >
                                    <span
                                        style={{
                                            fontFamily: 'Poppins',
                                            color: Resources.Colors.themeColor,
                                            fontWeight: '600',
                                            fontSize: '30px',
                                            cursor: "pointer"
                                        }}
                                        onClick={() => navigate("/")}
                                    >
                                        Pedavalans
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: 'Poppins',
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            color: Resources.Colors.themeColor,
                                        }}
                                    >
                                        <Fragment>
                                            {VStack(
                                                UIViewBuilder(() => {
                                                    const { organization } = useGetOrganization({
                                                        organizationId: me?.prefs?.organization,
                                                    })
                                                    return Text(organization?.name)
                                                        .fontFamily('Poppins')
                                                        .fontSize('13px')
                                                        .fontWeight('500')
                                                        .foregroundColor(Resources.Colors.themeColor)
                                                })
                                            )
                                                .width()
                                                .height()
                                                .render()}
                                        </Fragment>
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: 'Poppins',
                                            fontSize: '11px',
                                            fontWeight: '400',
                                            color: Resources.Colors.themeColor,
                                        }}
                                    >
                                        {me?.name}
                                    </span>
                                </div>
                            </div>
                            <div
                                style={{
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'start',
                                    alignItems: 'start',
                                    width: '100%',
                                    height: '100%',
                                    overflowY: 'auto',
                                    overflowX: 'hidden',
                                }}
                            >
                                <div>
                                    <div>
                                        {sideBarMenuModel.map((menuItem, index) =>
                                            menuItem.subMenu == null
                                                ? menuItem.isVisible && (
                                                    <div
                                                        style={{
                                                            padding: '0.5rem 2px 0',
                                                            position: 'relative',
                                                        }}
                                                    >
                                                        <PortalMenuLink
                                                            onClick={() => navigate(menuItem.link)}
                                                            key={index}
                                                            selected={menuItem.title === selectedMenuTitle}
                                                        >
                                                            {menuItem.icon}
                                                            <span style={{ paddingLeft: '.5rem' }}>
                                                                {menuItem.title}
                                                            </span>
                                                        </PortalMenuLink>
                                                    </div>
                                                )
                                                : menuItem.isVisible && (
                                                    <div key={index} style={{ paddingTop: '1.5rem' }}>
                                                        <div
                                                            style={{
                                                                paddingLeft: '20px',
                                                                fontWeight: 900,
                                                                fontSize: '13px',
                                                                color: '#2e5bc7',
                                                            }}
                                                        >
                                                            {menuItem.title.toUpperCase()}
                                                        </div>
                                                        {menuItem.subMenu.map(
                                                            (subItem, subIndex) =>
                                                                subItem.isVisible && (
                                                                    <PortalMenuLink
                                                                        selected={subItem.title === selectedMenuTitle}
                                                                        onClick={() => navigate(subItem.link)}
                                                                        key={subIndex}

                                                                    >
                                                                        {subItem.icon}
                                                                        <span style={{ paddingLeft: '.5rem' }}>
                                                                            {subItem.title}
                                                                        </span>
                                                                    </PortalMenuLink>
                                                                )
                                                        )}
                                                    </div>
                                                )
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    justifyItems: 'center',
                                    padding: '10px',
                                    width: 'calc(100% - 10px)',
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: '20px',
                                        cursor: 'pointer',
                                        padding: '5px',
                                    }}
                                    onClick={logout}
                                >
                                    <LogoutIcon />
                                </div>
                                <div style={{ flexGrow: '1' }}></div>
                                <span style={{ fontFamily: 'Poppins', fontSize: '10px' }}>
                                    {Resources.version}
                                </span>
                            </div>
                        </NavbarDiv>
                    ) : (
                        <div
                            style={{
                                width: '80px',
                                display: 'flex',
                                flexDirection: 'column',
                                boxSizing: 'border-box',
                                position: 'fixed',
                                top: '0px',
                                right: '0px',
                                zIndex: 1101,
                                transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                justifyContent: 'center',
                            }}
                        >
                            <Button onClick={toggleDrawer}>
                                <MenuIcon
                                    sx={{
                                        fontSize: '35px',
                                        color: Resources.Colors.themeColor,
                                    }}
                                />
                            </Button>
                            <Drawer
                                anchor="left"
                                open={open}
                                onClose={toggleDrawer}
                                sx={{ width: '290px' }}
                            >
                                <div
                                    role="presentation"
                                    onClick={toggleDrawer}
                                    onKeyDown={toggleDrawer}
                                >
                                    <NavbarDiv style={{ position: 'relative', padding: '5px' }}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                minWidth: 'fit-content',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                justifyItems: 'center',
                                                alignContent: 'center',
                                                gap: '15px',
                                                padding: '20px 20px 10px 20px',
                                            }}
                                        >
                                            <img
                                                src={CustomIcons.customLogo}
                                                alt="Logo"
                                                style={{ width: '60px', paddingBottom: '15px', cursor: "pointer" }}
                                                onClick={() => navigate("/")}
                                            />
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'start',
                                                    justifyContent: 'center',
                                                    maxWidth: 'fit-content',
                                                    height: 'fit-content',
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontFamily: 'Poppins',
                                                        color: Resources.Colors.themeColor,
                                                        fontWeight: '600',
                                                        fontSize: '30px',
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => navigate("/")}
                                                >
                                                    Pedavalans
                                                </span>
                                                <span
                                                    style={{
                                                        fontFamily: 'Poppins',
                                                        fontSize: '13px',
                                                        fontWeight: '500',
                                                        color: Resources.Colors.themeColor,
                                                    }}
                                                >
                                                    <Fragment>
                                                        {VStack(
                                                            UIViewBuilder(() => {
                                                                const { organization } = useGetOrganization({
                                                                    organizationId: me?.prefs?.organization,
                                                                })
                                                                return Text(organization?.name)
                                                                    .fontFamily('Poppins')
                                                                    .fontSize('13px')
                                                                    .fontWeight('500')
                                                                    .foregroundColor(
                                                                        Resources.Colors.themeColor
                                                                    )
                                                            })
                                                        )
                                                            .width()
                                                            .height()
                                                            .render()}
                                                    </Fragment>
                                                </span>
                                                <span
                                                    style={{
                                                        fontFamily: 'Poppins',
                                                        fontSize: '11px',
                                                        fontWeight: '400',
                                                        color: Resources.Colors.themeColor,
                                                    }}
                                                >
                                                    {me?.name}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                position: 'relative',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'start',
                                                alignItems: 'start',
                                                width: '100%',
                                                height: '100%',
                                            }}
                                        >
                                            {sideBarMenuModel.map((menuItem, index) =>
                                                menuItem.subMenu == null
                                                    ? menuItem.isVisible && (
                                                        <div
                                                            style={{
                                                                paddingTop: '0.5rem',
                                                                position: 'relative',
                                                            }}
                                                        >
                                                            <a
                                                                onClick={() => navigate(menuItem.link)}
                                                                key={index}
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',
                                                                    cursor: 'pointer',
                                                                    height: '45px',
                                                                    width: '254px',
                                                                    borderRadius: '.5rem',
                                                                    paddingLeft: '0.8rem',
                                                                    marginTop: '0.2rem',
                                                                    marginLeft: '0.2rem',
                                                                    textDecoration: 'none',
                                                                    transition: 'all .2s ease-in-out',
                                                                    backgroundColor:
                                                                        menuItem.title === selectedMenuTitle
                                                                            ? Resources.Colors.themeColor
                                                                            : '',
                                                                    color:
                                                                        menuItem.title === selectedMenuTitle
                                                                            ? 'white'
                                                                            : Resources.Colors.themeColor,
                                                                    boxShadow:
                                                                        menuItem.title === selectedMenuTitle
                                                                            ? `0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 4px 6px -1px ${Resources.Colors.themeColor}, 0 2px 4px -2px ${Resources.Colors.themeColor}`
                                                                            : '',
                                                                }}
                                                            >
                                                                {menuItem.icon}
                                                                <span style={{ paddingLeft: '.5rem' }}>
                                                                    {menuItem.title}
                                                                </span>
                                                            </a>
                                                        </div>
                                                    )
                                                    : menuItem.isVisible && (
                                                        <div
                                                            key={index}
                                                            style={{ paddingTop: '1.5rem' }}
                                                        >
                                                            <div
                                                                style={{
                                                                    paddingLeft: '20px',
                                                                    fontWeight: 900,
                                                                    fontSize: '13px',
                                                                    color: '#2e5bc7',
                                                                }}
                                                            >
                                                                {menuItem.title.toUpperCase()}
                                                            </div>
                                                            {menuItem.subMenu.map(
                                                                (subItem, subIndex) =>
                                                                    subItem.isVisible && (
                                                                        <a
                                                                            onClick={() => navigate(subItem.link)}
                                                                            key={subIndex}
                                                                            style={{
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                cursor: 'pointer',
                                                                                height: '45px',
                                                                                width: '254px',
                                                                                borderRadius: '.5rem',
                                                                                paddingLeft: '0.8rem',
                                                                                marginTop: '0.2rem',
                                                                                marginLeft: '0.2rem',
                                                                                textDecoration: 'none',
                                                                                transition: 'all .2s ease-in-out',
                                                                                backgroundColor:
                                                                                    subItem.title ===
                                                                                        selectedMenuTitle
                                                                                        ? Resources.Colors.themeColor
                                                                                        : '',
                                                                                color:
                                                                                    subItem.title ===
                                                                                        selectedMenuTitle
                                                                                        ? 'white'
                                                                                        : Resources.Colors.themeColor,
                                                                                boxShadow:
                                                                                    subItem.title ===
                                                                                        selectedMenuTitle
                                                                                        ? `0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 4px 6px -1px ${Resources.Colors.themeColor}, 0 2px 4px -2px ${Resources.Colors.themeColor}`
                                                                                        : '',
                                                                            }}
                                                                        >
                                                                            {subItem.icon}
                                                                            <span
                                                                                style={{ paddingLeft: '.5rem' }}
                                                                            >
                                                                                {subItem.title}
                                                                            </span>
                                                                        </a>
                                                                    )
                                                            )}
                                                        </div>
                                                    )
                                            )}
                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                justifyItems: 'center',
                                                padding: '10px',
                                                width: 'calc(100% - 10px)',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontSize: '20px',
                                                    cursor: 'pointer',
                                                    padding: '5px',
                                                }}
                                                onClick={logout}
                                            >
                                                <LogoutIcon />
                                            </div>
                                            <div style={{ flexGrow: '1' }}></div>
                                            <span
                                                style={{ fontFamily: 'Poppins', fontSize: '10px' }}
                                            >
                                                {Resources.version}
                                            </span>
                                        </div>
                                    </NavbarDiv>
                                </div>
                            </Drawer>
                        </div>
                    )}
                </div>
            )
        ).width(windowSize > 1200 ? '370px' : '0')
}
