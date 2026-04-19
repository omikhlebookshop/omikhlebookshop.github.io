import client from './client';
import _ from 'lodash';

const options = { next: { revalidate: 30 } };

const FETCH_QUERY = {
  allBooks: `*[_type == "book"]{
  ...,
}`,
  allCategories: `*[_type == "category"]{
 ...,
}`
};

async function fetchCategories() {
  return await client.fetch(FETCH_QUERY['allCategories'], {}, options);
}

async function fetchBooks() {
  const books = await client.fetch(FETCH_QUERY['allBooks'], {}, options);
  return books;

  // return _.flatten(
  //   books.map((book) => {
  //     // map available translations
  //     let translations = book._translations.map((translation) => ({
  //       ...translation,
  //       _translations: book._translations
  //     }));

  //     // if no translations available, use the original info
  //     if (!translations) {
  //       translations = [book];
  //     }

  //     return translations;
  //   })
  // );
}

function getBooksByLocale(books, locale: string) {
  return books?.filter((book) => book.language === locale);
}

function getBookById(books, id: string) {
  const res = books?.filter((book) => book._id === id);
  return res ? res[0] : null;
}

function getBook(books, id: string, locale: string) {
  const res = books?.filter((book) => book._id === id && book.language === locale);
  return res ? res[0] : null;
}

export { fetchBooks, fetchCategories, getBooksByLocale, getBookById, getBook };
