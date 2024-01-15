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
import { Resources } from '../../assets/Resources';
import { IOrganizationStructure } from '../../interfaces/IOrganizationStructure';
import { Views } from '../../components/Views';
import { AntTab, AntTabs, TabPanel, a11yProps } from '../../components/Tabs';
import StyledDataGrid from '../../components/StyledDataGrid';
import OrganizationStructureDepartment from '../../../server/hooks/organizationStructureDepartment/main';
import { useGetMe } from '@realmocean/sdk';
import AddDepartmentView from './Views/Departments/AddDepartmentView';
import EditDepartmentView from './Views/Departments/EditDepartmentView';
import removeDollarProperties from '../../assets/Functions/removeDollarProperties';
import DepartmentListView from './Views/Departments/DepartmentListView';
import AddLineView from './Views/Lines/AddLineView';
import EditLineView from './Views/Lines/EditLineView';
import OrganizationStructureLine from '../../../server/hooks/organizationStructureLine/main';

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
        const addDepartmentPage = () => {
            setDefaultPage("addDepartment");
        }

        // tab state
        const [value, setValue] = useState(4);
        const handleChange = (event: React.SyntheticEvent, newValue: number) => {
            setValue(newValue);
        };


        // departments
        const { departments, isLoadingDepartments, totalDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization);
        const [departmentActives, setDepartmentActives] = useState(true);
        const [filterKeyDepartments, setFilterKeyDepartments] = useState("");
        const [selectedDepartment, setSelectedDepartment] = useState();

        const filteredDepartments = !isLoadingDepartments && departments ?
            departments.filter(x => x.is_active === departmentActives &&
                x.name.toLowerCase().indexOf(filterKeyDepartments.toLowerCase()) > -1 ||
                x.record_id.toLowerCase().indexOf(filterKeyDepartments.toLowerCase()) > -1) : [];



        // line state
        const { lines, isLoadingLines, totalLines } = OrganizationStructureLine.GetList(me?.prefs?.organization);
        const [selectedLine, setSelectedLine] = useState();
        const [lineActives, setLineActives] = useState(true);
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

        // const setAllLines = (lines: any) => {
        //     setFilteredLines(lines);
        //     setLines(lines);
        // }

        // const handleFilterLines = (event: React.SyntheticEvent) => {
        //     const filtered = lines.filter((line: any) =>
        //         line.name.toLowerCase().indexOf((event.target as HTMLInputElement).value.toLowerCase()) > -1
        //     );
        //     setFilteredLines(filtered);
        // }

        const handleSetLines = () => {

        }


        // position state
        const [positions, setPositions] = useState([]);
        const [filteredPositions, setFilteredPositions] = useState([]);
        const [selectedPosition, setSelectedPosition] = useState();
        const [positionActives, setPositionActives] = useState(true);
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
                field: 'created_at',
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
                    <TableClickP onClick={() => handleEditPosition(params.row)}>
                        Düzenle
                    </TableClickP>
                )
            }
        ];

        const handleFilterPositions = (event: React.SyntheticEvent) => {
            const filtered = positions.filter((position: any) =>
                position.name.toLowerCase().indexOf((event.target as HTMLInputElement).value.toLowerCase()) > -1
            );
            setFilteredPositions(filtered);
        }

        const handleSetPositions = () => {

        }

        const setAllPositions = (positions: any) => {
            setFilteredPositions(positions);
            setPositions(positions);
        }

        const handleEditPosition = (position: any) => {
            setDefaultPage("editPosition");
            setSelectedPosition(position);
        }


        // title states
        const [titles, setTitles] = useState([]);
        const [filteredTitles, setFilteredTitles] = useState([]);
        const [selectedTitle, setSelectedTitle] = useState();
        const [titleActives, setTitleActives] = useState(true);
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
                field: 'created_at',
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
                    <TableClickP onClick={() => handleEditTitle(params.row)}>
                        Düzenle
                    </TableClickP>
                )
            }
        ];

        const handleFilterTitles = (event: React.SyntheticEvent) => {
            const filtered = titles.filter((title: any) =>
                title.name.toLowerCase().indexOf((event.target as HTMLInputElement).value.toLowerCase()) > -1
            );
            setFilteredTitles(filtered);
        }

        const handleSetTitle = () => {

        }

        const setAllTitles = (titles: any) => {
            setFilteredTitles(titles);
            setTitles(titles);
        }

        const handleEditTitle = (title: any) => {
            setDefaultPage("editTitle");
            setSelectedTitle(title);
        }

        // employee states
        const [employees, setEmployees] = useState<IOrganizationStructure.IEmployees.IEmployee[]>([]);
        const [filteredEmployees, setFilteredEmployees] = useState<IOrganizationStructure.IEmployees.IEmployee[]>([]);
        const [selectedEmployee, setSelectedEmployee] = useState<IOrganizationStructure.IEmployees.IEmployee>();
        const [employeeActives, setEmployeeActives] = useState<boolean>(true);

        const handleFilterEmployees = (event: React.SyntheticEvent) => {
            const filtered = employees.filter((employee) =>
                employee.first_name.toLowerCase().indexOf((event.target as HTMLInputElement).value.toLowerCase()) > -1 ||
                employee.last_name.toLowerCase().indexOf((event.target as HTMLInputElement).value.toLowerCase()) > -1
            );
            setFilteredEmployees(filtered);
        }

        const handleSetEmployees = () => {

        }

        const setAllEmployees = (employees: IOrganizationStructure.IEmployees.IEmployee[]) => {
            setFilteredEmployees(employees);
            setEmployees(employees);
        }

        const handleEditEmployee = (employee: IOrganizationStructure.IEmployees.IEmployee) => {
            setDefaultPage("editEmployee");
            setSelectedEmployee(employee);
        }

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
                field: 'created_at',
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
                    <TableClickP onClick={() => handleEditEmployee(params.row)}>
                        Düzenle
                    </TableClickP>
                )
            }
        ];

        return (
            isLoadingDepartments || isLoadingMe ? VStack(Spinner()) :
                UIViewBuilder(() => {


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
                                <TableClickP onClick={() => handleEditDepartment(params.row)}>
                                    Düzenle
                                </TableClickP>
                            )
                        }
                    ];

                    const handleEditDepartment = (department: any) => {
                        setDefaultPage("editDepartment");
                        setSelectedDepartment(department);
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
                                        {/* <TabPanel value={value} index={0}>
                                        {
        
                                            defaultPage === "addEmployee" ?
                                                <AddEmployeeView
                                                    setDefaultPage={setDefaultPage}
                                                    setEmployees={setAllEmployees}
                                                    departments={departments}
                                                    positions={positions}
                                                    lines={lines}
                                                    titles={titles}
                                                    employees={employees}
                                                />
                                                :
                                                defaultPage === "editEmployee" ?
                                                    <EditEmployeeView
                                                        selectedEmployee={selectedEmployee}
                                                        setDefaultPage={setDefaultPage}
                                                        setEmployees={setAllEmployees}
                                                        setEmployeesActives={setEmployeeActives}
                                                        departments={departments}
                                                        positions={positions}
                                                        lines={lines}
                                                        titles={titles}
                                                        employees={employees}
                                                    />
                                                    :
                                                    <EmployeeListView
                                                        employees={filteredEmployees}
                                                        setDefaultPage={setDefaultPage}
                                                        setEmployees={setAllEmployees}
                                                        employeeActives={employeeActives}
                                                        employeeColumns={employeeColumns}
                                                        handleFilterEmployees={handleFilterEmployees}
                                                        handleSetEmployees={handleSetEmployees}
                                                    />
        
                                        }
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        {
                                            defaultPage === "addTitle" ?
                                                <AddTitleView
                                                    setDefaultPage={setDefaultPage}
                                                    setTitles={setAllTitles}
                                                />
                                                :
                                                defaultPage === "editTitle" ?
                                                    <EditTitleView
                                                        selectedTitle={selectedTitle}
                                                        setDefaultPage={setDefaultPage}
                                                        setTitles={setAllTitles}
                                                        setTitlesActives={setTitleActives}
                                                    />
                                                    :
                                                    <div style={{ display: "flex", flexDirection: "column", padding: "5px 0", gap: "5px" }}>
                                                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                                            <div style={{ width: "60%" }}>
                                                                <TextField size='small' label='Ünvan Arayın' variant='outlined' fullWidth onChange={handleFilterTitles} />
                                                            </div>
                                                            <div style={{ width: "10%" }}>
                                                                {
                                                                    <Tooltip title={`${titleActives ? "Pasif" : "Aktif"} Ünvanları Göster`}>
                                                                        <Button variant='contained' fullWidth onClick={handleSetTitle} size='small'><MdDisplaySettings size={20} /></Button>
                                                                    </Tooltip>
                                                                }
                                                            </div>
                                                            <div style={{ width: "30%" }}>
                                                                <Button variant='contained' fullWidth size='small' onClick={() => setDefaultPage("addTitle")}>Yeni Ünvan</Button>
                                                            </div>
                                                        </div>
                                                        <div style={{ height: "calc(100vh - 280px)" }}>
                                                            <StyledDataGrid rows={filteredTitles} columns={titleColumns} />
                                                        </div>
                                                    </div>
                                        }
        
                                    </TabPanel>
                                    <TabPanel value={value} index={2}>
                                        {
                                            defaultPage === "addPosition" ?
                                                <AddPositionView
                                                    setDefaultPage={setDefaultPage}
                                                    setPositions={setAllPositions}
                                                />
                                                :
                                                defaultPage === "editPosition" ?
                                                    <EditPositionView
                                                        selectedPosition={selectedPosition}
                                                        setDefaultPage={setDefaultPage}
                                                        setPositions={setAllPositions}
                                                        setPositionActives={setPositionActives}
                                                    />
                                                    :
                                                    <div style={{ display: "flex", flexDirection: "column", padding: "5px 0", gap: "5px" }}>
                                                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                                            <div style={{ width: "60%" }}>
                                                                <TextField size='small' label='Pozisyon Arayın' variant='outlined' fullWidth onChange={handleFilterPositions} />
                                                            </div>
                                                            <div style={{ width: "10%" }}>
                                                                {
                                                                    <Tooltip title={`${positionActives ? "Pasif" : "Aktif"} Pozisyonları Göster`}>
                                                                        <Button variant='contained' fullWidth onClick={handleSetPositions} size='small'><MdDisplaySettings size={20} /></Button>
                                                                    </Tooltip>
                                                                }
                                                            </div>
                                                            <div style={{ width: "30%" }}>
                                                                <Button variant='contained' fullWidth size='small' onClick={() => setDefaultPage("addPosition")}>Yeni Pozisyon</Button>
                                                            </div>
                                                        </div>
                                                        <div style={{ height: "calc(100vh - 280px)" }}>
                                                            <StyledDataGrid rows={filteredPositions} columns={positionColumns} />
                                                        </div>
                                                    </div>
                                        }
                                    </TabPanel>*/}
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
                                                        <div style={{ display: "flex", flexDirection: "column", padding: "5px 0", gap: "5px" }}>
                                                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                                                <div style={{ width: "60%" }}>
                                                                    <TextField size='small' label='Hat Arayın' variant='outlined' fullWidth onChange={() => { }} />
                                                                </div>
                                                                <div style={{ width: "10%" }}>
                                                                    {
                                                                        <Tooltip title={`${lineActives ? "Pasif" : "Aktif"} Hatları Göster`}>
                                                                            <Button variant='contained' fullWidth onClick={handleSetLines} size='small'><MdDisplaySettings size={20} /></Button>
                                                                        </Tooltip>
                                                                    }
                                                                </div>
                                                                <div style={{ width: "30%" }}>
                                                                    <Button variant='contained' fullWidth size='small' onClick={() => setDefaultPage("addLine")}>Hat Ekle</Button>
                                                                </div>
                                                            </div>
                                                            <div style={{ height: "calc(100vh - 280px)" }}>
                                                                <StyledDataGrid rows={lines} columns={lineColumns} />
                                                            </div>
                                                        </div>
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
                                                            selectedDepartment={removeDollarProperties(selectedDepartment)}
                                                            setDefaultPage={setDefaultPage}
                                                            departments={departments}
                                                            setDepartmentsActives={setDepartmentActives}
                                                        />
                                                        :
                                                        <DepartmentListView
                                                            setFilterKeyDepartments={setFilterKeyDepartments}
                                                            setDepartmentActives={setDepartmentActives}
                                                            departmentActives={departmentActives}
                                                            addDepartmentPage={addDepartmentPage}
                                                            filteredDepartments={filteredDepartments}
                                                            departmentColumns={departmentColumns}
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