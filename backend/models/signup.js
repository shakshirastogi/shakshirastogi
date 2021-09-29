const mongoose = require ('mongoose');
const UserSchema = mongoose.Schema({
    name: {
     type: String,
     required: true
     },
email: {
    type:String,
    required:true
},
Password:{
    type: String,
    required: true
},
address:{
    type: String,
    required: true
},
phone:{
    type: Number,
    required: true
},

});

module.exports = mongoose.model('User', UserSchema);