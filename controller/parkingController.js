const ParkingModel = require("../model/parkingModel");

exports.reserveParking = (req, res) => {
    const { email, name, vehicleInfo } = req.body;
    if (!email || !name || !vehicleInfo) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const reservation = ParkingModel.addReservation(email, name, vehicleInfo);
    res.status(201).json({ message: "Parking spot reserved", reservation });
};

exports.viewReservation = (req, res) => {
    const reservation = ParkingModel.getReservationByEmail(req.params.email);
    reservation ? res.json(reservation).status(200) : res.status(404).json({ message: "Reservation not found" });
};

exports.viewAllReservations = (req, res) => {
    res.json(ParkingModel.getAllReservations());
};

exports.cancelReservation = (req, res) => {
    const canceled = ParkingModel.cancelReservation(req.params.email);
    canceled ? res.json({ message: "Reservation canceled" }) : res.status(404).json({ message: "No reservation found" });
};

exports.modifyParking = (req, res) => {
    const { newSpotNumber } = req.body;
    const reservation = ParkingModel.modifyReservation(req.params.email, newSpotNumber);
    reservation ? res.json({ message: "Parking spot updated", reservation }) : res.status(404).json({ message: "Reservation not found" });
};
