import jwt from 'jsonwebtoken';

import UserColl from '@models/user.model';
import { JWT_SECRETS } from '@src/constants';
import { assertExposable } from '@src/modules/errors';

const signToken = (user) => {
	return jwt.sign(
		{
			id: user._id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			iat: new Date().getTime(),
			exp: new Date().setDate(new Date().getDate() + 14), // Expires in 14 days
		},
		JWT_SECRETS
	);
};

export const AuthController = {
	login: async (body) => {
		const { email, password } = body;

		const user = await UserColl.findOne({ email });
    assertExposable(user, 'login_fail');

    const pwd = await user.isCorrectPassword(password);
    assertExposable(pwd, 'login_fail');

    const token = signToken(user);
    return token;
	},

	signup: async (body) =>{
		const { email } = body;

		const exists = await UserColl.exists({ email });
		assertExposable(!exists, 'already_exists');

		const user = new UserColl(body);
		const result = user.save();
		return result;
	},
}