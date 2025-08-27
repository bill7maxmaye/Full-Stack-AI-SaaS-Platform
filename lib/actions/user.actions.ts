"use server"
import { revalidatePath } from "next/cache";
import User from "../database/models/user.model"
import { connectToDatabase } from "../database/mongoose"
import { handleError } from "../utils";

  //this marks all of the export functions in this file as server actions A Server Action is a special async function that runs on the server, but you can call it directly from your client-side components (like a normal function).

               // It removes the need for writing a full API route (/api/user/addUser..) just to handle simple server logic like saving data, inserting into a DB, or calling an external API.

export async function createUser(user: CreateUserParams) {}
export async function updateUser(clerkId: string, user: UpdateUserParams) {}
export async function getUserById(userId: string) {}

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