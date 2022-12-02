import knexConnection from "../database/db";
import request from "supertest";
import app from "../app";
import { Test } from "../utils/types";

beforeAll(async () => {
  try {
    await knexConnection.migrate.latest({ directory: "migrations" });
    console.log("Migration complete");
  } catch (e) {
    console.log("Migration Failed");
  }
});

afterAll(async () => {
  try {
    await knexConnection.migrate.rollback({ directory: "migrations" });
    knexConnection.destroy();
  } catch (e) {
    console.log(e);
  }
});

const testInput: Test = {
  BASE_URL: "/api/v1",
  testUserOne: {
    password: "password",
    email: "zack@gmail.com",
    username: "zackOverflow",
  },
  testUserTwo: {
    password: "password",
    email: "bello@gmail.com",
    username: "belloOverflow",
  },
};

describe("User Authentication", () => {
  it("should register new user", async () => {
    const res0 = await request(app)
      .post(`${testInput.BASE_URL}/auth/signup`)
      .send(testInput.testUserOne);

    const res1 = await request(app)
      .post(`${testInput.BASE_URL}/auth/signup`)
      .send(testInput.testUserTwo);

    expect(res0.body.status).toBe("success");
    expect(res0.status).toBe(201);

    expect(res0.body.user.name).toBe(testInput.testUserOne.username);
    expect(res0.body.user.email).toBe(testInput.testUserOne.email);

    testInput.testUserOne.token = res0.body.token.token;
    testInput.testUserOne.id = res0.body.user.id;

    testInput.testUserTwo.token = res1.body.token.token;
    testInput.testUserTwo.id = res1.body.user.id;

    expect(res0.status).toBe(201);
  });

  it("should login user", async () => {
    const res0 = await request(app)
      .post(`${testInput.BASE_URL}/auth/login`)
      .send({
        email: testInput.testUserOne.email,
        password: testInput.testUserOne.password,
      });

    expect(res0.body.status).toBe("success");
    expect(res0.status).toBe(200);
    expect(res0.body.user.name).toBe(testInput.testUserOne.username);
    expect(res0.body.user.email).toBe(testInput.testUserOne.email);
  });
});

describe("Create New Accounts", () => {
  it("should create accounts", async () => {
    const res0 = await request(app)
      .post(`${testInput.BASE_URL}/accounts/create`)
      .set("Authorization", `Bearer ${testInput.testUserOne.token}`);

    const res2 = await request(app)
      .post(`${testInput.BASE_URL}/accounts/create`)
      .set("Authorization", `Bearer ${testInput.testUserTwo.token}`);

    expect(res0.status).toBe(201);
    expect(res0.body.data.user_id).toBe(testInput.testUserOne.id);

    testInput.testUserOne.account_number = res0.body.data.account_number;
    testInput.testUserTwo.account_number = res2.body.data.account_number;
  });
});

describe("Accounts Transaction", () => {
  it("should Fund Account", async () => {
    const res0 = await request(app)
      .post(`${testInput.BASE_URL}/accounts/fund`)
      .send({ amount: 3000 })
      .set("Authorization", `Bearer ${testInput.testUserTwo.token}`);

    expect(res0.status).toBe(201);
  });

  it("should get account balance of a user", async () => {
    const res0 = await request(app)
      .get(`${testInput.BASE_URL}/accounts/balance`)
      .set("Authorization", `Bearer ${testInput.testUserTwo.token}`);

    expect(res0.status).toBe(200);
    expect(res0.body.data.balance).toBe(3000);
  });
});

describe("withdraw and transfer", () => {
  it("should withdraw from account", async () => {
    const res0 = await request(app)
      .post(`${testInput.BASE_URL}/accounts/withdraw`)
      .send({ amount: 1000 })
      .set("Authorization", `Bearer ${testInput.testUserTwo.token}`);

    expect(res0.body.data.balance).toBe(2000);
    expect(res0.status).toBe(201);
  });

  it("should transfer funds", async () => {
    const res0 = await request(app)
      .post(`${testInput.BASE_URL}/accounts/transfer`)
      .send({
        amount: 1000,
        receiverAcct: testInput.testUserOne.account_number,
      })
      .set("Authorization", `Bearer ${testInput.testUserTwo.token}`);

    expect(res0.status).toBe(200);
  });

  it("should receive funds", async () => {
    const res0 = await request(app)
      .get(`${testInput.BASE_URL}/accounts/balance`)
      .set("Authorization", `Bearer ${testInput.testUserOne.token}`);

    expect(res0.status).toBe(200);
    // expect(res0.body.data.balance).toBe(1000);
  });
});
