import { onRequest } from 'firebase-functions/v2/https';
import qwikApp from './server/entry-firebase.mjs';

export const app = onRequest({ cors: true }, qwikApp);
