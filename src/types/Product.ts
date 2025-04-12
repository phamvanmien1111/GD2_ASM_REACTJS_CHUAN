 export interface Product {
  _id?: string;
  name: string;
  image: File;
  price: number;
  category: string;
  status: string;
  description: string;
  stock: number;
}


export interface ProductForm {
   _id: string;
  name: string;
  price: number;
  category: string;
  status: string;
  image: FileList;
  description: string;
  stock: number;
}
export enum UserRole{
    ADMIN = "admin",
    USER = "user"
}
export interface UserInterface{
  _id:string;
  username:string;
  email	:string;
  password:string;
  role:UserRole;
  fullName:string;
  phoneNumber	:string;
  address:string;
  avatar: File;
}