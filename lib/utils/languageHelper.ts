import { Messages } from '../locale/message';
import { Request } from 'express';

/**
 * Retrieves localized messages based on the selected language from the request.
 *
 * @param req - The Express request object containing information about the client's request.
 * @returns A Promise that resolves with an object containing localized messages for the selected language, or rejects with an error if retrieval fails.
 */
export async function getMessages(req: Request) {
    return new Promise((resolve, reject) => {
        try {
            // Get the selected language from the app's configuration
            const selectedLanguage = req.app.get('lang') as string;
            // Initialize an empty object to hold the result
            let result: object = {};

            // Get the messages object for the selected language
            const LangMsg = Messages;
            result = LangMsg[selectedLanguage];
            return resolve(result); // Resolve the Promise with the localized messages
        } catch (e) {
            return reject(e); // Reject the Promise with an error if retrieval fails
        }
    });
}

