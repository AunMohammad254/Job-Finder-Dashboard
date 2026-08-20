import React from 'react'
import SpecularButton from './SpecularButton/SpecularButton'
function Card() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Awesome Card</h2>
      <p className="text-gray-600 mb-4">
        This is a card with some content inside.
      </p>
      <div className="flex gap-2">
        <SpecularButton>
          <a href="#" className='text-black'>
            Action
          </a>
        </SpecularButton>
        <SpecularButton>
          <a href="#" className='text-black'>
            Action 2
          </a>
        </SpecularButton>
      </div>
    </div>
  )
}

export default Card