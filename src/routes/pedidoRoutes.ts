import { Router } from "express";
import { postPedido, getPedidos } from "../controllers/pedidoController.js";

const router = Router();

router.get("/", getPedidos);
router.post("/", postPedido);

export const pedidoRoutes = router;
