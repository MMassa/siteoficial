/**
 * Created by User on 26/03/2015.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

NgoSchema = mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    status: {type: String, default:"Ativa"},
    type: {type: String},
    people:[{type: ObjectId, ref:'User'}],
    website: String,
    location:{
        address: String,
        streetNumber: String,
        addressComplement: String,
        neighborhood: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    creationDate: {type: Date, default: Date.now},
    updateDate: {type: Date, default: Date.now}

});

var Ngo = mongoose.model('Ngo', NgoSchema);
module.export = Ngo;