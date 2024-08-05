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

  async updateVocationQualificationTypeNames(vocationQualificationTypeId: string, vocationQualificationTypeName: string): Promise<any> {

    let path = '/updateVocationQualificationTypeNames';
    let payload: Payload = {};
    payload['documentTypeId'] = vocationQualificationTypeId;
    payload['documentTypeName'] = vocationQualificationTypeName;

    const uri = new URL(this.config.endpoint + path);
    return await this.call('post', uri, {
      'content-type': 'application/json'
    }, payload);
  }

  async updateVocationQualificationNames(documentId: string, documentName: string): Promise<any> {

    let path = '/updateVocationQualificationNames';
    let payload: Payload = {};
    payload['documentId'] = documentId;
    payload['documentName'] = documentName;

    const uri = new URL(this.config.endpoint + path);
    return await this.call('post', uri, {
      'content-type': 'application/json'
    }, payload);
  }

  async listEmployeeCompetencyValue(competency_id,competency_evaluation_period?): Promise<any> {


    let path = '/listEmployeeCompetencyValue';
    let payload: Payload = {};

    payload['competency_id'] = competency_id;
    payload['competency_evaluation_period'] = competency_evaluation_period;

    const uri = new URL(this.config.endpoint + path);
    return await this.call('post', uri, {
      'content-type': 'application/json'
    }, payload);
  }
  async listEmployeeCompetencyValueGlobal(competency_id): Promise<any> {


    let path = '/listEmployeeCompetencyValueGlobal';
    let payload: Payload = {};

    payload['competency_id'] = competency_id;

    const uri = new URL(this.config.endpoint + path);
    return await this.call('post', uri, {
      'content-type': 'application/json'
    }, payload);
  }


}