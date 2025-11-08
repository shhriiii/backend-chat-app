// server.js
const net = require('net');

const PORT = process.env.PORT || 4000;
const clients = new Map(); // Map<socket, username>

const server = net.createServer((socket) => {
  socket.setEncoding('utf-8');
  socket.write('Welcome to Simple Chat Server!\n');
  socket.write('Please login using: LOGIN <username>\n');

  let username = null;

  socket.on('data', (data) => {
    const input = data.trim();
    const [command, ...args] = input.split(' ');

    // LOGIN
    if (!username && command === 'LOGIN') {
      const name = args[0];
      if (!name) {
        socket.write('ERR missing-username\n');
        return;
      }
      // Check if username is taken
      for (let user of clients.values()) {
        if (user === name) {
          socket.write('ERR username-taken\n');
          return;
        }
      }
      username = name;
      clients.set(socket, username);
      socket.write('OK\n');
      broadcast(`INFO ${username} joined\n`, socket);
      return;
    }

    if (!username) {
      socket.write('ERR please-login-first\n');
      return;
    }

    // MSG
    if (command === 'MSG') {
      const message = args.join(' ').trim();
      if (!message) return;
      broadcast(`MSG ${username} ${message}\n`, socket);
      return;
    }

    // WHO
    if (command === 'WHO') {
      for (let user of clients.values()) {
        socket.write(`USER ${user}\n`);
      }
      return;
    }

    // DM
    if (command === 'DM') {
      const targetName = args[0];
      const msg = args.slice(1).join(' ');
      if (!targetName || !msg) {
        socket.write('ERR invalid-dm-format\n');
        return;
      }
      for (let [sock, user] of clients) {
        if (user === targetName) {
          sock.write(`DM ${username} ${msg}\n`);
          socket.write(`DM to ${targetName}: ${msg}\n`);
          return;
        }
      }
      socket.write('ERR user-not-found\n');
      return;
    }

    // PING
    if (command === 'PING') {
      socket.write('PONG\n');
      return;
    }

    socket.write('ERR unknown-command\n');
  });

  socket.on('end', () => {
    if (username) {
      broadcast(`INFO ${username} disconnected\n`, socket);
      clients.delete(socket);
    }
  });

  socket.on('error', () => {
    if (username) {
      broadcast(`INFO ${username} disconnected\n`, socket);
      clients.delete(socket);
    }
  });
});

function broadcast(message, sender) {
  for (let [sock] of clients) {
    if (sock !== sender) {
      sock.write(message);
    }
  }
}

server.listen(PORT, () => {
  console.log(`💬 Chat server running on port ${PORT}`);
});
