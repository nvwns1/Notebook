const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/notebook";

const connectToMongo = ()=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(mongoURI)
        .then(()=>{
            console.log("connected to mongo Successfully")
            resolve()
        })
        .catch((err)=>{
            console.log('error connecting to mongo')
            reject(err)
        })
    })
    
}

module.exports = connectToMongo;