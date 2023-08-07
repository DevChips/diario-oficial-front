import {Box, Grid, List} from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import FilePresentIcon from '@mui/icons-material/FilePresent'
import { Environment } from '../../environment/environment'

interface IFerramentasListagemDiarios {
  textPrimaryItem: string
  textSecondaryItem: string
  caminho: string
}
export const FerramentaListageDiarios = ({listagemDiariosOficiais, qtdItens}: any) => {
  return (
    <Box>
      <List
        sx={{
          bgcolor: 'background.paper',
          display: 'flex',
          margin: '0 40px'
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
              md={12}
            >
              <ListItem
                sx={{
                  padding: '10px 0 7px 0',
                  ':hover': {transform: 'scale(1.1)'},
                  transition: '0.3s',
                  cursor: 'pointer',
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
                  primary={item.textPrimaryItem}
                  secondary={item.textSecondaryItem}
                />
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </List>
    </Box>
  )
}
