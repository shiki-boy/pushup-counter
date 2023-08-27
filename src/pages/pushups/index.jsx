/* eslint-disable sort-keys */
import { useCallback, useEffect, useRef, useState } from 'react'
import anime from 'animejs'
import { format } from 'date-fns'
import { debounce } from 'lodash'

import classes from '@/styles/pushups.module.scss'

import clientPromise from '@/lib/mongoConnect'

const COLORS = [ 'red', 'coral', 'orange', 'blue' ]

export default function Pushups( { data } ) {
  const [ circlePos, setCirclePos ] = useState( {
    x: 0,
    y: 0,
  } )

  const [ count, setCount ] = useState( data?.count ?? 0 )

  const containerEl = useRef( null )
  const circleEl = useRef( null )
  const i = useRef( -1 )

  const updateCount = useCallback( async ( count ) => {
    try {
      await fetch( '/api/add-pushup', {
        method: 'POST',
        body: JSON.stringify( { count } ),
      } )

    } catch ( error ) {
      console.log( error ) // eslint-disable-line
    }
  }, [] )

  const debouncedUpdateCount = useCallback( debounce( updateCount, 3000 ), [] )

  useEffect( () => {
    if ( count !== data?.count ) {
      debouncedUpdateCount( count )
    }
  }, [ count ] )

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

export const getServerSideProps = async () => {
  const client = await clientPromise
  const db = client.db( 'exercise' )

  const exerciseColl = db.collection( 'pushups' )

  const today = format( new Date(), 'dd/MM/yyyy' )

  const result = await exerciseColl
    .findOne( { date: today } )
  // .sort( { metacritic: -1 } )

  return { props: { data: JSON.parse( JSON.stringify( result ) ) } }
}