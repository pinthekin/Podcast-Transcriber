import React from 'react'
import { Helmet } from 'react-helmet-async'

import { HomeOutlined } from '@mui/icons-material'
import {
  Box, Button,
  Stack,
  Typography,
} from '@mui/material'

import podcastTranscriberLogo from '../../assets/podcastTranscriber.svg'

export default function PageNotFound() {
  return (
    <>
      <Helmet>
        <title>404 | Blockhouse</title>
      </Helmet>
      <Box
        height="100vh"
        width="100vw"
        bgcolor="#000"
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Box>
            <img src={podcastTranscriberLogo} alt="podcastTranscriber Logo" className="h-full w-full max-h-40" />
          </Box>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            paddingBottom={6}
            spacing={2}
          >
            <Typography variant="h5">Beep boop...</Typography>
            <Typography variant="h4">Couldn&apos;t locate the page</Typography>
          </Stack>
          <Box>
            <Button
              variant="contained"
              size="large"
              endIcon={<HomeOutlined />}
              href="/"
            >
              Go Back
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  )
}
