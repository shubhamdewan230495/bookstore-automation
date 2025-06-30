import { expect } from "@playwright/test";

export const bookDetailsPayloadContract = {
    "book_summary": expect.any(String),
    "id": expect.any(Number),
    "author": expect.any(String),
    "published_year": expect.any(Number),
    "name": expect.any(String)
  }