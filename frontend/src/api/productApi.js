import apiClient from "./authApi";

export async function getProduct(productId) {
  const { data } = await apiClient.get(`/products/${productId}`);
  return data;
}
