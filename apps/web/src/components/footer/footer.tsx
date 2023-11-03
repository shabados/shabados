import { component$, useStyles$ } from '@builder.io/qwik';
import styles from './footer.css?inline';
import GitHub from '~/components/icons/github';
import Instagram from '~/components/icons/instagram';
import Twitter from '~/components/icons/twitter';
import YouTube from '~/components/icons/youtube';
import PoweredByVercel from '../icons/powered-by-vercel';
import Slack from '../icons/slack';

export default component$(() => {
  useStyles$(styles);

  return (
    <footer>
      <div>
        <article>
          <div class='social'>
            <span>Follow us on:</span>
            <a
              href='https://www.instagram.com/shabad_os/'
              target='_blank'
              draggable={false}
            >
              <Instagram />
            </a>
            <a
              href='https://www.youtube.com/@shabados'
              target='_blank'
              draggable={false}
            >
              <YouTube />
            </a>
            <a
              href='https://www.twitter.com/shabad_os/'
              target='_blank'
              draggable={false}
            >
              <Twitter />
            </a>
            <a
              href='https://chat.shabados.com'
              target='_blank'
              draggable={false}
            >
              <Slack />
            </a>
            <a
              href='https://www.github.com/shabados/'
              target='_blank'
              draggable={false}
            >
              <GitHub />
            </a>
          </div>
          <a
            href='https://vercel.com/?utm_source=shabados&utm_campaign=oss'
            target='_blank'
            draggable={false}
          >
            <PoweredByVercel />
          </a>
        </article>
      </div>
    </footer>
  );
});
