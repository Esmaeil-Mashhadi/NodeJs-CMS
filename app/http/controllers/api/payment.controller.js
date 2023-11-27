const createHttpError = require("http-errors")
const { getUserBasket } = require("../../../utils/functions/dataBaseFunctions")
const { default: axios, HttpStatusCode } = require("axios")
const { paymentModel } = require("../../../models/payment")
const moment = require('moment-jalali')
const { invoiceNumberGenerator } = require("../../../utils/functions/utilityFunctions")
const { userModel } = require("../../../models/user")
const fetch = (...args) => import('node-fetch').then(({default:fetch}) => fetch(...args)) 

class PaymentController {
  paymentGateWay = async(req ,res , next)=>{
    try {
        const user = req.user
        if(!user.basket.products.length && !user.basket.courses.length) throw createHttpError.BadRequest("your basket is empty")
        const [basket] = await getUserBasket(user)

        if(!basket?.payment?.totalPayment) throw createHttpError.NotFound("couldn't find orders")

        const zarinPal_request_url = "https://sandbox.zarinpal.com/pg/v4/payment/request.json"
        const zarinpalGatewayURL = "https://sandbox.zarinpal.com/pg/StartPay"

        const zarinPal_options = {
            merchant_id: process.env.ZARINPAL_MERCHANTID, 
            amount :  basket?.payment?.totalPayment ,
            description : "buying course or product",
            metadata: {
                mobile : user.mobile || "",
                email: user?.email || ""
            },
            callback_url : "http://localhost:4000/verify"
        }

        const requestResult = await axios.post(zarinPal_request_url, zarinPal_options)
        .then(data => console.log(data)).catch(err => console.log(err))

        
        const {authority , code} = requestResult?.data

        await paymentModel.create({
            invoiceNumber: invoiceNumberGenerator(),
            paymentDate : moment().format("YYYMMDDHHmmss"),
            user : user._id,
            amount : zarinPal_options.amount,
            description: zarinPal_options.description,
            authority,
            verify:false,
            basket 

        })

        if(code == 100 && authority){
            return res.status(HttpStatusCode.Ok).json({
                statusCode:HttpStatusCode.Ok,
                data:{
                    code,
                    gatewayURL:`${zarinpalGatewayURL}/${authority}`
                }
            })
        }else{
            throw createHttpError.BadRequest('parameters are not valid ')
        }
    } catch (error) {
        next(error)
    }
  }


  verifyPayment = async(req,  res , next)=>{
     try {
        const {Authority : authority} = req.query
        const verifyURL = "https://sandbox.zarinpal.com/pg/v4/payment/verify.json"
        const payment = await paymentModel.findOne({authority})
        if(!payment) throw createHttpError.NotFound("couldn't find the transaction")
        if(payment?.verify) throw createHttpError.BadRequest('transaction done before')

        const verifyBody ={
            authority , amount : payment.amount , merchant_id:process.env.ZARINPAL_MERCHANTID
        }
        const verfyResult = await fetch(verifyURL , {
            method: "POST" , body: JSON.stringify(verifyBody) , header:{"Content-Type" :"application/json"}
        })
        const result = verfyResult.json()

        if(result.data.code == 100){
            await paymentModel.updateOne({authority} , {$set:{
                refID : result.data.ref_id , 
                cardHash: result.data.card_hash,
                verify: true
            }})

            await userModel.updateOne({_id:payment.user} , {
                $push : {
                courses : payment.basket.payment.courseID,
                products:  payment.basket.products.payment.productID
            },
               $set:{
                basket: {
                    courses :[],
                    products:[]
                }
               }
        
        })
            return res.status(HttpStatusCode.Ok).json({
                statusCode: HttpStatusCode.Ok ,
                data: {
                    message:"payment done successfully"
                }
            })
        }
        throw createHttpError.InternalServerError("Payment unsuccessful. Refund will be issued within 72 hours if money was deducted from your card.")

     } catch (error) {
        next(error)
     }
  }
}





module.exports = {
   PaymentController :  new PaymentController()
}


 