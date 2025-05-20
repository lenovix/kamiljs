const socket = new WebSocket('ws://localhost:35729');
socket.onmessage = (event) => {
  if (event.data === 'reload') {
    console.log('[KamilJS] 🔁 Reloading page...');
    window.location.reload();
  }
};