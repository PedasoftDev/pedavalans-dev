// const key = await EmailBroker.Default.createKey({
//   smtpServer: "smtp-mail.outlook.com",
//   smtpPort: "587",
//   password: "V%443989818492ug",
//   username: "notification@pedabilisim.com",
//   tls: false
// })

interface IMailSettings {
  smtpServer: string
  smtpPort: string
  password: string
  username: string
  tls: boolean
}

export default IMailSettings