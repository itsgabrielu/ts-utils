export const fetchData = async (
  url: string,
  params: Record<string, string>,
) => {
  const res = await fetch(url, params);
  return res.json();
};

/**
 * @param urls ordered list of URLs
 * @returns Ordered list of response data
 */
export const getMultipleFetches = async (urls: string[]): Promise<any[]> => {
  const reses = await Promise.allSettled(urls.map((url) => fetchData(url, {})));
  const vals = reses.map((res) =>
    res.status === "fulfilled" ? res.value : [],
  );
  return vals;
};
