import { test, expect, request as playwrightRequest, APIRequestContext } from '@playwright/test';
import { ApiUtil } from '../helpers/api-utils';
import { HttpMethod } from '../types/request-types';
import { UserHelper } from '../helpers/user-helper';
import { bookDetailsPayloadContract } from '../response-contracts/book.payload.contract';
import { BookHelper } from '../helpers/book-helper';
import { BookDetails } from '../types/book';

async function getApiUtil(request : APIRequestContext): Promise<ApiUtil> {
  const requestContext: APIRequestContext = await playwrightRequest.newContext();
  return new ApiUtil(requestContext);
}

test.describe('Books API CRUD', () => {
  let apiUtil: ApiUtil;
  let userHelper: UserHelper;
  let createdBookId: string;
  let authToken: string;
  let bookHelper: BookHelper;
  let userDetails: Record<string, string>;
  let requestContext: APIRequestContext;

  test.beforeAll(async ({ playwright }) => {
    requestContext = await playwright.request.newContext();
    apiUtil = new ApiUtil(requestContext);
    userHelper = new UserHelper(requestContext);
    bookHelper = new BookHelper(requestContext);
    userDetails = await userHelper.generateRandomUserCredentials();
    await userHelper.signup(userDetails.username, userDetails.password);
    authToken = await userHelper.loginAndGetToken(userDetails.username, userDetails.password);
  });

  test.afterAll(async () => {
    await requestContext.dispose();
  });

  test('GET /books/ - Get All Books', async () => {
    const response = await bookHelper.getAllBooks(authToken);
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    console.log('Response:', data);
    expect(Array.isArray(data)).toBeTruthy();
    expect(data[0]).toMatchObject(bookDetailsPayloadContract)
  });

  test('POST /books/ - Create Book', async () => {
    const newBookPayload: BookDetails  = await bookHelper.createRandomBook();
    const response = await bookHelper.createBook(newBookPayload, authToken);
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty('id');
    createdBookId = data.id;
  });

  test('PUT /books/{book_id} - Update Book', async () => {
    const newBookPayload: BookDetails  = await bookHelper.createRandomBook();
    const createBookResponse = await (await bookHelper.createBook(newBookPayload, authToken)).json();
    const createdBookId = createBookResponse?.id as string;
    console.log('Created Book ID:', createdBookId);
    const updatedBook: BookDetails = { name: 'Updated Book', author: 'Updated Author', published_year: 2026, book_summary: 'updated summary' };
    const response = await bookHelper.updateBook(createdBookId, updatedBook, authToken);
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.name).toBe(updatedBook.name);
    expect(data.author).toBe(updatedBook.author);
    expect(data.published_year).toBe(updatedBook.published_year);
    expect(data.book_summary).toBe(updatedBook.book_summary);
  });

  test('GET /books/{book_id} - Get Book By Id', async ({request}) => {
    const newBookPayload: BookDetails  = await bookHelper.createRandomBook();
    const createBookResponse = await (await bookHelper.createBook(newBookPayload, authToken)).json();
    const createdBookId = createBookResponse?.id as string;
    const response = await bookHelper.getBookById(createdBookId, authToken);
    console.log('Created Book ID:', await response.json());
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty('id', createdBookId);
  });

  test('DELETE /books/{book_id} - Delete Book', async () => {
    const newBookPayload: BookDetails  = await bookHelper.createRandomBook();
    const createBookResponse = await (await bookHelper.createBook(newBookPayload, authToken)).json();
    const createdBookId = createBookResponse?.id as string;
    const response = await bookHelper.deleteBook(createdBookId, authToken);
    expect(response.ok()).toBeTruthy();
    const responsePostDeletion = await (await bookHelper.getBookById(createdBookId, authToken)).json();
    expect(responsePostDeletion.detail).toBe('Book not found');
  });
});
