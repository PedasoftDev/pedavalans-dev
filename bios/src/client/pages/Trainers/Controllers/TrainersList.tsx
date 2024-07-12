import { HStack, ReactView, Spinner, UIController, UIView, UIViewBuilder, VStack, cLeading, cTop, cTopLeading, useNavigate } from "@tuval/forms";
import React, { useEffect, useState } from "react";
import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import { GridColDef, trTR } from "@mui/x-data-grid";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import StyledDataGrid from "../../../components/StyledDataGrid";
import { Views } from "../../../components/Views";
import { Query, Services, useGetMe } from "@realmocean/sdk";
import AccountRelation from "../../../../server/hooks/accountRelation/main";
import { GridContainer } from "../Views/View";
import Trainers from "../../../../server/hooks/trainers/main";
import TrainerEducations from "../../../../server/hooks/trainerEducations/main";



export class TrainersList extends UIController {

  public LoadView(): UIView {

    const navigate = useNavigate();

    const { me, isLoading: isMeLoading } = useGetMe("console");
    const { isLoadingResult, accountRelations } = AccountRelation.GetList(me?.prefs?.organization)
    const { trainersList, isLoadingTrainersList } = Trainers.GetList();
    const { trainerEducationsList, isLoadingTrainerEducationsList } = TrainerEducations.GetList();


    return (
      isMeLoading || isLoadingResult || isLoadingTrainersList || isLoadingTrainerEducationsList ? VStack(Spinner()) :
        UIViewBuilder(() => {


          const [filterKey, setFilterKey] = useState("");
          const [rowsActive, setRowsActive] = useState<boolean>(true);



          const columns: GridColDef[] = [
            {
              field: "trainer_name",
              headerName: "Eğitici Adı",
              minWidth: 200,
              editable: false,
              disableColumnMenu: true,
              flex: 1,
            },
            {
              field: "trainer_duty",
              headerName: "Eğitim Verebileceği Konular",
              minWidth: 200,
              editable: false,
              disableColumnMenu: true,
              flex: 1,
              valueGetter: (params) => {
                return trainerEducationsList.filter((item) => item.trainer_id === params.row.id).map((item) => item.trainer_duty_name).join(", ");
              }

            },
            {
              field: "id",
              headerName: "İşlemler",
              minWidth: 70,
              editable: false,
              disableColumnMenu: true,
              renderCell: (params) => {
                return (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button variant="text" size="small" onClick={() => navigate(`/app/trainer/edit/${params.value}`)}>Düzenle</Button>
                  </div>
                )
              }
            }
          ];

          const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFilterKey(e.target.value);
          }

          const handleSetActiveRows = () => {
            setRowsActive(!rowsActive);
          }

          const filteredTrainers = trainersList.filter(trainer => {
            const accountRelation = accountRelations.find(ar => ar.account_id === trainer.trainer_id);
            return accountRelation && accountRelation.is_active === true;
          });

          return (
            VStack({ spacing: 15, alignment: cTopLeading })(
              HStack({ alignment: cLeading })(
                Views.Title("Eğiticiler").paddingTop("10px")
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
                        <TextField placeholder="Eğitici Arayın..." size="small" fullWidth onChange={handleSearch} />
                      </div>
                      <Tooltip title={`${rowsActive ? "Pasif" : "Aktif"} Eğiticileri Göster`}>
                        <IconButton onClick={handleSetActiveRows}>
                          <FilterAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                      <div style={{
                        width: "20%",
                        display: "flex",
                        gap: "10px",
                      }}>
                        <Button size="small" fullWidth variant="outlined" onClick={() => navigate("/app/trainer/create")}>Yeni Eğitici</Button>
                      </div>
                    </div>
                    <GridContainer>
                      <StyledDataGrid
                        rows={filteredTrainers.filter((item) => item.is_active === rowsActive).filter(trainer => trainer.trainer_name.toLowerCase().includes(filterKey.toLowerCase()))}
                        columns={columns}
                        getRowId={(row) => row.$id}
                        localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                      />
                    </GridContainer>
                  </div>
                )
              )
            ).padding("0 20px")
          )
        })
    )


  }
}