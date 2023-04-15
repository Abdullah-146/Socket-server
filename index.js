import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
import cors from 'cors';

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('join_room', (data) => {
       
        socket.join(data);
        console.log('joined room', data);
    });
    socket.on('name', (data) => {
    
        socket.to(data.room).emit('receivedName', data.name);
    }
    );

});
server.listen(3001, () => {
    console.log('listening on *:3001');
});