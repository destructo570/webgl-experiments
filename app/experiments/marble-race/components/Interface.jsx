import { bebas_neue } from '@/fonts/fonts'
import classNames from 'classnames'
import React from 'react'

const Interface = () => {
  return (
    <div className={classNames(bebas_neue.className, 'marbel-race-interface')}>
        {/**Time */}
        <div className="time">0.00</div>
    </div>
  )
}

export default Interface