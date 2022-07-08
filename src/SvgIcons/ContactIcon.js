import { SvgIcon } from '@mui/material'
import React from 'react'

function ContactIcon(props) {
  return (
    <SvgIcon {...props}>
        <path d="M9.45833 0.166656C4.3775 0.166656 0.25 4.29416 0.25 9.37499C0.25 14.4558 4.3775 18.5833 9.45833 18.5833H10V21.8333C15.265 19.2983 18.6667 14.25 18.6667 9.37499C18.6667 4.29416 14.5392 0.166656 9.45833 0.166656ZM10.5417 15.875H8.375V13.7083H10.5417V15.875ZM10.5417 12.0833H8.375C8.375 8.56249 11.625 8.83332 11.625 6.66666C11.625 5.47499 10.65 4.49999 9.45833 4.49999C8.26667 4.49999 7.29167 5.47499 7.29167 6.66666H5.125C5.125 4.27249 7.06417 2.33332 9.45833 2.33332C11.8525 2.33332 13.7917 4.27249 13.7917 6.66666C13.7917 9.37499 10.5417 9.64582 10.5417 12.0833Z"  fill={props.currentColor}/>
    </SvgIcon>
  )
}

export default ContactIcon