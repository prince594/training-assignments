import joi from "@hapi/joi";
import constants from '../config/constants';
import config from '../config/config';
import ejs from 'ejs';
import nodemailer from 'nodemailer';

const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(8).required(),
  confPassword: joi.ref("password"),
});

const transporter = nodemailer.createTransport(config.mailer);
const welcomeEmail = async (savedPost: any) => {
  return await ejs.renderFile(constants.dirname + "/views/index.ejs", { name: savedPost.name }, function (err: any, data: any) {
  if (err) {
      return err
  } else {
      const mainOptions = {
          from: constants.ourMail,
          to: savedPost.email,
          subject: constants.subject,
          html: data
      };
      transporter.sendMail(mainOptions, function (err: any, info: any) {
          if (err) {
              return err
          } else {

          }
      });
    }
  });
}
export default { userSchema, welcomeEmail };
