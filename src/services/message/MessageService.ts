// import { mongooseConnection } from '../../config/mongoose.database'; // Import the mongooseConnection function

import UserModel, { User } from '../../collections/UserCollection';
import { findUserDto } from '../../types/message/UserDataType';
import { getOffset } from '../../../lib/utils/commonHelper';


async function saveUser(email: string, password: string) {
  return new Promise((resolve, reject) => {
    async function fetchData() {
      try {
           // await mongooseConnection();
        const userData = {} as User ;
        userData.email = email;
        userData.password = password;
        const newUser = new UserModel(userData);
        const user = await newUser.save();
        resolve({ user });
      } catch (e) {
        reject(e);
      }
    }
    fetchData()
      .then((result) => {
        return result;
      })
      .catch((e) => {
        return (e as Error).message;
      });
  });
}





async function findUsers(
  limit: number,
  page_num: number,
) {
  return new Promise<findUserDto>((resolve, reject) => {
    async function fetchData() {
      try {
        const offset = await getOffset(limit, page_num);
        // const projection = 'username email';
        const projection = 'email';
        const users = await UserModel.find()
          .select(projection) // Projection
          .limit(limit) // Limit
          .skip(offset); // Offset

        const users_count = await UserModel.countDocuments();
        resolve({  users_count, users });
      } catch (e) {
        reject(e);
      }
    }
    fetchData()
      .then((result) => {
        return result;
      })
      .catch((e) => {
        return (e as Error).message;
      });
  });
}

const messageService = {
  saveUser,
  findUsers,
};

export default messageService;
