// import { create } from "zustand";

// export interface Product {
//   id: number;
//   name: string;
//   image: string;
//   price: number;
//   category: string;
//   status: string;
// }

// interface ProductStore {
//   products: Product[];
//   setProducts: (products: Product[]) => void;
// }

// export const useProductStore = create<ProductStore>((set) => ({
//   products: [],
//   setProducts: (products) => set({ products }),
// }));

import { create } from "zustand";

export interface Product {
  _id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  status: string;
  description: string; 
  stock: number;
}

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (_id: number, updatedProduct: Partial<Product>) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, { ...product, id: state.products.length + 1 }],
    })),
  updateProduct: (_id, updatedProduct) =>
    set((state) => ({
      products: state.products.map((p) => (p._id === _id ? { ...p, ...updatedProduct } : p)),
    })),
}));
