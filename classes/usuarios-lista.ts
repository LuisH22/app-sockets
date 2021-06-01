
import { Usuario } from './usuario';

export class UsuariosLista{

    private lista: Usuario[] = [];

    constructor(){}

    public agregar( usuario: Usuario ){

        this.lista.push(usuario);
        console.log('usuarios: ', this.lista);
        return usuario;
    }


    public actualizarNombre( id: string, nombre: string){
        for (const usuario of this.lista) {
            if ( usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('##############Actualizando Usuario############');
        console.log( this.lista );
    }


    // obtener lista de usuarios 
    public getLista(){
        return this.lista;
    }

    // obtener un usuario 
    public getUsuario(id: string){
        return this.lista.find( usuario => usuario.id === id );
    }


    public getUsuariosSala(sala: string){
        return this.lista.filter( usuario => usuario.sala === sala);
    }


    public borrarUsuario( id: string ){
        const tempUsuario = this.getUsuario( id );

        this.lista = this.lista.filter( usuario => usuario.id !== id );

        console.log('lista de usuarios antes de borrar', this.lista);

        return tempUsuario;
    }


}