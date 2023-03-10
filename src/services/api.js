export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categories = await response.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const requestOne = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const requestTwo = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
  const resquestJsQuery = await requestOne.json();
  const resquestJsId = await requestTwo.json();
  const result = categoryId === 0 ? resquestJsQuery : resquestJsId;
  return result;
}

export async function getProductsId(PRODUCT_ID) {
  const response = await fetch(`https://api.mercadolibre.com/items/${PRODUCT_ID}`);
  const products = await response.json();
  return products;
}
