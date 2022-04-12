import jwt from 'jsonwebtoken';

import { JWT_SECRETS } from '@src/constants';
import UserColl from '@models/user.model';
import { assertExposable, throwExposable } from '@modules/errors';

export const authMiddleware = {
  authAssert: () => async (
    req,
    res,
    next,
  ) => {
    const bearerHeader = req.headers['authorization'];

    assertExposable(bearerHeader, 'token_not_found');

    const bearer = bearerHeader.split(' ')[1];
    assertExposable(!!bearer, 'token_not_found');

    try {
      await jwt.verify(bearer, JWT_SECRETS);
    } catch (e) {
      throwExposable('access_denied');
    }

    const { email } = jwt.decode(bearer) as any;

    const user = await UserColl.findOne({ email });
    assertExposable(user, 'access_denied');
		
		res.user = user;
		res.userId = user._id;

    next();
  }
};
