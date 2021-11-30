import React from "react"
import "./FaceRecognition.css"

interface FaceRecognitionProps {
  imageUrl: string
  box: {
    topRow: number
    rightCol: number
    bottomRow: number
    leftCol: number
  }
}

const FaceRecognition = ({ imageUrl, box }: FaceRecognitionProps) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputimage"
          alt=""
          src={imageUrl}
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      </div>
    </div>
  )
}

export default FaceRecognition
