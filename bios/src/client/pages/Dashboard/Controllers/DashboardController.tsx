import { cTop, cTopLeading, HStack, nanoid, ReactView, Spinner, UIController, UINavigate, UIViewBuilder, useNavigate, VStack } from '@tuval/forms';
import React, { Fragment, useEffect, useState } from 'react';
import { PortalMenu } from '../../../components/PortalMenu';
import { Query, Services, useGetMe, useListCollections, useListAccounts } from '@realmocean/sdk';
import Main from '../../../../server/hooks/main/Main';
import Parameters from '../../../../server/hooks/parameters/main';
import { Resources } from '../../../assets/Resources';
import AccountRelation from '../../../../server/hooks/accountRelation/main';
import AppInfo from '../../../../AppInfo';
import Collections from '../../../../server/core/Collections';
import { Toast } from '../../../components/Toast';
import Database from '../../../../server/core/Database';
import { Umay } from '@tuval/core';
import MainView from '../Views/Main';
import { Dialog, DialogContent } from '@mui/material';
import { EmployeePerformanceDashboard } from '../Views/EmployeePerformanceDashboard';
import OrganizationStructureEmployee from '../../../../server/hooks/organizationStructureEmployee/main';
import OrganizationStructureTitle from '../../../../server/hooks/organizationStructureTitle/main';
import OrganizationStructureDepartment from '../../../../server/hooks/organizationStructureDepartment/main';
import OrganizationStructurePosition from '../../../../server/hooks/organizationStructrePosition/main';
import EmployeeCompetencyValue from '../../../../server/hooks/EmployeeCompetencyValue/main';
import IParameters from '../../../interfaces/IParameters';
import IStringParameter from '../../../interfaces/IStringParameter';
import PolyvalenceUnit from '../../../../server/hooks/polyvalenceUnit/main';

export class DashboardController extends UIController {

    public LoadView() {

        const { me, isLoading } = useGetMe("console");
        const { required, isLoading: isLoadingDb } = Main.SetupRequired();
        const { collections, isLoading: isLoadingCollections } = useListCollections(AppInfo.Name, AppInfo.Database, [Query.limit(1000)]);

        // dashboard query
        const { employees, isLoadingEmployees } = OrganizationStructureEmployee.GetList(me?.prefs?.organization)
        const { titles, isLoadingTitles } = OrganizationStructureTitle.GetList(me?.prefs?.organization)
        const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization)
        const { positions, isLoadingPositions } = OrganizationStructurePosition.GetList(me?.prefs?.organization)
        const { listEmployeeCompetencyValue, isLoadingListEmployeeCompetencyValue } = EmployeeCompetencyValue.List();
        const { polyvalenceUnitList, isLoadingPolyvalenceUnit } = PolyvalenceUnit.GetActiveList(me?.prefs?.organization)

        const { parameters: tableAuth, isLoading: isLoadingTableAuth } = Parameters.GetParameterByName(Resources.ParameterLocalStr.polyvalence_unit_table_auth)
        const { parameters: machineBased, isLoading: isLoadingMachineBased } = Parameters.GetParameterByName(Resources.ParameterLocalStr.machine_based_polyvalence_management)
        const { parameters: lineBased, isLoading: isLoadingLineBased } = Parameters.GetParameterByName(Resources.ParameterLocalStr.line_based_competency_relationship)
        const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id)
        const { accountRelations: accountRelationList, isLoadingResult: isLoadingAccountResult } = AccountRelation.GetList(me?.prefs?.organization)
        const { accounts, isLoading: isLoadingUsers } = useListAccounts()



        const navigate = useNavigate();

        return (
            isLoading || isLoadingDb || isLoadingTableAuth || isLoadingResult || isLoadingPolyvalenceUnit || isLoadingUsers || isLoadingAccountResult || isLoadingListEmployeeCompetencyValue || isLoadingMachineBased || isLoadingLineBased || isLoadingCollections || isLoadingEmployees || isLoadingPositions || isLoadingTitles || isLoadingDepartments ? VStack(Spinner()) :
                me == null ? UINavigate("/login") :
                    required ? UINavigate("/app/setup") :
                        accountRelations[0].is_active == false ? UINavigate("/logout") :
                            UIViewBuilder(() => {
                                // dashboard data
                                const [employeesByTitle, setEmployeesByTitle] = useState<{ titleName: string, employeeCount: number }[]>([
                                    { titleName: "Bulunamadı", employeeCount: 0 }
                                ])
                                const [employeesByDepartment, setEmployeesByDepartment] = useState<{ departmentName: string, employeeCount: number }[]>([
                                    { departmentName: "Bulunamadı", employeeCount: 0 }
                                ])
                                const [employeesByPosition, setEmployeesByPosition] = useState<{ positionName: string, employeeCount: number }[]>([
                                    { positionName: "Bulunamadı", employeeCount: 0 }
                                ])
                                const [employeePerformance, setEmployeePerformance] = useState<{ label: string, value: number }[]>([
                                    { label: "Bulunamadı", value: 0 }
                                ])
                                const [successfullFiveDepartments, setSuccessfullFiveDepartments] = useState<{ departmentName: string, percentage: number }[]>([
                                    { departmentName: "Bulunamadı", percentage: 0 }
                                ])
                                const [unsuccessfulFiveDepartments, setUnsuccessfulFiveDepartments] = useState<{ departmentName: string, percentage: number }[]>([
                                    { departmentName: "Bulunamadı", percentage: 0 }
                                ])


                                // update database
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
                                    task.Wait(2)
                                    const databaseVersionCollection = Database.collections.find(collection => collection.id === Collections.DatabaseVersion)
                                    task.Task(async () => {
                                        await Services.Databases.createCollection(AppInfo.Name, AppInfo.Database, Collections.DatabaseVersion, databaseVersionCollection.name)
                                    })
                                    task.Wait(1)
                                    databaseVersionCollection.attributes.forEach((attr) => {
                                        if (attr.type === "string") {
                                            task.Task(async () => {
                                                try {
                                                    Services.Databases.createStringAttribute(AppInfo.Name, AppInfo.Database, Collections.DatabaseVersion, attr.key, 256, false)
                                                } catch (error) {
                                                    failedAttributes.push({ colName: databaseVersionCollection.name, key: attr.key, type: attr.type })
                                                }
                                            })
                                            task.Wait(1)
                                        } else if (attr.type === "number") {
                                            task.Task(async () => {
                                                try {
                                                    Services.Databases.createIntegerAttribute(AppInfo.Name, AppInfo.Database, Collections.DatabaseVersion, attr.key, false)
                                                } catch (error) {
                                                    failedAttributes.push({ colName: databaseVersionCollection.name, key: attr.key, type: attr.type })
                                                }
                                            })
                                            task.Wait(1)
                                        } else if (attr.type === "boolean") {
                                            task.Task(async () => {
                                                try {
                                                    Services.Databases.createBooleanAttribute(AppInfo.Name, AppInfo.Database, Collections.DatabaseVersion, attr.key, false, attr.default)
                                                } catch {
                                                    failedAttributes.push({ colName: databaseVersionCollection.name, key: attr.key, type: attr.type })
                                                }
                                            })
                                            task.Wait(1)
                                        }
                                    })
                                    task.Wait(2)

                                    task.Task(async () => {
                                        await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.DatabaseVersion, "database_version", {
                                            id: "database_version",
                                            version: 1,
                                            is_active: true,
                                            is_deleted: false
                                        })
                                    })
                                    task.Wait(1)

                                    task.Task(async () => {
                                        setIsUpdate(false)
                                        Toast.fire({
                                            icon: "success",
                                            title: "Veritabanı Güncellendi"
                                        })
                                    })
                                    task.Wait(1)
                                    task.Task(async () => {
                                        window.location.reload()
                                    })
                                    task.Run()
                                }

                                const updateVersion = async (dbVersion: number) => {
                                    const updateVersion = dbVersion + 1;
                                    const updateVersionTask = new Umay();
                                    Database.collections.filter(collection => collection.version == updateVersion).forEach((collection) => {
                                        updateVersionTask.Task(async () => {
                                            try {
                                                setIsUpdate(true)
                                                console.log("version", updateVersion)
                                                await Services.Databases.createCollection(AppInfo.Name, AppInfo.Database, collection.id, collection.name)

                                            } catch (error) {
                                                console.log(error)
                                            }
                                        })
                                        updateVersionTask.Wait(1)
                                        updateVersionTask.Task(async () => {
                                            try {
                                                await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.CollectionVersion, collection.id, {
                                                    id: collection.id,
                                                    collection_id: collection.id,
                                                    version: updateVersion,
                                                    is_active: true,
                                                    is_deleted: false
                                                })
                                            } catch (error) {
                                                console.log(error)
                                            }
                                        })
                                        updateVersionTask.Wait(1)
                                        collection.attributes.forEach((attr) => {
                                            updateVersionTask.Task(async () => {
                                                try {
                                                    if (attr.type === "string") {
                                                        await Services.Databases.createStringAttribute(AppInfo.Name, AppInfo.Database, collection.id, attr.key, 256, false)
                                                    } else if (attr.type === "number") {
                                                        await Services.Databases.createIntegerAttribute(AppInfo.Name, AppInfo.Database, collection.id, attr.key, false)
                                                    } else if (attr.type === "boolean") {
                                                        await Services.Databases.createBooleanAttribute(AppInfo.Name, AppInfo.Database, collection.id, attr.key, false, attr.default)
                                                    }
                                                } catch (error) {
                                                    console.log(error)
                                                }
                                            })
                                            updateVersionTask.Wait(1)
                                            updateVersionTask.Task(async () => {
                                                try {
                                                    await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.CollectionAttributeVersion, nanoid(), {
                                                        id: collection.id + "_a_" + attr.key,
                                                        collection_id: collection.id,
                                                        attribute_id: attr.key,
                                                        version: updateVersion,
                                                        is_active: true,
                                                        is_deleted: false
                                                    })
                                                } catch (error) {
                                                    console.log(error)
                                                }
                                            })
                                            updateVersionTask.Wait(1)
                                        })


                                    })
                                    updateVersionTask.Wait(2);


                                    const updateAttributes = []
                                    Database.collections.forEach((collection) => {
                                        collection.attributes.forEach((attr) => {
                                            if (attr.version == updateVersion) {
                                                updateAttributes.push({
                                                    ...attr,
                                                    collection_id: collection.id
                                                })
                                            }
                                        })
                                    })
                                    updateAttributes.forEach((attr) => {
                                        updateVersionTask.Task(async () => {
                                            try {
                                                if (attr.type === "string") {
                                                    await Services.Databases.createStringAttribute(AppInfo.Name, AppInfo.Database, attr.collection_id, attr.key, 256, false)
                                                } else if (attr.type === "number") {
                                                    await Services.Databases.createIntegerAttribute(AppInfo.Name, AppInfo.Database, attr.collection_id, attr.key, false)
                                                } else if (attr.type === "boolean") {
                                                    await Services.Databases.createBooleanAttribute(AppInfo.Name, AppInfo.Database, attr.collection_id, attr.key, false, attr.default)
                                                }
                                            } catch (error) {
                                                console.log(error)
                                            }
                                        })
                                        updateVersionTask.Wait(1)
                                        updateVersionTask.Task(async () => {
                                            try {
                                                await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.CollectionAttributeVersion, nanoid(), {
                                                    id: attr.collection_id + "_a_" + attr.key,
                                                    collection_id: attr.collection_id,
                                                    attribute_id: attr.key,
                                                    version: updateVersion,
                                                    is_active: true,
                                                    is_deleted: false
                                                })
                                            } catch (error) {
                                                console.log(error)
                                            }
                                        })
                                        updateVersionTask.Wait(1)
                                    })


                                    updateVersionTask.Wait(2);
                                    updateVersionTask.Task(async () => {
                                        await Services.Databases.updateDocument(AppInfo.Name, AppInfo.Database, Collections.DatabaseVersion, "database_version", {
                                            version: updateVersion
                                        })
                                    })

                                    updateVersionTask.Wait(1)
                                    updateVersionTask.Task(async () => {
                                        setIsUpdate(false)
                                        Toast.fire({
                                            icon: "success",
                                            title: "Veritabanı Güncellendi"
                                        })
                                    })
                                    updateVersionTask.Wait(1)
                                    updateVersionTask.Task(async () => {
                                        window.location.reload()
                                    })
                                    updateVersionTask.Run()
                                }

                                const assignOrganization = async () => {
                                    await Services.Client.setProject("console");
                                    await Services.Client.setMode(undefined);
                                    await Services.Accounts.updatePrefs({ organization: tableAuth[0].tenant_id })
                                    window.location.reload()
                                }

                                useEffect(() => {
                                    if (me?.prefs?.organization == null) {
                                        assignOrganization()
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
                                                navigate("/app/pending-task/list")
                                            }
                                            else if (accountRelations[0]?.authorization_profile === "responsible") {
                                                localStorage.setItem("isResponsible", "true")
                                                localStorage.setItem("isAdmin", "false")
                                                localStorage.setItem("isViewer", "false")
                                                navigate("/app/pending-task/list")
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

                                        Services.Databases.getDocument(AppInfo.Name, AppInfo.Database, Collections.DatabaseVersion, "database_version").then((database_version) => {
                                            const dbVersion: number = database_version.version;
                                            if (dbVersion < Database.version) {
                                                updateVersion(dbVersion)
                                            } else {
                                                Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.Parameter, [Query.limit(1000)]).then((parameterDocs) => {
                                                    const parameters: IParameters.IParameter[] = parameterDocs.documents as any[];
                                                    if (Resources.Parameters.length > parameters.length) {

                                                        const parameterTasks = new Umay()
                                                        parameterTasks.Task(async () => {
                                                            setIsUpdate(true)
                                                        })
                                                        Resources.Parameters.forEach(async (param) => {
                                                            const parameter = parameters.find((p) => p.name === param.localStr)
                                                            if (!parameter) {
                                                                parameterTasks.Task(async () => {
                                                                    const paramId = nanoid()
                                                                    try {
                                                                        await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.Parameter, paramId, {
                                                                            id: paramId,
                                                                            name: param.localStr
                                                                        })
                                                                    } catch (error) {
                                                                        console.log(error)
                                                                        console.log("Parameter oluşturulamadı", param.localStr)
                                                                    }
                                                                })
                                                                parameterTasks.Wait(1)
                                                            }
                                                        })
                                                        parameterTasks.Wait(2)
                                                        parameterTasks.Task(async () => {
                                                            window.location.reload()
                                                        })
                                                        parameterTasks.Run()
                                                    } else {
                                                        console.log("Boolean Parametreler eşit")
                                                        Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, "string_parameter", [Query.limit(1000)]).then((stringDocs) => {
                                                            const stringParameters: IStringParameter.IBase[] = stringDocs.documents as any[];
                                                            if (Resources.StringParameters.length > stringParameters.length) {
                                                                const stringParameterTasks = new Umay()
                                                                stringParameterTasks.Task(async () => {
                                                                    setIsUpdate(true)
                                                                })
                                                                Resources.StringParameters.forEach(async (param) => {
                                                                    const stringParameter = stringParameters.find((m) => m.$id === param.localStr)
                                                                    if (!stringParameter) {
                                                                        stringParameterTasks.Task(async () => {
                                                                            try {
                                                                                await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, "string_parameter", nanoid(), {
                                                                                    name: param.localStr
                                                                                })
                                                                            } catch (error) {
                                                                                console.log(error)
                                                                                console.log("StringParameter oluşturulamadı", param.localStr)
                                                                            }
                                                                        })
                                                                        stringParameterTasks.Wait(1)
                                                                    }
                                                                })
                                                                stringParameterTasks.Wait(2)
                                                                stringParameterTasks.Task(async () => {
                                                                    window.location.reload()
                                                                })
                                                                stringParameterTasks.Run()
                                                            } else {
                                                                console.log("String Parametreler eşit")
                                                                const accountRelationDontHaveMail = accountRelationList.filter((account) => account.mail == null)
                                                                if (accountRelationDontHaveMail.length > 0) {
                                                                    const accountRelationTasks = new Umay()
                                                                    accountRelationTasks.Task(async () => {
                                                                        setIsUpdate(true)
                                                                    })
                                                                    accountRelationDontHaveMail.forEach((account) => {
                                                                        accountRelationTasks.Task(async () => {

                                                                            const accountMail = accounts.find((user) => user.$id === account.account_id)
                                                                            if (accountMail) {
                                                                                try {
                                                                                    await Services.Databases.updateDocument(AppInfo.Name, AppInfo.Database, Collections.AccountRelation, account.$id, {
                                                                                        mail: accountMail.email
                                                                                    })
                                                                                } catch (error) {
                                                                                    console.log(error)
                                                                                    console.log("Mail Güncellenemedi", accountMail.email)
                                                                                }
                                                                            }
                                                                        })
                                                                        accountRelationTasks.Wait(1)
                                                                    })
                                                                    accountRelationTasks.Wait(2)
                                                                    accountRelationTasks.Task(async () => {
                                                                        window.location.reload()
                                                                    })
                                                                    accountRelationTasks.Run()
                                                                } else {
                                                                    console.log("Mailler eşit")
                                                                }
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })

                                    }

                                    const employeesByTitleData = []
                                    const employeesByDepartmentData = []
                                    const employeesByPositionData = []
                                    const employeePerformanceData: { name: string, performance: number }[] = []

                                    employees.forEach((employee) => {

                                        if (employee.title_id) {
                                            const title = titles.find(title => title.$id === employee.title_id)
                                            if (title) {
                                                const titleIndex = employeesByTitleData.findIndex(data => data.titleName === title.name)
                                                if (titleIndex === -1) {
                                                    employeesByTitleData.push({ titleName: title.name, employeeCount: 1 })
                                                } else {
                                                    employeesByTitleData[titleIndex].employeeCount += 1
                                                }
                                            }
                                        }

                                        if (employee.department_id) {
                                            const department = departments.find(department => department.$id === employee.department_id)
                                            if (department) {
                                                const departmentIndex = employeesByDepartmentData.findIndex(data => data.departmentName === department.name)
                                                if (departmentIndex === -1) {
                                                    employeesByDepartmentData.push({ departmentName: department.name, employeeCount: 1 })
                                                } else {
                                                    employeesByDepartmentData[departmentIndex].employeeCount += 1
                                                }
                                            }
                                        }

                                        if (employee.position_id) {
                                            const position = positions.find(position => position.$id === employee.position_id)
                                            if (position) {
                                                const positionIndex = employeesByPositionData.findIndex(data => data.positionName === position.name)
                                                if (positionIndex === -1) {
                                                    employeesByPositionData.push({ positionName: position.name, employeeCount: 1 })
                                                } else {
                                                    employeesByPositionData[positionIndex].employeeCount += 1
                                                }
                                            }
                                        }
                                        const employeeCompetencyValue = listEmployeeCompetencyValue.filter((competency) => competency.employee_id === employee.$id)
                                        let target = 0;
                                        let current = 0;
                                        employeeCompetencyValue.forEach((competency) => {
                                            if (competency.competency_target_value != "no-target") {
                                                console.log(competency)
                                                target += Number(competency.competency_target_value);
                                                current += Number(competency.competency_real_value);
                                            }
                                        })
                                        if (target > 0 && current > 0) {
                                            employeePerformanceData.push({ name: employee.first_name + " " + employee.last_name, performance: (current / target) * 100 })
                                        }

                                    })

                                    const successfullFiveDepartmentsData = []
                                    departments.forEach((department) => {
                                        const employeeValuesByDepartment = listEmployeeCompetencyValue.filter((competency) => competency.competency_department_id === department.$id)
                                        let target = 0;
                                        let current = 0;
                                        employeeValuesByDepartment.forEach((competency) => {
                                            if (competency.competency_target_value != "no-target") {
                                                target += Number(competency.competency_target_value);
                                                current += Number(competency.competency_real_value);
                                            }
                                        })
                                        if (target > 0 && current > 0) {
                                            const percentage = (current / target) * 100
                                            const haveAnyTable = polyvalenceUnitList.find((unit) => unit.polyvalence_department_id === department.$id)
                                            if (haveAnyTable) {
                                                successfullFiveDepartmentsData.push({ departmentName: department.name, percentage: percentage.toFixed(2) })
                                            }
                                        }
                                    })


                                    if (employeesByTitleData.length != 0) {
                                        setEmployeesByTitle(employeesByTitleData.sort((a, b) => a.employeeCount - b.employeeCount))
                                    }
                                    if (employeesByDepartmentData.length != 0) {
                                        setEmployeesByDepartment(employeesByDepartmentData.sort((a, b) => a.employeeCount - b.employeeCount))
                                    }
                                    if (employeesByPositionData.length != 0) {
                                        setEmployeesByPosition(employeesByPositionData.sort((a, b) => a.employeeCount - b.employeeCount))
                                    }
                                    if (employeePerformanceData.length != 0) {
                                        const performData: any = [
                                            {
                                                label: "100% - 80%",
                                                value: 0,
                                            },
                                            {
                                                label: "80% - 60%",
                                                value: 0,
                                            },
                                            {
                                                label: "60% - 40%",
                                                value: 0,
                                            },
                                            {
                                                label: "40% - 20%",
                                                value: 0,
                                            },
                                            {
                                                label: "20% - 0%",
                                                value: 0,
                                            },
                                        ];
                                        employeePerformanceData.forEach((employee) => {
                                            if (employee.performance >= 80) {
                                                performData.find((x: any) => x.label === "100% - 80%").value += 1;
                                            } else if (employee.performance < 80 && employee.performance >= 60) {
                                                performData.find((x: any) => x.label === "80% - 60%").value += 1;
                                            } else if (employee.performance < 60 && employee.performance >= 40) {
                                                performData.find((x: any) => x.label === "60% - 40%").value += 1;
                                            } else if (employee.performance < 40 && employee.performance >= 20) {
                                                performData.find((x: any) => x.label === "40% - 20%").value += 1;
                                            } else if (employee.performance < 20 && employee.performance >= 0) {
                                                performData.find((x: any) => x.label === "20% - 0%").value += 1;
                                            }
                                        });

                                        const pieData = performData.map((p: any) => ({
                                            value: p.value,
                                            label: p.label,
                                        }));
                                        setEmployeePerformance(pieData)
                                    }
                                    if (successfullFiveDepartmentsData.length != 0) {
                                        setSuccessfullFiveDepartments(successfullFiveDepartmentsData.sort((a, b) => b.percentage - a.percentage).slice(0, 5))
                                        setUnsuccessfulFiveDepartments(successfullFiveDepartmentsData.sort((a, b) => a.percentage - b.percentage).slice(0, 5))
                                    }
                                }, [])

                                return (
                                    HStack({ alignment: cTopLeading })(
                                        PortalMenu("Dashboard"),
                                        VStack({ alignment: cTop })(
                                            ReactView(
                                                <MainView>
                                                    <EmployeePerformanceDashboard
                                                        employeesByTitle={employeesByTitle}
                                                        employeesByDepartment={employeesByDepartment}
                                                        employeesByPosition={employeesByPosition}
                                                        employeePerformanceData={employeePerformance}
                                                        successfulFiveDepartments={successfullFiveDepartments}
                                                        unsuccessfulFiveDepartments={unsuccessfulFiveDepartments}
                                                    />

                                                    <Dialog
                                                        open={isUpdate}
                                                        fullScreen
                                                    >
                                                        <DialogContent>
                                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                <h3>Güncelleme yapılıyor, lütfen bekleyiniz ve sayfayı yenilemeyiniz.</h3>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                </MainView>
                                            )
                                        ).width("100%").height("100%")
                                    )

                                )
                            })
        )
    }
}