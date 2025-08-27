// import { clerkClient } from "@clerk/nextjs";
import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";



export async function POST(req:Request){
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET){
        throw new Error("Missing webhook secret, please add it from clerk's dashboard to your environment variables.");
    }


    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature){
        return new NextResponse("Missing svix headers", {status:400});
    }


    const payload = await req.json();
    const body =JSON.stringify(payload);

    const wh= new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (error) {
        console.error("Error verifying webhook:", error);
        return new Response("Invalid webhook signature", {status:400});
    }


    const {id: eventId} = evt.data;
    const eventType = evt.type;

    if(eventType === "user.created") {

        const {id, email_addresses, image_url, first_name, last_name, username} = evt.data;

        const user = {
            clerkId: id,
            email: email_addresses[0].email_address,
            username: username || null,
            firstName: first_name || null,
            lastName: last_name || null,
            photo: image_url || null,
        }
        const newUser = await createUser(user);
        console.log("New user created:", newUser);
        return NextResponse.json({message: "ok user created", user: newUser});
    } else if(eventType === "user.updated") {
        const {id, image_url, first_name, last_name, username} = evt.data;

        const user = {
            username: username || null,
            firstName: first_name || null,
            lastName: last_name || null,
            photo: image_url || null,
        }
        await updateUser(id, user);
    } else if(eventType === "user.deleted") {
        const {id} = evt.data;
        if (!id) {
            return new NextResponse("Missing user ID", {status: 400});
        }
        const deletedUser = await deleteUser(id as string);
        console.log("User deleted:", deletedUser);
        return NextResponse.json({message: "ok user deleted", user: deletedUser});
    }


    console.log(`webhook with an ID of ${eventId} and type ${eventType})`)

    console.log('webhook body:',  body)

    return new Response("", {status:200})
}









//    // pages/api/webhooks/clerk.js
//    import { Webhook } from '@clerk/clerk-sdk-node';

//    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

//    export default async function handler(req, res) {
//      if (req.method === 'POST') {
//        try {
//          const payload = req.body;
//          const headers = req.headers;

//          // Verify the webhook signature
//          const verifiedPayload = Webhook.verify(payload, headers, webhookSecret);

//          // Handle the event based on its type
//          switch (verifiedPayload.type) {
//            case 'user.created':
//              // Handle user creation
//              console.log('User created:', verifiedPayload.data);
//              break;
//            case 'user.updated':
//              // Handle user update
//              console.log('User updated:', verifiedPayload.data);
//              break;
//            // Add more cases as needed
//            default:
//              console.log('Unhandled event type:', verifiedPayload.type);
//          }

//          res.status(200).send('Event processed');
//        } catch (err) {
//          console.error('Error processing webhook:', err);
//          res.status(400).send('Webhook Error');
//        }
//      } else {
//        res.setHeader('Allow', 'POST');
//        res.status(405).end('Method Not Allowed');
//      }
//    }
