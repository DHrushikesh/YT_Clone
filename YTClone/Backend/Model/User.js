import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        description: "The username of the user."},
    email: {
        type: String,
        required: true,
        description: "The email of the user."},
    password: { 
        type: String,
        required: true,
        description: "The password of the user."},
    avatar: {
        type: String,
        description: "The avatar of the user."},
    channelName: {
        type: String,
        description: "The channel of the user."},
});

const UserDetails = mongoose.model("UserDetails", UserSchema);

export default UserDetails;