import { useSeed } from '@/hooks/queries';
import { Box, Button, Container } from '@mui/material';
import { CardDescription, CardTitle } from './ui/card';

export default function SeedPrompt() {
  const { refetch } = useSeed(); // Disable auto-fetch on mount

  return (
    <div>
      <Container
        sx={{
          bgcolor: '#FFCCCC',
          padding: '7px',
          border: '2px dashed',
          borderColor: '#CC6666',
          borderRadius: '8px',
          margin: '15px auto', // Centers the container horizontally
          paddingLeft: '20px', // Adds padding on the left side
          paddingRight: '20px', // Adds padding on the right side
          width: '90%', // Makes the container width responsive
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
