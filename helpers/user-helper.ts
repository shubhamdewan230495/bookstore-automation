import { APIRequestContext } from '@playwright/test';
import { HttpMethod } from '../types/request-types';
import { ApiUtil } from './api-utils';

export class UserHelper {
  private apiUtil: ApiUtil;

  constructor(request: APIRequestContext) {
    this.apiUtil = new ApiUtil(request);
  }
  async signup(email: string, password: string): Promise<void> {
    const response = await this.apiUtil.triggerApi(HttpMethod.POST, '/signup', {
      headers: { 'Content-Type': 'application/json' },
      data: { email, password },
    });
    if (!response.ok()) {
      throw new Error(`Signup failed: ${response.status()} ${response.statusText()}`);
    }
  }
  async loginAndGetToken(email: string, password: string): Promise<string> {
    const response = await this.apiUtil.triggerApi(HttpMethod.POST, '/login', {
      headers: { 'Content-Type': 'application/json' },
      data: { email, password },
    });
    if (!response.ok()) {
      throw new Error(`Login failed: ${response.status()} ${response.statusText()}`);
    }
    const data = await response.json();
    return data.access_token;
  }

  async generateRandomUserCredentials() : Promise<Record<string, string>>{ 
    return {
    username: 'testuser'+ new Date().getTime(),
    password: 'Test@1234',
    }
}
}
