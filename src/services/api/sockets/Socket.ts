import io from 'socket.io-client';
import { autobind } from 'core-decorators';
import { fromEvent, Observable } from 'rxjs';

import { Message } from 'shared/types/models';
import { CONFIG } from 'core/config';

import { MessageResponse } from '../types/models/message';

export class Socket {
  private io: SocketIOClient.Socket = {} as SocketIOClient.Socket;

  @autobind
  public init() {
    this.io = io.connect(CONFIG.baseUrl, {
      transports: ['websocket'],
      port: '8081',
    });
    this.io.on('connect', () => console.info('Socket connected'));
    this.io.on('disconnect', () => console.info('Socket disconnected'));
  }

  @autobind
  public sendMessage(message: Message) {
    this.io.emit('message', message);
  }

  @autobind
  public onMessage(): Observable<MessageResponse> {
    return fromEvent(this.io, 'message');
  }

  @autobind
  public disconnect() {
    this.io.disconnect();
  }
}
