import { GraphQLObjectType, GraphQLNonNull } from "graphql";
import { UserType, UserInput, BusinessType, BusinessInput, PostType, PostInput } from "./types";
import { UserInterface, BusinessInterface, PostsInterface } from "../interfaces/interfaces";
import { startSession } from "mongoose";
import { UserModel } from "../models/user";
import { BusinessModel } from "../models/business";
import { PostModel } from "../models/posts";

export const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        createUser: {
            type: UserType,
            args: {
                input: { type: new GraphQLNonNull(UserInput) }
            },
            resolve: async (source, args, context, info): Promise<UserInterface> => {
                let user: UserInterface = {} as any;

                 //* start our session, so if anything goes wrong we can make a rollback in our changes
                 const session = await startSession();

                 try {
                     (await session).startTransaction();
 
                     user = new UserModel({ ...args.input });
                     await user.save();
 
                     (await session).commitTransaction();
                 } catch (error) {
                     (await session).abortTransaction();
                     throw error;
                 }
 
                 (await session).endSession(); 

                return user;
            }
        }, //* create a new user

        createBusiness: {
            type: BusinessType,
            args: {
                input: { type: new GraphQLNonNull(BusinessInput) }
            },
            resolve: async (source, args, context, info): Promise<BusinessInterface> => {
                let business: BusinessInterface = {} as any;

                 //* start our session, so if anything goes wrong we can make a rollback in our changes
                 const session = await startSession();

                 try {
                     (await session).startTransaction();
 
                     business = new BusinessModel({ ...args.input });
                     await business.save();
 
                     (await session).commitTransaction();
                 } catch (error) {
                     (await session).abortTransaction();
                     throw error;
                 }
 
                 (await session).endSession(); 

                return business;
            }
        }, //* create a new business

        
        createPost: {
            type: PostType,
            args: {
                input: { type: new GraphQLNonNull(PostInput) }
            },
            resolve: async (source, args, context, info): Promise<PostsInterface> => {
                let post: PostsInterface = {} as any;

                 //* start our session, so if anything goes wrong we can make a rollback in our changes
                 const session = await startSession();

                 try {
                     (await session).startTransaction();
 
                     post = new PostModel({ ...args.input });
                     await post.save();
 
                     (await session).commitTransaction();
                 } catch (error) {
                     (await session).abortTransaction();
                     throw error;
                 }
 
                 (await session).endSession(); 

                return post;
            }
        }, //* create a new business
    })
});