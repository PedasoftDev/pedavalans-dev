namespace EmailTemplates {
  export const EducationEmail = `<!DOCTYPE html>
<html>

<head>
  <style>
    /* Font Family */
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

    body {
      font-family: 'Roboto', sans-serif;
      padding: 40px;
      background-color: #f4f4f9;
      color: #333;
    }

    h1 {
      color: #004085;
      font-size: 24px;
      margin-bottom: 20px;
      border-bottom: 2px solid #004085;
      padding-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    p {
      margin: 10px 0;
      line-height: 1.6;
    }

    .highlight {
      color: #0056b3;
      font-weight: 500;
    }

    .signature {
      margin-top: 40px;
      font-size: 14px;
      color: #666;
    }

    .container {
      max-width: 600px;
      margin: auto;
      background-color: #ffffff;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }
       ul {
        list-style-type: none;
        padding: 0;
    }
     ul li {
        background-color: #f4f4f4;
        margin: 5px 0;
        padding: 10px;
        border: 1px solid #dddddd;
    }
     .footer {
        text-align: center;
        background-color: #f4f4f9;
        color: #666666;
        padding: 10px 0;
        margin-top: 20px;
        border-top: 1px solid #dddddd;
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>Eğitim Kaydı Bildirimi<img src="data:image/png;base64,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" width="40px"/></h1>
    <p>Merhaba Sayın {{educatorName}},</p>
   <p>Aşağıdaki bilgiler ile yeni bir eğitim kaydı açılmıştır:</p>
    <p><strong>Eğitim Kodu:</strong> <span class="highlight">{{code}}</span></p>
    <p><strong>Eğitim Adı:</strong> <span class="highlight">{{name}}</span></p>
    <p><strong>Eğitim Süresi:</strong> <span class="highlight">{{hour}}</span></p>
    <p><strong>Eğitim Başlangıç Saati:</strong> <span class="highlight">{{hour}}</span></p>
    <p><strong>Başlangıç Tarihi:</strong> <span class="highlight">{{startDate}}</span></p>
    <p><strong>Bitiş Tarihi:</strong> <span class="highlight">{{endDate}}</span></p>
    <p><strong>Eğitim Yeri:</strong> <span class="highlight">{{location}}</span></p>
    <p><strong>Eğitim Alacak Çalışan:</strong> <span class="highlight">{{employeeName}}</span></p>
    <div class="footer">
        <p>İyi çalışmalar<br>Pedavalans Ekibi</p>
    </div>
  </div>
</body>

</html>
`;

  export const getTemplate = (templateName: string) => {
    switch (templateName) {
      case 'education':
        return EducationEmail;
      default:
        return '';
    }
  }
}

export default EmailTemplates;