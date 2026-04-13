import imageUrlBuilder from '@sanity/image-url';

import client from '$lib/sanity/client';

// Create an image URL builder using the client
export const urlBuilder = imageUrlBuilder(client);
