import clientPromise from '@/lib/mongoConnect'
import { format } from 'date-fns'

export default async function handler( req, res ) {
  try {
    const client = await clientPromise
    const db = client.db( 'exercise' )

    const exerciseColl = db.collection( 'pushups' )

    const today = format( new Date(), 'dd/MM/yyyy' )

    const result = await exerciseColl.insertOne(
      {
        count: 1,
        date: today,
      },
    )


    // const result = await db
    //   .collection( 'pushups' )
    //   .find( {} )
    //   // .sort( { metacritic: -1 } )
    //   .limit( 10 )
    //   .toArray()

    res.status( 200 ).json( result )
  } catch ( e ) {
    console.error( e )
  }
}
