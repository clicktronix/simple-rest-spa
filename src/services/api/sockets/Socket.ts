import io from 'socket.io-client';

import { CONFIG } from 'core/config';

export class Socket {
  private io: SocketIOClient.Socket;

  constructor() {
    this.io = io.connect(CONFIG.baseUrl, {
      transports: ['websocket'],
      forceNew: true,
      port: '8080',
    });
    this.io.on('connect', () => console.info('Socket connected'));
  }
}
