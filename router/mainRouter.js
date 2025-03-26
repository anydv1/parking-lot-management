const express = require("express");
const router = express.Router();
const parkingController = require("../controller/parkingController");

router.post("/reserve", parkingController.reserveParking);
router.get("/reservation/:email", parkingController.viewReservation);
router.get("/all-reservations", parkingController.viewAllReservations);
router.delete("/cancel/:email", parkingController.cancelReservation);
router.put("/modify/:email", parkingController.modifyParking);

module.exports = router;
