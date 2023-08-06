import React, { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css'

import ErrorBoundary from '../components/ErrorBoundary'
import HomePage from './Home'
import PageNotFound from './PageNotFound'

function AppWrapper({ children }: { children: ReactNode }) {
  // w-screen
  return <div className="flex flex-col justify-between min-h-screen">{children}</div>
}

function App() {
  return (
    <ErrorBoundary>
      <AppWrapper>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="description" content="Podcast Transcriber" />
          <title>Podcast Transcriber</title>
          <link rel="canonical" href="https://transcribe-podcast.today" />
        </Helmet>
        <div className="mb-auto">
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </AppWrapper>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </ErrorBoundary>
  )
}

export default App
