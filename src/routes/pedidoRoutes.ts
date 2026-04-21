import { Router } from "express";
import {
  getRelatorio,
  postPedido,
  getPedidos,
  deletePedido,
  patchStatus,
  cancelarPedido,
} from "../controllers/pedidoController.js";

const router = Router();

router.get("/relatorio", getRelatorio);
router.get("/", getPedidos);
router.post("/", postPedido);
router.delete("/:id", deletePedido);
router.patch("/:id", patchStatus);
router.patch("/:id/cancelar", cancelarPedido);

export const pedidoRoutes = router;