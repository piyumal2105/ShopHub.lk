import express from "express"
import { 
    addMember,
    getRequestedMember,
    getAcceptedMember,
    updateMember,
    deleteMember,
    acceptMember,
    regMember,
    userLogin,
    getMemberById,
    updateInitialPasswordReset,

 } from "../controllers/members.controller.js";

const router = express.Router();

router.get("/requestd",getRequestedMember);
router.get("/accepted",getAcceptedMember);
router.post("/add",addMember);
router.delete("/delete/:id",deleteMember);
router.put("/update/:id",updateMember);
router.put("/accept/:id",acceptMember);
router.post("/register",regMember)
router.post("/login",userLogin)
router.get("/:id",getMemberById)
router.put("/reset/:id",updateInitialPasswordReset)




export default router;