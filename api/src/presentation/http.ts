interface HttpResponse {
  statusCode: number;
  body: any;
}

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
});

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const notFound = (): HttpResponse => ({
  statusCode: 404,
  body: null,
});

export const unauthorized = (error?: Error): HttpResponse => ({
  statusCode: 401,
  body: error || {},
});

export const ok = (data: object): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const created = (data: object): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
});
