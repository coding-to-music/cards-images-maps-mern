const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false},
    countries: [{type : Types.ObjectId, ref: "Country"}]
})

module.exports = model('User', schema)