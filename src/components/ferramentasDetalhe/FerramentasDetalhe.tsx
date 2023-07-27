import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import {
  Box,
  Button,
  Divider,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React from 'react'

interface IFerramentasDetalheProps {
  textButtonNovo?: string
  mostrarButtonNovo?: boolean
  mostrarButtonVoltar?: boolean
  mostrarButtonApagar?: boolean
  mostrarButtonSalvar?: boolean
  mostrarButtonSalvarFechar?: boolean

  mostrarButtonNovoCarregando?: boolean
  mostrarButtonVoltarCarregando?: boolean
  mostrarButtonApagarCarregando?: boolean
  mostrarButtonSalvarCarregando?: boolean
  mostrarButtonSalvarFecharCarregando?: boolean

  cliqueButtonNovo?: () => void
  cliqueButtonVoltar?: () => void
  cliqueButtonApagar?: () => void
  cliqueButtonSalvar?: () => void
  cliqueButtonSalvarFechar?: () => void
}

export const FerramentasDetalhe: React.FC<IFerramentasDetalheProps> = ({
  textButtonNovo = 'Novo',
  mostrarButtonNovo = true,
  mostrarButtonVoltar = true,
  mostrarButtonApagar = true,
  mostrarButtonSalvar = true,
  mostrarButtonSalvarFechar = false,

  mostrarButtonNovoCarregando = false,
  mostrarButtonVoltarCarregando = false,
  mostrarButtonApagarCarregando = false,
  mostrarButtonSalvarCarregando = false,
  mostrarButtonSalvarFecharCarregando = false,

  cliqueButtonNovo,
  cliqueButtonVoltar,
  cliqueButtonApagar,
  cliqueButtonSalvar,
  cliqueButtonSalvarFechar,
}) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display='flex'
      alignItems='center'
      height={theme.spacing(5)}
      component={Paper}
    >
      {mostrarButtonSalvar && !mostrarButtonSalvarCarregando && (
        <Button
          color='primary'
          disableElevation
          variant='contained'
          startIcon={<SaveIcon />}
          onClick={cliqueButtonSalvar}
          size={smDown ? 'small' : 'medium'}
        >
          Salvar
        </Button>
      )}
      {mostrarButtonSalvarCarregando && (
        <Skeleton
          width={109}
          height={62}
        />
      )}

      {mostrarButtonApagar && !mostrarButtonApagarCarregando && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          startIcon={<DeleteIcon />}
          onClick={cliqueButtonApagar}
          size={smDown ? 'small' : 'medium'}
        >
          Apagar
        </Button>
      )}
      {mostrarButtonApagarCarregando && (
        <Skeleton
          width={113}
          height={62}
        />
      )}

      {mostrarButtonNovo && !mostrarButtonNovoCarregando && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          startIcon={<AddIcon />}
          onClick={cliqueButtonNovo}
          size={smDown ? 'small' : 'medium'}
        >
          {textButtonNovo}
        </Button>
      )}
      {mostrarButtonNovoCarregando && (
        <Skeleton
          width={96}
          height={62}
        />
      )}

      <Divider
        variant='middle'
        orientation='vertical'
      />

      {mostrarButtonVoltar && !mostrarButtonVoltarCarregando && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          startIcon={<ArrowBackIcon />}
          onClick={cliqueButtonVoltar}
          size={smDown ? 'small' : 'medium'}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            Voltar
          </Typography>
        </Button>
      )}
      {mostrarButtonVoltarCarregando && (
        <Skeleton
          width={109}
          height={62}
        />
      )}
    </Box>
  )
}
