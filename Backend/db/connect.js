const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://shopkart:skanda123@cluster0.ocmb1xg.mongodb.net/shopkart?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log("db connected"))
.catch((err) => console.log(`an error occurred in connecting to db:${err}`));
