//npm modules
var express=require("express");
var session=require("express-session");
var cookie=require("cookie-parser");
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var app=express();

//core modules
var path=require("path");

//otros modulos
var raiz=__dirname+"/app";
var config=require("./config/database");
var passport=require("passport");
var authRoutes=require("./routes/auth");
var isLogged=require("./middlewares/isLogged");
var raizPlantilla="./plantillas/gentelella-master/production";
var cons = require('consolidate');

mongoose.connect("mongodb://edwin:edwin@ds149567.mlab.com:49567/edwin");

require("./config/auth/passport/local")(passport);


app.set('views', "./app");
app.set('view engine', 'ejs');

//Configuración archivos estáticos
app.use("/css",express.static(raizPlantilla+"/css"));
app.use("/css",express.static("./app/css"));

app.use("/js",express.static("./plantillas/scripts"));
app.use("/js",express.static(raizPlantilla+"/js"));
app.use("/js",express.static("./app/js"));
app.use("/partials",express.static("./app/partials"));
app.use("/lib",express.static("./app/lib"));
app.use("/img",express.static("./app/img"));

app.use("/images",express.static(raizPlantilla+"/images"));




app.use("/vendors",express.static("./plantillas/gentelella-master/vendors"))
app.use("/build",express.static("./plantillas/gentelella-master/build"))


app.use(cookie());
app.use(bodyParser());

app.use(session({secret:"ASDASDSAD"}));

app.use(passport.initialize());
app.use(passport.session());


app.use("/user",authRoutes);
//Endpoint de arranque
//isLogged(raizPlantilla)
app.get("/",(req,res)=>{

res.sendFile("inicio.html",{root:"./app"});
});


app.get("/mapa",(req,res)=>{

	res.sendFile("mapa.html",{root:"./app/partials"});
});
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.sendFile("page_404.html",{root:raizPlantilla});
});


//Puerto de escucha
app.listen(8000);