import http from 'https';

const isPhoneNumberValid = (phoneNumber)=>{
    var phoneno = /^([0-9]{10})$/;
    if(phoneNumber.match(phoneno)) {
        return true;
    }else {
        return false;
    }
}

const sendOtp = (otp, phoneNumber, organisation)=>{
    const AuthKey = process.env.MSG91_KEY;
    const message = "Hi, Your OTP to verify your organisation, " + organisation + ", on rawble.com is "+ otp;
    const sender = "Rawble";
    const options = {
        "method": "GET",
        "hostname": "api.msg91.com",
        "port": null,
        "path": `/api/sendhttp.php?authkey=${AuthKey}&mobiles=${phoneNumber}&unicode=&country=91&message=${message}&sender=${sender}&route=4&flash=&schtime=&afterminutes=&response=&campaign=`,
        "headers": {}
    };
    const req = http.request(options, function (res) {
        const chunks = [];
        
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
        
        res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });
    });
    
    req.end();
    
}

export default {
    isPhoneNumberValid: isPhoneNumberValid,
    sendOtp: sendOtp
}

