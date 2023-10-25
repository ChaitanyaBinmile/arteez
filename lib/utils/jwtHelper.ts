import jwt from 'jsonwebtoken';
import AppConfig from '../utils/AppConfig';

/**
 * Verifies a JWT token and returns the decoded user information.
 *
 * @param input - The JWT token to be verified.
 * @returns A Promise that resolves with the decoded user information if the token is valid, or rejects with an error if verification fails.
 */
export async function tokenVerify(input: string) {
    return new Promise((resolve, reject) => {
        try {
            // Verify the input JWT token using the secret from the app configuration
            const decodedUser = jwt.verify(input, AppConfig.jwt.secret);
            return resolve(decodedUser);
        } catch (e) {
            return reject(e); // Reject the Promise with an error if verification fails
        }
    });
}

