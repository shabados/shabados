import defaultTheme from '@presenter/themes/presenter/Day.css?url'

import { API_URL } from '~/helpers/consts'
import { useStatus } from '~/services/status'

const PRESENTER_THEMES_URL = `${API_URL}/themes/presenter`

type ThemeLoaderProps = { name: string }

const ThemeLoader = ( { name = 'Day' }: ThemeLoaderProps ) => {
  const { connectedAt } = useStatus()

  return (
    <link
      key={`${name}-${connectedAt?.getTime()}`}
      rel="stylesheet"
      href={name ? `${PRESENTER_THEMES_URL}/${name}.css` : defaultTheme}
    />
  )
}

export default ThemeLoader
