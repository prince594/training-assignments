import User from "../models/user";

import helper from "../helper/user";

const postUser = async (userData: any) => {
  try {
    const post = new User(userData);
    const savedPost = await post.save();
    // To send Welcome mail
    helper.welcomeEmail(savedPost);
    return savedPost
}
  catch (err: any) {
    return err;
  }
};

const getUserByEmail = async (email: any) => {
  try {
    const item = await User.findOne({ email });
    return item;
  } catch (err: any) {
    return err;
  }
};
const showUsers = async () => {
  try {
    const results = await User.find().exec();
    return results;
  } catch (error: any) {
    return error;
  }
};

export default { postUser, getUserByEmail, showUsers };
