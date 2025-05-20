import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 35729 });

export function broadcastReload() {
  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      client.send('reload');
    }
  });
}

console.log('[KamilJS] 🔌 Live reload WebSocket listening on ws://localhost:35729');