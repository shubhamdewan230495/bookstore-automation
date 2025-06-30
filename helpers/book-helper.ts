import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiUtil } from './api-utils';
import { HttpMethod } from '../types/request-types';
import { BOOK_ENDPOINTS } from '../test-data/book-endpoints';
import { GENERIC_HEADERS, HEADERS_WITH_AUTH } from '../test-data/generic-headers';
import { BookDetails } from '../types/book';

export class BookHelper {
  private apiUtil: ApiUtil;

  constructor(request: APIRequestContext) {
    this.apiUtil = new ApiUtil(request);
  }

  async getAllBooks(authToken: string): Promise<APIResponse> {
    return this.apiUtil.triggerApi(HttpMethod.GET, BOOK_ENDPOINTS.books, {
          headers: HEADERS_WITH_AUTH(authToken),
        });
  }

  async createBook(book, authToken: string): Promise<APIResponse> {
    return this.apiUtil.triggerApi(HttpMethod.POST, BOOK_ENDPOINTS.books, {
      headers: HEADERS_WITH_AUTH(authToken),
      data: book,
    });
  }

  async updateBook(bookId: string, book: BookDetails, authToken: string): Promise<APIResponse> {
    return this.apiUtil.triggerApi(
          HttpMethod.PUT,
          BOOK_ENDPOINTS.bookById(bookId),
          {
            headers: HEADERS_WITH_AUTH(authToken),
            data: book,
          }
        );
  }

  async getBookById(bookId: string, authToken: string): Promise<APIResponse> {
    return this.apiUtil.triggerApi(HttpMethod.GET, BOOK_ENDPOINTS.bookById(bookId),{headers : HEADERS_WITH_AUTH(authToken)});
  }

  async deleteBook(bookId: string, authToken: string): Promise<APIResponse> {
    return this.apiUtil.triggerApi(HttpMethod.DELETE, BOOK_ENDPOINTS.bookById(bookId),{headers : HEADERS_WITH_AUTH(authToken)})
  }
  async createRandomBook(): Promise<BookDetails> {
    return {
        name: `Test Book ${new Date()}`,
        author: `Test Author ${new Date()}`,
        published_year: 2025,
        book_summary: "Test book summary"
    }
  }
    
}
