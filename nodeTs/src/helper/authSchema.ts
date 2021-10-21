import joi from "@hapi/joi";

const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(8).required(),
  confPassword: joi.ref("password"),
});

export default { userSchema };
