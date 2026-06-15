import { Provider } from '@nestjs/common';
import { Client, LocalAuth } from 'whatsapp-web.js';
export const WHATSAPP_CLIENT = 'WHATSAPP_CLIENT';

export const WhatsappProvider: Provider = {
  provide: WHATSAPP_CLIENT,
  useFactory: () => {
    return new Client({
      authStrategy: new LocalAuth({
        dataPath: './wwebjs_auth',
      }),
      webVersionCache: {
        type: 'local',
      },
      puppeteer: {
        headless: true,
      },
    });
  },
};
