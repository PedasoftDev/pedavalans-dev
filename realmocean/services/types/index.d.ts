import { DatabaseService } from "./DatabaseService";
import { EmailService } from "./EmailService";
import { MiningService } from "./MiningService";
import { ScheduleService } from "./ScheduleService";
import { SchemaService } from "./SchemaService";
import { WebServerService } from "./WebServerService";


declare global {
    const module: {exports: any};
    export class RealmoceanService<T = any> {
        Name: string;
        services: any;
        databaseService: DatabaseService;
        schemaService: SchemaService;
        emailService: EmailService;
        scheduleService: ScheduleService;
        webServer: WebServerService;
        miningService: MiningService;
        createKey(params: T): string;
    }

    export class BaseComponent {
        
    }
}