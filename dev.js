import { spawn } from 'child_process';
import chokidar from 'chokidar';
import { broadcastReload } from './live-server.js';

let server;

function startServer() {
  server = spawn('node', ['server.js'], { stdio: 'inherit' });
}

function restartServer() {
  if (server) server.kill();
  console.log('🔁 Reloading server due to file changes...');
  startServer();
  broadcastReload();
}

startServer();

chokidar.watch(['pages', 'lib', 'server.js']).on('change', restartServer);
