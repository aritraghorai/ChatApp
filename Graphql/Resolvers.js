const User = require("../models/user");
const bcrypt = require("bcrypt");
const user = require("../models/user");
const registerUserDataValidator = require("../validators/register.user.validator");
const { UserInputError } = require("apollo-server");
const { ZodError } = require("zod");
const { UniqueConstraintError } = require("sequelize");

const resolvers = {
  Query: {
    getUsers: async () => {
      const res = await User.findAll();
      return res;
    },
  },

  Mutation: {
    register: async (parent, args, context) => {
      try {
        //!Validate User Input
        const data = await registerUserDataValidator.parseAsync(args);
        //!Encrypt The password
        const encryptPassword = await bcrypt.hash(data.password, 10);
        //!Create New User
        const newUser = await User.create({
          username: data.username,
          email: data.email,
          password: encryptPassword,
        });
        console.log(newUser);
        //!Return New User
        return {
          username: newUser.username,
          email: newUser.email,
          id: newUser.id,
          token: createToken({ username: newUser.username }),
        };
      } catch (error) {
        console.error(error);
        let message = "";
        if (error instanceof ZodError) {
          message = error.message;
        } else if (error instanceof UniqueConstraintError) {
          message = error.errors.reduce(
            (acc, curr) => acc + `${curr.path} is already taken`,
            ""
          );
        }
        throw new UserInputError("Invalid User Data", {
          message,
        });
      }
    },
  },
};

module.exports = resolvers;
