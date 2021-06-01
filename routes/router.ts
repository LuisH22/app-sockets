

import {Router, Request, Response} from 'express';
import Servidor from '../classes/server'
import { usuariosConectados } from '../sockets/socket';

export const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo ok'
    });
});

router.post('/mensajes', (req: Request, res: Response) => {
    
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = { de, cuerpo };

    const server = Servidor.instance;

    server.io.emit( 'mensaje-nuevo', payload );
    res.json({
        ok: true,
        mensaje: 'POST - listo',
        cuerpo,
        de
    });
});

router.put('/mensajes/:id', (req: Request, res: Response) => {
    
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Servidor.instance;

    server.io.in( id ).emit( 'mensaje-privado', payload )

    res.json({
        ok: true,
        mensaje: 'POST - listo',
        cuerpo,
        de,
        id
    });
});

// servicio para obtener todos los IDs de los usuarios 

router.get('/usuarios', (req: Request, res: Response) => {
    
    const server = Servidor.instance;

    server.io.allSockets().then((clientes)=>{
        console.log('clientes de allSockets', clientes);
        res.json({
            ok:true,
            clientes: Array.from(clientes)
        });
    }).catch((err)=>{
        res.json({
            ok:false,
            err
        })
    });

});

router.get('/usuarios/detalle', (req: Request, res: Response) => {

    // usuariosConectados.getLista()

    res.json({
        ok:false,
        clientes: usuariosConectados.getLista()
    })

});
