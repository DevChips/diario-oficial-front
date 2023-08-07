import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {format} from 'date-fns'
import 'dayjs/locale/pt-br'
import React, {useState} from 'react'
import {FerramentaListageDiarios} from '../../components/ferramentaListagemDiarios/FerramentaListagemDiarios'
import {Box, Card, Stack, Typography, useMediaQuery, useTheme} from '@mui/material'
import {LocalizationProvider, ptBR} from '@mui/x-date-pickers'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import {formatInTimeZone} from 'date-fns-tz'
import {ptBR as ptBRLocale} from 'date-fns/locale'
import dayjs, {Dayjs} from 'dayjs'
import { Api } from '../../services/axios-config'

export const PesquisaPorData = () => {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs(Date.now()))
  const [listagemDiariosPorData, setListagemDiariosPorData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const buscarPorData = async (dataBusca: any) => {
    setIsLoading(true)
    setDate(dataBusca)
    const dataFormatada = format(new Date(dataBusca), 'yyyy-MM-dd')

    await Api
      .get(
        `/diarios/publicados?limit=6&dataInicial=${dataFormatada}&dataFinal=${dataFormatada}`
      )
      .then(async (item) => {
        setIsLoading(false)

        const diarios: any = []
        await item.data.result.map((item: any) => {
          const dataPublicacao = formatInTimeZone(
            item.dataPublicacao.split('T')[0],
            'America/Sao_Paulo',
            "EEEEEE, dd 'de' MMMM yyyy",
            {
              locale: ptBRLocale,
            }
          )

          diarios.push({
            textPrimaryItem: `Edição ${item.edicao}`,
            textSecondaryItem: dataPublicacao[0].toUpperCase() + dataPublicacao.substr(1),
            caminho: item.caminho,
          })
        })
        setListagemDiariosPorData(diarios)
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
      })
  }

  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const handleOpenModal = (dados: any) => {
  }

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
          <Typography sx={{color: 'white', fontSize: '1rem', textAlign: 'center'}}>
            PESQUISAR POR DATA
          </Typography>
        </Box>
        <Box
          display='flex'
          flexDirection={smDown ? 'column' : 'row'}
          flex={1}
          marginTop={3}
        >
          <Box>
            <LocalizationProvider
              //@ts-ignore
              dateAdapter={AdapterDayjs}
              adapterLocale='pt-br'
              localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
            >
              <Stack spacing={3}>
                <DateCalendar
                label='Data de publicação'
                disableFuture
                value={date}
                 onChange={(newValue) => {
                  buscarPorData(newValue)
                }}
                />
              </Stack>
            </LocalizationProvider>
          </Box>
          {!isLoading && 
           <Box>
           {listagemDiariosPorData.length > 0 && (
             <FerramentaListageDiarios
               listagemDiariosOficiais={listagemDiariosPorData}
               qtdItens={4}
             />
           )}
         </Box>
          }         
        </Box>
      </Card>

    </Box>
  )
}
