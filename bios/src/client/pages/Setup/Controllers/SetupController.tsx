import { ReactView, UIController, UIView, VStack, Text, UINavigate } from "@tuval/forms";
import React from "react";
import bgImage from "../../../assets/BackgroundImage";
import Main from "../../../../server/hooks/main/Main";
import { useCreateDatabase, useCreateRealm, useCreateStringAttribute, useCreateTeam, useCreateOrganization } from "@realmocean/sdk";

// useCreateMembership
// useCreate

export class SetupController extends UIController {

    public LoadView(): UIView {

        const { database, isLoading } = Main.GetDatabase();

        const { } = useCreateOrganization();

        return (
            VStack(
                isLoading ? Text("Loading") :
                    database != null ? Text("Database is ready") : Text("Database is not ready"),
                database != null ? UINavigate('/home') :
                    VStack(

                    ).background("rgba(255,255,255,.7)"),
            ).background(bgImage)
        )
    }
}
