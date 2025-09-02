
const Loading = ({ className }: {
  className ? : string
}) => {
  return (
    <div className={`w-full h-full flex justify-center items-center text-[40px] animate-bounce ${className}`}> Loading <span className="animate-pulse">...</span> </div>)
}

export default Loading