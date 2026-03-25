import { Service } from "./service.js";



export interface MpesaConfig {
    publickey: string,
    apikey: string,
    serviceProviderCode: string,
}

export interface PaymentData {
    input_CustomerMSISDN: number,
    input_Amount: number,
    input_TransactionReference: string,
    input_ThirdPartyReference: string,
    input_ServiceProviderCode: number,
}


export class Client {
    private service: Service;

    constructor(private config: MpesaConfig){
        this.service = new Service({
            publickey: this.config.publickey,
            apikey: this.config.apikey,
        });
    }

    c2bPayment(data: PaymentData) {






        this.service.send(data);
        
    }









    






}