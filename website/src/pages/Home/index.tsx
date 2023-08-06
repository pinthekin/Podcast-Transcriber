import {
  Box, Container, Stack, Typography,
} from '@mui/material'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

function DragDropFile(props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      console.log(file)
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,
    accept: {
      'audio/wav': ['.wav'],
    },
  })

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {`${file.path} - ${file.size} bytes`}
    </li>
  ))

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {`${file.path} - ${file.size} bytes`}
      <ul>
        {errors.map((e) => (<li key={e.code}>{e.message}</li>))}
      </ul>
    </li>
  ))

  return (
    <Box className="container">
      <Box {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Typography variant="h6">Drag n drop some files here, or click to select files</Typography>
        <Typography variant="subtitle1">(Only *.wav files will be accepted)</Typography>
      </Box>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </Box>
  )
}

export default function HomePage() {
  return (
    <Container>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        height="100%"
      >
        <Typography variant="h4">Podcast Transcriber</Typography>
        <Box mt={4} p={2} bgcolor="#f5f5f5">
          <DragDropFile />
        </Box>
      </Stack>
    </Container>
  )
}
