import { create } from "zustand";

interface order{
      name: string;
    price:number;
    image:string;
    quantity:number;
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