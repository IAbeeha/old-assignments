const { connect, User, Blog, Like } = require("./model/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function edit_record(id, name, email, password) {
  const hash = await bcrypt.hash(password, process.env.salt);
  await User.update(
    {
      name: name,
      email: email,
      password: hash,
    },
    { where: { id: id } }
  );
  return true;
}
async function record_exsists(email) {
  email_record = await User.findOne({ where: { email: email } });
  result = email_record === null ? true : false;
  return result;
}
async function deleteUser(id) {
  await User.destroy({
    where: {
      id: id,
    },
  });
}
async function check_password(actual_password, user_password) {
  const hash = await bcrypt.hash(user_password, process.env.salt);
  console.log(hash, "hash");
  console.log(actual_password, "actual_password");

  result = actual_password == hash ? true : false;
  console.log(result);
  return result;
}

async function get_record(email) {
  email_record = await User.findOne({ where: { email: email } });
  return email_record;
}
async function save_in_db(name, email, password, res) {
  try {
    const user = User.build({
      name: name,
      email: email,
      password: password,
    });
    await user.save();
    res.render("UserAdded", { title: "User sucessfully added" });
  } catch (error) {
    // res.json(error["errors"][0]["message"]);
    res.json(error);
  }
}
const maxAge = 3 * 24 * 60 * 60;

const createToken = (user) => {
  return jwt.sign({ user }, process.env.key, {
    expiresIn: maxAge,
  });
};

async function save_blog_in_db(user_id, title, content, res) {
  try {
    const blog = Blog.build({
      userId: user_id,
      title: title,
      content: content,
    });
    await blog.save();
    res.render("index", { title: "User sucessfully added" });
  } catch (error) {
    // res.json(error["errors"][0]["message"]);
    res.json(error);
  }
}

async function get_all_blogs(res) {
  try {
    const blogs = await Blog.findAll({
      include: User,
      order: [["createdAt", "DESC"]],
    });
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(50);
  }
}

async function add_like_in_db(user_id, blogId, res) {
  try {
    // Find the user by their ID
    const user = await User.findByPk(user_id);
    // Find the blog by its ID
    const blog = await Blog.findByPk(blogId);

    if (!user || !blog) {
      return res.status(404).json({ message: "User or Blog not found" });
    }

    // Check if the user has already liked this blog
    const hasLiked = await user.hasBlog(blog);
    if (hasLiked) {
      return res
        .status(200)
        .json({ message: "User has already liked this blog" });
    } else {
      // Associate the user with the blog to represent the "like"
      await user.addBlog(blog);

      res.status(200).json({ message: "Blog liked successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to like the blog" });
  }
}
module.exports = {
  edit_record,
  record_exsists,
  check_password,
  get_record,
  save_in_db,
  createToken,
  deleteUser,
  save_blog_in_db,
  get_all_blogs,
  add_like_in_db,
};
