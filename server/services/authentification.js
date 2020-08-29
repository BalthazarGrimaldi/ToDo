var jwtDecode = require('jwt-decode');
// app's client IDs to check with audience in ID Token.
const clientId = "927723414099-pqq7gbi2jfguo1oe012376skc5t6coe8.apps.googleusercontent.com";


module.exports= function(req, res, next){
    var idtoken = req.headers.authorization;
    
    try {
        var decoded = jwtDecode(idtoken);
        if(decoded.aud === clientId){
            next();
        }else{
            res.sendStatus(401);
            return;
        } 
    } catch (e) {
        res.sendStatus(401);
        return;
    }   
};