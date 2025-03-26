const { v4: uuidv4 } = require("uuid");

let parkingReservations = [];
const addReservation = (email, name, vehicleInfo) => {
    const reservation = {
        id: uuidv4(),
        email,
        name,
        vehicleInfo,
        spotNumber: Math.floor(Math.random() * 100) + 1
    };
    parkingReservations.push(reservation);
    return reservation;
};

const getReservationByEmail = ((email) =>{
     return parkingReservations.find(r => {
        if(r.email == email){
            return r;
        }else{
            return null;
        }
    })
    });

const getAllReservations = () => parkingReservations;

const cancelReservation = (email) => {
    const initialLength = parkingReservations.length;
    parkingReservations = parkingReservations.filter(r => r.email !== email);
    return initialLength !== parkingReservations.length;
};

const modifyReservation = (email, newSpotNumber) => {
    let reservation = getReservationByEmail(email);
    if (reservation) {
        reservation.spotNumber = newSpotNumber;
        return reservation;
    }
    return null;
};

module.exports = {
    addReservation,
    getReservationByEmail,
    getAllReservations,
    cancelReservation,
    modifyReservation
};
