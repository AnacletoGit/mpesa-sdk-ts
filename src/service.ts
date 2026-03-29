import type { MpesaConfig, PaymentData } from "./client.js";
import { Buffer } from "buffer";
import cripto from "crypto";

export type MpesaKeys = Omit<MpesaConfig, "serviceProviderCode">


export interface MpesaSendResponse {
  output_ResponseCode: string,
  output_ResponseDesc: string,
  output_TransactionID: string,
  output_ConversationID: string,
  output_ThirdPartyReference: string
}

export interface QueryData {
  input_ThirdPartyReference: string
  input_QueryReference: string,
  input_ServiceProviderCode: number,
}

export interface QueryResponse {
  output_ConversationID: string
  output_ResponseDesc: string
  output_ResponseCode: string
  output_ThirdPartyReference: string
  output_ResponseTransactionStatus: string
}

export interface ReversalData {
    input_TransactionID: string,
    input_SecurityCredential: string,
    input_InitiatorIdentifier: string,
    input_ThirdPartyReference: string,
    input_ServiceProviderCode: string,
    input_ReversalAmount?: string,

}


export class Service {
    private publickey: string;
    private apikey: string;
    private token: string;
    private c2bUrl: string = "https://api.sandbox.vm.co.mz:18352/ipg/v1x/c2bPayment/singleStage/";
    private b2cUrl: string = "https://api.sandbox.vm.co.mz:18345/ipg//ipg/v1x/b2cPayment/";
    private b2bUrl: string = "https://api.sandbox.vm.co.mz:18349//ipg/v1x/b2bPayment/";
    private queryUrl: string = "https://api.sandbox.vm.co.mz:18353//ipg/v1x/queryTransactionStatus/";
    private reversalUrl: string = "https://api.sandbox.vm.co.mz:18354//ipg/v1x/reversal/";
    

    constructor( keys: MpesaKeys){

        this.publickey = keys.publickey;
        this.apikey = keys.apikey;
        this.token = this.generateBearerToken();

    }
    


/**
 * Sends the payment request to the M-Pesa API.
 * @param {PaymentData} data - The payment details.
 * @returns {Promise<MpesaSendResponse>} - The API response data.
 */
async send(data: PaymentData): Promise<MpesaSendResponse> {
    console.log("Initiating payment request:", data.input_ThirdPartyReference);

    try {
        const response = await fetch(this.c2bUrl, {
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


async receive(data: PaymentData): Promise<MpesaSendResponse> {
    console.log("Initiating payment request:", data.input_ThirdPartyReference);

    try {
        const response = await fetch(this.b2cUrl, {
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


async businessBusiness(data: PaymentData): Promise<MpesaSendResponse> {
    console.log("Initiating payment request:", data.input_ThirdPartyReference);

    try {
        const response = await fetch(this.b2bUrl, {
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


async queryTransaction(q: QueryData): Promise<QueryResponse>   {
    console.log("Initiating transaction query:", q.input_ThirdPartyReference  );

     try {
        const response = await fetch(this.queryUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`,
                "Origin": "developer.mpesa.vm.co.mz"
            },
            body: JSON.stringify(q)
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


async reversalQuery(data: ReversalData): Promise<MpesaSendResponse> {
    console.log("Initiating payment request:", data.input_ThirdPartyReference);

    try {
        const response = await fetch(this.reversalUrl, {
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

