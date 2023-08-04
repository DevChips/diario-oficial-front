import {formatInTimeZone} from 'date-fns-tz'
import {ptBR} from 'date-fns/locale'
import React, {ReactNode} from 'react'

import {AppBar, Box, Toolbar, Typography, useMediaQuery, useTheme} from '@mui/material'
import Footer from '../../components/Footer'
import {PesquisaPalavraChave} from '../../components/home/PesquisaPalavraChave'
import {PesquisaPorData} from '../../components/home/PesquisaPorData'
import {UltimaEdicao} from '../../components/home/UltimaEdicao'
import {UltimasDezEdicoes} from '../../components/home/UltimasDezEdicoes'

interface ILayoutHomeProps {
  children?: ReactNode
  barraFerramentas?: React.ReactNode
}

const Home: React.FC<ILayoutHomeProps> = ({barraFerramentas}) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const dataAtual = formatInTimeZone(Date.now(), 'America/Sao_Paulo', "EEEE, dd 'de' MMMM", {
    locale: ptBR,
  })

  return (
    <Box
      display='flex'
      flexDirection='column'
    >
      <AppBar
        position='static'
        color='default'
        elevation={0}
        sx={{
          padding: '10px',
          background: 'linear-gradient(195deg, #536dfe, #3f51b5)',
        }}
      >
        <Toolbar
          sx={
            smDown
              ? {flexDirection: 'column', justifyContent: 'space-between'}
              : {justifyContent: 'space-between'}
          }
        >
          <Box
            component='img'
            sx={smDown ? {height: 60} : {height: 80}}
            src='/media/logos/logo_branca.png'
            alt='Logo DevChips'
          />

          <Typography
            variant={smDown ? 'h6' : 'h4'}
            whiteSpace='nowrap'
            color='white'
            overflow='hidden'
            textOverflow='ellipsis'
            marginY={smDown ? '1rem' : ''}
          >
            {dataAtual[0].toUpperCase() + dataAtual.substr(1)}
          </Typography>

          {/* <Button
            onClick={() => (window.location.href = '/auth')}
            size='medium'
            variant='outlined'
            color='primary'
            startIcon={<LoginIcon />}
            sx={{
              bgcolor: '#FFF',
              ':hover': {
                bgcolor: '#dddcdc', // theme.palette.primary.main
                color: 'primary',
              },
            }}
          >
            Acessar
          </Button> */}
        </Toolbar>
      </AppBar>

      <Box
        display='flex'
        flexDirection={smDown ? 'column' : 'row'}
        flex={1}
        marginTop={smDown ? 2 : 3}
      >
        <Box width={smDown ? '100%' : '50%'}>
          <UltimaEdicao />
        </Box>

        <Box
          width={smDown ? '100%' : '50%'}
          display='flex'
          flexDirection='column'
        >
          <Box sx={smDown ? {marginX: '1rem'} : {minHeight: '50%'}}>
            <PesquisaPalavraChave />
          </Box>

          <Box
            sx={smDown ? {marginX: '1rem', marginTop: '1rem'} : {marginTop: '1rem'}}
            height='100%'
          >
            <PesquisaPorData />
          </Box>
        </Box>
      </Box>

      <Box
        width='100%'
        display='flex'
        flexDirection='row'
      >
        <UltimasDezEdicoes />
      </Box>
      <Footer />
    </Box>
  )
}

export default Home
