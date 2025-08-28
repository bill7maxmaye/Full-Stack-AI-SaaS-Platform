// import { clerkClient } from "@clerk/nextjs";
import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

// Ensure Node runtime (Svix uses node crypto)
// export const runtime = "nodejs";

export async function GET() {
  console.log("🧪 Webhook endpoint test - GET request received");
  return NextResponse.json({ 
    message: "Webhook endpoint is working", 
    timestamp: new Date().toISOString(),
    status: "active"
  });
}

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
        throw new Error("Missing webhook secret, please add it from clerk's dashboard to your environment variables.");
    }

    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new NextResponse("Missing svix headers", { status: 400 });
    }

    // IMPORTANT: Get the raw body text; do not JSON.parse first
    const rawBody = await req.text();

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;
    try {
        evt = wh.verify(rawBody, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (error) {
        console.error("Error verifying webhook:", error);
        return new Response("Invalid webhook signature", { status: 400 });
    }

    // Parse the body AFTER verification
    const payload = JSON.parse(rawBody) as WebhookEvent;
    const { id: eventId } = evt.data;
    const eventType = evt.type;

    try {
        if (eventType === "user.created") {
            console.log("👤 Processing user.created event");
            
            const { id, email_addresses, image_url, first_name, last_name, username } = payload.data as any;
            
            if (!email_addresses || email_addresses.length === 0) {
                console.error("❌ No email addresses found in user data");
                return new NextResponse("No email address found", { status: 400 });
            }

            const user = {
                clerkId: id,
                email: email_addresses[0].email_address,
                username: username,
                firstName: first_name,
                lastName: last_name,
                photo: image_url,
            }
            
            console.log("📝 Creating user with data:", user);
            
            try {
                const newUser = await createUser(user);
                console.log("✅ User created successfully:", newUser);
                return NextResponse.json({ message: "ok user created", user: newUser });
            } catch (error) {
                console.error("❌ Error creating user:", error);
                return new NextResponse("Error creating user", { status: 500 });
            }
        } else if (eventType === "user.updated") {
            const { id, image_url, first_name, last_name, username } = payload.data as any;

            const user = {
                username: username || null,
                firstName: first_name || null,
                lastName: last_name || null,
                photo: image_url || null,
            }
            const updatedUser= await updateUser(id, user);
            console.log("✅ User updated successfully:", updatedUser);
            return NextResponse.json({ message: "ok user updated" });
        } else if (eventType === "user.deleted") {
            const { id } = payload.data as any;
            if (!id) {
                return new NextResponse("Missing user ID", { status: 400 });
            }
            const deletedUser = await deleteUser(id as string);
            console.log("User deleted:", deletedUser);
            return NextResponse.json({ message: "ok user deleted", user: deletedUser });
        }

        console.log(`webhook with an ID of ${eventId} and type ${eventType})`);
        return NextResponse.json({ message: "Event processed", eventType });
    } catch (error) {
        console.error(`Error handling event ${eventType}:`, error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
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
