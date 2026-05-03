import { Router } from "express";
import * as taskController from "../controllers/task.controller";

const router = Router();

router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskById);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
router.patch("/:id/status", taskController.updateTaskStatus);

export default router;
