import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
// import cookieParser from "cookie-parser";
import {connect} from "./config/connect.js";
//ROUTERS
import employeeRoute from "./routes/employee.js";

//middleware
// import {error} from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ["http://localhost:5173", 'http://localhost:4200'],
}))

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

//routes
app.use("/api/employees", employeeRoute);

// error middleware 
// app.use(error)

const start = async () => {
    try {
        await connect(process.env.MONGO_DB_URI);
        app.listen(PORT, console.log("app is running on port:"+PORT));
    } catch (error) {
        console.log("ooops!!")
    }
}
start()