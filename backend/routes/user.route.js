import { Router } from "express";
import { 
    registerUser,
    loginUser,
    changeCurrentPassword,
    logoutUser,
    getCurrentUser,
    updateAccountDetails,
    userAvatarUpdate
 } from "../controllers/user.controller";
import { verifyJWT } from "../middleware/auth.middleware";

const router = Router()

router.route("/register").post(upload.fields([
    {
        name:"avatar",
        maxCount:1
    }
]),
registerUser)

router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/user").get(verifyJWT,getCurrentUser)
router.route("/update").patch(verifyJWT,updateAccountDetails)
router.route("/update-avatar").patch(verifyJWT,userAvatarUpdate)

export default router;