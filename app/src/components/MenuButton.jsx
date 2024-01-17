import React from 'react'

const MenuButton = ({ title, description, handleButtonClick, menu }) => {
  return (
    <>
        <button onClick={() => handleButtonClick(menu)}>
            <div className='flex flex-col justify-center bg-zinc-200 rounded-md border-[1px] border-gray-800 p-10 duration-200 hover:border-transparent'>
                <div className='text-2xl font-bold'>{title}</div>
                <div className='text-sm font-light'>{description}</div>
            </div>
        </button>
    </>
  )
}

export default MenuButton