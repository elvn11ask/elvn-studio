const siteUrl = "https://studio.elvn.monster";
const host = "studio.elvn.monster";
const verificationFileName = "c8363361518e464ca28c62dd7a5e9d9d.txt";
const keyLocation = `${siteUrl}/${verificationFileName}`;
const endpoint = "https://api.indexnow.org/indexnow";

function decodeXml(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

async function fetchText(url: string) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
  return response.text();
}

async function submit() {
  const publishedValue = (await fetchText(keyLocation)).trim();
  const expectedValue = verificationFileName.replace(/\.txt$/, "");
  if (publishedValue !== expectedValue) throw new Error("Published IndexNow key does not match");

  const sitemap = await fetchText(`${siteUrl}/sitemap.xml`);
  const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => decodeXml(match[1].trim()))
    .filter((url) => new URL(url).hostname === host);

  if (urlList.length === 0) throw new Error("No Studio URLs found in sitemap");
  if (urlList.length > 10_000) throw new Error("IndexNow URL limit exceeded");

  const payload = JSON.stringify({ host, key: publishedValue, keyLocation, urlList });
  let lastStatus = 0;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: payload,
    });
    lastStatus = response.status;

    if (lastStatus === 200 || lastStatus === 202) {
      console.log(`IndexNow accepted ${urlList.length} URLs with HTTP ${lastStatus}.`);
      return;
    }

    if (lastStatus < 500 && lastStatus !== 429) break;
    await new Promise((resolve) => setTimeout(resolve, attempt * 2_000));
  }

  throw new Error(`IndexNow rejected the submission with HTTP ${lastStatus}`);
}

await submit();

export {};
