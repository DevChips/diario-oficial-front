import {Box} from '@mui/material'
import React from 'react'
import FooterCopyright from './copyright'
import FooterLinks from './links'
import FooterSocials from './socials'

export default function Footer() {
  return (
    <Box
      sx={{
        fontFamily: 'Poppins',
        fontSize: '0.75rem',
        background: 'linear-gradient(195deg, rgb(73, 163, 241), rgb(15, 76, 129))',
        marginTop: '30px',
      }}
    >
      <FooterSocials />
      <FooterLinks />
      <FooterCopyright />
    </Box>
  )
}
