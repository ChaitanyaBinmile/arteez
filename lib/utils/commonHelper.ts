export async function getOffset(pageSize: number, pageNumber: number): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    try {
      if (pageNumber <= 0 || pageSize <= 0) {
        reject('INVALID_PAGE_NUMBER');
      } else {
        const offset = (pageNumber - 1) * pageSize;
        resolve(offset);
      }
    } catch (e) {
      reject(e);
    }
  });
}
export async function capitalizeWords(inputString: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    try {
      // Split the input string into words
      const words = inputString.split(' ');

      // Iterate through each word and capitalize the first character
      const capitalizedWords = words.map((word) => {
        if (word.length > 0) {
          const firstChar = word.charAt(0).toUpperCase();
          const restOfWord = word.slice(1).toLowerCase();
          return firstChar + restOfWord;
        }
        return word; // Handle empty words
      });

      // Join the capitalized words back into a string
      const resultString = capitalizedWords.join(' ');

      resolve(resultString);
    } catch (error) {
      reject(error);
    }
  });
}
export async function isUUID(inputString: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    try {
      const uuidV4Pattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
      const isUuidV4 = uuidV4Pattern.test(inputString);
      resolve(isUuidV4);
    } catch (error) {
      reject(error);
    }
  });
}


