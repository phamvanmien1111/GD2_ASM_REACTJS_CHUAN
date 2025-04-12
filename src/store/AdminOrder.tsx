import { create } from "zustand";

interface order{
    _id:string;
    name: string;
    customerName:string;
    orderDate:string;
    price:number;
    image:string;
    quantity:number;
    status:string;
    totalPrice:number;
}
interface orderStore{
    order:order[],
    setOrder:(order:order[]) => void;
}
export const AdminOrderStore = create<orderStore>((set)=>{
    return{
        order:[],
         setOrder: (order) => set({ order }),
    }
})