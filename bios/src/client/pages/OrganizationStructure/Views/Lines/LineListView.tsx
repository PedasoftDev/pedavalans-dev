import { Button, TextField, Tooltip } from '@mui/material'
import React from 'react'
import StyledDataGrid from '../../../../components/StyledDataGrid'
import { MdDisplaySettings } from 'react-icons/md'
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure'
import { GridColDef } from '@mui/x-data-grid'
import { GridContainer } from './Views/View'

const LineListView = (
    props: {
        lines: IOrganizationStructure.ILines.ILine[],
        columns: GridColDef[],
        setDefaultPage: React.Dispatch<React.SetStateAction<string>>,
        active: boolean,
        setActives: React.Dispatch<React.SetStateAction<boolean>>,
        setFilterKey: React.Dispatch<React.SetStateAction<string>>
    }
) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", padding: "5px 0", gap: "5px" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <div style={{ width: "60%" }}>
                    <TextField size='small' label='Hat Arayın' variant='outlined' fullWidth onChange={(e) => props.setFilterKey(e.target.value)} />
                </div>
                <div style={{ width: "10%" }}>
                    <Tooltip title={`${props.active ? "Pasif" : "Aktif"} Hatları Göster`}>
                        <Button variant='contained' fullWidth onClick={() => props.setActives(!props.active)} size='small'><MdDisplaySettings size={20} /></Button>
                    </Tooltip>
                </div>
                <div style={{ width: "30%" }}>
                    <Button variant='contained' fullWidth size='small' onClick={() => props.setDefaultPage("addLine")}>Hat Ekle</Button>
                </div>
            </div>
            <GridContainer>
                <StyledDataGrid rows={props.lines.filter(x => x.is_active === props.active)} columns={props.columns} />
            </GridContainer>
        </div>
    )
}

export default LineListView