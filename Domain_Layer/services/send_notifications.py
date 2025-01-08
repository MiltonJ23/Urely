import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import os

load_dotenv()


def send_email_notification(to_email: str, subject: str, message: str):
    from_email = os.getenv('SENDER_EMAIL')
    password = os.getenv('SENDER_PASSWORD')
    server = smtplib.SMTP(os.getenv('MAIL_ADDRESS'), int(os.getenv('MAIL_PROTOCOL')))
    server.starttls()
    server.login(from_email, password)

    msg = MIMEMultipart()
    msg["From"] = from_email
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(message, "plain"))

    server.sendmail(from_email, to_email, msg.as_string())
    server.quit()


send_email_notification('ejohdaryl@gmail.com', 'Test', 'This is a test email')