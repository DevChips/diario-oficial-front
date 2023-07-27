import {Box} from '@mui/material'
import React from 'react'

export default function FooterLinks() {
  return (
    <Box
      color='white'
      textAlign='center'
      m='0.2rem'
      pt='0.7rem'
      fontSize='xs'
    >
      <Box
        justifyContent='center'
        gap='0.5rem'
        display={'flex'}
        flexDirection={'row'}
      >
        <a> Fale Conosco</a>
        <div>&#8226;</div>
        <a> Mais Informações</a>
      </Box>
    </Box>
  )
}
