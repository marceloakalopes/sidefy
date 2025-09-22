"use client";

import { getProductBySku } from "@/utils/bestbuy/product";
import { useState } from "react";

export default function Home() {
  const [product, setProduct] = useState<any>(null);
  const handleSubmit = async (formData: FormData) => {
    const sku = formData.get("sku") as string;
    const type = formData.get("type") as string;
    if (type === "sku") {
      const product = await getProductBySku(sku);
      setProduct(JSON.stringify(product));
    } else if (type === "model") {
      const product = await getProductBySku(sku);
      setProduct(JSON.stringify(product));
    } else {
      setProduct("Invalid type");
    }
  };
  return (
    <div>
      <h1>Best Buy Product</h1>
      <form action={handleSubmit}>
        <input type="text" name="sku" placeholder="Enter SKU" />
        <select name="type" id="">
          <option value="sku">SKU</option>
          <option value="model">Model</option>
          <option value="CA">CA</option>
        </select>
        <button type="submit">Submit</button>
        <p>{product?.toString()}</p>
      </form>
    </div>
  );
}
