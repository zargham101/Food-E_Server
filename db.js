const mongoose = require('mongoose');

const mongoUrl = 'mongodb+srv://zargham:food123@cluster0.bt9ieop.mongodb.net/foodE?retryWrites=true&w=majority&appName=Cluster0';

// const connection = async () => {
//     try {
//         mongoose.set('strictQuery', false);
//         await mongoose.connect(mongoUrl);
//         console.log('Mongo connected');

//         const db = mongoose.connection.db;
//         const collection = db.collection('food_items');

//         collection.find({}).toArray(function (err, data) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 global.food_items = data;
//                 console.log(global.food_items); // To verify data is fetched
//             }
//         });
//     } catch (error) {
//         console.log(error);
//         process.exit();
//     }
// };

const mongoDb = async () => {
    try {
        await mongoose.connect(mongoUrl, { useNewUrlParser: true });
        console.log('MongoDB connected...');

        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        global.food_items = fetched_data;

        const catData = await mongoose.connection.db.collection("categories").find({}).toArray();
        global.foodCategory = catData;
        // console.log(global.food_items);
    } catch (err) {
        console.log('Error:', err);
    }
};

module.exports = mongoDb;
