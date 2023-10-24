import React from 'react'
import Card from './Card'

function Cards({data}) {
    console.log(data)
  return (
    <div style={{width: "100%", display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center"}}>
        {data.map(e => {
            return <Card title={e.title} subTitle={e.subTitle} img={e.img} cta={e?.cat || null}/>
        })}
    </div>
  )
}

export default Cards