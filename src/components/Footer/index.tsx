import {Box} from '@mui/material'
import React from 'react'
import FooterCopyright from './copyright'
import FooterLinks from './links'
import FooterSocials from './socials'

export default function Footer() {
  return (
    <Box
      sx={{
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontSize: '0.75rem',
        background: 'linear-gradient(195deg, #536dfe, #3f51b5)',
        marginTop: '30px',
      }}
    >
      <FooterSocials />
      <FooterLinks />
      <FooterCopyright />
    </Box>
  )
}
