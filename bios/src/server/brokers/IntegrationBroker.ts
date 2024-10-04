import { Payload, ServiceBroker } from "@realmocean/sdk";
import { IEmployeeImportFromExcel } from "../../client/pages/Organization/Controllers/Employee/EmployeeListController";




export class IntegrationBroker extends ServiceBroker<any> {

  public static get Default(): IntegrationBroker {
    return new IntegrationBroker();
  }

  public get ServiceName(): string {
    return 'com.pedavalans.service.integration'
  }


  async organization(): Promise<any> {

    let path = '/organization';
    let payload: Payload = {};


    const uri = new URL(this.config.endpoint + path);
    return await this.call('post', uri, {
      'content-type': 'application/json'
    }, payload);
  }


}