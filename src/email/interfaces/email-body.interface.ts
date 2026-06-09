import Mail from 'nodemailer/lib/mailer';

export interface EmailBody {
  to: string;
  subject: string;
  cc?: string;
  bcc?: string;
  text?: string;
  html?: string;
  attachments?: Mail.Attachment[];
}
