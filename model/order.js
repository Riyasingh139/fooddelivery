let db = require("mongoose");
let Schema = db.Schema;

let OrderSchema = new Schema({
 userData :{type:Array}
});

let OrderModal = db.model("order", OrderSchema, "orders");

module.exports = OrderModal;
