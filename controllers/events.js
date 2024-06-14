import { eventModel } from '../models/Event.js'

export const getEvents = async (req, res) => {

    const events = await eventModel.find().populate('user', 'name');

    res.status(200).json({
        ok:true,
        events
    })
}

export const eventCreate = async (req, res) => {

    const event = await eventModel.create({...req.body, user: req.uid});

    try {

        res.json({
            ok: true,
            event
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error al crear el evento',
        })
    }
}   

export const eventUpdate = async (req, res) => {

    const {id} = req.params;
    const uid = req.uid;
    try {
        
        const event  = await eventModel.findById(id);

        if(!event) {
            return res.status(404).json({
                ok: false,
                message: 'El evento no existe',
            })
        }

        if(event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                message: 'Sin autorización para editar el evento',
            })
        }

        const newEvent = {
            ...req.body,
        }
        console.log(req.body)
        const updateEvent = await eventModel.updateOne({_id: id}, newEvent);

        res.json({
            ok: true,
            updateEvent
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error al actualizar el evento',
        })
    }
}

export const eventDelete = async (req, res) => {

    const {id} = req.params;
    const uid = req.uid;

    try {
        
        const event  = await eventModel.findById(id);

        if(!event) {
            return res.status(404).json({
                ok: false,
                message: 'El evento no existe',
            })
        }

        if(event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                message: 'Sin autorización para eliminar el evento',
            })
        }

        const deleteEvent = await eventModel.deleteOne({ _id: id });

        res.json({
            ok: true,
            message: 'Evento eliminado',
            deleteEvent
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error al eliminar el evento',
        })
    }
}