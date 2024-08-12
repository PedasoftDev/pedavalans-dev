import { IRoot } from "./main";

interface IEmailMessage extends IRoot {
  sender: string; // Gönderen
  recipient: string; // Alıcı
  subject: string; // Konu
  content: string; // İçerik
  status: string; // Durum (sent, failed, pending)
  errorReason: string; // Hata Nedeni
  attemptCount: number; // Deneme sayısı
}

export default IEmailMessage;