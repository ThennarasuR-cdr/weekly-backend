import * as tokenService from '../services/token';
import authenticate from './authenticate';

const verifyTokenSpy = jest.spyOn(tokenService, 'verifyToken');

describe('Authenticate', () => {
	const mockNext = jest.fn();
	const mockSend = jest.fn();
	const mockStatus = jest.fn().mockReturnValue({ send: mockSend });
	const request = { headers: { authorization: 'Bearer token' } };
	const response = { status: mockStatus };

	it('should authenticate the token', () => {
		verifyTokenSpy.mockReturnValue('email');

		authenticate(request, response, mockNext);

		expect(request).toStrictEqual({ ...request, user: { email: 'email' } });
		expect(mockNext).toHaveBeenCalledTimes(1);
	});

	it('should return unauthorized response', () => {
		verifyTokenSpy.mockReturnValue(false);

		authenticate(request, response, mockNext);

		expect(mockStatus).toHaveBeenCalledWith(401);
		expect(mockSend).toHaveBeenCalledWith({ message: 'Invalid Token' });
	});
});
