import { Inngest } from "inngest";

export const inngest = new Inngest({ 
    id: "prepai",
    name: "Prepai",
    credentials: {
        gemini:{
            apiKey: process.env.GEMINI_API_KEY
        },
    },
});