import { ReactView, UIController, UIView, VStack, Text, UINavigate, Spinner, useState } from "@tuval/forms";
import React from "react";
import bgImage from "../../../assets/BackgroundImage";
import Main from "../../../../server/hooks/main/Main";
import { useCreateOrganization, useGetMe } from "@realmocean/sdk";
import styled from "styled-components";
import Button from "../../../components/Button";
import TextFieldL from "../.././../components/TextFieldLarge";
import { v4 as uuidv4 } from 'uuid';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding: 20px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
    width: 400px;
`;

const HeaderLabel = styled.div`
    font-size: 25px;
    color: #3BA2EE;
    font-weight: 400;
`;

// useCreateMembership
// useCreate


export class SetupController extends UIController {

    public LoadView(): UIView {

        const { database, isLoading } = Main.GetDatabase();

        const { me, isLoading: isLoad } = useGetMe("console");

        const [form, setForm] = useState({
            organizationId: uuidv4(),
            organizationName: "",
        });

        const [activeStep, setActiveStep] = useState(0);

        const createDb = () => {
            console.log(form);
            const { createTeam, error, isError, isLoading, isSuccess } = useCreateOrganization();
            createTeam({ id: form.organizationId, name: form.organizationName }, (data) => {
                if (!isLoading && isSuccess) {
                    console.log(data);
                    return {
                        organization: data,
                        isLoading: isLoading,
                        error: error,
                        isError: isError,
                        isSuccess: isSuccess
                    }
                }
            });
        }


        return (
            VStack(
                isLoading || isLoad ? Spinner() :
                    me == null ? UINavigate('/login') :
                        database != null ? UINavigate('/home') :
                            ReactView(
                                <div>
                                    {activeStep == 0 &&
                                        <Container>
                                            <HeaderLabel>Pedavalans'a hoşgeldiniz</HeaderLabel>
                                            <TextFieldL placeholder="Organizasyon Adı Giriniz"
                                                value={form.organizationName}
                                                onChange={(e) => setForm({ ...form, organizationName: e.target.value })} />
                                            <Button fullWidth onClick={createDb} variant="contained">İlerle</Button>
                                        </Container>
                                    }
                                </div>
                            )
            ).background(bgImage)
        )
    }
}
