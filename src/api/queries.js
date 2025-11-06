import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_BASE = "http://localhost:3333";

const fetchWithCredentials = async (url, options = {}) => {
  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!response.ok) throw new Error("Request failed");
  return response.json();
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data) =>
      fetchWithCredentials("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data) =>
      fetchWithCredentials("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () =>
      fetchWithCredentials("/auth/logout", {
        method: "POST",
      }),
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => fetchWithCredentials("/auth/me"),
    retry: false,
  });
};
export const useAddProducts = () => {
  return useMutation({
    queryKey: ["addProducts"],
    mutationFn: (data) =>
      fetchWithCredentials("/products", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });
};
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetchWithCredentials("/products"),
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchWithCredentials(`/products/${id}`),
    enabled: !!id,
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      fetchWithCredentials(`/products/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};
