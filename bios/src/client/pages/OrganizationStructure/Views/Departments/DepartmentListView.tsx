import { Button, TextField, Tooltip } from '@mui/material'
import React from 'react'
import StyledDataGrid from '../../../../components/StyledDataGrid'
import { MdDisplaySettings } from 'react-icons/md'
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure'
import { GridColDef } from '@mui/x-data-grid'

const DepartmentListView = (props: {
    setFilterKeyDepartments: React.Dispatch<React.SetStateAction<string>>,
    setDepartmentActives: React.Dispatch<React.SetStateAction<boolean>>,
    departmentActives: boolean,
    addDepartmentPage: () => void,
    filteredDepartments: IOrganizationStructure.IDepartments.IDepartment[],
    departmentColumns: GridColDef[]
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
                        <Tooltip title={`${props.departmentActives ? "Pasif" : "Aktif"} Departmanları Göster`}>
                            <Button variant='contained' fullWidth onClick={() => props.setDepartmentActives(!props.departmentActives)} size='small'><MdDisplaySettings size={20} /></Button>
                        </Tooltip>
                    }
                </div>
                <div style={{ width: "30%" }}>
                    <Button variant='contained' fullWidth onClick={props.addDepartmentPage} size='small'>Yeni Departman</Button>
                </div>
            </div>
            <div style={{ height: "calc(100vh - 280px)" }}>
                <StyledDataGrid
                    rows={props.filteredDepartments}
                    columns={props.departmentColumns}
                />
            </div>
        </div>
    )
}

export default DepartmentListView