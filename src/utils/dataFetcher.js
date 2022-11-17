export async function fetchAndBypassCORS(url) {
  url = `https://2sgx66cj6f.execute-api.ap-northeast-1.amazonaws.com/default/bypassCORS?url=${url}`;
  try {
    const response = await fetch(url);
    return response.json();
  } catch (e) {
    console.error(e.message);
  }
}
