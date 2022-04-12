const errorMiddleware = (fn) => {
  return (req, res, next) => {
    return fn(req, res, next).catch((error) => {
      res.error = error;

      let status = error.status || 500;
      const response = {
        code: 'unknown_error',
        description: 'Internal server error',
        error: error
			};

			if(error.exposeCustom_) {
        response.code = error.message || 'unknown_error';
				
        if(error.description) {
					response.description = error.description;
        }
				
        if(error.exposeMeta) {
					// response.meta = error.exposeMeta;
        }
      }
			
			// send mail of the error
      return res.status(status || 500).send(response).end();
    })
  }
};

export default errorMiddleware;