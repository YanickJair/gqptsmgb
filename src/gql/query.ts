import { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID } from "graphql";
import { UserType, BusinessType, PostType } from "./types";
import { UserInterface, BusinessInterface, PostsInterface } from "../interfaces/interfaces";
import { UserModel } from "../models/user";
import { BusinessModel } from "../models/business";
import { PostModel } from "../models/posts";

export const Query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            resolve: async (source, args, context, info): Promise<Array<UserInterface>> => {
                let users: Array<UserInterface> = [];
                try {
                    users = await UserModel.find(); //* returns all users from our collection
                } catch (error) {
                    throw error;
                }
                return users;
            }
        }, //* returns a list of user,
        user: {
            type: UserType,
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve: async (source, args, context, info): Promise<UserInterface> => {
                let user: UserInterface;
                try {
                    user = await UserModel.findById(args._id) || {} as any; //! if no user found by a given Id, return empty user object
                } catch (error) {
                    throw error;
                }
                return user;
            }
        }, //* returns a single user by given id

        businesses: {
            type: new GraphQLList(BusinessType),
            args: { user: { type: GraphQLID, description: 'we can also filter a list of business by user Id' } },
            resolve: async (source, args, context, info): Promise<Array<BusinessInterface>> => {
                let businesses: Array<BusinessInterface> = [];

                try {
                    businesses = await BusinessModel.find({ user: args.user }).populate('user'); //! filter by user's Id if given and populate the user object
                } catch (error) {
                    throw error;
                }

                return businesses;
            }
        }, //* return all registered business, or all user's business

        business: {
            type: BusinessType,
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve: async (source, args, context, info): Promise<BusinessInterface> => {
                let business: BusinessInterface;

                try {
                    business = await BusinessModel.findById(args._id) || {} as any; //! if no business found by given Id return empty object
                } catch (error) {
                    throw error;
                }

                return business;
            }
        }, //* return a single business document

        posts: {
            type: new GraphQLList(PostType),
            args: { owner: { type: GraphQLID, description: 'we can filter a list of posts by a owner Id' } },
            resolve: async (source, args, context, info): Promise<Array<PostsInterface>> => {
                let posts: Array<PostsInterface> = [];

                try {
                    posts = await PostModel.find().populate('owner'); //* find a list of posts and populate the owner's fields
                    console.log(posts)
                } catch (error) {
                    throw error;
                }

                return posts;
            }
        }, //* returns a list of posts

        post: {
            type: PostType,
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve: async (source, args, context, info): Promise<PostsInterface> => {
                let post: PostsInterface;

                try {
                    post = await PostModel.findById({ _id: args._id }).populate('owner') || {} as any; //* find a list of posts and populate the owner's fields
                } catch (error) {
                    throw error;
                }

                return post;
            }
        }, //* returns a single post by a given Id
    })
});