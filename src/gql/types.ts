import {
    GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLUnionType, GraphQLList, GraphQLInputObjectType, GraphQLNonNull, GraphQLID, GraphQLEnumType
} from 'graphql'
import { UserModel } from '../models/user';

export const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        _id: { type: GraphQLString },
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        password: { type: GraphQLString },
        addedAt: { type: GraphQLString },
        status: { type: GraphQLBoolean },
    })
});

export const UserInput = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: () => ({
        email: { type: new GraphQLNonNull(GraphQLString) }, //* Mandatory field
        password: { type: new GraphQLNonNull(GraphQLString) }, //* Mandatory field
        username: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
    })
});

export const BusinessType = new GraphQLObjectType({
    name: 'BusinessType',
    fields: () => ({
        _id: { type: GraphQLString },
        email: { type: GraphQLString },
        user: { type: UserType, description: 'the business owner' },
        name: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        address: { type: GraphQLString },
        addedAt: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLBoolean },
    })
});

/**
 * @description the input we use when creating our business
 */
export const BusinessInput = new GraphQLInputObjectType({
    name: 'BusinessInput',
    fields: () => ({
        email: { type: new GraphQLNonNull(GraphQLString) },
        user: { type: new GraphQLNonNull(GraphQLID), description: 'the business owner\'s Id ' },
        name: { type: new GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: GraphQLString },
        address: { type: GraphQLString },
        addedAt: { type: GraphQLString },
        description: { type: GraphQLString },
    })
});


//* This Union object we use in our PostType owner's field so when querying we can have a user if the object owner is a UserModel instance or a business otherwise
const PostOwnerUnion = new GraphQLUnionType({
    name: 'PostOwnerUnion',
    types: [UserType, BusinessType],
    resolveType(value) {
        if (value instanceof UserModel) //* if the owner field from the PostType is a UserModel instance, return UserType
            return UserType;
        return BusinessType;
    }
});


export const PostType = new GraphQLObjectType({
    name: 'PostType',
    fields: () => ({
        _id: { type: GraphQLString },
        owner: { type: PostOwnerUnion },
        onModel: { type: GraphQLString },
        description: { type: GraphQLString },
        labels: { type: new GraphQLList(GraphQLString) },
        addedAt: { type: GraphQLString },
        sharable: { type: GraphQLBoolean },
        status: { type: GraphQLBoolean },
    })
});

//* Just like our interface enum, we're making sure that the user pick the right value for the mandatory input
export const OnModelEnum = new GraphQLEnumType({
    name: 'OnModelEnum',
    values: {
        USER: { value: 'User' },
        BUSINESS: { value: 'Catalog' }
    }
});

export const PostInput = new GraphQLInputObjectType({
    name: 'PostInput',
    fields: () => ({
        owner: { type: new GraphQLNonNull(GraphQLID) }, //! mandatory field
        onModel: { type: OnModelEnum }, //* pick value from our enum options
        description: { type: GraphQLString },
        labels: { type: new GraphQLList(GraphQLString) },
        sharable: { type: GraphQLBoolean, defaultValue: true }, //* if field empty, assume true as default
    })
});