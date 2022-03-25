import express from 'express'
import { createColor, findAllColor } from '../controllers/color';

const router = express.Router()

router.post('/', createColor)
router.get('/', findAllColor)

export default router;