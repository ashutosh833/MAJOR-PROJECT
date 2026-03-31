const mongoose = require("mongoose");
const mongo_url="mongodb://127.0.0.1:27017/wanderlust";
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
    console.log("you recreated")

    initData.data = initData.data.map((obj) => ({
        ...obj,
        catagory:"india",
        category2:"castle",
        owner:"69bbda35cd7c104bcaa563a7",
        geometry: {
        type: "Point",
        coordinates: [0, 0], // fallback
      }
    }));

    await Listing.insertMany(initData.data);

    console.log("data was initialized");
};

initDB();