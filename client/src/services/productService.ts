import { IProduct } from "../types/Product";
import { API_URL, handleRequest } from "./baseService";
import axios from "axios";

export const fetchProducts = async () => {
  return await handleRequest<IProduct[]>(axios.get(`${API_URL}/products`));
};

export const fetchProduct = async (id: number) => {
  return await handleRequest<IProduct>(axios.get(`${API_URL}/products/${id}`));
};