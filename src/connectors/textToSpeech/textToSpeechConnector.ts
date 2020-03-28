import * as tempy from 'tempy';
import * as fs from 'fs';

const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

export default class TextToSpeechConnector {
  private api;

  constructor() {
    this.api = new TextToSpeechV1({
      authenticator: new IamAuthenticator({ apikey: process.env.TEXT_TO_SPEECH_APIKEY, }),
      url: process.env.TEXT_TO_SPEECH_URL,
    });
  }

  synthesize(text): Promise<string> {
    return new Promise((resolve, reject) => {
      const ttsFile = tempy.file({ extension: 'ogg' });

      const synthesizeStream = this.api.synthesizeUsingWebSocket({ text, accept: 'audio/ogg;codecs=opus' });
      synthesizeStream.pipe(fs.createWriteStream(ttsFile));

      // synthesizeStream.on('message', (message, data) =>  console.log(data));
      synthesizeStream.on('error', (err) => reject(err));
      synthesizeStream.on('close', (code) => {
        console.log(code);
        resolve(ttsFile);
      });
    });
  }
}
