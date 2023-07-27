import {Box} from '@mui/material'
import React from 'react'

export default function FooterCopyright() {
  return (
    <Box
      color='white'
      textAlign='center'
      m='0.2rem'
      pt='0.3rem'
      pb='0.3rem'
      fontSize='xs'
    >
      © {` ${new Date().getFullYear()}.`} DevChips. Todos os direitos reservados.
    </Box>
  )
}
