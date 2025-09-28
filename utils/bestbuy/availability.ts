export async function getAvailabilityBySku(sku: string, store: string) {
  if (!sku || !store) {
    return null;
  }

  try {
    const response = await fetch(
      `https://api.bestbuy.com/v1/products/${sku}/availability.json?apiKey=${process.env.BESTBUY_API_KEY}&store=${store}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}