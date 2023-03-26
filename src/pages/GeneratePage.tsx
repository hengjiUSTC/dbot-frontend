import { Helmet } from 'react-helmet-async';
// @mui
import {
  Grid,
  Container,
  TextField,
  Typography,
  Card,
  Box,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import Footer from '@/layouts/main/Footer';
import { useState } from 'react';
import Iconify from '@/components/iconify';
import { Uploader } from 'uploader';
import { UploadDropzone } from 'react-uploader';
import Image from '@/components/image';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { instance } from '@/network/axiosInstance';
import { UPLOADER_API } from '@/config-global';

const options = {
  multi: false,
  styles: {
    colors: {
      primary: '#377dff',
    },
  },
  editor: {
    images: {
      crop: true,
      cropRatio: 1 / 1,
      cropShape: 'rect' as const,
    },
  },
  mimeTypes: ['image/jpeg', 'image/png', 'image/jpg'],
  container: 'div',
};

// Configuration for the uploader
const uploader = Uploader({
  apiKey: UPLOADER_API,
});

interface SnackBarState {
  open: boolean;
  emessage: string;
  type: 'error' | 'success' | undefined;
}
// ----------------------------------------------------------------------

export default function GeneratePage() {
  const nums = 100;
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [example, setExample] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [snackBarState, setSnackBarState] = useState<SnackBarState>({
    open: false,
    emessage: '',
    type: undefined,
  });

  const UploadDropZone = () => (
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={(files) => {
        if (files.length === 0) {
          console.log('No files selected.');
        } else if (files.length === 1) {
          console.log('Files uploaded:');
          const file = files.map((f) => f.fileUrl);
          setPhotoUrl(file[0]);
        }
      }}
      // width="100%"
      width="670px"
      height="550px"
    />
  );

  const handleClose = () => {
    setSnackBarState({
      open: false,
      emessage: '',
      type: undefined,
    });
  };

  const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    const bodyFormData = new FormData();
    if (name === '') {
      setSnackBarState({
        open: true,
        emessage: 'Plesae enter name',
        type: 'error',
      });
      return;
    }
    bodyFormData.set('name', name);
    if (description === '') {
      setSnackBarState({
        open: true,
        emessage: 'Plesae enter description',
        type: 'error',
      });
      return;
    }
    bodyFormData.set('description', description);
    if (prompt === '') {
      setSnackBarState({
        open: true,
        emessage: 'Plesae enter prompt',
        type: 'error',
      });
      return;
    }
    bodyFormData.set('prompt', prompt);
    if (example === '') {
      setSnackBarState({
        open: true,
        emessage: 'Plesae enter example',
        type: 'error',
      });
      return;
    }
    bodyFormData.set('example', example);
    if (photoUrl === '') {
      setSnackBarState({
        open: true,
        emessage: 'Plesae upload a photo of robot',
        type: 'error',
      });
      return;
    }
    bodyFormData.set('image', photoUrl);
    instance.post('/bot/single/', bodyFormData).then((r) => {
      console.log(r);
      setSnackBarState({
        open: true,
        emessage: 'Create success, redirect soon',
        type: 'success',
      });
    });
  };

  return (
    <>
      <Helmet>
        <title>Generate</title>
      </Helmet>
      <Container>
        <CustomBreadcrumbs
          heading="Genereate"
          links={[
            {
              name: 'Home',
              href: '/',
            },
            { name: 'generate' },
          ]}
        />
      </Container>

      <Container sx={{ my: 10 }}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h1" sx={{ textAlign: 'center', padding: 2 }}>
            Diy your own bot
          </Typography>
          <Typography
            component="div"
            variant="overline"
            sx={{ textAlign: 'center', color: 'text.disabled', fontSize: '1.25rem', padding: 1 }}
          >
            {nums} rooms generated
          </Typography>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            rowSpacing={2}
            paddingTop={3}
          >
            <Grid item width="100%">
              <Box display="flex" justifyContent="center" width="100%">
                <Grid container alignItems="center" spacing={1} maxWidth="40rem">
                  <Grid item xs="auto">
                    <Iconify width="36px" icon="mdi:number-one-circle" />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="h3">Name</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      label="name"
                      fullWidth
                      value={name}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setName(event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item width="100%">
              <Box display="flex" justifyContent="center" width="100%">
                <Grid container alignItems="center" spacing={1} maxWidth="40rem">
                  <Grid item xs="auto">
                    <Iconify width="36px" icon="mdi:number-two-circle" />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="h3">Description</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="description"
                      label="Description"
                      fullWidth
                      multiline
                      rows={3}
                      value={description}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setDescription(event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item width="100%">
              <Box display="flex" justifyContent="center" width="100%">
                <Grid container alignItems="center" spacing={1} maxWidth="40rem">
                  <Grid item xs="auto">
                    <Iconify width="36px" icon="mdi:number-three-circle" />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="h3">Prompt</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="prompt"
                      label="Prompt"
                      fullWidth
                      multiline
                      rows={3}
                      value={prompt}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setPrompt(event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item width="100%">
              <Box display="flex" justifyContent="center" width="100%">
                <Grid container alignItems="center" spacing={1} maxWidth="40rem">
                  <Grid item xs="auto">
                    <Iconify width="36px" icon="mdi:number-three-circle" />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="h3">Example input</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="example"
                      label="Example"
                      fullWidth
                      multiline
                      rows={3}
                      value={example}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setExample(event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item width="100%">
              <Box display="flex" justifyContent="center" width="100%">
                <Grid container alignItems="center" spacing={1} maxWidth="40rem">
                  <Grid item xs={12}>
                    {photoUrl === '' && <UploadDropZone />}
                    {photoUrl !== '' && (
                      <Image
                        src={photoUrl}
                        ratio="1/1"
                        sx={{ borderRadius: 1, marginTop: 2 }}
                        maxWidth="40rem"
                      />
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item width="100%">
              <Box display="flex" justifyContent="center" width="100%">
                <Button
                  variant="contained"
                  onClick={onSubmit}
                  sx={{
                    maxWidth: '40rem',
                    width: '100%',
                    height: 50,
                    fontSize: 20,
                    fontWeight: 30,
                  }}
                >
                  Generate
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackBarState.open}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackBarState.type}
          sx={{ width: '100%', fontSize: 20, fontWeight: 30, alignItems: 'center' }}
        >
          {snackBarState.emessage}
        </Alert>
      </Snackbar>
      <Footer />
    </>
  );
}
