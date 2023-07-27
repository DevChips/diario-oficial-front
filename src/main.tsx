import {Box, CircularProgress} from '@mui/material'
import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import {QueryClient, QueryClientProvider} from 'react-query'
import {App} from './App'
import {AppThemeProvider} from './contexts'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <Suspense
          fallback={
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              height='100vh'
            >
              <CircularProgress />
            </Box>
          }
        >
          <App />
        </Suspense>
      </AppThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
