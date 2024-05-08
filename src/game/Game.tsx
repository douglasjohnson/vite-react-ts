import { default as axios } from 'axios';
import PersistedDeck from '../types/PersistedDeck';
import { useEffect, useState } from 'react';
import { DeckCard } from './DeckCard';
import { Grid } from '@mui/material';
import GameBoard from './GameBoard';

export function Game() {
  const [decks, setDecks] = useState<PersistedDeck[]>();
  const [selectedDeck, setSelectedDeck] = useState<PersistedDeck>();

  useEffect(() => {
    axios.get<PersistedDeck[]>('/decks').then((response) => setDecks(response.data));
  }, []);

  return selectedDeck ? (
    <GameBoard deck={selectedDeck} />
  ) : (
    decks && (
      <Grid container spacing={2}>
        {decks.map((deck) => (
          <Grid item key={deck.id}>
            <DeckCard deck={deck} onClick={() => setSelectedDeck(deck)} />
          </Grid>
        ))}
      </Grid>
    )
  );
}
