import {Box, Card, Skeleton, Typography, useMediaQuery} from '@mui/material'
import {useTheme} from '@mui/system'
import {useQuery} from 'react-query'
import {DiariosService} from '../../services/diarios/DiariosService'
import PdfViewer from './PdfViewer'

export const UltimaEdicao = () => {
  const {data, isError, isLoading} = useQuery('diario', DiariosService.get, {
    staleTime: 5000,
    cacheTime: 10,
  })

  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <div>
      <Card
        style={
          smDown
            ? {
                margin: '1rem',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                border: '1px solid #0d47a1',
              }
            : {
                width: '80%',
                margin: '0 auto',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                border: '1px solid #0d47a1',
              }
        }
        variant='outlined'
      >
        <Box
          height={'2rem'}
          display='flex'
          flexDirection='column'
          justifyContent={'center'}
          sx={{
            backgroundColor: 'primary.main',
          }}
        >
          <Typography sx={{color: 'white', fontSize: '1rem', textAlign: 'center'}}>
            ÚLTIMA EDIÇÃO
          </Typography>
        </Box>

        <>
          {isLoading && (
            <Box
              height='auto'
              display='flex'
              justifyContent='center'
              alignItems='center'
            >
              <Skeleton
                variant='rectangular'
                sx={smDown ? {margin: 4} : {margin: 6}}
                width={smDown ? '70vw' : '30vw'}
                height={smDown ? '50vh' : '90vh'}
              />
            </Box>
          )}

          {!isLoading && <PdfViewer data={data} />}
        </>
      </Card>
    </div>
  )
}
