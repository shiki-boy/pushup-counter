/* eslint-disable sort-keys */
import { useRef, useState } from 'react'
import anime from 'animejs'

import classes from '@/styles/pushups.module.scss'

const COLORS = [ 'red', 'coral', 'orange', 'blue' ]

export default function Pushups() {
  const [ circlePos, setCirclePos ] = useState( {
    x: 0,
    y: 0,
  } )
  const [ count, setCount ] = useState( 0 )

  const containerEl = useRef( null )
  const circleEl = useRef( null )
  const i = useRef( -1 )

  const handleClick = ( e ) => {
    setCirclePos( {
      x: e.clientX,
      y: e.clientY,
    } )
    setCount( ( old ) => old + 1 )

    const color = COLORS[( ++i.current ) % ( COLORS.length )]

    circleEl.current.style.fill = color
    circleEl.current.setAttribute( 'r', 0 )

    anime( {
      autoplay: true,
      direction: 'normal',
      easing: 'easeInOutSine',
      fill: color,
      loop: false,
      r: '1000',
      targets: '.svg circle',
      complete: () => {
        containerEl.current.style.backgroundColor = color
      },
    } )
  }

  return (
    <main ref={ containerEl } className='' onClick={ handleClick }>
      <svg width='100%' height='100vh' className='svg'>
        <circle ref={ circleEl } cx={ circlePos.x } cy={ circlePos.y } r='0'></circle>
      </svg>

      <h4 className={ classes.count }>
        { count }
      </h4>
    </main>
  )
}
