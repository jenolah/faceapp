import React from "react"
import "./Profile.css"

interface ProfileProps {
  name: string,
  email: string,
  entries: number,
  joined: string,
  rank: number,
}

const Profile = ({ name, email, entries, joined, rank }: ProfileProps) => {
  return (
    <div className="profile fw7 f5 tl w-100 mr6">
      <table className=" w-100">
        <tr>
          <th className="pa2">Name:</th>
          <th className="f3 pa2">{name}</th>
        </tr>
        <tr>
          <th className="pa2">Email address:</th>
          <th className="f3 pa2">{email}</th>
        </tr>

        <tr>
          <th className="pa2">Number of pictures submitted:</th>
          <th className="f3 pa2">{entries}</th>
        </tr>

        <tr>
          <th className="pa2">Date joined:</th>
          <th className="f3 pa2">{joined.slice(0, 10)}</th>
        </tr>
        <tr>
          <th className="pa2">Your rank: #</th>
          <th className="f3 pa2">{rank}</th>
        </tr>
      </table>
    </div>
  )
}

export default Profile
