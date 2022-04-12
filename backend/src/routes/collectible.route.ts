import * as express from 'express';
import Joi from 'joi';

import { CollectibleController } from "@controllers/collectible.controller"; 
import { successResponse } from '@utils/responses';

import { validation } from '@utils/validation';
import { schemes } from '@utils/schemes';

import errorMiddleware from '@middleware/error.middleware';

import { authMiddleware } from '@middleware/auth.middleware';
import { assertExposable } from '@src/modules/errors';

const RouterCollectible = {
	create: async (
		req: express.Request | any,
		res: express.Response | any,
		_next: express.NextFunction
	) => {
		await validation.validateParams(schemes.collectible, req.body);
		
		assertExposable(req.files, 'bad_params');
		const result = await CollectibleController.create({ ...req.body, userId: res.userId }, req.files.image);
		return successResponse(res, 'Collectible created', { result });
	},

	getSingleCollectible: async (
		req: express.Request,
		res: express.Response | any,
		_next: express.NextFunction
	) => {
		const { id } = req.params;

		const result = await CollectibleController.getSingleCollectible(id);
		return successResponse(res, 'Collectible founded', { result });
	},

	list: async (
		req: express.Request,
		res: express.Response | any,
		_next: express.NextFunction
	) => {
		const result = await CollectibleController.list(req.query);
		return successResponse(res, 'Collectibles list', { result });
	},

	makeBid: async (
		req: express.Request,
		res: express.Response | any,
		_next: express.NextFunction
	) => {
		const { id } = req.params;

		await validation.validateParams(
			Joi.object({
				price: Joi.number().required()
			}),
			req.body
		);

		const result = await CollectibleController.makeBid(id, {
			price: req.body.price,
			userId: res.userId,
			date: new Date()
		});

		return successResponse(res, 'Bid maked', { result });
	}
}

const CollectibleRoutes = express.Router();
const authed = authMiddleware.authAssert();

CollectibleRoutes.get('/list', errorMiddleware(RouterCollectible.list));
CollectibleRoutes.get('/single/:id', errorMiddleware(RouterCollectible.getSingleCollectible));

CollectibleRoutes.post('/create', errorMiddleware(authed), errorMiddleware(RouterCollectible.create));
CollectibleRoutes.post('/single/:id/make-bid', errorMiddleware(authed), errorMiddleware(RouterCollectible.makeBid));

export default CollectibleRoutes;