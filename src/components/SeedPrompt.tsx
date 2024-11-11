import { useSeed } from '@/hooks/queries';
import { Box, Button, Container } from '@mui/material';
import { CardDescription, CardTitle } from './ui/card';

export default function SeedPrompt() {
  const { refetch } = useSeed();

  return (
    <div>
      <Container
        sx={{
          bgcolor: '#FFCCCC',
          padding: '7px',
          border: '2px dashed',
          borderColor: '#CC6666',
          borderRadius: '8px',
          margin: '15px auto',
          paddingLeft: '20px',
          paddingRight: '20px',
          width: '90%',
        }}
      >
        <CardTitle>This is a demo!</CardTitle>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <CardDescription>Reset database before testing here:</CardDescription>
          <Button onClick={() => refetch()} variant='outlined' color='error'>
            Reset
          </Button>
        </Box>
      </Container>
    </div>
  );
}
