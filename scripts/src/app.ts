import * as express from "express";

import { init as initDb, MyModel } from "./db";

const port = 3131;
export const app = express();
app.set("port", port);

app.get("/", (req, res) => {
	res.send("a ok");
});

app.get("/test/:id", async (req, res) => {
	const obj = MyModel.findOne({ id: req.id });
	res.send(obj);
});

initDb();