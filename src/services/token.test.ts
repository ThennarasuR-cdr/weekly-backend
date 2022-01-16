import base64url from 'base64url';
import { issueToken, verifyToken } from './token';

jest.mock('base64url');

jest.mock('js-sha256', () => ({
	sha256: { hmac: jest.fn().mockReturnValue('256') }
}));

const mockedBase64Url = base64url as jest.Mocked<typeof base64url>;

describe('Token service', () => {
	beforeEach(() => {
		Date.now = jest.fn().mockReturnValue(10);
	});

	describe('Issue token', () => {
		it('should return the JWT token', () => {
			mockedBase64Url.encode.mockReturnValue('123');

			const actualToken = issueToken({ email: 'validEmail' });

			expect(actualToken).toBe('123.123.256');
		});
	});

	describe('Verify token', () => {
		const header = '{"alg": "HS256","typ": "JWT"}';
		const payload = '{"email": "validEmail","issuedTime": "212112", "expirationTime": "0"}';

		it('should return true for valid token', () => {
			Date.now = jest.fn().mockReturnValue(-1);
			mockedBase64Url.decode.mockReturnValueOnce(header);
			mockedBase64Url.decode.mockReturnValueOnce(payload);

			const actualResult = verifyToken('validHeader.validPayload.256');

			expect(actualResult).toBe('validEmail');
		});

		it('should return false for expired token', () => {
			Date.now = jest.fn().mockReturnValue(1);
			mockedBase64Url.decode.mockReturnValueOnce(header);
			mockedBase64Url.decode.mockReturnValueOnce(payload);

			const actualResult = verifyToken('validHeader.validPayload.256');

			expect(actualResult).toBeFalsy();
		});

		it('should return false for token with invalid header', () => {
			mockedBase64Url.decode.mockReturnValueOnce('{"alg": "invalidAlg","typ": "JWT"}');
			mockedBase64Url.decode.mockReturnValueOnce(payload);

			const actualResult = verifyToken('validHeader.validPayload.256');

			expect(actualResult).toBeFalsy();
		});

		it('should return false for token with invalid secret', () => {
			mockedBase64Url.decode.mockReturnValueOnce(header);
			mockedBase64Url.decode.mockReturnValueOnce(payload);

			const actualResult = verifyToken('validHeader.validPayload.invalidSecret');

			expect(actualResult).toBeFalsy();
		});

		it('should return false for token whose content are not JSON type', () => {
			mockedBase64Url.decode.mockReturnValueOnce('not json');
			mockedBase64Url.decode.mockReturnValueOnce(payload);

			const actualResult = verifyToken('validHeader.validPayload.256');

			expect(actualResult).toBeFalsy();
		});
	});
}); 
