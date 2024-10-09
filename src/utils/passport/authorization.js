const authorization = role =>{
    return async (req, res, next) => {
        if(!req.user){
         return res.status(401).send({error: 'Unauthorized'})
        }    
        if(req.user.role !== role){
            return res.status(401).send({error: 'Sin permisos'})
        } 
        next()
    }
}


module.exports = authorization