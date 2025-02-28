import express from "express";
import adminControllers from "../controllers/admin.controllers";

const router = express.Router();

router.post('/login', adminControllers.login);
router.get('/surveys', adminControllers.fetchAllSurveys);

export default router