import Deck from '../types/Deck';
import { useState } from 'react';
import { Button, Grid, IconButton, List, ListItem, ListItemButton, Stack, TextField } from '@mui/material';
import { NewCard } from './NewCard';
import { NewCardDialog } from './NewCardDialog';
import { CardCard } from './CardCard';
import DeleteIcon from '@mui/icons-material/Delete';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

interface DeckEditProps {
  deck: Deck;
  onUpdate: (deck: Deck) => void;
  onCancel: () => void;
  confirmText: string;
}

function DeckEdit({ deck, onUpdate, onCancel, confirmText }: DeckEditProps) {
  const [updatedDeck, setUpdatedDeck] = useState(deck);
  const [addCard, setAddCard] = useState(false);

  return (
    <div>
      <Stack spacing={2}>
        <TextField label="Name" value={updatedDeck.name} onChange={(event) => setUpdatedDeck({ ...deck, name: event.target.value })} />
        <TextField label="Image" value={updatedDeck.imageUrl} onChange={(event) => setUpdatedDeck({ ...deck, imageUrl: event.target.value })} />
        <List>
          {updatedDeck.attributes.map((attribute) => (
            <ListItem
              key={attribute.name}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon
                    onClick={() => {
                      const attributes = updatedDeck.attributes.filter((value) => value.name !== attribute.name);
                      setUpdatedDeck({
                        ...updatedDeck,
                        attributes,
                      });
                    }}
                  />
                </IconButton>
              }
            >
              <TextField
                value={attribute.name}
                onChange={(event) =>
                  setUpdatedDeck({
                    ...updatedDeck,
                    attributes: updatedDeck.attributes.map((deckAttribute) =>
                      deckAttribute.name === attribute.name ? { ...deckAttribute, name: event.target.value } : deckAttribute,
                    ),
                  })
                }
              />
              <TextField
                value={attribute.units}
                onChange={(event) =>
                  setUpdatedDeck({
                    ...updatedDeck,
                    attributes: updatedDeck.attributes.map((deckAttribute) =>
                      deckAttribute.name === attribute.name ? { ...deckAttribute, units: event.target.value } : deckAttribute,
                    ),
                  })
                }
              />
            </ListItem>
          ))}
          <ListItem>
            <ListItemButton
              onClick={() => {
                setUpdatedDeck({ ...updatedDeck, attributes: [...updatedDeck.attributes, { name: '', units: '' }] });
              }}
            >
              <AddRoundedIcon />
            </ListItemButton>
          </ListItem>
        </List>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => onUpdate(updatedDeck)}>
            {confirmText}
          </Button>
        </Stack>
      </Stack>
      <Grid container spacing={2}>
        {updatedDeck.cards.map((card) => (
          <Grid key={card.name} item>
            <CardCard
              card={card}
              onClick={() => {}}
              onDelete={() =>
                setUpdatedDeck({
                  ...updatedDeck,
                  cards: updatedDeck.cards.filter((existingCard) => existingCard !== card),
                })
              }
            />
          </Grid>
        ))}
        <Grid item>
          <NewCard onClick={() => setAddCard(true)} />
        </Grid>
      </Grid>
      <NewCardDialog
        attributes={deck.attributes}
        open={addCard}
        onClose={() => setAddCard(false)}
        onConfirm={(card) => {
          setUpdatedDeck({ ...updatedDeck, cards: [...updatedDeck.cards, card] });
          setAddCard(false);
        }}
      />
    </div>
  );
}

export default DeckEdit;
