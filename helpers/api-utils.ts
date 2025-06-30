import { APIRequestContext, APIResponse } from '@playwright/test';
import { HttpMethod } from '../types/request-types';
export class ApiUtil {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Triggers an API request.
   * @param method HTTP method (use HttpMethod enum)
   * @param url Endpoint URL (relative or absolute)
   * @param options Optional request options (headers, data, params, etc.)
   * @returns APIResponse
   */
  async triggerApi(
    method: HttpMethod,
    url: string,
    options: {
      headers?: Record<string, string>;
      params?: Record<string, any>;
      data?: any;
      [key: string]: any;
    } = {}
  ): Promise<APIResponse> {
    const { headers, params, data, ...rest } = options;
    const requestOptions: any = {
      headers,
      params,
      ...rest,
    };
    if ([HttpMethod.POST, HttpMethod.PUT, HttpMethod.PATCH].includes(method) && data) {
      requestOptions.data = data;
    }
    console.log(`Triggering API: ${method} ${url}`, requestOptions);
    const response = await (this.request as any)[method.toLowerCase()](url, requestOptions);
    return response;
  }
}