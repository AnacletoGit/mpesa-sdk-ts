import { Client } from "./client.js"

import "dotenv/config";

const { MPESA_PUBLIC_KEY, MPESA_API_KEY } = process.env;

if(!MPESA_PUBLIC_KEY || !MPESA_API_KEY) {
    throw new Error("MPESA_PUBLIC_KEY and MPESA_API_KEY must be set in the environment variables.");
}

const client = new Client({
    publickey: MPESA_PUBLIC_KEY,
    apikey: MPESA_API_KEY,
    serviceProviderCode: "serviceProviderCode"
})

client.c2bPayment({
    input_CustomerMSISDN: 258842211075,
    input_Amount: 100,
    input_TransactionReference: "T12344C",
    input_ThirdPartyReference: "thirdPartyReference",
    input_ServiceProviderCode: 171717
})


