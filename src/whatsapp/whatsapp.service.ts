import {
  ConflictException,
  Inject,
  Injectable,
  OnModuleInit,
  RequestTimeoutException,
  ServiceUnavailableException,
} from '@nestjs/common';

import { Client } from 'whatsapp-web.js';
import { HandlerSuccessResponse } from '../common/utils/handler-success-response';
import { SendWhatsappMessageDto } from './dto/send-whatsapp-message.dto';
import { WHATSAPP_CLIENT } from './providers/whatsapp.provider';

@Injectable()
export class WhatsappService implements OnModuleInit {
  private _isReady = false;

  constructor(@Inject(WHATSAPP_CLIENT) private readonly client: Client) {}

  onModuleInit() {
    this.client.on('authenticated', () => {
      console.log('Whatsapp authenticated');
    });
    this.client.on('ready', () => {
      this._isReady = true;
      console.log('Whatsapp ready');
    });
    this.client.on('disconnected', () => {
      this._isReady = false;
      console.log('Whatsapp disconnected');
    });
    this.client.on('auth_failure', (msg) => {
      console.log('Auth failure:', msg);
    });
    this.client.initialize();
  }

  public async generateQr() {
    if (this._isReady)
      throw new ConflictException('Whatsapp is already authenticated');

    const qrStr = await new Promise<string>((resolve, reject) => {
      const qrHandler = (qr: string) => {
        clearTimeout(timeout);
        resolve(qr);
      };

      const timeout = setTimeout(() => {
        this.client.off('qr', qrHandler);

        reject(new RequestTimeoutException('QR generation timeout'));
      }, 30000);

      this.client.once('qr', qrHandler);
    });

    return HandlerSuccessResponse.successResponse({ qrCode: qrStr });
  }

  public async sendWhatsapp({
    destinyNumber,
    message,
  }: SendWhatsappMessageDto) {
    if (!this._isReady) {
      throw new ServiceUnavailableException('Whatsapp client is not ready');
    }
    const formattedNumber = `${destinyNumber}@c.us`;
    await this.client.sendMessage(formattedNumber, message);
    return HandlerSuccessResponse.successResponse(true);
  }
}
