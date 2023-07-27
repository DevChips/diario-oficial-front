import { useEffect, useState } from 'react'

import { Box, Card, Typography } from '@mui/material'
import axios from 'axios'
import { formatInTimeZone } from 'date-fns-tz'
import { ptBR } from 'date-fns/locale'
import { FerramentaListageDiarios } from '../../components/ferramentaListagemDiariosUltimasEdicoes/ferramentaListagemDiariosUltimasEdicoes'
import { FerramentasTab } from "../../components/ferramentasTab/FerramentasTab"
import { Api } from '../../services/axios-config'

export const UltimasDezEdicoes = () => {
  const [loading, setLoading] = useState(false)
  const [tipos, setTipos] = useState([])
  const [diarios, setDiarios] = useState([])
  const [diariosOficial, setDiariosOficial] = useState([])
  const [diariosExtraOficial, setDiariosExtraOficial] = useState([])

  useEffect(() => {
    setLoading(true)
Api.get(`/tipos`)
      .then(async (item) => {
        setLoading(false)
        setTipos(item.data.result)
        const arrDiarios: any = []
        const arrDiariosOficial: any = []
        const arrDiariosExtraOficial: any = []
        await item.data.result.map((item: any) => {
          const dataPublicacao = formatInTimeZone(
            item.dataPublicacao.split('T')[0],
            'America/Sao_Paulo',
            "EEEEEE, dd 'de' MMMM yyyy",
            {
              locale: ptBR,
            }
          )

          arrDiarios.push({
            textPrimaryItem: `Edição ${item.edicao}`,
            textSecondaryItem: dataPublicacao[0].toUpperCase() + dataPublicacao.substr(1),
            arquivo: item.caminho,
          })
          if (item.tipo === '63e0fd56bc32968da5c3afa7') {
            arrDiariosOficial.push({
              textPrimaryItem: `Edição ${item.edicao}`,
              textSecondaryItem: dataPublicacao[0].toUpperCase() + dataPublicacao.substr(1),
              arquivo: item.caminho,
            })
          }
          if (item.tipo === '63e263caded79d664fa49292') {
            arrDiariosExtraOficial.push({
              textPrimaryItem: `Edição ${item.edicao}`,
              textSecondaryItem: dataPublicacao[0].toUpperCase() + dataPublicacao.substr(1),
              arquivo: item.caminho,
            })
          }
        })
        setDiarios(arrDiarios)
        setDiariosOficial(arrDiariosOficial)
        setDiariosExtraOficial(arrDiariosExtraOficial)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])


  const dadosTab = tipos.map((item: any) => {
    return {
      titulo: item.descricao,
      componente: <FerramentaListageDiarios listagemDiariosOficiais={item.documentos[0]} />,
    };
  });
  
  // console.log(dadosTab)
  // const dadosTab = [
  //   {
  //     titulo: 'ÚLTIMAS EDIÇÕES',
  //     componente: <FerramentaListageDiarios listagemDiariosOficiais={diarios} />,
  //   },
  //   {
  //     titulo: 'ÚLTIMAS EDIÇÕES OFICIAIS',
  //     componente: <FerramentaListageDiarios listagemDiariosOficiais={diariosOficial} />,
  //   },
  //   {
  //     titulo: 'ÚLTIMAS EDIÇÕES EXTRA',
  //     componente: <FerramentaListageDiarios listagemDiariosOficiais={diariosExtraOficial} />,
  //   },
  // ]

  return (
    <div
      style={{
        marginTop: '1rem',
        width: '90%',
        margin: '30px auto 0 auto',
        height: '100%',
      }}
    >
      <Card
        style={{
          textAlign: 'center',
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
          <Typography sx={{ color: 'white', fontSize: '1rem' }}>10 (DEZ) ÚLTIMAS EDIÇÕES</Typography>
        </Box>
        <Box>
          <FerramentasTab dadosTab={dadosTab} />
        </Box>
      </Card>
    </div>
  )
}
