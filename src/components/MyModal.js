const MyModal = ({open, children}) => {
  return (
    open && (<div className = "fixed left-0 right-0 top-0 bottom-0 bg-black/60 z-30 transition-all duration-300 ease-in-out">
      <div className = "absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-xl">
        <div className = "bg-white w-[400px] p-5">
          {children}
        </div>
      </div>
    </div>)
  )
}

export default MyModal