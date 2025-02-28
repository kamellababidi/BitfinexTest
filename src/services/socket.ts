import { store } from '../store';
import { setIsConnected, updateBooks } from '../store/book/slice';
import { IBook } from '../store/book/types';

import _ from 'lodash';

class Socket {

  private static instance: Socket;
  static isConnected = false;
  static socketSession: any;

  constructor() { }
  // -----------------------------------

  public static connectToSocket() {
    Socket.socketSession = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
    Socket.socketSession.onopen = () => {
      console.log('WebSocket connection opened');
      Socket.isConnected = true;
      store.dispatch(setIsConnected(true));
      let msg = JSON.stringify({
        event: 'subscribe',
        channel: 'book',
        symbol: 'tBTCUSD',
        freq: 'F0',
        len: '25',
        prec: 'P0',
        subId: 'book/tBTCUSD/P0',
        pair: 'ETHUSD',

      });
      Socket.socketSession.send(msg);
    };

    Socket.socketSession.onmessage = (e: any) => {
      const data = JSON.parse(e.data);
      if (_.isArray(data?.[1]?.[0])) {
        console.log('Message from server:', data?.[1]?.[0]);
        data.shift();
        store.dispatch(updateBooks(data[0]));
      } else if (_.isNumber(data?.[1]?.[0])) {
        const newEntry = data[1];
        if (newEntry[1] === 0) { // COUNT === 0 => delete entry from list
          const currentBooks = [...store.getState().book.books];
          const newBooks = currentBooks.filter((book: IBook) => book[0] !== newEntry[0]);
          store.dispatch(updateBooks(newBooks));
        }
        if (newEntry[1] > 0) { // COUNT > 0 => Add/edit entry from list
          const currentBooks = [...store.getState().book.books];
          let isEntryAdded = false;
          const newBooks = currentBooks.map((book: IBook) => {
            if (book[0] === newEntry[0]) {
              isEntryAdded = true;
              return newEntry;
            } else {
              return book;
            }
          });
          if (!isEntryAdded) {
            newBooks.push(newEntry);
          }
          store.dispatch(updateBooks(newBooks));
        }

      }
    };

    Socket.socketSession.onerror = (e: any) => {
      console.log('WebSocket error:', e);
      // TDOO save the error
    };

    Socket.socketSession.onclose = () => {
      console.log('Socket is closed');
      Socket.isConnected = false;
      store.dispatch(setIsConnected(false));
    };
  }
  // -----------------------------------

  public static disconnect() {
    console.log('disconnecting ...');
    Socket.socketSession.close();
  }
  // ---------------------------------------------------------------------------------------
}


export const SocketService = Socket;
