import { cTop, cTopLeading, HStack, nanoid, ReactView, Spinner, UIController, UINavigate, UIViewBuilder, useNavigate, VStack } from '@tuval/forms';
import React, { useEffect, useState } from 'react';
import { Chart, Series, Export, Tooltip } from 'devextreme-react/chart';
import { PortalMenu } from '../../components/PortalMenu';
import { Query, Services, useGetMe, useListCollections } from '@realmocean/sdk';
import Main from '../../../server/hooks/main/Main';
import Parameters from '../../../server/hooks/parameters/main';
import { Resources } from '../../assets/Resources';
import AccountRelation from '../../../server/hooks/accountRelation/main';
import AppInfo from '../../../AppInfo';
import Collections from '../../../server/core/Collections';
import { Toast } from '../../components/Toast';
import Database from '../../../server/core/Database';
import { Umay } from '@tuval/core';
import { Dialog, DialogContent } from '@mui/material';

const useGetBestFiveDepartments = [
    {
        x: "İnsan Kaynakları",
        y: 70
    },
    {
        x: "Koordinasyon",
        y: 60
    },
    {
        x: "Finansman",
        y: 80
    },
    {
        x: "Sosyal Sorumluluk",
        y: 60
    },
    {
        x: "Organizasyon",
        y: 55
    }
];

const useGetWorstFiveDepartments = [
    {
        x: "İnsan Kaynakları",
        y: 70
    },
    {
        x: "Koordinasyon",
        y: 60
    },
    {
        x: "Finansman",
        y: 80
    },
    {
        x: "Sosyal Sorumluluk",
        y: 60
    },
    {
        x: "Organizasyon",
        y: 55
    }
];



export class DashboardController extends UIController {

    public LoadView() {

        const { me, isLoading } = useGetMe("console");
        const { required, isLoading: isLoadingDb } = Main.SetupRequired();
        const { collections, isLoading: isLoadingCollections } = useListCollections(AppInfo.Name, AppInfo.Database, [Query.limit(1000)])

        const { parameters: tableAuth, isLoading: isLoadingTableAuth } = Parameters.GetParameterByName(Resources.ParameterLocalStr.polyvalence_unit_table_auth, me?.prefs?.organization)
        const { parameters: machineBased, isLoading: isLoadingMachineBased } = Parameters.GetParameterByName(Resources.ParameterLocalStr.machine_based_polyvalence_management, me?.prefs?.organization)
        const { parameters: lineBased, isLoading: isLoadingLineBased } = Parameters.GetParameterByName(Resources.ParameterLocalStr.line_based_competency_relationship, me?.prefs?.organization)
        const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id)

        const navigate = useNavigate();

        return (
            isLoading || isLoadingDb || isLoadingTableAuth || isLoadingResult || isLoadingMachineBased || isLoadingLineBased || isLoadingCollections ? VStack(Spinner()) :
                me == null ? UINavigate("/login") :
                    required ? UINavigate("/app/setup") :
                        UIViewBuilder(() => {
                            const [isUpdate, setIsUpdate] = useState(false)

                            const createCollection = async () => {
                                Services.Client.setProject("console");
                                Services.Client.setMode(undefined);
                                const task = new Umay()
                                const failedAttributes = []
                                const collectionVersion = Database.collections.find(collection => collection.id === Collections.CollectionVersion)
                                const collectionAttributeVersion = Database.collections.find(collection => collection.id === Collections.CollectionAttributeVersion)
                                task.Task(async () => {
                                    setIsUpdate(true)
                                    await Services.Databases.createCollection(AppInfo.Name, AppInfo.Database, Collections.CollectionVersion, collectionVersion.name)
                                    await Services.Databases.createCollection(AppInfo.Name, AppInfo.Database, Collections.CollectionAttributeVersion, collectionAttributeVersion.name)
                                })
                                task.Wait(1)

                                collectionVersion.attributes.forEach((attr) => {
                                    task.Task(async () => {
                                        if (attr.type === "string") {
                                            try {
                                                await Services.Databases.createStringAttribute(AppInfo.Name, AppInfo.Database, Collections.CollectionVersion, attr.key, 256, false)
                                            } catch (error) {
                                                failedAttributes.push({ colName: collectionVersion.name, key: attr.key, type: attr.type })
                                            }
                                        } else if (attr.type === "number") {
                                            try {
                                                await Services.Databases.createIntegerAttribute(AppInfo.Name, AppInfo.Database, Collections.CollectionVersion, attr.key, false)
                                            } catch (error) {
                                                failedAttributes.push({ colName: collectionVersion.name, key: attr.key, type: attr.type })
                                            }
                                        } else if (attr.type === "boolean") {
                                            try {
                                                await Services.Databases.createBooleanAttribute(AppInfo.Name, AppInfo.Database, Collections.CollectionVersion, attr.key, false, attr.default)
                                            } catch {
                                                failedAttributes.push({ colName: collectionVersion.name, key: attr.key, type: attr.type })
                                            }
                                        }
                                    })
                                    task.Wait(1)
                                })

                                collectionAttributeVersion.attributes.forEach((attr) => {
                                    task.Task(async () => {
                                        if (attr.type === "string") {
                                            try {
                                                await Services.Databases.createStringAttribute(AppInfo.Name, AppInfo.Database, Collections.CollectionAttributeVersion, attr.key, 256, false)
                                            } catch (error) {
                                                failedAttributes.push({ colName: collectionAttributeVersion.name, key: attr.key, type: attr.type })
                                            }
                                        } else if (attr.type === "number") {
                                            try {
                                                await Services.Databases.createIntegerAttribute(AppInfo.Name, AppInfo.Database, Collections.CollectionAttributeVersion, attr.key, false)
                                            } catch (error) {
                                                failedAttributes.push({ colName: collectionAttributeVersion.name, key: attr.key, type: attr.type })
                                            }
                                        } else if (attr.type === "boolean") {
                                            try {
                                                await Services.Databases.createBooleanAttribute(AppInfo.Name, AppInfo.Database, Collections.CollectionAttributeVersion, attr.key, false, attr.default)
                                            } catch {
                                                failedAttributes.push({ colName: collectionAttributeVersion.name, key: attr.key, type: attr.type })
                                            }
                                        }
                                    })
                                    task.Wait(1)
                                })
                                task.Wait(2)

                                failedAttributes.forEach((attr) => {
                                    task.Task(async () => {
                                        if (attr.type === "string") {
                                            await Services.Databases.createStringAttribute(AppInfo.Name, AppInfo.Database, attr.colName, attr.key, 256, false)
                                        }
                                        else if (attr.type === "number") {
                                            await Services.Databases.createIntegerAttribute(AppInfo.Name, AppInfo.Database, attr.colName, attr.key, false)
                                        }
                                        else if (attr.type === "boolean") {
                                            await Services.Databases.createBooleanAttribute(AppInfo.Name, AppInfo.Database, attr.colName, attr.key, false, false)
                                        }
                                    })
                                    task.Wait(1)
                                })
                                task.Wait(2)

                                collections.forEach((collection) => {
                                    task.Task(async () => {
                                        await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.CollectionVersion, collection.$id, {
                                            id: collection.$id,
                                            collection_id: collection.$id,
                                            version: 1,
                                            is_active: true,
                                            is_deleted: false
                                        })
                                    })
                                    task.Wait(1)
                                    collection.attributes.forEach((attr: any) => {
                                        task.Task(async () => {
                                            await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.CollectionAttributeVersion, nanoid(), {
                                                id: collection.$id + "_a_" + attr.key,
                                                collection_id: collection.$id,
                                                attribute_id: attr.key,
                                                version: 1,
                                                is_active: true,
                                                is_deleted: false
                                            })
                                        })
                                        task.Wait(1)
                                    })
                                })
                                task.Task(async () => {
                                    setIsUpdate(false)
                                    Toast.fire({
                                        icon: "success",
                                        title: "Veritabanı Güncellendi"
                                    })
                                    window.location.reload()
                                })
                                task.Run()
                            }

                            useEffect(() => {

                                if (me?.prefs?.organization == null) {
                                    Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.Parameter).then((result) => {
                                        Services.Client.setProject("console");
                                        Services.Client.setMode(undefined);
                                        Services.Accounts.updatePrefs({ organization: result.documents[0].tenant_id })
                                        window.location.reload()
                                    })
                                } else {
                                    if (tableAuth[0]?.is_active) {
                                        localStorage.setItem("tableAuth", "true")
                                        if (accountRelations[0]?.authorization_profile === "admin" || accountRelations[0]?.is_admin === true) {
                                            localStorage.setItem("isAdmin", "true")
                                            localStorage.setItem("isResponsible", "false")
                                            localStorage.setItem("isViewer", "false")
                                        } else if (accountRelations[0]?.authorization_profile === "viewer") {
                                            localStorage.setItem("isAdmin", "false")
                                            localStorage.setItem("isResponsible", "false")
                                            localStorage.setItem("isViewer", "true")
                                        }
                                        else if (accountRelations[0]?.authorization_profile === "responsible") {
                                            localStorage.setItem("isResponsible", "true")
                                            localStorage.setItem("isAdmin", "false")
                                            localStorage.setItem("isViewer", "false")
                                        }
                                        else {
                                            localStorage.setItem("isAdmin", "false")
                                            localStorage.setItem("isViewer", "false")
                                            localStorage.setItem("isResponsible", "false")

                                            Toast.fire({
                                                icon: "error",
                                                title: "Yetkisiz Giriş"
                                            })
                                            navigate("/logout")
                                        }
                                    } else {
                                        localStorage.setItem("tableAuth", "false")
                                        localStorage.setItem("isAdmin", "true")
                                    }
                                    localStorage.setItem(Resources.ParameterLocalStr.machine_based_polyvalence_management, machineBased[0]?.is_active ? "true" : "false")
                                    localStorage.setItem(Resources.ParameterLocalStr.line_based_competency_relationship, lineBased[0]?.is_active ? "true" : "false")
                                    const collection_version = collections.find(collection => collection.$id === "collection_version")
                                    if (!collection_version) {
                                        createCollection()
                                    }
                                    const dbVersion = Database.version;
                                }
                            }, [])

                            return (
                                HStack({ alignment: cTopLeading })(
                                    PortalMenu("Dashboard"),
                                    VStack({ alignment: cTop })(
                                        ReactView(
                                            <div style={{ width: "100%", height: "100%", padding: "20px" }}>
                                                <span style={{ paddingTop: "15px", fontFamily: "Poppins", fontSize: "25px" }}
                                                >Dashboard</span>
                                                <div style={{ display: "flex", width: "100%", height: "100%", gap: "10px", justifyContent: "center", alignItems: "center" }}>
                                                    <Chart style={{ height: "400px", width: "50%" }} dataSource={useGetBestFiveDepartments.sort((a, b) => { return a.y < b.y ? 1 : -1 })}>
                                                        <Series
                                                            valueField="y"
                                                            argumentField="x"
                                                            name="En Başarılı 5 Departman (%)"
                                                            type="bar"
                                                            color="#5A96E3" />
                                                        <Export enabled={true} />
                                                        <Tooltip
                                                            enabled={true}
                                                            location='edge'
                                                        />
                                                    </Chart>
                                                    <Chart style={{ height: "400px", width: "50%" }} dataSource={useGetWorstFiveDepartments.sort((a, b) => { return a.y > b.y ? 1 : -1 })}>
                                                        <Series
                                                            valueField="y"
                                                            argumentField="x"
                                                            point={{
                                                                visible: true
                                                            }}
                                                            name="En Başarısız 5 Departman (%)"
                                                            type="bar"
                                                            color="#E7CEA6" />
                                                        <Export enabled={true} />
                                                        <Tooltip
                                                            enabled={true}
                                                            location='edge'

                                                        />
                                                    </Chart>
                                                </div>
                                                <Dialog
                                                    open={isUpdate}
                                                    fullScreen
                                                >
                                                    <DialogContent>
                                                        Güncelleme Yapılıyor, Lütfen Bekleyiniz...
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        )
                                    ).width("100%").height("100%")
                                )

                            )
                        })

        )

    }
}