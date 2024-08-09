import { MyTestClass } from "./_Test";


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

class AppletService extends RealmoceanService {
    public  get uid(): string {
        return 'com.celmino.service.applet';
    }
    
      get displayName(): string {
        return 'Applet Service'
      }
    
      get theme(): string {
        return "#7B68EE";
      }
    
      get icon(): string {
        return "/images/services/mining.png";
      }

    async init() {
        const myTest = new MyTestClass();
        myTest.print();
        const router = this.webServer.getRouter();
     


        /*   setTimeout(async () => {
              console.log('AppletService initialized.');
              const databases = await databaseService.list('the');
              console.log(databases);
          }, 5000); */

          router.post("/applet/create", async (req, res) => {
            
            const realmId = req.headers['x-realm-id'];
            const appletId = req.headers['x-applet-id'];

            const schema = req.body.schema;

            console.log(req.headers);
            console.log(schema);
            console.log(typeof schema);
            try {
                const applet = await this.createApplet(realmId, appletId, schema);
                return res.json(applet);
            } catch (e) {
                console.error(e);
                res.statusCode = 500;
                return res.json(e);
            }
        });

        router.get("/applet/collections/get", async (req, res) => {
            const realmId = req.headers['x-realm-id'];
            try {
                const applet = await this.getCollections(realmId);
                return res.json(applet);
            } catch (e) {
                res.statusCode(500)
                return res.json(e);
            }
        });
    }

    async createApplet(realmId: string, appletId: string, schema: any) {
        // Create Applet Document
        const applet = await this.databaseService.createDocument(realmId, 'workspace', 'applets', 'unique()', {
            name: schema.name,
            opa: schema.tree_type,
            type: schema.applet_type,
            iconName: schema.iconName,
            iconCategory: schema.iconCategory,
            parent: schema.parent
        });

        appletId = applet.$id;

        
        // Create Applet Tree Item Document
        await this.databaseService.createDocument(realmId, 'workspace', 'ws_tree', appletId, {
            name: schema.name,
            type: 'applet',
            tree_widget: schema.tree_type,
            appletId: appletId,
            parent: '-1',
            path: (new Date()).getTime().toString(),
            fullPath: '/' + appletId,
            iconName: schema.tree_type === 'com.celmino.widget.applet-category' ? null : schema.iconName,
            iconCategory: schema.iconCategory,
            spaceId: '@team'
        })

        await this.schemaService.createDatabase(realmId, appletId, schema);

        return applet;
    }

    async getCollections(realmId: string) {
        console.log('getCollections')
        console.log(realmId)

        const {documents: applets} = await this.databaseService.listDocuments(realmId, 'workspace', 'applets');
       
        const results: any[] = [];
        for (let i = 0; i < applets.length; i++) {
            console.log(i)
            const { documents: collections } = await this.databaseService.listDocuments(realmId, applets[i].$id, 'Collections');
            console.log(collections)
            results.push({
                label: applets[i].name,
                options: collections.map(document => ({
                    label: document.name, value: document.$id
                }))

            });
        }
       
        return results;

    }


}


module.exports = AppletService;