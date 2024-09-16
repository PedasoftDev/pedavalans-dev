import React, { useState, Fragment, useEffect } from 'react';
import { Autocomplete, FormControlLabel, Switch, TextField } from '@mui/material';
import { HStack, ReactView, Spinner, UIController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, nanoid, useNavigate, useParams } from '@tuval/forms';
import { Query, Services, useDeleteCache, useGetMe } from '@realmocean/sdk';
import { Views } from '../../../../components/Views';
import { Form } from '../../Views/Views';
import { Resources } from '../../../../assets/Resources';
import AccountRelation from '../../../../../server/hooks/accountRelation/main';
import AppInfo from '../../../../../AppInfo';
import removeDollarProperties from '../../../../assets/Functions/removeDollarProperties';
import OrganizationStructureWorkPlace from '../../../../../server/hooks/organizationStructureWorkPlace/main';
import Swal from 'sweetalert2';
import { Toast } from '../../../../components/Toast';

interface IFormWorkPlace {
    id: string;
    record_id: string;
    name: string;
    is_active: boolean;
}

const formWorkPlaceState: IFormWorkPlace = {
    id: "",
    record_id: "",
    name: "",
    is_active: true
}

const link: string = Resources.OrganizationStructureTabValues.find((tab) => tab.value === 5)?.link;

export class UpdateWorkPlace extends UIController {

    public LoadView(): UIView {

        const { id } = useParams();
        const { me, isLoading } = useGetMe("console");
        const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id);
        const { document, isLoading: isLoadingWorkPlace } = OrganizationStructureWorkPlace.Get(id)
        const { updateDocument } = OrganizationStructureWorkPlace.Update();
        const { deleteCache } = useDeleteCache(AppInfo.Name);

        const navigate = useNavigate();
        return (
            isLoading || isLoadingWorkPlace || isLoadingResult ? (me === undefined || accountRelations === undefined) ? UINavigate("/login") :
                VStack(Spinner()) :
                UIViewBuilder(() => {

                    const [formWorkPlace, setFormWorkPlace] = useState(formWorkPlaceState);
                    const [isActive, setIsActive] = useState(document.is_active);
                    const [filterKey, setFilterKey] = useState("");
                    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
                        setFilterKey(e.target.value);
                    }
                    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        updateDocument({
                            databaseId: AppInfo.Database,
                            collectionId: "organization_workplace",
                            documentId: formWorkPlace.id,
                            data: {
                                ...formWorkPlace
                            }
                        }, () => {
                            Toast.fire({
                                icon: "success",
                                title: "İş Yeri başarıyla güncellendi!"
                            });
                            deleteCache();
                            navigate(link + "/list")
                        })
                    }


                    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                        setFormWorkPlace({ ...formWorkPlace, [e.target.name]: e.target.value });
                    }

                    const onReset = () => {
                        navigate(link + "/list")
                    }

                    const onDelete = () => {
                        Swal.fire({
                            title: "İş Yeri Silme",
                            text: `${formWorkPlace.name} adlı İş Yeri silinecek!`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Evet, sil!",
                            cancelButtonText: "Hayır, iptal et!",
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33'
                        }).then((result) => {
                            if (!result.isConfirmed) {
                                return;
                            }
                            updateDocument({
                                databaseId: AppInfo.Database,
                                collectionId: "organization_workplace",
                                documentId: formWorkPlace.id,
                                data: {
                                    ...formWorkPlace,
                                    is_deleted: true
                                }
                            }
                                , () => {
                                    Toast.fire({
                                        icon: "info",
                                        title: "İş Yeri başarıyla silindi!",
                                        text: "İş Yeri başarıyla silindi."
                                    })
                                    deleteCache()
                                    onReset();
                                })
                        })
                    }


                    useEffect(() => {
                        if (document) {
                            setFormWorkPlace(removeDollarProperties(document));
                            setIsActive(document.is_active);
                        }

                    }, [])




                    return (
                        VStack({ alignment: cTop })(
                            HStack({ alignment: cLeading })(
                                Views.Title("Organizasyon Yapısı").paddingTop("20px")
                            ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                            VStack({ alignment: cTop })(
                                ReactView(
                                    <div style={{ width: "100%", height: "100%" }}>
                                        <Form
                                            title='İş Yeri Tanımını Düzenleyin'
                                            onSubmit={onSubmit}
                                            formContent={
                                                <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%" }}>

                                                    <TextField
                                                        name='record_id'
                                                        size='small'
                                                        label='Kayıt Kodu'
                                                        value={formWorkPlace.record_id}
                                                        onChange={onChange}
                                                    />

                                                    <TextField
                                                        name='name'
                                                        size='small'
                                                        label='İş Yeri Adı'
                                                        value={formWorkPlace.name}
                                                        onChange={onChange}
                                                    />
                                                    <FormControlLabel
                                                        sx={{ width: "100%", alignContent: "end" }}
                                                        onChange={(e: any) => setFormWorkPlace({ ...formWorkPlace, is_active: e.target.checked })}
                                                        value={formWorkPlace.is_active}
                                                        control={<Switch color="primary" checked={formWorkPlace.is_active} />}
                                                        label="Aktif mi?"
                                                        labelPlacement="start"
                                                    />
                                                </div>
                                            }
                                            buttons={
                                                isActive ?
                                                    [
                                                        {
                                                            text: "Güncelle",
                                                            color: "primary",
                                                            type: "submit"
                                                        },
                                                        {
                                                            text: "İptal",
                                                            color: "error",
                                                            type: "button",
                                                            onClick: onReset
                                                        }
                                                    ]
                                                    :
                                                    [
                                                        {
                                                            text: "Güncelle",
                                                            color: "primary",
                                                            type: "submit"
                                                        },
                                                        {
                                                            text: "Sil",
                                                            color: "error",
                                                            onClick: onDelete
                                                        },
                                                        {
                                                            text: "İptal",
                                                            color: "primary",
                                                            type: "button",
                                                            onClick: onReset
                                                        }
                                                    ]
                                            }
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