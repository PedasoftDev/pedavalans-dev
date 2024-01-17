import { Button, TextField, Tooltip } from '@mui/material'
import React from 'react'
import StyledDataGrid from '../../../../components/StyledDataGrid'
import { MdDisplaySettings } from 'react-icons/md'
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure'
import { GridColDef } from '@mui/x-data-grid'

const DepartmentListView = (props: {
    setFilterKeyDepartments: React.Dispatch<React.SetStateAction<string>>,
    setActives: React.Dispatch<React.SetStateAction<boolean>>,
    active: boolean,
    setDefaultPage: React.Dispatch<React.SetStateAction<string>>,
    departments: IOrganizationStructure.IDepartments.IDepartment[],
    columns: GridColDef[]
}) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", padding: "5px 0", gap: "5px" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <div style={{ width: "60%" }}>
                    <TextField
                        size='small'
                        label='Departman Arayın'
                        variant='outlined'
                        fullWidth
                        onChange={(e) => props.setFilterKeyDepartments(e.target.value)}
                    />
                </div>
                <div style={{ width: "10%" }}>
                    {
                        <Tooltip title={`${props.active ? "Pasif" : "Aktif"} Departmanları Göster`}>
                            <Button variant='contained' fullWidth onClick={() => props.setActives(!props.active)} size='small'><MdDisplaySettings size={20} /></Button>
                        </Tooltip>
                    }
                </div>
                <div style={{ width: "30%" }}>
                    <Button variant='contained' fullWidth onClick={() => props.setDefaultPage("addDepartment")} size='small'>Yeni Departman</Button>
                </div>
            </div>
            <div style={{ height: "calc(100vh - 280px)" }}>
                <StyledDataGrid
                    rows={props.departments.filter((department) => department.is_active === props.active)}
                    columns={props.columns}
                />
            </div>
        </div>
    )
}

export default DepartmentListView