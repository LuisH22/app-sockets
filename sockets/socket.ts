// Logica de sockets

import { Socket } from "socket.io";
import { Server } from 'socket.io';
import { UsuariosLista } from './../classes/usuarios-lista';
import { Usuario } from './../classes/usuario';

export const usuariosConectados = new UsuariosLista;


export const conectarCliente = (cliente: Socket ) => {

    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar(usuario);

}

export const desconectar = (cliente: Socket) => {

    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');

        usuariosConectados.borrarUsuario( cliente.id );
    });

}


export const mensaje = (cliente: Socket, io: Server) => {
    cliente.on('mensaje', (payload) => {
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload );
    })
}

export const login = (cliente: Socket, io: Server) => {
    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function ) => {
        console.log('Server-Configurando usuario', payload.nombre);

        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );

        callback({
            ok: true,
            mensaje: 'Configurado correctamente'
        });

        // io.emit('Usuario configurado', payload.nombre );
    })
}