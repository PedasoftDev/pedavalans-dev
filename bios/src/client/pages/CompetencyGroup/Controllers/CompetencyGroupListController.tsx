import { HStack, ReactView, Spinner, UIController, UIView, UIViewBuilder, VStack, cLeading, cTop, cTopLeading, useNavigate } from '@tuval/forms';
import React, { useState, useEffect, useCallback } from 'react';
import { GridColDef, trTR } from '@mui/x-data-grid';
import { Button, IconButton, TextField, Tooltip } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import StyledDataGrid from '../../../components/StyledDataGrid';
import { Views } from '../../../components/Views';
import ICompetencyGroup from '../../../interfaces/ICompetencyGroup';
import CompetencyGroup from '../../../../server/hooks/competencyGroup/main';

export class CompetencyGroupListController extends UIController {

    public LoadView(): UIView {

        const navigate = useNavigate();

        const { activeGroups, isLoading } = CompetencyGroup.GetActiveCompetencyGroups();
        const { passiveGroups } = CompetencyGroup.GetPassiveCompetencyGroups();

        const [filteredRows, setFilteredRows] = useState<ICompetencyGroup.IGetCompetencyGroup[]>([]);

        const [rowsActive, setRowsActive] = useState<boolean>(true);

        const [searchTimer, setSearchTimer] = useState(null);

        return (
            isLoading ? VStack(Spinner()) :
                UIViewBuilder(() => {

                    useEffect(() => {
                        setFilteredRows(activeGroups);
                    }, []);

                    useEffect(() => {
                        return () => {
                            if (searchTimer) clearTimeout(searchTimer);
                        };
                    }, [searchTimer]);

                    const columns: GridColDef[] = [
                        {
                            field: "competency_group_name",
                            headerName: "Yetkinlik Grubu Adı",
                            minWidth: 200,
                            editable: false,
                            disableColumnMenu: true,
                            flex: 1
                        },
                        {
                            field: "competency_grade_name",
                            headerName: "Yetkinlik Düzeyi",
                            minWidth: 200,
                            editable: false,
                            disableColumnMenu: true,
                            flex: 1
                        },
                        {
                            field: "competency_group_id",
                            headerName: "İşlemler",
                            minWidth: 70,
                            editable: false,
                            disableColumnMenu: true,
                            renderCell: (params) => {
                                return (
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Button variant="text" size="small" onClick={() => navigate(`/app/competency-group/edit/${params.value}`)}>Düzenle</Button>
                                    </div>
                                )
                            }
                        }
                    ];

                    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;

                        // Önceki timer'ı temizle
                        if (searchTimer) clearTimeout(searchTimer);

                        // Yeni bir timer başlat
                        const newTimer = setTimeout(() => {
                            const filteredRows = activeGroups.filter((row) => {
                                return row.competency_group_name.toLowerCase().includes(value.toLowerCase()) ||
                                    row.competency_grade_name.toLowerCase().includes(value.toLowerCase());
                            });
                            setFilteredRows(filteredRows);
                        }, 1000); // 1000 milisaniye = 1 saniye

                        setSearchTimer(newTimer);
                    }, [activeGroups]);

                    const handleSetActiveRows = useCallback(() => {
                        if (rowsActive) {
                            setFilteredRows(passiveGroups)
                        } else {
                            setFilteredRows(activeGroups)
                        }
                        setRowsActive(!rowsActive)
                    }, [rowsActive, passiveGroups, activeGroups])

                    return (
                        VStack({ spacing: 15, alignment: cTopLeading })(
                            HStack({ alignment: cLeading })(
                                Views.Title("Yetkinlik Grupları").paddingTop("10px")
                            ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                            HStack({ alignment: cTop })(
                                ReactView(
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px",
                                        width: "100%",
                                    }}>
                                        <div style={{
                                            display: "flex",
                                            gap: "10px",
                                            alignItems: "center"
                                        }}>
                                            <div style={{ width: "80%" }}>
                                                <TextField placeholder="Yetkinlik Grubu Arayın..." size="small" fullWidth onChange={handleSearch} />
                                            </div>
                                            <Tooltip title={`${rowsActive ? "Pasif" : "Aktif"} Yetkinlik Gruplarını Göster`}>
                                                <IconButton onClick={handleSetActiveRows}>
                                                    <FilterAltOutlinedIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <div style={{ width: "20%" }}>
                                                <Button size="small" fullWidth variant="outlined" onClick={() => navigate("/app/competency-group/create")}>Yeni Yetkinlik Grubu</Button>
                                            </div>
                                        </div>
                                        <div style={{ height: "calc(100vh - 225px)", width: "calc(100vw - 330px)" }}>
                                            <StyledDataGrid
                                                rows={filteredRows}
                                                columns={columns}
                                                localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                                getRowId={(row) => row.$id}
                                            />
                                        </div>
                                    </div>
                                )
                            )
                        ).padding("0 20px")
                    )
                })
        )
    }
}