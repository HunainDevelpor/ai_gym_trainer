import { HttpRouter } from "convex/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import {api} from "./_generated/api";
import {httpAction} from "./_generated/server";

const http = new HttpRouter();
http.route({
    path:'/clerk-webhook',
    method:'POST',
    handler:httpAction(async (ctx,request) =>{

        const webhooksecret=process.env.CLERK_WEBHOOK_SECRET;
        if(!webhooksecret){
            throw new Error("Missing webhook secret");
        }
        const svixId=request.headers.get("svix-id");
        const svixTimestamp=request.headers.get("svix-timestamp");
        const svixSignature=request.headers.get("svix-signature");

        if(!svixId || !svixTimestamp || !svixSignature){
            return new Response("Missing svix headers", { status: 400 });
        }
        const payload = await request.json();
        const body=JSON.stringify(payload);
        const webhook = new Webhook(webhooksecret);
        let event: WebhookEvent ;

        try {
            event = await webhook.verify(body, { "svix-id": svixId, "svix-signature": svixSignature, "svix-timestamp": svixTimestamp }) as WebhookEvent;
        } catch (error) {
            console.log("Failed to verify webhook:", error);
            return new Response("Invalid webhook", { status: 400 });
        }

        switch (event.type) {
            case "user.created":
                // Handle user created event
                const {id,first_name,last_name,image_url,email_addresses} = event.data;
                    const name = `${first_name||''} ${last_name||''}`.trim();
                    const email = email_addresses[0]?.email_address;
                    try {
                       await ctx.runMutation(api.users.syncUser, {
                            clerkId: id,
                            email,
                            image: image_url,
                            name
                        })
                    } catch (error) {
                        console.error("Error syncing user:", error);
                        return new Response("Failed to sync user", { status: 500 });
                    }
                break;
            case "user.updated":
                // Handle user updated event
                break;
            default:
                return new Response("Unknown event type", { status: 400 });
        }
        return new Response("Webhook processed Successfully", { status: 200 });

    })
})
export default http;