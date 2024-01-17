import { Button, TextField, Tooltip } from '@mui/material'
import React from 'react'
import StyledDataGrid from '../../../../components/StyledDataGrid'
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure'
import { GridColDef } from '@mui/x-data-grid'
import { MdDisplaySettings } from 'react-icons/md'

const PositionListView = (
    props: {
        active: boolean,
        setActives: React.Dispatch<React.SetStateAction<boolean>>,
        setDefaultPage: React.Dispatch<React.SetStateAction<string>>,
        positions: IOrganizationStructure.IPositions.IPosition[],
        columns: GridColDef[],
        setFilterKey: React.Dispatch<React.SetStateAction<string>>,
    }
) => {
    const { active, setActives, setDefaultPage, setFilterKey, positions, columns } = props;
    return (
        <div style={{ display: "flex", flexDirection: "column", padding: "5px 0", gap: "5px" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <div style={{ width: "60%" }}>
                    <TextField size='small' label='Pozisyon Arayın' variant='outlined' fullWidth onChange={(e) => setFilterKey(e.target.value)} />
                </div>
                <div style={{ width: "10%" }}>
                    {
                        <Tooltip title={`${active ? "Pasif" : "Aktif"} Pozisyonları Göster`}>
                            <Button variant='contained' fullWidth onClick={() => setActives(!active)} size='small'><MdDisplaySettings size={20} /></Button>
                        </Tooltip>
                    }
                </div>
                <div style={{ width: "30%" }}>
                    <Button variant='contained' fullWidth size='small' onClick={() => setDefaultPage("addPosition")}>Yeni Pozisyon</Button>
                </div>
            </div>
            <div style={{ height: "calc(100vh - 280px)" }}>
                <StyledDataGrid rows={positions.filter(x => x.is_active === active)} columns={columns} />
            </div>
        </div>
    )
}

export default PositionListView