const jwt = require('jsonwebtoken')
const fs   = require('fs');
const privateKEY  = fs.readFileSync('./private.key', 'utf8');
const i  = 'Rawble';          // Issuer 
const a  = 'https://rawble.com'; // Audience

export default (payload)=>{
    console.log("Payload", payload)
    var signOptions = {
        issuer:  i,
        audience:  a,
        // subject: s,
        expiresIn:  "2d",
        algorithm:  "RS256"   // RSASSA [ "RS256", "RS384", "RS512" ]
    };

    var token = jwt.sign(payload, privateKEY, signOptions);
    return token
}