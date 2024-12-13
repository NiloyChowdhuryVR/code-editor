import { httpRouter } from "convex/server";
import {httpAction} from "./_generated/server"
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import {api} from "./_generated/api"

 const http= httpRouter();

 http.route({
    path: "/clerk-webhook",
    method: "POST",
    handler: httpAction(async(ctx,request)=>{
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
        if(!webhookSecret){
            throw new Error("Missing CLERK_WEBHOOK_SECRET env variable!");
        }
        //DEBUG
        console.log("Webhook Secret:", webhookSecret);


        const svix_id = request.headers.get("svix-id");
        const svix_signature = request.headers.get("svix-signature")
        const svix_timestamp = request.headers.get("svix-timestamp")

        if(!svix_id || !svix_signature || !svix_timestamp){
            return new Response("Error Occured -- no svix headers",{status:400})
        }
        //THIS COSTED MY 2 hours as i didn't put await in payload
        const payload = await request.json();
        const body = JSON.stringify(payload);

        const wh = new Webhook(webhookSecret);
        let evt: WebhookEvent;

        try {
            evt = wh.verify(body,{
                "svix-id":svix_id,
                "svix-signature":svix_signature,
                "svix-timestamp":svix_timestamp,
            })as WebhookEvent;
        } catch (error) {
            return new Response("Error Occured Verifying Svix",{status:400})
        }

        //DEBUGGING
        console.log("Headers:", {
            svix_id,
            svix_signature,
            svix_timestamp
          });
          

        const eventType = evt.type;
        if(eventType === "user.created"){
            const {id,email_addresses,first_name,last_name} = evt.data;
            const email = email_addresses[0].email_address;
            const name = `${first_name || ""} ${last_name || ""}`.trim();

            try {
                await ctx.runMutation(api.users.syncUser,{
                    userId:id,
                    email,
                    name
                })
            } catch (error) {
                return new Response("Error creating user",{status:500})
            }
        }

        return new Response("Webhook processed successfully",{status:200})
    })
 })

 export default http;