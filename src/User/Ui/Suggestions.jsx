import Avatar from '../component/Avatar'

const Suggestions = () => {
  const friends = [1, 2, 3, 4, 5,6,7,8,9,0, 2, 3, 4, 5,6,7,8,9,0];

  return (
    <div className=' px-5'>
      <h2>Suggestions</h2>
      <div className="flex flex-col gap-4 overflow-y-scroll no-scrollbar  h-[55vh] py-5">
      {
  friends.map((friend, index) => (
    <div className='flex gap-3 ' key={index}>
      <Avatar image='https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=600' />
      {friend}
    </div>
  )

)}
      </div>
    </div>
  )
}

export default Suggestions