type Response = { data?: unknown; error: undefined } | { data?: undefined; error: unknown };
type Param = Response | Promise<Response>;

export async function graphqlErrorResponseHandler(param: Param) {
  if (param instanceof Promise) {
    const { error, data } = await param;
    if (error === undefined) return data;
    throw error;
  }
  
  const { error, data } = param;
  if (error === undefined) return data;
  throw error;
}
