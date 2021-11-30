import React from 'react'

interface RankProps {
  name: string
  rank: number
}

const Rank = ({ name, rank }:RankProps) => {
  return (
    <div>
      <div className="white f3">{`${name}, this is your rank:`}</div>
      <div className="white f1">{rank}</div>
    </div>
  )
}

export default Rank
