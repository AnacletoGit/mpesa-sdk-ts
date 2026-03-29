import { Service, type QueryData, type ReversalData } from "./service.js";



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


    async c2bPayment(data: PaymentData) {
        
        return await this.service.send(data);
        
    }


    async b2cPayment(data: PaymentData) {
        return await this.service.receive(data);
    }


    async b2bPayment(data: PaymentData) {
        return await this.service.businessBusiness(data);
    }



    async queryTransaction(q: QueryData){

        return await this.service.queryTransaction(q);

    }

    async reversalQuery(r: ReversalData) {

        return await this.service.reversalQuery(r);
    }




}