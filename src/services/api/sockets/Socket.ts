import io from 'socket.io-client';
import { autobind } from 'core-decorators';
import { fromEvent, Observable } from 'rxjs';

import { Message } from 'shared/types/models';

import { MessageResponse } from '../types/models/message';

// import { CONFIG } from 'core/config';

export class Socket {
  private io: SocketIOClient.Socket = {} as SocketIOClient.Socket;

  @autobind
  public init() {
    this.io = io.connect('http://localhost:8081/', {
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
