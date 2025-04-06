package mail

import (
	"fmt"
	"net/smtp"
)


func SendGmail(from, password, to, subject, name, body string) error {

	htmlBody := `
		<!DOCTYPE html>
		<html lang="it">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>` + subject + `</title>
			<style>
				body {
					font-family: Arial, sans-serif;
					background-color: #f4f4f4;
					color: #333;
					padding: 20px;
				}
				.container {
					max-width: 600px;
					margin: auto;
					background-color: #fff;
					padding: 20px;
					border-radius: 8px;
					box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
				}
				.header {
					text-align: center;
					color: #4CAF50;
				}
				.header h1 {
					font-size: 24px;
				}
				.button {
					background-color: #4CAF50;
					color: white;
					padding: 10px 20px;
					text-align: center;
					border-radius: 5px;
					text-decoration: none;
					display: inline-block;
					font-weight: bold;
				}
				.footer {
					text-align: center;
					color: #777;
					font-size: 12px;
					margin-top: 20px;
				}
			</style>
		</head>
		<body>
			<div class="container">
				<div class="header">
					<h1>`+ subject +`</h1>
				</div>
				<p>Hello, ` + name + `!</p>
				<p>Grazie per aver scelto di utilizzare i nostri servizi. Siamo entusiasti di averti con noi e non vediamo l'ora di offrirti la migliore esperienza possibile.</p>
				<p>` + body + `</p>
			</div>
		</body>
		</html>`

	smtpHost := "smtp.gmail.com"
	smtpPort := "587"


	auth := smtp.PlainAuth("", from, password, smtpHost)


	message := []byte("Subject: " + subject + "\r\n" +
		"From: " + from + "\r\n" +
		"To: " + to + "\r\n" +
		"Content-Type: text/html; charset=UTF-8\r\n" +
		"\r\n" + htmlBody)

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{to}, message)
	if err != nil {
		return fmt.Errorf("errore nell'invio dell'email: %v", err)
	}

	return nil
}