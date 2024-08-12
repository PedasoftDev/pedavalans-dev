interface EmailServiceAccessObject {
    tls: boolean;
    smtpServer: string,
    smtpPort: string,
    username: string;
    password: string;
}
export interface EmailService extends RealmoceanService<EmailServiceAccessObject> {

    sendEmail(accessKey: string,
        from_email: string,
        to_email: string, subject: string, html: string, values: any) : Promise<any>;

 
}