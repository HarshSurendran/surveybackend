import app from "./app";
import connectDB from "./config/db.config";

const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running in : https://localhost:${PORT}`);
        });  
    })
    .catch((error) => {
        console.error("Error while connecting DB", error);
    });

