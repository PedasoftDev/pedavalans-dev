namespace Interfaces {
  export interface IMailSettings {
    smtp_server: string
    smtp_port: string
    password: string
    username: string
    tls: boolean
  }

  export interface IEmailMessage {
    $id?: string; // ID
    sender: string; // Gönderen
    recipient: string; // Alıcı
    subject: string; // Konu
    content: string; // İçerik
    status: string; // Durum (sent, failed, pending)
    errorReason: string; // Hata Nedeni
    attemptCount: number; // Deneme sayısı
  }
}

export default Interfaces