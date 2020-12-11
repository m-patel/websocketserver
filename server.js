'use strict';

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
  wss.clients.forEach((client) => {
    var json = {"position":{"timestamp":+new Date,"coordinates":{"y":Math.floor(Math.random() * 13000 - 10000) + 10000,"x":Math.floor(Math.random() * (26000 - 20000) + 20000),"type":"cartesian","id_environment":"95"}},"id_device":"efe0b14c3eb9","id":Math.round(+new Date()/1000)}
    client.send(JSON.stringify(json));
  });
}, 1000);