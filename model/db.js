const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.database,
  process.env.user,
  process.env.password,
  {
    dialect: "mysql",
    host: process.env.host,
    port: process.env.port,
  }
);
const User = sequelize.define(
  "user",
  {
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      set(value) {
        try {
          const hash = bcrypt.hashSync(value, process.env.salt);
          this.setDataValue("password", hash);
        } catch (err) {
          console.log(err);
        }
      },
      validate: {
        len: {
          args: [5, 200],
          msg: "The password must be 9 to 20 character long.",
        },
      },
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Please use a valid email like user@example.com",
        },
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const Blog = sequelize.define(
  "blog",
  {
    title: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },

    content: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

const Like = sequelize.define("like", {
  // Define fields specific to the Like model.
});

User.hasMany(Blog, { onDelete: "CASCADE" });
Blog.belongsTo(User);

User.belongsToMany(Blog, {
  through: Like,
  as: "LikedBlogs",
  onDelete: "CASCADE",
});
Blog.belongsToMany(User, { through: Like });

User.prototype.hasBlog = async function (blog) {
  const user = this; // Reference to the user instance
  const likedBlogs = await user.getLikedBlogs(); // Get the user's liked blogs
  console.log(likedBlogs, "likedBlogs");
  return likedBlogs.some((likedBlog) => likedBlog.id === blog.id);
};

User.prototype.addBlog = async function (blog) {
  const user = this; // Reference to the user instance
  const [like, created] = await Like.findOrCreate({
    where: { userId: user.id, blogId: blog.id },
  });

  if (created) {
    return like;
  }
};
async function connect() {
  await sequelize.authenticate();
  console.log("connection established");
}
connect();

async function createTable() {
  await sequelize.sync({ alter: true });
  console.log("sync sucessful");
}
createTable();

module.exports = { connect, User, Blog, Like };
