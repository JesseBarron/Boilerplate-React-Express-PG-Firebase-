import React from 'react'

export default {
  image: (target) => {
    return (
      <div>
        <img height={200} width={200} src={target.result} alt={target.fileName} />
      </div>
    )
  },
  text: (target) => {
    return (
      <div>
        <p>{target.result}</p>
      </div>
    )
  },
  video(target) {
    return (
      <video width="400" controls>
        <source src={target.result} type={`${target.fileType}/${target.fileFormat}`} />
      </video>
    )
  }
}
