const express = require("express");
const { getAllUsers, getOneUser, deleteMe, topUsersFilter, updateUser, updateMe, deleteUser, getMe, resetMe, getCurrentUserRank } = require("../Controllers/UserController");
const { signup, login, protectRoutes, restrictedTo, updatePassword, logout } = require("../Controllers/AuthController");

const userRoutes = express.Router();

userRoutes.route("/signup").post(signup);
userRoutes.route("/login").post(login);

userRoutes.use(protectRoutes);

userRoutes.route("/logout").get(logout);
userRoutes.route("/deleteMe").patch(deleteMe)
userRoutes.route("/resetMe").patch(resetMe);
userRoutes.route("/updateMe").patch(updateMe);
userRoutes.route("/updatePassword").patch(updatePassword)
userRoutes.route("/topUsers").get(topUsersFilter)
userRoutes.route("/getMe").get(getMe)
userRoutes.route("/getCurrentUserRank").get(getCurrentUserRank)

userRoutes.use(restrictedTo(["admin"]))

userRoutes.route("/").get(getAllUsers)
userRoutes.route("/:id").get(getOneUser).patch(updateUser).delete(deleteUser)

module.exports = userRoutes;
