"use server";

/**
 * Get a product by SKU from Best Buy
 * @param sku - The SKU of the product to get
 * @returns The product data
 */
export async function getProductBySku(sku: string) {
  try {
    const response = await fetch(
      `https://api.bestbuy.com/v1/products/${sku}.json?apiKey=${process.env.BESTBUY_API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}