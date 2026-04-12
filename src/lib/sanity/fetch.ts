import client from './client';
import _ from 'lodash';

const options = { next: { revalidate: 30 } };

const FETCH_QUERY = `*[_type == "book"]{
  ...,
}`;

async function fetchBooks() {
  return await client.fetch(FETCH_QUERY, {}, options);

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

export { fetchBooks, getBooksByLocale, getBookById, getBook };
