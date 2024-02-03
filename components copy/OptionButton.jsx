import React from 'react'

const OptionButton = ({ title, description, handleButtonClick, menu }) => {
  return (
    <>
        <button onClick={() => handleButtonClick(menu)}>
            <div className='flex flex-col justify-center'>
                <div className='text-2xl font-bold'>{title}</div>
                <div className='text-sm font-light'>{description}</div>
            </div>
        </button>
    </>
  )
}

export default OptionButton