import io from 'socket.io-client';
const SERVER_URL = 'https://admin.anreji.jp';
const socket = io(SERVER_URL, {
  transports: ['websocket'],
});
socket.connect();

socket.on('connect', () => {
  socket.on('disconnect', () => {
    console.log('connection to server lost.');
  });
  socket.on('newMessage', message => {});
});

export default socket;
