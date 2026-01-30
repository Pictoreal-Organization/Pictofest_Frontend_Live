import Image from 'next/image'
import React from 'react'

const Icon = (props) => {

    return (
   
        <img src={`img/icons/${props.icon}.svg`} className='size-9 md:size-16' />
   )
}

export default Icon
