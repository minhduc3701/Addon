/**
 * Fetches an item from session storage without throwing an exception
 * @param key The key of the item to fetch from session storage
 */
export function getItem(key) {
  var result = null;
  try {
    result = window.sessionStorage.getItem(key);
  } catch (e) {
    /* Eat the exception */
  }
  return result;
}
/**
 * Inserts an item into session storage without throwing an exception
 * @param key The key of the item to add to session storage
 * @param data The data to put into session storage
 */
export function setItem(key, data) {
  try {
    window.sessionStorage.setItem(key, data);
  } catch (e) {
    /* Eat the exception */
  }
}
//# sourceMappingURL=sessionStorage.js.map
