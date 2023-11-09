import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as https from 'https';

import * as path from 'path';
import * as cookieParser from 'cookie-parser';

const privateKeyPath = path.join(__dirname, '../private-key.pem');
const certificatePath = path.join(__dirname, '../certificate.pem');

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const certificate = fs.readFileSync(certificatePath, 'utf8');

const credentials = { key: privateKey, cert: certificate };

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: 'https://hotcoder-zp69-patsicko.vercel.app',
    credentials: true,
  })
  const httpsServer = https.createServer(credentials, app);

  // Specify the port for the server to listen on
  await httpsServer.listen(8000);
}
bootstrap();
