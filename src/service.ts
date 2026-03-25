import type { MpesaConfig, PaymentData } from "./client.js";
import { Buffer } from "buffer";
import cripto from "crypto";

export type MpesaKeys = Omit<MpesaConfig, "serviceProviderCode">


interface MpesaResponse {
  output_ResponseCode: string
  output_ResponseDesc: string,
  output_TransactionID: string,
  output_ConversationID: string,
  output_ThirdPartyReference: string
}




export class Service {
    private publickey: string;
    private apikey: string;
    private token: string
    private url: string = "https://api.sandbox.vm.co.mz:18352/ipg/v1x/c2bPayment/singleStage/";
    

    constructor( keys: MpesaKeys){

        this.publickey = keys.publickey;
        this.apikey = keys.apikey;
        this.token = this.generateBearerToken();

    }
    


/**
 * Sends the payment request to the M-Pesa API.
 * @param {PaymentData} data - The payment details.
 * @returns {Promise<MpesaResponse>} - The API response data.
 */
async send(data: PaymentData): Promise<MpesaResponse> {
    console.log("Initiating payment request:", data.input_ThirdPartyReference);

    try {
        const response = await fetch(this.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`,
                "Origin": "developer.mpesa.vm.co.mz"
            },
            body: JSON.stringify(data)
        });

        // Parse the JSON response body
        const result = await response.json();

        console.log("Received response from M-Pesa API:", result);

        // Check if the HTTP status code is not in the 200-299 range
        if (!response.ok) {
            const status = response.status;
            const message = JSON.stringify(result);
            throw new Error(`M-Pesa API Error [Status ${status}]: ${message}`);
        }

        console.log("Payment processed successfully.");
        return result;

    } catch (error) {
        // Handle and re-throw the error so the caller knows it failed
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("Payment request failed:", errorMessage);
        
        throw error; 
    }
}


    
    
    

    private generateBearerToken(): string {
        const pemKey = this.base64ToPem(this.publickey);

        try{
            const encryptedData = cripto.publicEncrypt({
                key: pemKey,
                padding: cripto.constants.RSA_PKCS1_PADDING
            }, Buffer.from(this.apikey))
            return encryptedData.toString("base64"); 
            }catch (error) {
             return error instanceof Error ? error.message : String(error);      
        }

    }

    private  base64ToPem(base64: string): string {
        const formatted = base64.match(/.{1,64}/g)?.join("\n");
        return `-----BEGIN PUBLIC KEY-----\n${formatted}\n-----END PUBLIC KEY-----`;
    }


}

