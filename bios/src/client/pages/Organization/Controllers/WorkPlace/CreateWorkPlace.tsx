import React, { useState, Fragment, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import { HStack, ReactView, Spinner, UIController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, nanoid, useNavigate } from '@tuval/forms';
import { Query, Services, useDeleteCache, useGetMe } from '@realmocean/sdk';
import { Views } from '../../../../components/Views';
import { Form } from '../../Views/Views';
import { Resources } from '../../../../assets/Resources';
import AccountRelation from '../../../../../server/hooks/accountRelation/main';
import OrganizationStructureWorkPlace from '../../../../../server/hooks/organizationStructureWorkPlace/main';
import { Toast } from '../../../../components/Toast';


const formWorkPlaceState: IOrganizationStructure.IWorkPlace.ICreateWorkPlace = {
    id: "",
    record_id: "",
    name: "",
    tenant_id: "",
    realm_id: "",
}

const link: string = Resources.OrganizationStructureTabValues.find((tab) => tab.value === 5)?.link;

export class CreateWorkPlace extends UIController {

    public LoadView(): UIView {
        const { me, isLoading } = useGetMe("console");
        const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id);
        const { createDocument } = OrganizationStructureWorkPlace.Create();

        const navigate = useNavigate();
        return (
            isLoading || isLoadingResult ? (me === undefined || accountRelations === undefined) ? UINavigate("/login") :
                VStack(Spinner()) :
                UIViewBuilder(() => {
                    const { deleteCache } = useDeleteCache("console")
                    const [formWorkPlace, setFormWorkPlace] = useState(formWorkPlaceState);

                    const [filterKey, setFilterKey] = useState("");


                    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
                        setFilterKey(e.target.value);
                    }
                    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        const workPlaceId = nanoid();
                        createDocument({
                            documentId: workPlaceId,
                            data: {
                                ...formWorkPlace,
                                id: workPlaceId,
                                tenant_id: me?.prefs?.organization,
                            }
                        }, () => {
                            Toast.fire({
                                icon: "success",
                                title: "İş Yeri başarıyla eklendi!"
                            });
                            deleteCache();
                            navigate(link + "/list");
                        })
                    }


                    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                        setFormWorkPlace({ ...formWorkPlace, [e.target.name]: e.target.value });
                    }

                    const onReset = () => {
                        navigate(link + "/list")
                    }
                    return (
                        VStack({ alignment: cTop })(
                            HStack({ alignment: cLeading })(
                                Views.Title("Organizasyon Yapısı").paddingTop("20px")
                            ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                            VStack({ alignment: cTop })(
                                ReactView(
                                    <div style={{ width: "100%", height: "100%" }}>
                                        <Form
                                            title='Yeni İş Yeri Tanımlayın'
                                            onSubmit={onSubmit}
                                            formContent={

                                                <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%" }}>
                                                    <TextField
                                                        name='record_id'
                                                        size='small'
                                                        label='Kayıt Kodu'
                                                        value={formWorkPlace.record_id}
                                                        onChange={onChange}
                                                        required
                                                    />
                                                    <TextField
                                                        name='name'
                                                        size='small'
                                                        label='İş Yeri Adı'
                                                        value={formWorkPlace.name}
                                                        onChange={onChange}
                                                        required
                                                    />
                                                </div>
                                            }

                                            buttons={[
                                                {
                                                    text: "Kaydet",
                                                    color: "primary",
                                                    type: "submit"
                                                },
                                                {
                                                    text: "İptal",
                                                    color: "error",
                                                    type: "button",
                                                    onClick: onReset
                                                }
                                            ]}
                                        />
                                    </div>

                                )
                            ).paddingTop("10px")
                        ).padding("0 10px 0 20px")
                    )
                })
        )
    }
}