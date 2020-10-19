export const get = async <T>(url: string): Promise<T> => {
  const req = await fetch(url);
  const res = await req.json();

  return res as T;
};

export const post = async <R, D = unknown>(url: string, data: D) => {
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (req.status < 200 || req.status >= 300) {
    throw new Error('Unsuccessful request');
  }

  const res = await req.json();

  return res as R;
};
