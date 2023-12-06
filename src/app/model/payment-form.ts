export interface PaymentForm {
    name: string;
    number: string;
    month: string;
    year: string;
    cvv: string;
    useOnce: boolean;
    used: boolean
}