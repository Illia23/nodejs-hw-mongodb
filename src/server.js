import express from "express";
import cors from "cors";
import pino from "pino-http";
import { env } from "./utils/env.js";
import { getContacts, getContactById } from "./controllers/contactsController.js";
const PORT = Number(env("PORT"));

export const setupServer =  () => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(pino({
    transport: {
        target: "pino-pretty",
    },
    }));

     app.get('/contacts', getContacts);

    app.get("/contacts/:contactId",getContactById);


    app.use("*", (req, res) => {
        res.status(404).json({
            message: "Not found"
        });
    });
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
