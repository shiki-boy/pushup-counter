import { format } from 'date-fns'

import clientPromise from '@/lib/mongoConnect'

export default async function handler( req, res ) {
  try {
    if ( 'POST' === req.method ) {
      const payload = JSON.parse( req.body )

      if ( !payload.count ) {
        return res.status( 400 ).json( { message: 'Invalid data sent' } )
      }

      const count = payload.count
      const client = await clientPromise
      const db = client.db( 'exercise' )
      const exerciseColl = db.collection( 'pushups' )

      const today = format( new Date(), 'dd/MM/yyyy' )
      // insert pushups by day
      // find pushup for the day
      const doc = await exerciseColl.findOne( { date: today } )

      if ( doc ) {
        const result = await exerciseColl.updateOne(
          { _id: doc._id },
          { $set: { count } },
        )

        return res.status( 200 ).json( result )
      }

      // if not found create one
      const result = await exerciseColl.insertOne( {
        count: 1,
        date: today,
      } )

      return res.status( 200 ).json( result )
    }
  } catch ( e ) {
    console.error( e ) // eslint-disable-line
  }
}
