import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import router from "./src/routes/route";
import { MongoClient, ServerApiVersion } from "mongodb";
dotenv.config();

const DB = process.env.DATABASE_URL;
const client = new MongoClient(DB as string, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
}
run().catch(console.dir);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    // origin: [
    //     "http://localhost:5173",
    //     process.env.FRONTEND_WEB_URL as string,
    //     process.env.FRONTEND_MOBILE_URL as string,
    // ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.get("/", (req, res: express.Response) => { res.send("Hello World!") });

app.listen(port, () => console.log("Server is running on port 3000"));