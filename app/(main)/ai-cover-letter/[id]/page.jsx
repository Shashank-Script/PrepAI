import React from 'react'

const page = async ({params}) => {
    const id = await params.id
  return (
    <div>coverletter: {id}</div>
  )
}

export default page