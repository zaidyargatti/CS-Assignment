import { Router } from "express";
import protect from "../middleware/user.middleware.js";
import { getAllTasksWithAgents,   getTaskByAgent } from "../controllers/task.controller.js";


const task = Router()
task.get('/all-task',protect,getAllTasksWithAgents)
task.get('/agent/:agentId',protect,  getTaskByAgent)

export default task