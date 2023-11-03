import { useLocation } from '@builder.io/qwik-city';
import { component$ } from '@builder.io/qwik';

interface EditThisPageProps {
  magicPath?: string;
  phrase?: string;
}

export default component$(
  ({
    magicPath = '',
    phrase = 'Suggest changes to this page',
  }: EditThisPageProps) => {
    const { url } = useLocation();
    const editUrl = `https://github.com/shabados/web/edit/main/src/routes${magicPath}${url.pathname}index.mdx`;

    return (
      <a href={editUrl} target='_blank'>
        {phrase}
      </a>
    );
  },
);
