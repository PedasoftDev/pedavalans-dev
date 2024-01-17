import { Button, TextField, Tooltip } from '@mui/material'
import React from 'react'
import StyledDataGrid from '../../../../components/StyledDataGrid'
import { MdDisplaySettings } from 'react-icons/md'
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure'
import { GridColDef } from '@mui/x-data-grid'

const TitleListView = (
  props: {
    setFilter: React.Dispatch<React.SetStateAction<string>>,
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
    setDefaultPage: React.Dispatch<React.SetStateAction<string>>,
    titles: IOrganizationStructure.ITitles.ITitle[],
    columns: GridColDef[]
  }
) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "5px 0", gap: "5px" }}>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <div style={{ width: "60%" }}>
          <TextField size='small' label='Ünvan Arayın' variant='outlined' fullWidth onChange={(e) => props.setFilter(e.target.value)} />
        </div>
        <div style={{ width: "10%" }}>
          {
            <Tooltip title={`${props.active ? "Pasif" : "Aktif"} Ünvanları Göster`}>
              <Button variant='contained' fullWidth onClick={() => props.setActive(!props.active)} size='small'><MdDisplaySettings size={20} /></Button>
            </Tooltip>
          }
        </div>
        <div style={{ width: "30%" }}>
          <Button variant='contained' fullWidth size='small' onClick={() => props.setDefaultPage("addTitle")}>Yeni Ünvan</Button>
        </div>
      </div>
      <div style={{ height: "calc(100vh - 280px)" }}>
        <StyledDataGrid rows={props.titles.filter(x => x.is_active === props.active)} columns={props.columns} />
      </div>
    </div>
  )
}

export default TitleListView