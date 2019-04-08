module.exports.userAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated())
    {
       return next();
    }
    res.redirect('/auth/login');
}