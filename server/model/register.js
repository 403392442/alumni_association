const mongoose = require('mongoose')
const {Schema, model} = mongoose

const userSchema = new Schema({
    firstName:{type:String, require:true},
    lastName:{type:String, require:true},
    universityId:{type:String, require:true},
    email:{type:String, require:true},
    password:{type:String, require:true},
    cellphone:{type:String, require:true},
    streetAddress:{type:String, require:true},
    streetAddress2:{type:String},
    city:{type:String, require:true},
    state:{type:String, require:true},
    zipCode:{type:String, require:true},
    question1:{type:String, require:true},
    answer1:{type:String, require:true},
    question2:{type:String, require:true},
    answer2:{type:String, require:true},
    photo:{type:String, default: 'default.jpg'},
    description:{type:String, default: 'none'},
    isAdmin:{type:String, default:'0'},
})

const registerInfo = model('user', userSchema)
module.exports = registerInfo