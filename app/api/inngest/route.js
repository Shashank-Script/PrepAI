import { inngest } from "@/lib/inngest/client";
import { generateIndustryInsights } from "@/lib/inngest/inngestFunction";
import {serve} from "inngest/next";

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions:[
        generateIndustryInsights,
    ],
});