const validate = (conditions: { [key: string]: string[] }) => {
	return (req, res, next) => {
		const body = req.body;

		const requiredFields = conditions['required'];

		let emptyFields = [];

		if (requiredFields) {
			emptyFields = requiredFields.filter(field => {
				if (!body[field]) {
					return true;
				}
			});
		}

		if (emptyFields.length === 0) {
			next();
			return;
		}
		else {
			console.log('These fields are empty: ', emptyFields);
			res.status(400).send({ message: 'Input validation failed' });
			return;
		}
	};
};

export default validate;