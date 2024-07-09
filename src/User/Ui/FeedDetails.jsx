// import React from 'react'
import Like from '../component/Like'
import Comment from '../component/Comment'
import Views from '../component/Views'
// const FeedDetails = () => {
//   return (
//     <div>
//         <Like />
//         <Comment />
//         <Views />
//     </div>
//   )
// }

// export default FeedDetails

import React from 'react'

const FeedDetails = () => {
  return (
    <div className='flex gap-3  h-full items-center  '>
        <Like />
        <Comment />
        <Views />
    </div>
  )
}

export default FeedDetails