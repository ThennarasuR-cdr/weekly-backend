import validate from './validator';

describe('Validator', () => {
	const request = { body: { email: 'email', password: 'password', name: null } };
	const mockNext = jest.fn();
	const mockSend = jest.fn();
	const mockStatus = jest.fn().mockReturnValue({ send: mockSend });
	const response = { status: mockStatus };

	it('should call next if all the required fields are present', () => {
		const validatorMiddleware = validate({ 'required': ['email', 'password'] });

		validatorMiddleware(request, response, mockNext);

		expect(mockNext).toBeCalledTimes(1);
	});

	it('should return 400 when the required field is empty', () => {
		const updateRequest = { ...request, body: { ...request.body, email: '', password: undefined, name: null } };
		const validatorMiddleware = validate({ 'required': ['email', 'password', 'name'] });

		validatorMiddleware(updateRequest, response, mockNext);

		expect(mockStatus).toHaveBeenCalledWith(400);
		expect(mockSend).toHaveBeenCalledWith({ message: 'Input validation failed' });
	});
});
