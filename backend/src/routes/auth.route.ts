import * as express from 'express';

import { AuthController } from "@controllers/auth.controller"; 
import { successResponse } from '@utils/responses';

import { validation } from '@utils/validation';
import { schemes } from '@utils/schemes';

import errorMiddleware from '@middleware/error.middleware';

const RouterAuth = {
	login: async (
		req: express.Request,
		res: express.Response,
		_next: express.NextFunction
	) => {
		await validation.validateParams(schemes.login, req.body);

		const result = await AuthController.login(req.body);
		return successResponse(res, 'Authenticated', { token: result });
	},

	signup: async (
		req: express.Request,
		res: express.Response,
		_next: express.NextFunction
	) => {
		await validation.validateParams(schemes.signup, req.body);

		const result = await AuthController.signup(req.body);
		return successResponse(res, 'Created', { result });
	}
}

const AuthRoutes = express.Router();
AuthRoutes.post('/login', errorMiddleware(RouterAuth.login));
AuthRoutes.post('/signup', errorMiddleware(RouterAuth.signup)); // todo create

export default AuthRoutes;