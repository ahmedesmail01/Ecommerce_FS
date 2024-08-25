import Cookies, { CookieSetOptions } from "universal-cookie";

const cookies = new Cookies();

class CookieServices {
  // Get a cookie by name
  get(name: string) {
    return cookies.get(name);
  }

  // Set a cookie with a name, value, and optional options
  set(name: string, value: string, options?: CookieSetOptions) {
    return cookies.set(name, value, options);
  }

  // Remove a cookie by name
  remove(name: string) {
    return cookies.remove(name);
  }
}

export default new CookieServices();
