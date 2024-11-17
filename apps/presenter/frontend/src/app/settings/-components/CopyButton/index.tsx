import './index.css'

import { Button, Tooltip } from '@mui/material'
import classNames from 'classnames'
import { noop } from 'radashi'
import { ReactNode } from 'react'

import { useCopyToClipboard } from '#~/hooks'

type CopyButtonProps = {
  className?: string,
  copyText: string,
  onClick?: () => void,
  children: ReactNode,
}

const CopyButton = ( {
  className,
  copyText,
  onClick = noop,
  ...props
}: CopyButtonProps ) => {
  const copyToClipboard = useCopyToClipboard()

  const handleClick = () => {
    onClick()
    copyToClipboard( copyText )
  }

  return (
    <Tooltip title="Click to copy">
      <Button className={classNames( 'copy-button', className )} {...props} onClick={handleClick} />
    </Tooltip>
  )
}

export default CopyButton
