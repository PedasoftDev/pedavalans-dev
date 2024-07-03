import { Payload, ServiceBroker } from "@realmocean/sdk";




export class PedavalansServiceBroker extends ServiceBroker<any> {

  public static get Default(): PedavalansServiceBroker {
    return new PedavalansServiceBroker();
  }

  public get ServiceName(): string {
    return 'com.pedavalans.service.main'
  }


  async updateCompetencyDepartmentNames(departmentId: string, departmentName: string): Promise<any> {


    let path = '/updateCompetencyDepartmentNames';
    let payload: Payload = {};

    payload['departmentId'] = departmentId;
    payload['departmentName'] = departmentName;



    const uri = new URL(this.config.endpoint + path);
    return await this.call('post', uri, {
      'content-type': 'application/json'
    }, payload);
  }

  async importEmployeeTable(excelData: any, tenant_id: string, user_id: string): Promise<any> {


    let path = '/importEmployeeTable';
    let payload: Payload = {};
    payload['excelData'] = excelData;
    payload['tenantId'] = tenant_id;
    payload['userId'] = user_id;

    const uri = new URL(this.config.endpoint + path);
    return await this.call('post', uri, {
      'content-type': 'application/json'
    }, payload);
  }


}