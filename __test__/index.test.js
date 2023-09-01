const request = require("supertest");
const app = require("../src/server");
const { sequelize } = require("../src/models");

describe("TEST Call API", () => {
  test("GET main route", async () => {
    const res = await request(app).get("/api/v1");
    // console.log(res);
    expect(res).toBeTruthy();
    expect(res.status).toBe(200);
    expect(res.text).toMatch("EXPRESS API v1");
  });
});

describe("TRANSACTION API", () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  });
  afterAll(async () => {
    await sequelize.close();
  });
  // BAD CASE
  test("Should return 400 add product to cart when order qty greater than stock", async () => {
    const mockOrder = {
      userId: 1,
      productId: 2,
      qty: 7,
    };
    const res = await request(app)
      .post(`/api/v1/transaction/add/cart`)
      .send(mockOrder) // data request.body
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("Not enough stock");
  });
  // GOOD CASE
  test("Should return 200 add product to cart when order qty lower than equal stock", async () => {
    const mockOrder = {
      userId: 1,
      productId: 2,
      qty: 2,
    };
    const res = await request(app)
      .post(`/api/v1/transaction/add/cart`)
      .send(mockOrder) // data request.body
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual("Add to cart success");
  });
});


/**
 * Reference article :
 * - https://blog.logrocket.com/unit-integration-testing-node-js-apps/#integration-testing
 * - https://dev.to/ali_adeku/guide-to-writing-integration-tests-in-express-js-with-jest-and-supertest-1059
 */