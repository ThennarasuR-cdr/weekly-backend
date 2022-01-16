import validate from './validator';

describe('Validator', () => {
	const request = { body: { email: 'email', password: 'password', name: null, user: { email: 'email' } } };
	const mockNext = jest.fn();
	const mockSend = jest.fn();
	const mockStatus = jest.fn().mockReturnValue({ send: mockSend });
	const response = { status: mockStatus };

	it('should call next if all the required fields are present', () => {
		const validatorMiddleware = validate({ 'required': ['email', 'password', 'user.email'] });

		validatorMiddleware(request, response, mockNext);

		expect(mockNext).toBeCalledTimes(1);
	});

	it('should return 400 when the required field is empty', () => {
		const updateRequest = { ...request, body: { ...request.body, email: '', password: undefined, name: null, user: {} } };
		const validatorMiddleware = validate({ 'required': ['email', 'password', 'name', 'user.email.nonExistingField'] });

		validatorMiddleware(updateRequest, response, mockNext);

		expect(mockStatus).toHaveBeenCalledWith(400);
		expect(mockSend).toHaveBeenCalledWith({ message: 'Input validation failed' });
	});
});
