import { ChangeEvent } from "react"
import ClipLoader from "react-spinners/ClipLoader"
import "./ImageLinkForm.css"

interface ImageLinkFormProps {
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  onButtonSubmit: () => void
  faceErrorMessage: string
  isLoadingErrorMessage: boolean
}

const ImageLinkForm = ({
  onInputChange,
  onButtonSubmit,
  faceErrorMessage,
  isLoadingErrorMessage,
}: ImageLinkFormProps) => {
  return (
    <div>
      <p className='f3'>
        {"Drop a picture of a person here. What's the worst that can happen?"}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input
            className='f4 pa2 w-70 center'
            type='text'
            onChange={onInputChange}
          />
          <button
            className='w-30 grow f4 link ph3 pv2 dib bg-light-yellow'
            onClick={onButtonSubmit}
            disabled={isLoadingErrorMessage}
          >
            <ClipLoader
              color={"#4faf82"}
              loading={isLoadingErrorMessage}
              size={15}
            />
            {!isLoadingErrorMessage && "Detect"}
          </button>
        </div>
      </div>
      <p className='dark-red b--dark-red fw4 f4'>
        {isLoadingErrorMessage ? "" : faceErrorMessage}
      </p>
    </div>
  )
}

export default ImageLinkForm
