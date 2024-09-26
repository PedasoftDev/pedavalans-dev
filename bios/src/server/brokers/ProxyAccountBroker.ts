import { Payload, ServiceBroker } from "@realmocean/sdk";
import { IEmployeeImportFromExcel } from "../../client/pages/Organization/Controllers/Employee/EmployeeListController";




export class ProxyAccountBroker extends ServiceBroker<any> {

  public static get Default(): ProxyAccountBroker {
    return new ProxyAccountBroker();
  }

  public get ServiceName(): string {
    return 'com.pedavalans.service.proxy-account'
  }

  async getByAgentUserId(agentUserId: string): Promise<any> {

    let path = '/getAgentProxyAccounts';
    let payload: Payload = {};

    payload['agentUserId'] = agentUserId;

    const uri = new URL(this.config.endpoint + path);
    return await this.call('post', uri, {
      'content-type': 'application/json'
    }, payload);
  }

}