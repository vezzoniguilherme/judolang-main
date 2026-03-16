export async function getData<T>(
  path: string,
  _credentials: boolean = true,
  name: string = ""
): Promise<T> {
  const res = await fetch(path, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch " + name);
  return res.json() as Promise<T>;
}

export async function submitData<TResponse, TBody = unknown>(
  path: string,
  body: TBody | null,
  _credentials = true
): Promise<TResponse> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Failed POST ${path} → ${res.status}`);
  return res.json() as Promise<TResponse>;
}