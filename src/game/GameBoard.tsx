import PersistedDeck from '../types/PersistedDeck';
import { useEffect, useState } from 'react';
import Card from '../types/Card';
import { DeckCard } from './DeckCard';
import { Grid, IconButton, Typography } from '@mui/material';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import { CardCard } from './CardCard';
import Attribute from '../types/Attribute';

interface GameBoardProps {
  deck: PersistedDeck;
}

const shuffle = (array: Card[]) => {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
};

function GameBoard({ deck }: GameBoardProps) {
  const [cards1, setCards1] = useState<Card[]>();
  const [cards2, setCards2] = useState<Card[]>();
  const [game, setGame] = useState<{ player1: boolean; player2: boolean; winner: string | undefined }>({
    player1: false,
    player2: false,
    winner: undefined,
  });

  useEffect(() => {
    const shuffledCards = [...deck.cards];
    shuffle(shuffledCards);
    setCards1(shuffledCards.filter((_card, index) => index % 2 === 0));
    setCards2(shuffledCards.filter((_card, index) => index % 2 === 1));
  }, [deck]);

  const onStart = (player: string) => {
    setGame({ ...game, [player]: true });
  };

  const onNextRound = () => {
    if (cards1 && cards2) {
      const player1Card = cards1[0];
      const player2Card = cards2[0];
      const newCards1 = [...cards1];
      const newCards2 = [...cards2];
      newCards1.splice(0, 1);
      newCards2.splice(0, 1);
      if (game.winner === 'player1') {
        newCards1.push(player1Card, player2Card);
      } else if (game.winner === 'player2') {
        newCards2.push(player2Card, player1Card);
      } else {
        newCards1.push(player1Card);
        newCards2.push(player2Card);
      }
      setCards1(newCards1);
      setCards2(newCards2);
    }
    const player = game.winner || 'player1';
    setGame({ player1: false, player2: false, [player]: true, winner: undefined });
  };

  const onAttributeClick = (attribute: Attribute) => {
    if (!game.player1 || !game.player2) {
      const player1Value = cards1?.[0].attributes.find((cardAttribute) => cardAttribute.type === attribute.type)?.value || 0;
      const player2Value = cards2?.[0].attributes.find((cardAttribute) => cardAttribute.type === attribute.type)?.value || 0;
      let winner;
      if (player1Value > player2Value) {
        winner = 'player1';
      } else if (player2Value > player1Value) {
        winner = 'player2';
      }
      setGame({ player1: true, player2: true, winner });
    }
  };
  const winner = () => {
    if (game.winner) {
      const player1Card = cards1?.[0];
      const player2Card = cards2?.[0];
      return game.winner === 'player1' ? `Winner: Player 1 - ${player1Card?.name}` : `Winner: Player 2 - ${player2Card?.name}`;
    } else {
      return 'DRAW';
    }
  };

  return (
    <Grid container direction="row" justifyContent="space-evenly" alignItems="center" spacing={20}>
      <Grid item spacing={2}>
        <Typography variant="h2">Player 1</Typography>
        {cards1 && cards1.length > 0 ? (
          game.player1 ? (
            <CardCard card={cards1[0]} onClick={onAttributeClick} />
          ) : (
            <DeckCard deck={deck} onClick={() => {}} />
          )
        ) : (
          <div>Out of cards</div>
        )}
      </Grid>
      <Grid item>
        <>
          {game.player1 && game.player2 && (
            <>
              <Typography>{winner()}</Typography>
              <IconButton aria-label="Start" onClick={() => onNextRound()}>
                <SportsKabaddiIcon sx={{ fontSize: 80 }} />
              </IconButton>
            </>
          )}
          {!game.player1 && !game.player2 && (
            <IconButton aria-label="Start" onClick={() => onStart('player1')}>
              <SportsKabaddiIcon sx={{ fontSize: 80 }} />
            </IconButton>
          )}
        </>
      </Grid>
      <Grid item spacing={2}>
        <Typography variant="h2">Player 2</Typography>
        {cards2 && cards2.length > 0 ? (
          game.player2 ? (
            <CardCard card={cards2[0]} onClick={onAttributeClick} />
          ) : (
            <DeckCard deck={deck} onClick={() => {}} />
          )
        ) : (
          <div>Out of cards</div>
        )}
      </Grid>
    </Grid>
  );
}

export default GameBoard;
