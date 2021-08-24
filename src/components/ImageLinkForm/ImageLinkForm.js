import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit, faceErrorMessage }) => {
  return (
    <div>
      <p className="f3">
        {"Drop a picture of a person here. What's the worst that can happen?"}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib bg-light-yellow"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
      <p className="dark-red b--dark-red fw4 f4">{faceErrorMessage}</p>
    </div>
  )
}

export default ImageLinkForm
