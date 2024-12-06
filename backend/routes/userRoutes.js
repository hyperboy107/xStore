import express from "express";
import { createUser, loginUser, logoutUser, getAllUSers, getCurrUserProfile, updateCurUserProfile, deleteUserById, getUSerById, updateUserById } from "../controllers/userController.js";
import {authhenticate, authorizedAdmin} from "../middlewares/authMiddleware.js";
 
const router = express.Router();

router.route("/").post(createUser).get(authhenticate, authorizedAdmin, getAllUSers)
router.post("/auth", loginUser)
router.post("/logout", logoutUser)

router.route("/profile").get(authhenticate, getCurrUserProfile).put(authhenticate, updateCurUserProfile)

router.route("/:id").delete(authhenticate, authorizedAdmin, deleteUserById).get(authhenticate, authorizedAdmin, getUSerById).put(authhenticate, authorizedAdmin, updateUserById)


export default router;