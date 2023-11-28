import { type RequestHandler } from '@builder.io/qwik-city';
import { doc, getDoc } from 'firebase/firestore/lite';
import { db } from '../../../../lib/firestore';

const collectionMap = new Map<string, string>([
  ['search', 'search'],
  ['l', 'lines'],
  ['g', 'line-groups'],
]);

export const onGet: RequestHandler = async ({ params, json, cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7 * 2,
    maxAge: 60 * 60 * 24 * 2,
  });
  cacheControl(
    {
      staleWhileRevalidate: 60 * 60 * 24 * 7 * 2,
      maxAge: 60 * 60 * 24 * 2,
    },
    'CDN-Cache-Control',
  );
  const id = params.id;
  const collection = collectionMap.get(params.collection) as string;
  const docRef = doc(db, collection, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    json(200, await docSnap.data());
  } else {
    json(204, { message: '204 No Content' });
  }
};
