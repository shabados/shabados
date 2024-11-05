import './index.css'

import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { useNotifications } from '~/services/notifications'

const StatusToast = () => {
  const status = useNotifications()

  return (
    <TransitionGroup component={null}>
      {status && (
        <CSSTransition key={status} appear exit classNames="fade" timeout={300}>
          <div className="status toast">
            <FontAwesomeIcon icon={faInfoCircle} />
            <span>{status}</span>
          </div>
        </CSSTransition>
      )}
    </TransitionGroup>
  )
}

export default StatusToast
