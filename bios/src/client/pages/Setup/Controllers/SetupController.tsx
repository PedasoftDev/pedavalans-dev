import { ReactView, UIController, UIView, VStack, UINavigate, Spinner, useState, useNavigate, State } from "@tuval/forms";
import React, { useRef } from "react";
import bgImage from "../../../assets/BackgroundImage";
import { useGetMe, ID, Services } from "@realmocean/sdk";
import Button from "../../../components/Button";
import TextFieldL from "../.././../components/TextFieldLarge";
import AppInfo from "../../../../AppInfo";
import Database from "../../../../server/core/Database";
import Swal from "sweetalert2";
import { ConsoleText, ConsoleView, Container, HeaderLabel } from "../Views/SetupView";
import { Toast } from "../../../components/Toast";


export class SetupController extends UIController {

    private navigate: any;

    @State()
    private helpTexts: string[];

    protected BindRouterParams(routerParams?: any): void {
        this.helpTexts = [];
        Services.Databases.get(AppInfo.Name, AppInfo.Database).then((database) => {
            if (database != null) {
                this.navigate('/dashboard');
            }
        })
    }

    private pushHelpText(text: string) {
        const helper = this.helpTexts;
        helper.push(text);
        this.helpTexts = helper;
    }

    public LoadView(): UIView {

        this.navigate = useNavigate();

        const ul = useRef<HTMLUListElement>(null);

        const { me, isLoading: isLoad } = useGetMe("console");

        const [form, setForm] = useState({
            organizationId: ID.unique(),
            organizationName: "",
        });

        const [clicked, setClicked] = useState(false);

        const createDb = async () => {
            setClicked(true);
            try {
                this.pushHelpText("Organizasyon oluşturuluyor...");
                Services.Client.setProject("console");
                Services.Client.setMode(undefined);
                // Services.Teams.get()
                const organization = await Services.Teams.create(form.organizationId, form.organizationName);
                this.pushHelpText("Organizasyon oluşturuldu: " + organization.name);
                this.pushHelpText("Realm oluşturuluyor...");
                const realm = await Services.Projects.create(AppInfo.Name, AppInfo.Name, organization.$id);
                this.pushHelpText("Realm oluşturuldu: " + realm.name);
                Services.Client.setMode("admin")
                this.pushHelpText("Database oluşturuluyor...");
                const database = await Services.Databases.create(realm.$id, AppInfo.Database, AppInfo.Database);
                this.pushHelpText("Database oluşturuldu: " + database.name);
                const collections = Database.collections;
                for (let i = 0; i < collections.length; i++) {
                    const collection = collections[i];
                    ul.current?.scrollTo(0, ul.current.scrollHeight);
                    this.pushHelpText("Tablo oluşturuluyor: " + collection.name);
                    const { id, name, attributes, description, version } = collection;
                    const col = await Services.Databases.createCollection(AppInfo.Name, database.$id, id, name, [], false);
                    this.pushHelpText("Tablo oluşturuldu: " + col.name);
                    ul.current?.scrollTo(0, ul.current.scrollHeight);
                    this.pushHelpText(description.tr);
                    for (let j = 0; j < attributes.length; j++) {
                        const { key, type } = attributes[j];
                        switch (type) {
                            case "string":
                                console.log(name, key);
                                await Services.Databases.createStringAttribute(AppInfo.Name, database.$id, col.$id, key, 256, false);
                                break;
                            case "boolean":
                                console.log(name, key);
                                await Services.Databases.createBooleanAttribute(AppInfo.Name, database.$id, col.$id, key, false, key && key.startsWith("is_active") ? true : false);
                                break;
                        }
                    }
                }
                this.pushHelpText("Pedavalans oluşturuldu.");
                ul.current?.scrollTo(0, ul.current.scrollHeight);
                this.pushHelpText("Giriş yapılıyor...");
                ul.current?.scrollTo(0, ul.current.scrollHeight);
                Toast.fire({
                    icon: 'success',
                    title: 'Pedavalans oluşturuldu'
                })
                setTimeout(() => {
                    this.navigate('/dashboard');
                }, 3000);
            } catch (error: any) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Hata Oluştu',
                    text: error.message,
                    showCloseButton: true,
                    closeButtonAriaLabel: 'Tamam',
                })
            }
        }

        return (
            VStack(
                isLoad ? Spinner() :
                    me == null ? UINavigate('/login') :
                        ReactView(
                            <div>
                                <Container>
                                    <HeaderLabel>Pedavalans'a hoşgeldiniz</HeaderLabel>
                                    <TextFieldL placeholder="Organizasyon Adı Giriniz"
                                        value={form.organizationName}
                                        disabled={clicked}
                                        onChange={(e) => setForm({ ...form, organizationName: e.target.value })} />
                                    {!clicked ?
                                        <Button fullWidth onClick={createDb} variant="contained">İlerle</Button>
                                        :
                                        <ConsoleView ref={ul}>
                                            {this.helpTexts.map((item, i) => (
                                                <ConsoleText key={i}>{item}</ConsoleText>
                                            ))}
                                        </ConsoleView>
                                    }
                                </Container>
                            </div>
                        )
            ).background(bgImage)
        )
    }
}
