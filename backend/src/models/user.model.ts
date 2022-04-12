import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

import { IUserDocument } from '@src/interfaces/user.interface';

const saltRounds = 10;

const UserSchema = new mongoose.Schema<IUserDocument>({
	firstName: { type: String, required: true, default: null },
	lastName: { type: String, required: true, default: null },
	password: { type: String, required: true },
	email: {
		type: String,
		unique: true,
		required: true
	}
}, { timestamps: true });

UserSchema.pre<IUserDocument>('save', function (next) {
	// Check if document is new or a new password has been set
	if (this.isNew || this.isModified('password')) {
		// Saving reference to this because of changing scopes
		const document = this;
		bcrypt.hash(document.password, saltRounds, function (err, hashedPassword) {
			if (err) {
				next(err);
			} else {
				document.password = hashedPassword;
				next();
			}
		});
	} else {
		next();
	}
});

UserSchema.methods = {
	isCorrectPassword: async function (password) {
		return bcrypt.compare(password, this.password);
	},
}


const UserColl = mongoose.model<IUserDocument>('users', UserSchema);
export default UserColl;
