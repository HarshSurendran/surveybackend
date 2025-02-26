import express from 'express'
import userRoutes from './user.routes'
import adminRoutes from './admin.routes'

const router = express.Router();

router.use('/', userRoutes)
router.use('/admin', adminRoutes)


export default router