const {
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
} = require("../util.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function index(req, res) {
  const token = req.cookies.jwt;
  if (token) {
    res.render("afterLogin", { title: "You are logged in" });
  } else res.render("index", { title: "Log in" });
}

async function createUser(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  if (password.length > 4) {
    if (await record_exsists(email)) {
      save_in_db(name, email, password, res);
    } else res.json("Email has been already used ");
  } else res.json("The length of the password must be atleast 9 characters ");
}

const maxAge = 3 * 24 * 60 * 60;

async function login(req, res) {
  const email = req.body.email;
  const user = await get_record(email);
  if (user) {
    const match = await check_password(user["password"], req.body.password);
    if (match) {
      const token = createToken(user);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).render("afterLogin", { title: "Sucessfully logged in" });
    } else res.render("UserAdded", { title: "Enter correct password" });
  } else res.render("UserAdded", { title: "User not found" });
}
async function after_login(req, res) {
  console.log("in here after login");
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.key, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken["user"][0]["user_id"]);
        res.status(200).json({ decodedToken });
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
}
async function login_page(req, res) {
  const token = req.cookies.jwt;
  if (token) {
    res.render("afterLogin", { title: "You are logged in" });
  } else res.render("UserAdded", { title: "" });
}

async function update_page(req, res) {
  res.render("update");
}

async function update_user(req, res) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.key, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        user_id = decodedToken["user"]["id"];

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        let not_duplicate = await record_exsists(email);
        if (not_duplicate) {
          let check = await edit_record(user_id, name, email, password);
          if (check == true) {
            res.clearCookie("jwt");
            const user = await get_record(email);
            const token = createToken(user);
            res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).json({ message: "User updated" });
            // res.redirect("/login", { title: "Sucessfully Updated" });
          } else
            res.render("afterLogin", {
              title: "an error occured while updating",
            });
        } else {
          res.json("The new email address is already in use");
        }
      }
    });
  } else {
    res.status(400).json("cookie not found");
  }
} //end of app.post()

async function delete_user(req, res) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.key, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        user_id = decodedToken["user"]["id"];
        await deleteUser(user_id);
        res.clearCookie("jwt");
        // res.render("index", { title: "User deleted" });
        res.json("deleted");
      }
    });
  } else {
    res.status(200).json("cookie not found");
  }
}

// Logout route
async function log_out(req, res) {
  // Clear the JWT cookie
  res.clearCookie("jwt");
  res.redirect("/login");
}

function blog_page(req, res) {
  res.render("blogPage");
}

async function add_blog(req, res) {
  console.log(req.body);
  const title = req.body.title;
  const content = req.body.article;
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.key, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        user_id = decodedToken["user"]["id"];
        await save_blog_in_db(user_id, title, content, res);
      }
    });
  } else {
    res.status(200).json("cookie not found");
  }
  // res.json(title, content);
}
async function all_blogs(req, res) {
  await get_all_blogs(res);
}

async function addLike(req, res) {
  const { blogId } = req.params;
  // Check if the user is authenticated, or you can implement your own authentication logic here
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.key, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        user_id = decodedToken["user"]["id"];
        await add_like_in_db(user_id, blogId, res);
      }
    });
  } else {
    res.status(200).json("cookie not found");
  }
}
module.exports = {
  index,
  createUser,
  login,
  after_login,
  login_page,
  update_user,
  delete_user,
  update_page,
  log_out,
  blog_page,
  add_blog,
  all_blogs,
  addLike,
};
