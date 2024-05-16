
const PasswordChangedSuccessfulTemplate = () => {
  return (
    `<!DOCTYPE html>
    <html>
    
    <head>
      <style>
        /* Font Family*/
        @import url('https://fonts.googleapis.com/css2?family=Ubuntu+Sans:ital,wght@0,100..800;1,100..800&display=swap');
    
        body {
          font-family: 'Ubuntu Sans', sans-serif;
          padding: 20px;
          background-color: #d9dae0;
        }
    
        h1 {
          color: #008000;
        }
    
        p {
          color: #333;
          margin: 3px;
        }
      </style>
    </head>
    
    <body>
      <h1>Şifreniz Güncellendi</h1>
      <p style="margin-bottom: 15px;">Merhaba Sayın {{name}},</p>
      <p>Şifreniz başarıyla güncellendi. Eğer bu işlemi siz yapmadıysanız lütfen bizimle <a href="mailto:info@pedabilisim.com">iletişime</a> geçin.</p>
      <p style="margin-top: 5px;">İyi günler dileriz.</p>
      <p style="margin-top: 15px;">Pedavalans Ekibi</p>
    </body>
    
    </html>`
  )
}

export default PasswordChangedSuccessfulTemplate