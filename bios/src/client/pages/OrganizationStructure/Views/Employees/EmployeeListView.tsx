import { Button, TextField, Tooltip } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import React from 'react'
import { MdDisplaySettings } from 'react-icons/md'
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure'
import StyledDataGrid from '../../../../components/StyledDataGrid'

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
    return (
        <div style={{ display: "flex", flexDirection: "column", padding: "8px 0", gap: "5px" }}>
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
                <div style={{ width: "30%" }}>
                    <Button variant='contained' fullWidth size='small' onClick={() => props.setDefaultPage("addEmployee")}>Yeni Personel</Button>
                </div>
            </div>
            <div style={{ height: "calc(100vh - 280px)" }}>
                <StyledDataGrid rows={props.employees.filter(x => x.is_active === props.active)} columns={props.columns} />
            </div>
        </div>
    )
}

export default EmployeeListView