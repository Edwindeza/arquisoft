
var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");
var Schema=mongoose.Schema;
var userSchema=new Schema({
	nombre:{type:String},
	email:{type:String}
});

userSchema.plugin(passportLocalMongoose);
var User=mongoose.model("User",userSchema);

module.exports=User;