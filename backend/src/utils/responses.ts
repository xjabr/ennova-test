export const successResponse = (res, message, results = {}, status = 200) => {
	return res.status(status).send({
		message,
		...results,
		status
	});
};