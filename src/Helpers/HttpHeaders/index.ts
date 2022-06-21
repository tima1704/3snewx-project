import { TOKEN } from "Constants/AppConstants";

export default function HttpHeadersAuthorization() {
  const tokenLocalStorage = localStorage.getItem(TOKEN);

  if (tokenLocalStorage) {
    return { Authorization: `Bearer ${tokenLocalStorage}` };
  }

  const tokenSessionStorage = sessionStorage.getItem(TOKEN);

  if (tokenSessionStorage) {
    return { Authorization: `Bearer ${tokenSessionStorage}` };
  }
}
