import { API_URL } from '#~/helpers/consts'
import { useStatus } from '#~/services/status'

const OVERLAY_THEMES_URL = `${API_URL}/themes/overlay`

type ThemeLoaderProps = { name?: string }

const ThemeLoader = ( { name }: ThemeLoaderProps ) => {
  const { connectedAt } = useStatus()

  return (
    <link
      rel="stylesheet"
      key={`${name}-${connectedAt?.toDateString() ?? ''}`}
      href={`${OVERLAY_THEMES_URL}/${name}.css`}
    />
  )
}

export default ThemeLoader
