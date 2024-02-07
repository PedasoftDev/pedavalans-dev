import {
    cLeading,
    cTop,
    HStack,
    ReactView,
    UIController,
    VStack,
    UIView,
    Spinner,
    UIViewBuilder
} from '@tuval/forms';
import React, { useState, useEffect } from 'react';
import { Button, TextField, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import styled from 'styled-components';
import { MdDisplaySettings } from "react-icons/md";
import { Resources } from '../../../assets/Resources';
import { IOrganizationStructure } from '../../../interfaces/IOrganizationStructure';
import { Views } from '../../../components/Views';
import { AntTab, AntTabs, TabPanel, a11yProps } from '../../../components/Tabs';
import StyledDataGrid from '../../../components/StyledDataGrid';
import OrganizationStructureDepartment from '../../../../server/hooks/organizationStructureDepartment/main';
import { useGetMe } from '@realmocean/sdk';
import AddDepartmentView from '../Views/Departments/AddDepartmentView';
import EditDepartmentView from '../Views/Departments/EditDepartmentView';
import removeDollarProperties from '../../../assets/Functions/removeDollarProperties';
import DepartmentListView from '../Views/Departments/DepartmentListView';
import AddLineView from '../Views/Lines/AddLineView';
import EditLineView from '../Views/Lines/EditLineView';
import OrganizationStructureLine from '../../../../server/hooks/organizationStructureLine/main';
import LineListView from '../Views/Lines/LineListView';
import AddPositionView from '../Views/Positions/AddPositionView';
import EditPositionView from '../Views/Positions/EditPositionView';
import OrganizationStructurePosition from '../../../../server/hooks/organizationStructrePosition/main';
import PositionListView from '../Views/Positions/PositionListView';
import TitleListView from '../Views/Titles/TitleListView';
import OrganizationStructureTitle from '../../../../server/hooks/organizationStructureTitle/main';
import AddTitleView from '../Views/Titles/AddTitleView';
import EditTitleView from '../Views/Titles/EditTitleView';
import AddEmployeeView from '../Views/Employees/AddEmployeeView';
import EditEmployeeView from '../Views/Employees/EditEmployeeView';
import EmployeeListView from '../Views/Employees/EmployeeListView';
import OrganizationStructureEmployee from '../../../../server/hooks/organizationStructureEmployee/main';

const TableClickP = styled.p`
    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`;


export class OrganizationStructureViewController extends UIController {


    public LoadView(): UIView {

        // me
        const { me, isLoading: isLoadingMe } = useGetMe("console");

        // page state
        const [defaultPage, setDefaultPage] = useState("");

        // tab state
        const [value, setValue] = useState(4);
        const handleChange = (event: React.SyntheticEvent, newValue: number) => {
            setValue(newValue);
        };


        // departments
        const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization);
        const [departmentActives, setDepartmentActives] = useState(true);
        const [filterKeyDepartments, setFilterKeyDepartments] = useState("");
        const [selectedDepartment, setSelectedDepartment] = useState();

        const filteredDepartments = !isLoadingDepartments && departments ?
            departments.filter(x =>
                x.name.toLowerCase().indexOf(filterKeyDepartments.toLowerCase()) > -1 ||
                x.record_id.toLowerCase().indexOf(filterKeyDepartments.toLowerCase()) > -1) : [];



        // line state
        const { lines, isLoadingLines } = OrganizationStructureLine.GetList(me?.prefs?.organization);
        const [lineActives, setLineActives] = useState(true);
        const [filterKeyLines, setFilterKeyLines] = useState("");
        const [selectedLine, setSelectedLine] = useState();

        const filteredLines = !isLoadingLines && lines ?
            lines.filter(x => x.is_active === lineActives &&
                x.name.toLowerCase().indexOf(filterKeyLines.toLowerCase()) > -1 ||
                x.record_id.toLowerCase().indexOf(filterKeyLines.toLowerCase()) > -1) : [];


        // position state
        const { positions, isLoadingPositions } = OrganizationStructurePosition.GetList(me?.prefs?.organization);
        const [selectedPosition, setSelectedPosition] = useState();
        const [positionActives, setPositionActives] = useState(true);
        const [filterKeyPositions, setFilterKeyPositions] = useState("");

        const filteredPositions = !isLoadingPositions && positions ? positions.filter((position: any) => position.name.toLowerCase().indexOf(filterKeyPositions.toLowerCase()) > -1) : [];

        // title states
        const { titles, isLoadingTitles } = OrganizationStructureTitle.GetList(me?.prefs?.organization);
        const [selectedTitle, setSelectedTitle] = useState();
        const [titleActives, setTitleActives] = useState(true);
        const [filterKeyTitles, setFilterKeyTitles] = useState("");

        const filteredTitles = !isLoadingTitles && titles ? titles.filter((title: any) => title.name.toLowerCase().indexOf(filterKeyTitles.toLowerCase()) > -1) : [];

        // employee states
        const { employees, isLoadingEmployees } = OrganizationStructureEmployee.GetList(me?.prefs?.organization);
        const [selectedEmployee, setSelectedEmployee] = useState<IOrganizationStructure.IEmployees.IEmployee>();
        const [employeeActives, setEmployeeActives] = useState<boolean>(true);
        const [filterKeyEmployees, setFilterKeyEmployees] = useState<string>("");

        const filteredEmployees = !isLoadingEmployees && employees ? employees.filter((employee) =>
            employee.first_name.toLowerCase().indexOf(filterKeyEmployees.toLowerCase()) > -1 ||
            employee.last_name.toLowerCase().indexOf(filterKeyEmployees.toLowerCase()) > -1
        ) : [];




        return (
            isLoadingMe || isLoadingDepartments || isLoadingLines || isLoadingPositions || isLoadingTitles || isLoadingEmployees ? VStack(Spinner()) :
                UIViewBuilder(() => {

                    // departments
                    const departmentColumns: GridColDef[] = [
                        {
                            field: 'record_id',
                            headerName: 'Kayıt Kodu',
                            width: 200,
                            flex: 1
                        },
                        {
                            field: 'name',
                            headerName: 'Departman Adı',
                            width: 200,
                            flex: 1
                        },
                        {
                            field: '$createdAt',
                            headerName: 'Oluşturulma Tarihi',
                            width: 200,
                            flex: 1,
                            valueGetter: (params: any) => {
                                return Resources.Functions.formatDate(params.value);
                            }
                        },
                        {
                            field: 'actions',
                            headerName: 'İşlemler',
                            width: 100,
                            renderCell: (params: any) => (
                                <TableClickP onClick={() => handleEditDepartment(removeDollarProperties(params.row))}>
                                    Düzenle
                                </TableClickP>
                            )
                        }
                    ];

                    const handleEditDepartment = (department: any) => {
                        setDefaultPage("editDepartment");
                        setSelectedDepartment(department);
                    }


                    // lines
                    const lineColumns: GridColDef[] = [
                        {
                            field: 'record_id',
                            headerName: 'Kayıt Kodu',
                            width: 200,
                            flex: 1
                        },
                        {
                            field: 'name',
                            headerName: 'Hat Adı',
                            width: 200,
                            flex: 1
                        },
                        {
                            field: 'department_name',
                            headerName: 'Bağlı Olduğu Departman',
                            width: 200,
                            flex: 1
                        },
                        {
                            field: '$createdAt',
                            headerName: 'Oluşturulma Tarihi',
                            width: 200,
                            flex: 1,
                            valueGetter: (params: any) => {
                                return Resources.Functions.formatDate(params.value);
                            }
                        },
                        {
                            field: 'actions',
                            headerName: 'İşlemler',
                            width: 100,
                            renderCell: (params: any) => (
                                <TableClickP onClick={() => handleEditLine(removeDollarProperties(params.row))}>
                                    Düzenle
                                </TableClickP>
                            )
                        }
                    ];

                    const handleEditLine = (line: any) => {
                        setDefaultPage("editLine");
                        setSelectedLine(line);
                    }


                    // positions
                    const positionColumns: GridColDef[] = [
                        {
                            field: 'record_id',
                            headerName: 'Kayıt Kodu',
                            width: 200,
                            flex: 1
                        },
                        {
                            field: 'name',
                            headerName: 'Pozisyon Adı',
                            width: 200,
                            flex: 1
                        },
                        {
                            field: '$createdAt',
                            headerName: 'Oluşturulma Tarihi',
                            width: 200,
                            flex: 1,
                            valueGetter: (params: any) => {
                                return Resources.Functions.formatDate(params.value);
                            }
                        },
                        {
                            field: 'actions',
                            headerName: 'İşlemler',
                            width: 100,
                            renderCell: (params: any) => (
                                <TableClickP onClick={() => handleEditPosition(removeDollarProperties(params.row))}>
                                    Düzenle
                                </TableClickP>
                            )
                        }
                    ];

                    const handleEditPosition = (position: any) => {
                        setDefaultPage("editPosition");
                        setSelectedPosition(position);
                    }


                    // titles
                    const titleColumns: GridColDef[] = [
                        {
                            field: 'record_id',
                            headerName: 'Kayıt Kodu',
                            width: 200,
                            flex: 1
                        },
                        {
                            field: 'name',
                            headerName: 'Ünvan Adı',
                            width: 200,
                            flex: 1
                        },
                        {
                            field: '$createdAt',
                            headerName: 'Oluşturulma Tarihi',
                            width: 200,
                            flex: 1,
                            valueGetter: (params: any) => {
                                return Resources.Functions.formatDate(params.value);
                            }
                        },
                        {
                            field: 'actions',
                            headerName: 'İşlemler',
                            width: 100,
                            renderCell: (params: any) => (
                                <TableClickP onClick={() => handleEditTitle(removeDollarProperties(params.row))}>
                                    Düzenle
                                </TableClickP>
                            )
                        }
                    ];

                    const handleEditTitle = (title: any) => {
                        setDefaultPage("editTitle");
                        setSelectedTitle(title);
                    }

                    // employees
                    const employeeColumns: GridColDef[] = [
                        {
                            field: 'first_name',
                            headerName: 'İsim',
                            width: 200,
                            flex: 1
                        },
                        {
                            field: 'last_name',
                            headerName: 'Soyisim',
                            width: 200,
                            flex: 1
                        },
                        {
                            field: 'title_id',
                            headerName: 'Ünvan',
                            width: 200,
                            flex: 1,
                            valueGetter: (params: any) => {
                                const title = titles.find((title: any) => title.id === params.value);
                                if (title) {
                                    return title.name;
                                } else {
                                    return "";
                                }
                            }
                        },
                        {
                            field: 'position_id',
                            headerName: 'Pozisyon',
                            width: 200,
                            flex: 1,
                            valueGetter: (params: any) => {
                                const position = positions.find((position: any) => position.id === params.value);
                                if (position) {
                                    return position.name;
                                } else {
                                    return "";
                                }
                            }
                        },
                        {
                            field: 'line_id',
                            headerName: 'Hat',
                            width: 200,
                            flex: 1,
                            valueGetter: (params: any) => {
                                const line = lines.find((line: any) => line.id === params.value);
                                if (line) {
                                    return line.name;
                                } else {
                                    return "";
                                }
                            }
                        },
                        {
                            field: 'department_id',
                            headerName: 'Departman',
                            width: 200,
                            flex: 1,
                            valueGetter: (params: any) => {
                                const department = departments.find((department: any) => department.id === params.value);
                                if (department) {
                                    return department.name;
                                } else {
                                    return "";
                                }
                            }
                        },
                        {
                            field: '$createdAt',
                            headerName: 'Oluşturulma Tarihi',
                            width: 200,
                            flex: 1,
                            valueGetter: (params: any) => {
                                return Resources.Functions.formatDate(params.value);
                            }
                        },
                        {
                            field: 'actions',
                            headerName: 'İşlemler',
                            width: 100,
                            renderCell: (params: any) => (
                                <TableClickP onClick={() => handleEditEmployee(removeDollarProperties(params.row))}>
                                    Düzenle
                                </TableClickP>
                            )
                        }
                    ];

                    const handleEditEmployee = (employee: IOrganizationStructure.IEmployees.IEmployee) => {
                        setDefaultPage("editEmployee");
                        setSelectedEmployee(employee);
                    }

                    return (
                        VStack({ alignment: cTop })(
                            HStack({ alignment: cLeading })(
                                Views.Title("Organizasyon Yapısı").paddingTop("20px")
                            ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                            VStack({ alignment: cTop })(
                                ReactView(
                                    <div style={{ width: "100%", height: "100%" }}>
                                        <AntTabs value={value} onChange={handleChange}>
                                            <AntTab label="Personeller" {...a11yProps(0)} />
                                            <AntTab label="Ünvanlar" {...a11yProps(1)} />
                                            <AntTab label="Pozisyonlar" {...a11yProps(2)} />
                                            <AntTab label="Hatlar" {...a11yProps(3)} />
                                            <AntTab label="Departmanlar" {...a11yProps(4)} />
                                        </AntTabs>
                                        <TabPanel value={value} index={0}>
                                            {
                                                defaultPage === "addEmployee" ?
                                                    <AddEmployeeView
                                                        setDefaultPage={setDefaultPage}
                                                        setActive={setEmployeeActives}
                                                        employees={employees.filter((employee) => employee.is_active === true)}
                                                        departments={departments.filter((department) => department.is_active === true)}
                                                        lines={lines.filter((line) => line.is_active === true)}
                                                        positions={positions.filter((position) => position.is_active === true)}
                                                        titles={titles.filter((title) => title.is_active === true)}
                                                    />
                                                    :
                                                    defaultPage === "editEmployee" ?
                                                        <EditEmployeeView
                                                            active={employeeActives}
                                                            setActive={setEmployeeActives}
                                                            selectedEmployee={selectedEmployee}
                                                            setDefaultPage={setDefaultPage}
                                                            employees={employees.filter((employee) => employee.is_active === true)}
                                                            departments={departments.filter((department) => department.is_active === true)}
                                                            lines={lines.filter((line) => line.is_active === true)}
                                                            positions={positions.filter((position) => position.is_active === true)}
                                                            titles={titles.filter((title) => title.is_active === true)}
                                                        />
                                                        :
                                                        <EmployeeListView
                                                            employees={filteredEmployees}
                                                            columns={employeeColumns}
                                                            active={employeeActives}
                                                            setActives={setEmployeeActives}
                                                            setFilterKey={setFilterKeyEmployees}
                                                            setDefaultPage={setDefaultPage}
                                                        />
                                            }
                                        </TabPanel>

                                        <TabPanel value={value} index={1}>
                                            {
                                                defaultPage === "addTitle" ?
                                                    <AddTitleView
                                                        setDefaultPage={setDefaultPage}
                                                        setActive={setTitleActives}
                                                        titles={titles}
                                                    />
                                                    :
                                                    defaultPage === "editTitle" ?
                                                        <EditTitleView
                                                            selectedTitle={selectedTitle}
                                                            setDefaultPage={setDefaultPage}
                                                            setActive={setTitleActives}
                                                            titles={titles}
                                                        />
                                                        :
                                                        <TitleListView
                                                            titles={filteredTitles}
                                                            setDefaultPage={setDefaultPage}
                                                            active={titleActives}
                                                            columns={titleColumns}
                                                            setActive={setTitleActives}
                                                            setFilter={setFilterKeyTitles}
                                                        />
                                            }

                                        </TabPanel>
                                        <TabPanel value={value} index={2}>
                                            {
                                                defaultPage === "addPosition" ?
                                                    <AddPositionView
                                                        setDefaultPage={setDefaultPage}
                                                        positions={positions}
                                                    />
                                                    :
                                                    defaultPage === "editPosition" ?
                                                        <EditPositionView
                                                            selectedPosition={selectedPosition}
                                                            setDefaultPage={setDefaultPage}
                                                            setActive={setPositionActives}
                                                        />
                                                        :
                                                        <PositionListView
                                                            active={positionActives}
                                                            setActives={setPositionActives}
                                                            setDefaultPage={setDefaultPage}
                                                            positions={filteredPositions}
                                                            columns={positionColumns}
                                                            setFilterKey={setFilterKeyPositions}
                                                        />
                                            }
                                        </TabPanel>
                                        <TabPanel value={value} index={3}>
                                            {
                                                defaultPage === "addLine" ?
                                                    <AddLineView
                                                        setDefaultPage={setDefaultPage}
                                                        departments={departments}
                                                        lines={lines}
                                                    />
                                                    :
                                                    defaultPage === "editLine" ?
                                                        <EditLineView
                                                            selectedLine={selectedLine}
                                                            setDefaultPage={setDefaultPage}
                                                            setLinesActives={setLineActives}
                                                            departments={departments}
                                                            lines={lines}
                                                        />
                                                        :
                                                        <LineListView
                                                            lines={filteredLines}
                                                            columns={lineColumns}
                                                            active={lineActives}
                                                            setActives={setLineActives}
                                                            setFilterKey={setFilterKeyLines}
                                                            setDefaultPage={setDefaultPage}
                                                        />
                                            }
                                        </TabPanel>
                                        <TabPanel value={value} index={4}>
                                            {
                                                defaultPage === "addDepartment" ?
                                                    <AddDepartmentView
                                                        setDefaultPage={setDefaultPage}
                                                        departments={departments}
                                                    />
                                                    :
                                                    defaultPage === "editDepartment" ?
                                                        <EditDepartmentView
                                                            selectedDepartment={selectedDepartment}
                                                            setDefaultPage={setDefaultPage}
                                                            departments={departments}
                                                            setDepartmentsActives={setDepartmentActives}
                                                        />
                                                        :
                                                        <DepartmentListView
                                                            departments={filteredDepartments}
                                                            columns={departmentColumns}
                                                            active={departmentActives}
                                                            setActives={setDepartmentActives}
                                                            setFilterKeyDepartments={setFilterKeyDepartments}
                                                            setDefaultPage={setDefaultPage}
                                                        />
                                            }
                                        </TabPanel>
                                    </div>
                                )
                            ).paddingTop("10px")
                        ).padding("0 10px 0 20px")
                    )
                })
        )
    }
}