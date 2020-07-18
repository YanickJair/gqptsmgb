import { Document } from "mongoose";

//* The UserSchema must reflect the fields in this interface
export interface UserInterface extends Document {
    _id: string;
    email?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    status?: boolean;
    addedAt?: string; 
}

//* The BusinessSchema must reflect the fields in this interface
export interface BusinessInterface extends Document {
    _id: string;
    user?: UserInterface;
    name?: string;
    email?: string;
    phoneNumber?: number;
    address?: string;
    status?: boolean;
    addedAt?: string;
    description?: string;
}

export enum OWNER {
    USER = 'User',
    BUSINESS = 'Business'
}

//* The PostSchema must reflect the fields in this interface
export interface PostsInterface extends Document {
    _id: string;
    owner?: BusinessInterface | UserInterface;
    description?: string;
    onModel?: OWNER;
    sharable?: boolean;
    status?: boolean;
    addedAt?: string;
    labels?: Array<String>;
}