import mock = require("supertest");

import { app } from "./app";
import { init as initDb, stop as stopDb } from "./db";

describe("typeorm with jest tests", async () => {
	beforeAll(async () => {
		await initDb();
	});

	afterAll(async () => {
		await stopDb();
	});

	it("/ should return 200 with 'a ok'", async done => {
		mock(app)
			.get("/")
			.expect(200)
			.then(res => {
				expect(res.text).toEqual("a ok");
				done();
			});
	});

	test("/test endpoint should return 200", async done => {
		mock(app)
			.get("/test/1234")
			.expect(200)
			.then(() => {
				done();
			});
	});
});
