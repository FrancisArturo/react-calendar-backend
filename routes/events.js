import { Router } from "express";
import { jwtValidator } from "../middlewares/jwtValidator.js";
import { eventCreate, eventDelete, eventUpdate, getEvents } from "../controllers/events.js";
import { check } from "express-validator";
import { fieldValidator } from "../middlewares/fieldValidator.js";
import { isDate } from "../helpers/isDate.js";


/* 
    events routes 
    /api/events

*/

const router = Router();

router.use(jwtValidator);


router.get('/', 
    getEvents
);

router.post('/', 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        fieldValidator
    ], 
    eventCreate
);

router.put('/:id', [], eventUpdate);

router.delete('/:id', [], eventDelete);

export default router;