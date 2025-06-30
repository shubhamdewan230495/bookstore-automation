// Example payloads for book API

import { BookDetails } from "../types/book";


export const updatedBookPayload = {
  title: 'Updated Book',
  author: 'Updated Author',
  year: 2026,
};

export const invalidBookPayload = {
  title: '', // Invalid: empty title
  author: '', // Invalid: empty author
  year: 'not-a-year', // Invalid: year should be a number
};

export const partialBookPayload = {
  title: 'Partial Book',
};
