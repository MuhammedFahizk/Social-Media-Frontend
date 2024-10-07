import React from 'react'

const ImageShow = ({file}) => {
  return (
    <div>
        <img className=' rounded-md  max-w-[200px] sm:max-w-[350px] object-contain   my-0 max-h-[350px] shadow-3xl ' src={file} alt="Media Url" />
    </div>
  )
}

export default ImageShow