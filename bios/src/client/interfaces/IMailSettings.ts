
interface IMailSettings {
  smtp_server: string
  smtp_port: string
  password: string
  username: string
  tls: boolean
}

export default IMailSettings