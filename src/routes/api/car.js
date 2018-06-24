import routeMethods from "../../car/routeMethods";
import authRoutesMethods from "../../authorisation/routeMethods";

const express = require('express');
const router = express.Router();


/* GET car by VIN. */
router.get('/', routeMethods.getCarByVin);

// Create a new annulment transaction
router.post('/applyCancelTransaction', authRoutesMethods.isAuthorised, routeMethods.insertAnnulmentTransaction);

// Reject an existing annulment transaction
router.delete('/cancelTransaction', authRoutesMethods.isAuthorised, routeMethods.rejectAnnulmentTransaction);

/* GET cancel transaction. */
router.get('/cancelTransaction', authRoutesMethods.isAuthorised, routeMethods.getAllAnnulmentTransactions);

// Accept and existing annulment transaction
router.post('/cancelTransaction', authRoutesMethods.isAuthorised, routeMethods.acceptAnnulmentTransaction);

/* POST updateMileage. */
router.post('/mileage', authRoutesMethods.isAuthorised, routeMethods.updateMileage);

/* POST stva register. */
router.post('/register', authRoutesMethods.isAuthorised, routeMethods.registerOrUpdateOwner);

/* POST shop entry. */
router.post('/service', authRoutesMethods.isAuthorised, routeMethods.insertService);

/* POST tuev entry. */
router.post('/tuev', authRoutesMethods.isAuthorised, routeMethods.insertMainInspection);


module.exports = router;
