// Logica de sockets

import { Socket } from "socket.io";
import { Server } from 'socket.io';
import { UsuariosLista } from './../classes/usuarios-lista';
import { Usuario } from './../classes/usuario';

export const usuariosConectados = new UsuariosLista;


export const conectarCliente = (cliente: Socket, io: Server ) => {

    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar(usuario);

}

export const desconectar = (cliente: Socket, io: Server) => {

    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');

        usuariosConectados.borrarUsuario( cliente.id );

        io.emit( 'usuarios-activos', usuariosConectados.getLista() );

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

        io.emit( 'usuarios-activos', usuariosConectados.getLista() );

        callback({
            ok: true,
            mensaje: 'Configurado correctamente'
        });

        // io.emit('Usuario configurado', payload.nombre );
    })
}

export const obtenerUsuarios = (cliente: Socket, io: Server) => {
    cliente.on('obtener-usuarios', () => {
        console.log('Obtener usuarios');
        io.in( cliente.id ).emit('usuarios-activos', usuariosConectados.getLista() );
    })
}