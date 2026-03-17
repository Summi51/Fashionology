const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{ type: String, required: true },
    email:{ type: String, required: true, unique: true },
    password:{ type: String, required: true },
    role:{ type: String, enum: ["user","admin"], default: "user" },
    address:{ type: String, required:true },
    phoneNumber:{ type: Number, required:true }
},
{
    versionKey:false
});

const UserModel = mongoose.model("user",userSchema);

module.exports = { UserModel };


 // http://localhost:8080/users/login and
//  http://localhost:8080/users/register

// /   "role": "user", or "admin"
// {
//   "name": "Summi",
//   "email": "admin@gmail.com",
//   "password": "admin@123",
//   "role": "admin", 
//   "address": "Phase 2",
//   "phoneNumber": 9878998766
// }