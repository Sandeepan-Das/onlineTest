const request = require("supertest");
const app = require("../index");
const userModel = require("../src/Models/UserLogin")
const user = require("./sampleUser")
const question = require("./sampleQuestion");
const { response } = require("express");


describe("Deleting the data base and creating a new user", () => {
    beforeEach(async () => {
        await userModel.deleteMany({})
    });
    test("Should add a new user", async () => {
        const response = await request(app)
            .post("/api/users")
            .send(user)
            .expect(200)
    })
})


test("Should log in a existing user", async () => {
    const respone = await request(app)
        .post("/api/users/login")
        .send(user)
        .expect(200)
    expect(respone.body.token).toEqual(user.tokens[0].token)
    
})

test("Should not log in non existent user", async () => {
    await request(app)
        .post("/api/users/login")
        .send({
            email: user.email,
            password: "San123!fg"
        })
        .expect(400)
})

test("Should authenticate the user", async () => {
    await request(app)
        .get("/api/me")
        .set("Authorization", `Bearer ${user.tokens[0].token}`)
        .send()
        .expect(200)
})
test("Should not authenticate the user", async () => {
    await request(app)
        .get("/api/me")
        .expect(401)
})

test("Should add a question in db",async () => {
    const response = await request(app)
        .post("/api/questionBank")
        .set("Authorization", `Bearer ${user.tokens[0].token}`)
        .send(question)
        .expect(200)
    // console.log(response.status);
})
test("Should fetch the question of a user",async ()=>{
   let response = await request(app)
    .get("/api/test/getquestion")
    .set("Authorization",`Bearer ${user.tokens[0].token}`)
    .expect(200)
    // .expect(response.body[0]._id).toEqual(question._id)
    console.log(response.body[0]._id)
})
