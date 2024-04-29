const mongodb=require("mongodb");
const MongoClient=mongodb.MongoClient;

let _db;

const mongoConnect=(callback=>{
MongoClient.connect('mongodb+srv://arunklt21:884vCCrMuPJbujgN@mongodbtest.jlnffhd.mongodb.net/?retryWrites=true&w=majority&appName=Mongodbtest'
).then(client=>{
    console.log("connected");
    _db=client.db();
    callback(_db);
}).catch(err=>{

    console.log("error=",err);
    throw err;
})
});

const getDb=()=>{
    if(_db){
        return _db;
    }
    throw 'No Database found';
}

//module.exports=mongoConnect;
//module.exports=getDb;

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;