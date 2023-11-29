var express = require("express");
var router = express.Router();
const {
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
} = require("../controller/methods");
router.get("/", index);
router.post("/createUser", createUser);
router.post("/login", login);
router.get("/login", login_page);
router.patch("/updateUser", update_user);
router.get("/updateUser", update_page);
router.delete("/deleteUser", delete_user);
router.get("/logout", log_out);
router.get("/addBlog", blog_page);
router.post("/addBlog", add_blog);
router.get("/allBlogs", all_blogs);
router.post("/api/like/:blogId", addLike);
module.exports = router;
