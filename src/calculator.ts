
export class Calculator {
    constructor(private a: number,private b: number) {

    }

    add(): number {
        return this.a + this.b;
    }

    multiply(): number {
        return this.a * this.b;
    }
        
}
  
   
