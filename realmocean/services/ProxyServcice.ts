namespace AppInfo {
  export const Name = "pedavalans";
  export const Database = "pedavalans";
}

namespace Collections {
  export const Department = "organization_department";
  export const Title = "organization_title";
  export const Position = "organization_position";
  export const Line = "organization_line";
  export const Employee = "organization_employee";
  export const Competency: string = "competency";
  export const CompetencyGroup: string = "competency_group";
  export const CompetencyDepartment: string = "competency_department";
  export const Parameter: string = "pedavalans_parameter";
  export const CompetencyLineRelation: string = "competency_line_relation";
  export const CompetencyWorkPlace: string = "competency_work_place";
  export const OrganizationStructureWorkPlace: string = "organization_workplace";
}


function nanoid(size = 21) {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let id = '';
  const randomValues = new Uint8Array(size);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < size; i++) {
    id += alphabet[randomValues[i] % alphabet.length];
  }
  return id;
}

class ProxyAccountService extends RealmoceanService {
  public get uid(): string {
    return 'com.pedavalans.service.proxy-account';
  }

  async init() {
    console.log("Proxy Account Service is running...");

    const router = this.webServer.getRouter();
    // localhost/v1/service/com.pedavalans.service.proxy-account/

    // every day at 07:00
    this.scheduleService.addJob("0 7 * * *", async () => {
      await this.getExpiredProxyUsers();
    });

  }

  async getExpiredProxyUsers() {
    const date = new Date();
    const list = await this.databaseService.listDocuments(AppInfo.Name, AppInfo.Database, "proxy_account", [this.databaseService.Query.equal("is_active", true), this.databaseService.Query.equal("is_deleted", false)])
    for (const item of list.documents) {
      if (new Date(item.end_date) < date) {
        await this.databaseService.updateDocument(AppInfo.Name, AppInfo.Database, "proxy_account", item.$id, { is_active: false, is_deleted: true });
        console.log("Proxy Account Deleted");
      } else {
        console.log("Proxy Account Not Expired: ", item);
      }
    }
  }

}


module.exports = ProxyAccountService