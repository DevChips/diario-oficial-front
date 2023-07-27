import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import axios from 'axios'
import {formatInTimeZone} from 'date-fns-tz'
import {ptBR as ptBRLocale} from 'date-fns/locale'
import {useState} from 'react'
import {Scrollbars} from 'react-custom-scrollbars'
import { Environment } from '../../environment/environment'
import { Api } from '../../services/axios-config'

export const PesquisaPalavraChave = () => {

  const [palavraChave, setPalavraChave] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [dadosModal, setDadosModal] = useState([])

  const handleOpenModal = (dados: any) => {
    setDadosModal(dados)
    setOpenModal(true)
  }

  const buscarPorPalavraChave = async () => {
    setIsLoading(true)
    await Api
      .post(`/diarios-search`, {
        keyword: palavraChave,
      })
      .then(async (item) => {
        setIsLoading(false)
        handleOpenModal(item.data.result)
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
      })
  }

  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      sx={
        smDown
          ? {
              textAlign: 'center',
              width: '100%',
            }
          : {
              textAlign: 'center',
              width: '90%',
              height: '100%',
            }
      }
    >
      <Card
        style={{
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          border: '1px solid #0d47a1',
          height: '100%',
        }}
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
          <Typography sx={{color: 'white', fontSize: '1rem'}}>PESQUISAR PALAVRA CHAVE</Typography>
        </Box>
        <Box
          width={smDown ? '91%' : '80%'}
          margin={smDown ? '1rem' : '0 auto'}
          display='flex'
          flexDirection='column'
          justifyContent={'center'}
          height={smDown ? '' : 'calc(100% - 30px)'}
          position='relative'
        >
          {isLoading && (
            <Box
              mb='1rem'
              sx={{
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <TextField
            id='outlined-basic'
            label='Digite a palavra-chave desejada'
            variant='outlined'
            value={palavraChave}
            onChange={(event) => {
              setPalavraChave(event.target.value)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                buscarPorPalavraChave()
              }
            }}
          />

          <Button
            size='medium'
            color='primary'
            variant='contained'
            sx={{marginTop: '1rem'}}
            disabled={isLoading}
            endIcon={
              isLoading ? (
                <CircularProgress
                  variant='indeterminate'
                  color='inherit'
                  size={20}
                />
              ) : undefined
            }
            onClick={() => buscarPorPalavraChave()}
          >
            Pesquisar
          </Button>
        </Box>
      </Card>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Box
          sx={
            smDown
              ? {
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 'auto',
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 1,
                }
              : {
                  position: 'absolute',
                  // height: '80vh',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '50%',
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
                }
          }
        >
          <Scrollbars style={smDown ? {height: '80vh', width: '90vw'} : {height: '80vh'}}>
            <Typography
              variant='h6'
              component='h2'
            >
              Dados da busca: {}
            </Typography>
            {dadosModal &&
              dadosModal.map((item: any) => (
                <List sx={{width: '100%', maxWidth: 800}}>
                  <ListItem alignItems='flex-start'>
                    {smDown ? (
                      ''
                    ) : (
                      <ListItemAvatar>
                        <PictureAsPdfIcon color='error' />
                      </ListItemAvatar>
                    )}

                    <a
                      style={{textDecoration: 'none'}}
                      href={`${Environment.URL_BASE_UPLOAD}/diario/00000000000/${item.caminhoArquivo}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <ListItemText
                        sx={{color: 'black'}}
                        primary={`Edição: ${item.edicao} - ${
                          formatInTimeZone(
                            item.dataPublicacao.split('T')[0],
                            'America/Sao_Paulo',
                            "EEEEEE, dd 'de' MMMM yyyy",
                            {
                              locale: ptBRLocale,
                            }
                          )
                            .charAt(0)
                            .toUpperCase() +
                          formatInTimeZone(
                            item.dataPublicacao.split('T')[0],
                            'America/Sao_Paulo',
                            "EEEEEE, dd 'de' MMMM yyyy",
                            {
                              locale: ptBRLocale,
                            }
                          ).substring(1)
                        }`}
                        secondary={
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.documento.replace(
                                new RegExp(palavraChave, 'gi'),
                                '<span style="color:red; margin-left:3px; margin-right:3px">$&</span>'
                              ),
                            }}
                          />
                        }
                      />
                    </a>
                  </ListItem>
                  <Divider
                    variant='inset'
                    component='li'
                  />
                </List>
              ))}
          </Scrollbars>
        </Box>
      </Modal>
    </Box>
  )
}
