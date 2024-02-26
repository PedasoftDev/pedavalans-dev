import { useGetMe, useListTeams } from "@realmocean/sdk";
import { HStack, ReactView, Spinner, UIController, UINavigate, VStack, cTop, cTopLeading, useNavigate } from "@tuval/forms";
import React from "react";
import AppInfo from "../../../../AppInfo";

export class OrganizationViewController extends UIController {

    public LoadView() {
        const navigate = useNavigate();

        const { me, isLoading } = useGetMe("console");
        const { teams, isLoading: isLoadingTeams } = useListTeams(AppInfo.Name)

        return (
            isLoading || isLoadingTeams ? VStack(Spinner()) :
                me == null ? UINavigate("/login") :
                    me?.prefs?.organization != null ? UINavigate("/") :
                        HStack({ alignment: cTopLeading })(
                            VStack({ alignment: cTop })(
                                ReactView(
                                    <div style={{ width: "100%", height: "100%", padding: "20px" }}>
                                        <span style={{ paddingTop: "15px", fontFamily: "Poppins", fontSize: "25px" }}
                                        >Organizasyon Seçimi</span>
                                        <div style={{ display: "flex", width: "100%", height: "100%", gap: "10px", justifyContent: "center", alignItems: "center" }}>
                                            {teams.map((team) => <div>{team.name}</div>)}
                                        </div>
                                    </div>
                                )
                            ).width("100%").height("100%")
                        )
        )
    }
}