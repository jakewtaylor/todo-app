export const get = async <T>(url: string): Promise<T> => {
  const req = await fetch(url);
  const res = await req.json();

  return res as T;
};
