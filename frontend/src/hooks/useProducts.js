import { useEffect, useState } from "react";
import { productService } from "../services/productService.js";

export function useProducts() {
  const [products, setProducts] = useState([]);

  async function refresh() {
    setProducts(await productService.list());
  }

  useEffect(() => {
    refresh().catch(() => setProducts([]));
  }, []);

  return { products, refresh };
}
