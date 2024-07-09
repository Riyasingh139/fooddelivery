const OrderModal = require("../model/order");

module.exports.orderData = async (req, res) => {
    let data = req.body;
    let newOrder = new OrderModal({
      userData:data.userData
    });
    let result = await newOrder.save();
    if (result) {
      res.send({
        stauts: true,
        message: " sucessfully",
        result,
      });
    } else {
      res.send({
        stauts: true,
        message: "Your registartion is failed",
        result,
      });
    }
  };