import { Schema, model } from "mongoose";
import { UserInterface } from "../interfaces/interfaces";

/**
 * @description representation of user model
 *
 * @version 1.0
 * @author Yanick Andrade
 */
const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "email already in use"],
        validate: {
            validator: function (v: String) {
            return /.+@.+\..+/.test(v.toString());
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
        maxlength: 100,
        required: [true, "email cannot be empty"],
    },
    username: {
        type: String,
        unique: [true, "username already in use"],
        maxlength: 40,
        minlength: 4,
        required: false
    },
    firstName: {
        type: String,
        maxlength: [60, "first name cannot be greater than 60"],
        required: false,
    },
    lastName: {
        type: String,
        maxlength: [60, "last name cannot be greater than 60"],
        required: false,
    },
    password: {
        type: String,
        required: true,
        maxlength: [255, "password cannot be greater than 40 character"],
        minlength: [6, "password cannot be less than 6 character"],
    },
    status: {
        type: Boolean,
        default: false,
        required: false,
    },
    addedAt: {
        type: Date,
        default: Date.now,
        required: false,
    }
  });

export const UserModel = model<UserInterface>("User", UserSchema);