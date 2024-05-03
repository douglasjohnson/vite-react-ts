import { Card as MuiCard, CardActionArea, CardHeader, CardMedia, IconButton } from '@mui/material';
import Card from '../types/Card';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

interface CardCardProps {
  card: Card;
  onClick: () => void;
  onDelete: () => void;
}

export function CardCard({ card, onClick, onDelete }: CardCardProps) {
  return (
    <MuiCard
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
        <CardHeader
          title={card.name}
          action={
            <IconButton aria-label="delete">
              <DeleteRoundedIcon
                onClick={(event) => {
                  event.stopPropagation();
                  onDelete();
                }}
              />
            </IconButton>
          }
        />
        <CardMedia component="img" height="240" image={card.imageUrl} />
      </CardActionArea>
    </MuiCard>
  );
}
