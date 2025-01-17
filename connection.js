const mongoose = require("mongoose");

const connectMongoDB = (http, port) => {

    const mongoString = "mongodb://localhost:27017/MemesApp"
    mongoose.connect(mongoString)
        .then(() => {
            console.log("Connected to the database successfully!");
            http.listen(port, function () {
                console.log("Backend is running on port 5000");
            });
        })
        .catch((error) => {
            console.error("Error connecting to the database:", error);
        });

}

module.exports = {
    connectMongoDB
}