const { createUser, showUser, updateUser,deleteUser, Adminlogin,Recruiterlogin,Candidatelogin } = require('./user.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validations')


router.post("/",createUser);
router.get("/showUser",checkToken,showUser);
router.post("/updateUser",checkToken,updateUser);
router.delete("/deleteUser/:id",checkToken,deleteUser);
router.post("/adminlogin",checkToken, Adminlogin)
router.post("/candidatelogin",checkToken, Candidatelogin)
router.post("/recruiterlogin",checkToken, Recruiterlogin)


module.exports = router; 
