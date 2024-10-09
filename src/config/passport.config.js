const passport = require('passport')
const jwt = require('passport-jwt')
const {PRIVATE_KEY} = require('../utils/jwt.js')


const JWTStrategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt

//const userService = new userManagerMongo()


const inititializePassport = ()=>{
    //extrae de las token las cookies
    const cookeExtractor = req =>{
        let token = null
        if(req && req.cookies){
            token = req.cookies['token']
        }
        return token
    }
    //desencripta lo de cookeextractor
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest:ExtractJwt.fromExtractors([cookeExtractor]) ,
        secretOrKey: PRIVATE_KEY
    },async(jwt_payload,done)=>{
        try {
           //una vez desencriptado continuamos el proceso manmdando contenido del jwt
           return done(null, jwt_payload)     
        } catch (error) {
            return done(error)
        }
    }))
}

module.exports = {
    inititializePassport
}