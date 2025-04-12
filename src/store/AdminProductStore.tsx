import { create } from "zustand";
import { Product } from "../types/Product";

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Omit<Product, "_id">) => void;
  updateProduct: (_id: string, updatedProduct: Partial<Product>) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  addProduct: (product) =>
    set((state) => ({
      products: [
        ...state.products,
        { ...product, _id: (state.products.length + 1).toString() },
      ],
    })),

  updateProduct: (_id, updatedProduct) =>
    set((state) => ({
      products: state.products.map((p) => (p._id === _id ? { ...p, ...updatedProduct } : p)),
    })),
}));
