const { Router } = require("express");
const { PaymentController } = require("../../http/controllers/api/payment.controller");
const { verifyAccessToken } = require("../../http/middlewares/verifyAccessToken");

const router = Router()

router.post('/payment' , verifyAccessToken , PaymentController.paymentGateWay)
router.post('/verify' , PaymentController.verifyPayment)




module.exports = {
    apiPaymentRoute : router
}
