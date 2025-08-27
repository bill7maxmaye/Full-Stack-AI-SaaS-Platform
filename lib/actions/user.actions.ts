"use server"
import { revalidatePath } from "next/cache";
import User from "../database/models/user.model"
import { connectToDatabase } from "../database/mongoose"
import { handleError } from "../utils";
import { CreateUserParams, UpdateUserParams } from "@/types";

  //this marks all of the export functions in this file as server actions A Server Action is a special async function that runs on the server, but you can call it directly from your client-side components (like a normal function).

               // It removes the need for writing a full API route (/api/user/addUser..) just to handle simple server logic like saving data, inserting into a DB, or calling an external API.

export async function createUser(user: CreateUserParams) {
    try {
        await connectToDatabase();
        const newUser =  await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        console.error("Error creating user:", error);
        handleError(error);
    }
}
export async function updateUser(clerkId: string, user: UpdateUserParams) {
    try {
        await connectToDatabase();
        const updatedUser = await User.findOneAndUpdate(
            { clerkId },
            user,
            //{ $set: user },
            { new: true }
        );
        if (!updatedUser) {
            throw new Error("User not found");
        }
        //revalidatePath("/")
        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        console.error("Error updating user:", error);
        handleError(error);
    }
}
export async function getUserById(userId: string) {
    try {
        await connectToDatabase();
        const user = await User.findOne({clerkId: userId});
        if (!user) {
            throw new Error("User not found");
        }
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error("Error getting user by ID:", error);
        handleError(error);
    }
}

export async function deleteUser(clerkId: string){
    try {
        await connectToDatabase();
        //find  user to delete
        const userToDelete = await User.findOne({clerkId});

        if (!userToDelete){
            throw new Error("User not found");
        } 
        const deletedUser = await User.findByIdAndDelete(userToDelete._id);
        revalidatePath("/")

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;

    } catch (error) {
        console.error("Error deleting user:", error);
        handleError(error);
    }
}