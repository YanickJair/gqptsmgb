import { Schema, model } from "mongoose";
import { BusinessInterface } from "../interfaces/interfaces";

/**
 * @description representation of bussiness model
 *
 * @version 1.0
 * @author Yanick Andrade
 */
export const BusinessSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
        maxlength: [32, "business name cannot be greate than 32"],
    },
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
    phoneNumber: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        maxlength: [255, "address cannot be greater than 255 characther"],
        required: false,
    },
    status: {
        type: Boolean,
        required: false,
        default: true,
    },
    addedAt: {
        type: Date,
        default: Date.now,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
  });

export const BusinessModel = model<BusinessInterface>("Business", BusinessSchema);