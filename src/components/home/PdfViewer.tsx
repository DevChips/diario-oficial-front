import {Box, useMediaQuery} from '@mui/material'
import {useTheme} from '@mui/system'
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack5'
import { Environment } from '../../environment/environment'

const PdfViewer = ({data}: any) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
console.log(data)
  return (
    <Box
      padding='2.5rem'
      sx={
        smDown
          ? {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 'auto',
            }
          : {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 'auto',
              transition: '0.3s',
              ':hover': {transform: 'scale(1.1)'},
            }
      }
    >
      <a
        target={'_blanc'}
        href={`${Environment.URL_BASE_UPLOAD}/diario/00000000000/${data?.caminho}`}
      >
        <Document
          file={`${Environment.URL_BASE_UPLOAD}/diario/00000000000/${data?.caminho}`}
        >
          <Page
            renderTextLayer={false}
            renderAnnotationLayer={false}
            pageNumber={1}
            scale={smDown ? 0.4 : 0.8}
          />
        </Document>
      </a>
    </Box>
  )
}

export default PdfViewer
