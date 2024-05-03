import { Card, CardActionArea } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

interface NewCardProps {
  onClick: () => void;
}

export function NewCard({ onClick }: NewCardProps) {
  return (
    <Card
      raised
      sx={{
        width: 200,
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          height: 320,
        }}
      >
        <AddRoundedIcon />
      </CardActionArea>
    </Card>
  );
}
