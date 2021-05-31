// Logica de sockets

import { Socket } from "socket.io";
import { Server } from 'socket.io';

export const desconectar = (cliente: Socket) => {

    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
}


export const mensaje = (cliente: Socket, io: Server) => {
    cliente.on('mensaje', (payload) => {
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload );
    })
}