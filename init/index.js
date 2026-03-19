const mongoose = require("mongoose");
const mongo_url='mongodb://127.0.0.1:27017/wanderlust';
const Listing=require('../models/listing.js');
const initData=require("./data.js");

main()
.then(()=>{
    console.log("connect to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(mongo_url);
}

const initDB = async () => {
    await Listing.deleteMany({});

    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner:"69b29e6e5c6009a7dc65ebe4",
        geometry: {
        type: "Point",
        coordinates: [0, 0], // fallback
      }
    }));

    await Listing.insertMany(initData.data);

    console.log("data was initialized");
};

initDB();