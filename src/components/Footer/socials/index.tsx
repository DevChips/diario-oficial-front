import {Box} from '@mui/material'
import {FaFacebookF, FaInstagram, FaYoutube} from 'react-icons/fa'

export default function FooterSocials() {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      marginTop='30px'
    >
      <Box
        sx={{
          margin: '0.325rem',
          backgroundColor: 'white',
          width: '1.5rem',
          height: '1.5rem',
          display: 'flex',
          borderRadius: '1.5rem',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <a>
          <FaFacebookF />
        </a>
      </Box>

      <Box
        sx={{
          margin: '0.325rem',
          backgroundColor: 'white',
          width: '1.5rem',
          height: '1.5rem',
          display: 'flex',
          borderRadius: '1.5rem',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <a>
          <FaInstagram />
        </a>
      </Box>

      <Box
        sx={{
          margin: '0.325rem',
          backgroundColor: 'white',
          width: '1.5rem',
          height: '1.5rem',
          display: 'flex',
          borderRadius: '1.5rem',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <a>
          <FaYoutube />
        </a>
      </Box>
    </Box>
  )
}
