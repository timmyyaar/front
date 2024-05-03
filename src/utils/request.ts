export enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

interface RequestProps {
  url: string;
  method?: HTTP_METHODS;
  includeCredentials?: boolean;
  headers?: any;
  body?: any;
  cache?: string;
}

const request = async ({
  url,
  method = HTTP_METHODS.GET,
  includeCredentials = false,
  headers = {},
  body,
  cache = "force-cache",
}: RequestProps) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/${url}`,
    {
      method,
      headers:
        body instanceof FormData
          ? {}
          : { "Content-Type": "application/json", ...headers },
      ...(includeCredentials && { credentials: "include" }),
      ...(body && {
        body: body instanceof FormData ? body : JSON.stringify(body),
      }),
      cache,
    }
  );

  const parsedResponse = await response.json();

  if (!response.ok) {
    if (response.status === 500) {
      throw new Error("Server error!");
    } else {
      // eslint-disable-next-line
      throw {
        code: response.status,
        message: parsedResponse.message,
      };
    }
  }

  return parsedResponse;
};

export default request;
