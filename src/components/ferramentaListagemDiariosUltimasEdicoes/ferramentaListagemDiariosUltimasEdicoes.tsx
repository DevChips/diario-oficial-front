import FilePresentIcon from '@mui/icons-material/FilePresent'
import {Box, Grid, List} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import {formatInTimeZone} from 'date-fns-tz'
import {ptBR as ptBRLocale} from 'date-fns/locale'
import { Environment } from '../../environment/environment'

interface IFerramentasListagemDiarios {
  caminho: any
  edicao: any
  dataPublicacao: any
  textPrimaryItem: string
  textSecondaryItem: string
  arquivo: string
}
export const FerramentaListageDiarios = ({listagemDiariosOficiais, qtdItens}: any) => {
  return (
    <Box>
      <List
        sx={{
          bgcolor: 'background.paper',
          display: 'flex',
        }}
      >
        <Grid
          container
          spacing={2}
        >
          {listagemDiariosOficiais.map((item: IFerramentasListagemDiarios, idx: number) => (
            <Grid
              key={idx}
              item
              xs={12}
              sm={12}
              md={2.4}
            >
              <ListItem
                sx={{
                  padding: '10px 0 7px 0',
                  transition: '0.3s',
                  cursor: 'pointer',
                  ':hover': {transform: 'scale(1.1)'},
                }}
                onClick={() =>
                  window.open(
                    `${Environment.URL_BASE_UPLOAD}/diario/00000000000/${item.caminho}`,
                    '_blank'
                  )
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <FilePresentIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`Edição ${item.edicao}`}
                  secondary={`${
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
                />
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </List>
    </Box>
  )
}
