"use server";

/**
 * Get a product by SKU from Best Buy
 * @param sku - The SKU of the product to get
 * @returns The product data
 */
export async function getProductBySku(sku: string) {

  if (!sku) {
    return null;
  }

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

/**
 * Search for products by query
 * @param query - The query to search for
 * @returns The products
 */
export async function searchProducts(query: string) {
  
  if (!query) {
    return null;
  }

  try {
    const response = await fetch(
      `https://api.bestbuy.com/v1/products(search=${query}).json?format=json&show=sku,name,salePrice,customerReviewCount,thumbnailImage&apiKey=${process.env.BESTBUY_API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}