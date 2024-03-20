import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material'
import { GridColDef, trTR } from '@mui/x-data-grid'
import React, { Fragment, useRef } from 'react'
import { MdDisplaySettings } from 'react-icons/md'
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure'
import StyledDataGrid from '../../../../components/StyledDataGrid'
import { SiMicrosoftexcel } from 'react-icons/si'
import { employeeTransferTemplateByExcel } from '../../../../assets/Functions/employeeTransferTemplateByExcel'
import { Resources } from '../../../../assets/Resources'
import excelToJson from '../../../../assets/Functions/excelToJson'
import { Spinner, VStack, nanoid } from '@tuval/forms';
import { Services, useGetMe } from '@realmocean/sdk'
import AppInfo from '../../../../../AppInfo'
import { Umay } from '@tuval/core'
import Collections from '../../../../../server/core/Collections'
import { Toast } from '../../../../components/Toast'
import Swal from 'sweetalert2'

interface IEmployeeImportFromExcel {
    sicil_no: string;
    adi: string;
    soyadi: string;
    departman_kodu: string;
    departman_adi: string;
    unvan_kodu: string;
    unvan_tanimi: string;
    pozisyon_kodu: string;
    pozisyon_tanimi: string;
    hat_kodu: string | null;
    hat_adi: string | null;
}

const EmployeeListView = (
    props: {
        me: any,
        employees: IOrganizationStructure.IEmployees.IEmployee[],
        columns: GridColDef[],
        active: boolean,
        setActives: React.Dispatch<React.SetStateAction<boolean>>,
        setDefaultPage: (page: string) => void,
        setFilterKey: React.Dispatch<React.SetStateAction<string>>
    }
) => {

    // excel import -- start
    const [open, setOpen] = React.useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [excelData, setExcelData] = React.useState<IEmployeeImportFromExcel[]>([]);
    const [excelColumns, setExcelColumns] = React.useState<GridColDef[]>([]);
    const [isTransfer, setIsTransfer] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setExcelColumns([]);
        setExcelData([]);
    };


    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Dosya seçme penceresini aç
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file);
        if (file) {
            excelToJson(file, (data) => {
                // first row is columns
                const columns = data?.shift() as string[];
                const excelColumns: GridColDef[] = columns.map((column, index) => {
                    return {
                        field: column.toLowerCase(),
                        headerName: column.replace(/_/g, " "),
                        flex: 1,
                        minWidth: 150,
                        type: "string"
                    }
                });
                setExcelColumns(excelColumns);

                // data without first row
                let excelData = []
                data?.map((row, index) => {
                    let appendRow: any = {}
                    row.forEach((cell: string, cellIndex: number) => {
                        appendRow[columns[cellIndex].toLowerCase()] = String(cell);
                    });
                    excelData.push({ id: index, ...appendRow });
                });

                setExcelData(excelData);

                handleClickOpen();
            });
        }
    };

    const handleTransfer = async () => {
        setIsTransfer(true);
        // transfer
        try {
            let departments: { code: string, name: string }[] = [];
            let titles: { code: string, name: string }[] = [];
            let positions: { code: string, name: string }[] = [];
            let lines: { code: string, name: string, department_code: string }[] = [];

            excelData.map((row, index) => {
                if (departments.findIndex(x => x.code === row.departman_kodu) === -1) {
                    departments.push({ code: row.departman_kodu, name: row.departman_adi });
                }
                if (titles.findIndex(x => x.code === row.unvan_kodu) === -1) {
                    titles.push({ code: row.unvan_kodu, name: row.unvan_tanimi });
                }
                if (positions.findIndex(x => x.code === row.pozisyon_kodu) === -1) {
                    positions.push({ code: row.pozisyon_kodu, name: row.pozisyon_tanimi });
                }
                if (row.hat_kodu && lines.findIndex(x => x.code === row.hat_kodu) === -1) {
                    lines.push({ code: row.hat_kodu, name: row.hat_adi, department_code: row.departman_kodu });
                }
            })

            // add departments
            const tasks = new Umay();
            const failedDepartments: string[] = [];
            const createdDepartments: IOrganizationStructure.IDepartments.ICreateDepartment[] = [];
            tasks.Task(async () => {
                for (let department of departments) {
                    try {
                        const data: IOrganizationStructure.IDepartments.ICreateDepartment = {
                            id: nanoid(),
                            name: department.name,
                            record_id: department.code,
                            tenant_id: props.me?.prefs?.organization,
                            realm_id: props.me?.prefs?.organization
                        }
                        await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureDepartment, data.id, data);
                        createdDepartments.push(data);
                    }
                    catch (error) {
                        failedDepartments.push(department.code);
                    }
                }
            });
            tasks.Wait(1);
            const failedTitles: string[] = [];
            const createdTitles: IOrganizationStructure.ITitles.ICreateTitle[] = [];
            tasks.Task(async () => {
                for (let title of titles) {
                    try {
                        const data: IOrganizationStructure.ITitles.ICreateTitle = {
                            id: nanoid(),
                            name: title.name,
                            record_id: title.code,
                            tenant_id: props.me?.prefs?.organization,
                            realm_id: props.me?.prefs?.organization
                        }
                        await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureTitle, data.id, data).then(() => {
                            createdTitles.push(data);
                        })
                    }
                    catch (error) {
                        failedTitles.push(title.code);
                    }
                }
            })
            tasks.Wait(1);
            const failedPositions: string[] = [];
            const createdPositions: IOrganizationStructure.IPositions.ICreatePosition[] = [];
            tasks.Task(async () => {
                for (let position of positions) {
                    try {
                        const data: IOrganizationStructure.IPositions.ICreatePosition = {
                            id: nanoid(),
                            name: position.name,
                            record_id: position.code,
                            tenant_id: props.me?.prefs?.organization,
                            realm_id: props.me?.prefs?.organization
                        }
                        await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructurePosition, data.id, data).then(() => {
                            createdPositions.push(data);
                        });
                    }
                    catch (error) {
                        failedPositions.push(position.code);
                    }
                }
            })
            tasks.Wait(1);
            const failedLines: string[] = [];
            const createdLines: IOrganizationStructure.ILines.ICreateLine[] = [];
            tasks.Task(async () => {
                for (let line of lines) {
                    try {
                        const data: IOrganizationStructure.ILines.ICreateLine = {
                            id: nanoid(),
                            name: line.name,
                            record_id: line.code,
                            department_id: createdDepartments.find(x => x.record_id === line.department_code)?.id,
                            department_name: createdDepartments.find(x => x.record_id === line.department_code)?.name,
                            tenant_id: props.me?.prefs?.organization,
                            realm_id: props.me?.prefs?.organization
                        }
                        await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureLine, data.id, data).then(() => {
                            createdLines.push(data);
                        });
                    }
                    catch (error) {
                        failedLines.push(line.code);
                    }
                }
            })
            tasks.Wait(1);

            tasks.Task(async () => {
                for (let failedDepartment of failedDepartments) {
                    try {
                        const data: IOrganizationStructure.IDepartments.ICreateDepartment = {
                            id: nanoid(),
                            name: departments.find(x => x.code === failedDepartment)?.name,
                            record_id: failedDepartment,
                            tenant_id: props.me?.prefs?.organization,
                            realm_id: props.me?.prefs?.organization
                        }
                        await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureDepartment, data.id, data).then(() => {
                            createdDepartments.push(data);
                        })
                    }
                    catch (error) {
                        console.log("Departman eklenemedi: " + failedDepartment);
                    }
                }
            });
            tasks.Wait(1);
            tasks.Task(async () => {
                for (let failedTitle of failedTitles) {
                    try {
                        const data: IOrganizationStructure.ITitles.ICreateTitle = {
                            id: nanoid(),
                            name: titles.find(x => x.code === failedTitle)?.name,
                            record_id: failedTitle,
                            tenant_id: props.me?.prefs?.organization,
                            realm_id: props.me?.prefs?.organization
                        }
                        await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureTitle, data.id, data).then(() => {
                            createdTitles.push(data);
                        });
                    }
                    catch (error) {
                        console.log("Ünvan eklenemedi: " + failedTitle);
                    }
                }
            });
            tasks.Wait(1);
            tasks.Task(async () => {
                for (let failedPosition of failedPositions) {
                    try {
                        const data: IOrganizationStructure.IPositions.ICreatePosition = {
                            id: nanoid(),
                            name: positions.find(x => x.code === failedPosition)?.name,
                            record_id: failedPosition,
                            tenant_id: props.me?.prefs?.organization,
                            realm_id: props.me?.prefs?.organization
                        }
                        await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructurePosition, data.id, data).then(() => {
                            createdPositions.push(data);
                        });
                    }
                    catch (error) {
                        console.log("Pozisyon eklenemedi: " + failedPosition);
                    }
                }
            });
            tasks.Wait(1);
            tasks.Task(async () => {
                for (let failedLine of failedLines) {
                    try {
                        const data: IOrganizationStructure.ILines.ICreateLine = {
                            id: nanoid(),
                            name: lines.find(x => x.code === failedLine)?.name,
                            record_id: failedLine,
                            department_id: createdDepartments.find(x => x.record_id === lines.find(x => x.code === failedLine)?.department_code)?.id,
                            department_name: createdDepartments.find(x => x.record_id === lines.find(x => x.code === failedLine)?.department_code)?.name,
                            tenant_id: props.me?.prefs?.organization,
                            realm_id: props.me?.prefs?.organization
                        }
                        await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureLine, data.id, data).then(() => {
                            createdLines.push(data);
                        });
                    }
                    catch (error) {
                        console.log("Hat eklenemedi: " + failedLine);
                    }
                }
            });
            tasks.Wait(1);

            const failedEmployees: string[] = [];
            tasks.Task(async () => {
                for (let employee of excelData) {
                    try {
                        const data: IOrganizationStructure.IEmployees.ICreateEmployee = {
                            id: employee.sicil_no,
                            first_name: employee.adi,
                            last_name: employee.soyadi,
                            department_id: createdDepartments.find(x => x.record_id === employee.departman_kodu)?.id || null,
                            title_id: createdTitles.find(x => x.record_id === employee.unvan_kodu)?.id || null,
                            position_id: createdPositions.find(x => x.record_id === employee.pozisyon_kodu)?.id || null,
                            line_id: createdLines.find(x => x.record_id === employee.hat_kodu)?.id || null,
                            manager_id: null,
                            realm_id: props.me?.prefs?.organization,
                            tenant_id: props.me?.prefs?.organization
                        }
                        await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureEmployee, nanoid(), data);
                    } catch (error) {
                        failedEmployees.push(employee.sicil_no);
                    }
                }
            })
            tasks.Wait(1);
            tasks.Task(async () => {
                for (let failedEmployee of failedEmployees) {
                    try {
                        const employee = excelData.find(x => x.sicil_no === failedEmployee);
                        const data: IOrganizationStructure.IEmployees.ICreateEmployee = {
                            id: employee.sicil_no,
                            first_name: employee.adi,
                            last_name: employee.soyadi,
                            department_id: createdDepartments.find(x => x.record_id === employee.departman_kodu)?.id || null,
                            title_id: createdTitles.find(x => x.record_id === employee.unvan_kodu)?.id || null,
                            position_id: createdPositions.find(x => x.record_id === employee.pozisyon_kodu)?.id || null,
                            line_id: createdLines.find(x => x.record_id === employee.hat_kodu)?.id || null,
                            manager_id: null,
                            realm_id: props.me?.prefs?.organization,
                            tenant_id: props.me?.prefs?.organization
                        }
                        await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureEmployee, nanoid(), data);
                    } catch (error) {
                        console.log("Çalışan eklenemedi: " + failedEmployee);
                    }
                }
            })
            tasks.Wait(1);
            tasks.Task(async () => {
                Toast.fire({
                    icon: 'success',
                    title: 'Çalışanlar başarıyla aktarıldı.'
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            tasks.Run();
        }
        catch (error: any) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Hata Oluştu',
                text: error.message,
                showCloseButton: true,
                closeButtonAriaLabel: 'Tamam',
            })
        }
    }

    // excel import -- end


    return (
        <div style={{ display: "flex", flexDirection: "column", padding: "8px 0", gap: "5px" }}>
            {/* employee import */}
            <Dialog
                open={open}
                onClose={handleClose}
                fullScreen
            >
                <DialogTitle>Çalışan Aktarımı</DialogTitle>
                <DialogContent>
                    <div style={{
                        height: "calc(100vh - 150px)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <StyledDataGrid rows={excelData} columns={excelColumns} sx={{ width: "100%" }}
                            localeText={trTR.components.MuiDataGrid.defaultProps.localeText} /> {/* excel data */}
                        {isTransfer &&
                            <div>
                                <DialogContentText>Aktarım yapılıyor...</DialogContentText>
                                <Fragment>{VStack(Spinner()).height().render()}</Fragment>
                            </div>
                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    {!isTransfer && <Button onClick={handleClose} color='error' variant='contained'>İptal</Button>}
                    {!isTransfer && <Button variant='contained' color='primary' onClick={handleTransfer}>Aktarımı Başlat</Button>}
                </DialogActions>
            </Dialog>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <div style={{ width: "60%" }}>
                    <TextField size='small' label='Personel Arayın' variant='outlined' fullWidth onChange={(e) => props.setFilterKey(e.target.value)} />
                </div>
                <div style={{ width: "10%" }}>
                    {
                        <Tooltip title={`${props.active ? "Pasif" : "Aktif"} Personelleri Göster`}>
                            <Button variant='contained' fullWidth onClick={() => props.setActives(!props.active)} size='small'><MdDisplaySettings size={20} /></Button>
                        </Tooltip>
                    }
                </div>
                <div style={{ width: "30%", display: "flex", gap: "5px" }}>
                    <Button variant='contained' fullWidth size='small' onClick={() => props.setDefaultPage("addEmployee")}>Yeni Personel</Button>
                    <Tooltip title={`Çalışan Aktarım Şablonunu İndir`}>
                        <Button
                            variant='contained'
                            onClick={() => employeeTransferTemplateByExcel(localStorage.getItem(Resources.ParameterLocalStr.line_based_competency_relationship) == "true" ? true : false)}
                            size='small'><SiMicrosoftexcel size={20} />
                        </Button>
                    </Tooltip>
                    <Tooltip title={`Çalışan Aktarım Şablonunu Yükle`}>
                        <Button
                            variant='outlined'
                            onClick={handleButtonClick}
                            size='small'><SiMicrosoftexcel size={20} /><input
                                type='file'
                                accept='.xlsx, .xls'
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                style={{ display: 'none' }} // Görünmez dosya girişi
                            />
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <div style={{ height: "calc(100vh - 280px)" }}>
                <StyledDataGrid rows={props.employees.filter(x => x.is_active === props.active)} columns={props.columns} />
            </div>
        </div >
    )
}

export default EmployeeListView