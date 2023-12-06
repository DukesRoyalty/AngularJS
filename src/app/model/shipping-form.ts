export interface ShippingForm {
    name: string;
    shipping: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: string;
        address2: string;
        city: string;
        state:string;
        zip: string;
        country: string;
    }
}