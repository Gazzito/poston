// signalrService.js
import * as signalR from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr';

const createConnection = () => {
    console.log("started connection function");
    const connection =  new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5022/friendsHub", {
      accessTokenFactory: () => localStorage.getItem("token"),
    }).withAutomaticReconnect()
    .build();
    console.log("started connection function");
  return connection;
};

export { createConnection };
