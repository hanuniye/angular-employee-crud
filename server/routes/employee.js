import express from "express"
import { UpdateEmployee, addEmployee, deleteEmployee, getEmployee, getEmployees } from "../controllers/employeeContoller.js";

const router = express.Router();

router.get("/", getEmployees)
router.post("/", addEmployee)
router.get("/:id", getEmployee)
router.patch("/:id", UpdateEmployee)
router.delete("/:id", deleteEmployee)

export default router
