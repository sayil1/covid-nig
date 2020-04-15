var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var MessageSchema = new Schema(
    {
        state: String,
        call:[
            
        ],
        location: {
            type: { type: String },
            coordinates: []
        },
        created_date: {
            type: Date,
            default: Date.now,
            once: true
        },
        updated: {
            type: Date,
            default: Date.now,
        }
    }
);

MessageSchema.index({ location: "2dsphere" });

var Message = mongoose.model("Message", MessageSchema);

module.exports = Message;

