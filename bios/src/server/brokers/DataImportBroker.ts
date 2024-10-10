import { Payload, ServiceBroker } from "@realmocean/sdk";
import { IEmployeeImportFromExcel } from "../../client/pages/Organization/Controllers/Employee/EmployeeListController";




export class DataImportBroker extends ServiceBroker<any> {

  public static get Default(): DataImportBroker {
    return new DataImportBroker();
  }

  public get ServiceName(): string {
    return 'com.pedavalans.service.import'
  }


  async employeeImport(excelData: IEmployeeImportFromExcel[], organization: string): Promise<any> {

    let path = '/employeeImport';
    let payload: Payload = {};

    payload['data'] = excelData;
    payload['organization'] = organization;



    const uri = new URL(this.config.endpoint + path);
    return await this.call('post', uri, {
      'content-type': 'application/json'
    }, payload);
  }

  async competencyImport(excelData: any[], organization: string): Promise<any> {

    let path = '/competencyImport';
    let payload: Payload = {};

    payload['data'] = excelData;
    payload['organization'] = organization;

    const uri = new URL(this.config.endpoint + path);
    return await this.call('post', uri, {
      'content-type': 'application/json'
    }, payload);

  }

  async transferEmployeeCompetencyValuesToNewPeriodTargetData(current_evaluation_period: string, previous_evaluation_period: string, polyvalence_table_id: string, write_on_it: boolean): Promise<any> {

    let path = '/transferEmployeeCompetencyValuesToNewPeriodTargetData';
    let payload: Payload = {};

    payload['current_evaluation_period'] = current_evaluation_period;
    payload['previous_evaluation_period'] = previous_evaluation_period;
    payload['polyvalence_table_id'] = polyvalence_table_id;
    payload['write_on_it'] = write_on_it;

    const uri = new URL(this.config.endpoint + path);
    return await this.call('post', uri, {
      'content-type': 'application/json'
    }, payload);

  }

  async transferEmployeeCompetencyValuesToNewPeriodAllData(current_evaluation_period: string, previous_evaluation_period: string, polyvalence_table_id: string, write_on_it: boolean): Promise<any> {

    let path = '/transferEmployeeCompetencyValuesToNewPeriodAllData';
    let payload: Payload = {};

    payload['current_evaluation_period'] = current_evaluation_period;
    payload['previous_evaluation_period'] = previous_evaluation_period;
    payload['polyvalence_table_id'] = polyvalence_table_id;
    payload['write_on_it'] = write_on_it;

    const uri = new URL(this.config.endpoint + path);
    return await this.call('post', uri, {
      'content-type': 'application/json'
    }, payload);

  }

}