import Deck from '../types/Deck';
import { Card, CardActionArea, CardHeader, CardMedia, IconButton } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

interface DeckCardProps {
  deck: Deck;
  onClick: () => void;
  onDelete: () => void;
}

export function DeckCard({ deck, onClick, onDelete }: DeckCardProps) {
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
        <CardHeader
          title={deck.name}
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
        <CardMedia component="img" height="240" image={deck.imageUrl} />
      </CardActionArea>
    </Card>
  );
}
