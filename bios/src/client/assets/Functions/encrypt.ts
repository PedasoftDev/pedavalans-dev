import * as crypto from 'crypto';
import { Resources } from '../Resources';

// XOR tabanlı şifreleme fonksiyonu
function encrypt(text: string): string {
  let encrypted = '';
  for (let i = 0; i < text.length; i++) {
    const keyChar = Resources.MailConf.secretKey.charCodeAt(i % Resources.MailConf.secretKey.length);
    const textChar = text.charCodeAt(i);
    encrypted += String.fromCharCode(textChar ^ keyChar);
  }
  return btoa(encrypted);
}

export default encrypt;