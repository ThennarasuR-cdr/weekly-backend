import dotenv from 'dotenv';
import base64url from 'base64url';
import { sha256 } from 'js-sha256';

dotenv.config();

const tokenEncryptionSecret = process.env.TOKEN_ENCRYPTION_SECRET;

export const issueToken = (payload: any): string => {
	const issuedTime = Date.now();
	const expirationTime = Date.now() + (3600 * 1000);

	const encodedHeader = base64url.encode(JSON.stringify({
		alg: 'HS256',
		typ: 'JWT'
	}));

	const encodedPayload = base64url.encode(JSON.stringify({ ...payload, issuedTime, expirationTime }));

	const secret = sha256.hmac(tokenEncryptionSecret, `${encodedHeader}.${encodedPayload}`);

	const token = `${encodedHeader}.${encodedPayload}.${secret}`;

	return token;
};

export const verifyToken = (token: string): boolean | string => {
	const tokenItems = token.split('.');

	let decodedHeader: any;
	let decodedPayload: any;
	try {
		decodedHeader = JSON.parse(base64url.decode(tokenItems[0]));
		decodedPayload = JSON.parse(base64url.decode(tokenItems[1]));
	} catch (error) {
		console.error('Error while parsing token items: ', error);
		return false;
	}

	if (decodedHeader.alg !== 'HS256' || decodedHeader.typ !== 'JWT') {
		console.log('Header is not matching');
		return false;
	}

	const generatedSecret = sha256.hmac(tokenEncryptionSecret, `${tokenItems[0]}.${tokenItems[1]}`);

	if (generatedSecret === tokenItems[2]) {
		if (Date.now() > decodedPayload.expirationTime) {
			console.log('Token expired');
			return false;
		}

		return decodedPayload.email;
	}

	console.log('Secret is invalid');
	return false;
};