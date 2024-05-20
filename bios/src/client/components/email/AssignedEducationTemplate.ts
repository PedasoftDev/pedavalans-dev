const email = (educationUserList): string => `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eğitim Ataması</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #dddddd;
        }
        .header {
            text-align: center;
            background-color: #004085;
            color: white;
            padding: 10px 0;
        }
        .content {
            margin: 20px 0;
        }
        .content h2 {
            color: #004085;
        }
        .content p {
            line-height: 1.6;
        }
        .content ul {
            list-style-type: none;
            padding: 0;
        }
        .content ul li {
            background-color: #f4f4f4;
            margin: 5px 0;
            padding: 10px;
            border: 1px solid #dddddd;
        }
        .footer {
            text-align: center;
            background-color: #f4f4f4;
            color: #666666;
            padding: 10px 0;
            margin-top: 20px;
            border-top: 1px solid #dddddd;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Eğitim Ataması</h1>
        </div>
        <div class="content">
            <h2>Sayın {{educatorName}},</h2>
            <p>Aşağıdaki bilgilerle bir eğitim atanmıştır:</p>
            <p><strong>Eğitim Kodu:</strong> {{code}}</p>
            <p><strong>Eğitim Adı:</strong> {{name}}</p>
            <p><strong>Eğitim Saati:</strong> {{hour}}</p>
            <p><strong>Başlangıç Tarihi:</strong> {{startDate}}</p>
            <p><strong>Bitiş Tarihi:</strong> {{endDate}}</p>
            <h3>Eğitim Alacaklar Listesi:</h3>
            <ul>
                ${educationUserList.map((user) => `<li>${user}</li>`).join("")}
            </ul>
        </div>
        <div class="footer">
            <p>İyi çalışmalar,<br>Pedavalans Ekibi</p>
        </div>
    </div>
</body>
</html>
`;

export default email;