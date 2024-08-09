import { Resources } from "../Resources";

function decrypt(encryptedText: string): string {
  const decodedText = atob(encryptedText);
  let decrypted = '';
  for (let i = 0; i < decodedText.length; i++) {
      const keyChar = Resources.MailConf.secretKey.charCodeAt(i % Resources.MailConf.secretKey.length);
      const textChar = decodedText.charCodeAt(i);
      decrypted += String.fromCharCode(textChar ^ keyChar);
  }
  return decrypted;
}

export default decrypt;