import React from 'react'
import Button from './Button'

const list = ["All", "Live", "Gaming", "Songs", "Soccer", "Javascript", "Generating AI", "Gaming" ,"Lo-Fi" ,"Website" ,"Android"];

const ButtonList = () => {
  return (
    <div className="flex">
          {list.map((name, index) => (
        <Button key={index} name={name} />
      ))}

    </div>
  )
}

export default ButtonList
