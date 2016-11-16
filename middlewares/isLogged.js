
module.exports=function(raiz){
	return function(req,res,next){
		if(req.isAuthenticated()){
			return next();
		}
		else{
			res.sendFile("/page_404.html",{root:raiz});
		}

	}
}