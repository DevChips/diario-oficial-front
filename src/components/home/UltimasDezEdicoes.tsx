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
      .then(async (tipo) => {
        setLoading(false)
        setTipos(tipo.data.result)
        const arrDiarios: any = []
        const arrDiariosOficial: any = []
        const arrDiariosExtraOficial: any = []        
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
