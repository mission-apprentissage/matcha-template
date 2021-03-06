const { User } = require("../model");
const sha512Utils = require("../utils/sha512Utils");

const rehashPassword = (user, password) => {
  user.password = sha512Utils.hash(password);
  return user.save();
};

module.exports = async () => {
  return {
    authenticate: async (username, password) => {
      const user = await User.findOne({ username });
      if (!user) {
        return null;
      }

      const current = user.password;
      if (sha512Utils.compare(password, current)) {
        if (sha512Utils.isTooWeak(current)) {
          await rehashPassword(user, password);
        }
        return user.toObject();
      }
      return null;
    },
    getUser: (username) => User.findOne({ username }),
    createUser: async (surname, name, parcoursup_id, email, telephone, password, options = {}) => {
      const hash = options.hash || sha512Utils.hash(password);
      const permissions = options.permissions || {};

      const user = new User({
        username: email,
        nom: name,
        prenom: surname,
        parcoursup_id: parcoursup_id,
        email: email,
        telephone: telephone,
        password: hash,
        isAdmin: !!permissions.isAdmin,
      });

      await user.save();
      return user.toObject();
    },
    createAdmin: async (username, password, options = {}) => {
      let hash = options.hash || sha512Utils.hash(password);
      let permissions = options.permissions || {};

      let user = new User({
        username,
        password: hash,
        writeable: !!permissions.writeable,
        isAdmin: !!permissions.isAdmin,
      });

      await user.save();
      return user.toObject();
    },
    removeUser: async (username) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error(`Unable to find user ${username}`);
      }

      return await user.deleteOne({ username });
    },
    changePassword: async (username, newPassword) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error(`Unable to find user ${username}`);
      }

      user.password = sha512Utils.hash(newPassword);
      await user.save();

      return user.toObject();
    },
  };
};
