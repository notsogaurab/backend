import { Router } from 'express';

import * as todoController from '../controllers/TodoController';

const router = Router();

router.get('/', todoController.getAllTodos);

export default router;