import React from 'react'

const Button = ({caption,callback,classNames}) => {
  return (
    <button 
        className={`w-[100px] h-[25px] p-0 m-1 bg-slate-800 text-white `+classNames}
        onClick={()=>callback()}>
        {caption}
    </button>
  )
}

export default Button