import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import React, { useRef } from 'react'
import { MdDisplaySettings } from 'react-icons/md'
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure'
import StyledDataGrid from '../../../../components/StyledDataGrid'
import { SiMicrosoftexcel } from 'react-icons/si'
import { employeeTransferTemplateByExcel } from '../../../../assets/Functions/employeeTransferTemplateByExcel'
import { Resources } from '../../../../assets/Resources'
import excelToJson from '../../../../assets/Functions/excelToJson'

const EmployeeListView = (
    props: {
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
    const [excelData, setExcelData] = React.useState<any[]>([]);
    const [excelColumns, setExcelColumns] = React.useState<GridColDef[]>([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                        headerName: column,
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
                        appendRow[columns[cellIndex].toLowerCase()] = cell;
                    });
                    excelData.push({ id: index, ...appendRow });
                });

                setExcelData(excelData);

                handleClickOpen();
            });
        }
    };
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
                        height: "calc(100vh - 280px)",
                    }}>
                        <StyledDataGrid rows={excelData} columns={excelColumns} /> {/* excel data */}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
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
        </div>
    )
}

export default EmployeeListView