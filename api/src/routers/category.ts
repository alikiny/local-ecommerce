import express from 'express'
import { createCategory, findAllCategory } from '../controllers/category';

const router = express.Router()

router.post('/', createCategory)
router.get('/', findAllCategory)

export default router;