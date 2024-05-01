import {
  Container,
  Typography,
  TextField,
  Modal,
  Box,
  Button,
} from '@mui/material';
import AddCircleOutLineIcon from '@mui/icons-material/AddCircle';
import { useThemeContext } from '../../context/ThemeContext';

export const CreateUserPanel = (props: any) => {
  const { theme } = useThemeContext();
  return (
    <Modal
      sx={{ display: 'flex', alignItems: 'center' }}
      open={props.status}
      onClose={props.close}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 400,
          maxHeight: 500,
          backgroundColor: 'white',
          padding: 3,
          width: '100%',
          position: 'relative',
        }}
        maxWidth={false}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: 2,
          }}
        >
          <Typography fontFamily={'Raleway'} variant="h5">
            {props.method}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography fontFamily={'Raleway'}>Name</Typography>
          <TextField
            sx={{
              borderColor: theme.palette.primary.main,
              borderWidth: 1,
              borderRadius: '8px',
              borderStyle: 'solid',
            }}
            onChange={(e) => props.username(e)}
            InputProps={{
              style: { color: theme.palette.primary.main }, // Set text color
            }}
          />
          <Typography fontFamily={'Raleway'}>E-mail</Typography>
          <TextField
            sx={{
              borderColor: theme.palette.primary.main,
              borderWidth: 1,
              borderRadius: '8px',
              borderStyle: 'solid',
            }}
            onChange={(e) => props.useremail(e)}
            InputProps={{
              style: { color: theme.palette.primary.main }, // Set text color
            }}
          />
          <Typography fontFamily={'Raleway'}>Password</Typography>
          <TextField
            sx={{
              borderColor: theme.palette.primary.main,
              borderWidth: 1,
              borderRadius: '8px',
              borderStyle: 'solid',
            }}
            type="password"
            onChange={(e) => props.userpassword(e)}
            InputProps={{
              style: { color: theme.palette.primary.main }, // Set text color
            }}
          />
          <Typography fontFamily={'Raleway'} sx={{ fontSize: '10px' }}>
            By registering on our website, users automatically consent to the
            collection and storage of their username and friend list of the
            platform they authenticated with. This information is used to
            enhance their experience and facilitate social interactions on our
            platform, all while maintaining strict privacy standards.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              color="success"
              variant="contained"
              sx={{ width: 10, marginTop: 2 }}
              onClick={props.submit}
            >
              <AddCircleOutLineIcon />
            </Button>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
};
