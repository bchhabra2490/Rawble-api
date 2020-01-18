import express from 'express';
import indexRouter from './routes/index'
import path from 'path';
import dotenv from 'dotenv';
import domain from 'domain';
import mongoose from 'mongoose';

dotenv.config();
const d = domain.create()
const app = express();
app.use(express.json())
var router = express.Router();
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;


mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('mlab connection succesful');
}).catch(e=>{
    console.log("Mongoose not connected", dbUrl);
})
mongoose.Promise = global.Promise;
app.use(express.static(path.join(__dirname, './dist')));

app.use(function(req, res, next) {
    // We lost connection!
       if (1 !== mongoose.connection.readyState) {
   
           // Reconnect if we can
           mongoose.connect(dbUrl,  { useNewUrlParser: true })
               .then(() => {
                   console.log('DB connection succesful')
               })
               .catch((err) => console.log("Mongoose not connected", dbUrl));
           res.status(503).json({message: "Mongoose Not Connected"})
           throw new Error('Mongo not available');
       }
     next();
});


router.get('/', function(req, res, next) {
    res.json({ title: 'Express' });
});

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// app.use('/', router);
app.use('/api/v1', indexRouter);

app.listen(port);

process.on('SIGINT', () => { 
    mongoose.connection.close(()=>{
        console.log("Mongoose Disconnected"); 
        process.exit(); 
    });
});