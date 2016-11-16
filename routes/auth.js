var express=require("express");
var router=express.Router();
var passport=require("passport");
var path=require("path");
var raiz=__dirname+"/../plantillas/gentelella-master/production";
var User=require("../models/user");

var authMiddleware=require("../middlewares/isLogged");

router.get("/login",(req,res)=>{
	res.sendFile("./login.html",{root:raiz});
});

router.post("/login",passport.authenticate('local'),(req,res)=>{
	res.redirect("/");
});

router.post("/signup",(req,res,next)=>{
	var us=new User({
		username:req.body.username,
		email:req.body.email
	})
	User.register(us,req.body.password,(err,us)=>{
		if(err){
			console.log(err);
			return next(err);
		}
	console.log("User registered");
	res.redirect("/");
	});
});

router.route("/logout")
.get((req,res)=>{
	req.logout();
	res.redirect("/");
})

module.exports=router;