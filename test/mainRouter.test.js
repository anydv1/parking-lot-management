const request = require("supertest");
const app = require("../app");

describe("Parking Lot API", () => {
    let testEmail = "user@test.com";

    it("should reserve a parking spot", async () => {
        const res = await request(app)
            .post("/parking/reserve")
            .send({ email: testEmail, name: "John Doe", vehicleInfo: "Car XYZ123" });

        expect(res.statusCode).toBe(201);
        expect(res.body.reservation).toHaveProperty("id");
        expect(res.body.reservation).toHaveProperty("spotNumber");
    });

    it("should retrieve a parking reservation by email", async () => {
        const res = await request(app).get(`/parking/reservation/${testEmail}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.email).toBe(testEmail);
    });

    it("should return all parking reservations", async () => {
        const res = await request(app).get("/parking/all-reservations");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("should modify a parking spot", async () => {
        const res = await request(app)
            .put(`/parking/modify/${testEmail}`)
            .send({ newSpotNumber: 50 });

        expect(res.statusCode).toBe(200);
        expect(res.body.reservation.spotNumber).toBe(50);
    });

    it("should cancel a parking reservation", async () => {
        const res = await request(app).delete(`/parking/cancel/${testEmail}`);
        expect(res.statusCode).toBe(200);
    });

    it("should return 404 when trying to cancel a non-existent reservation", async () => {
        const res = await request(app).delete(`/parking/cancel/${testEmail}`);
        expect(res.statusCode).toBe(404);
    });
});
