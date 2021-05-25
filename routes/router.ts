

import {Router, Request, Response} from 'express';

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

    res.json({
        ok: true,
        mensaje: 'POST - listo',
        cuerpo,
        de,
        id
    });
});