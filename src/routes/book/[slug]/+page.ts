import type { PageLoad } from './$types';
import { getBookById } from '$lib/sanity/fetch';
import { useState } from '$lib/state.svelte';

export const load: PageLoad = async ({ params, parent }) => {
  // book id
  const id = params.slug;
  // current book and its different translations
  const { books } = await parent();
  const curr = getBookById(books, id);
  if (!curr)
    return {
      id
    };

  // update shared state
  useState.curr = curr;

  return { id, curr };
};
