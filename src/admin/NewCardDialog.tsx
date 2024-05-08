import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Stack, TextField } from '@mui/material';
import Card from '../types/Card';
import { useEffect, useState } from 'react';
import AttributeType from '../types/AttributeType';

interface NewCardDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (card: Card) => void;
  attributes: AttributeType[];
}

const initialState = (attributes: AttributeType[]) => ({
  name: '',
  description: '',
  imageUrl: '',
  attributes: attributes.map((attribute) => ({
    type: attribute.name,
    value: 0,
  })),
});

export default function NewCardDialog({ open, onClose, onConfirm, attributes }: NewCardDialogProps) {
  const [card, setCard] = useState<Card>(initialState(attributes));

  useEffect(() => setCard(initialState(attributes)), [open, attributes]);

  const attributeUnits = (name: string) => attributes.find((attribute) => attribute.name === name)?.units;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New Card</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField label="Name" value={card.name} onChange={(event) => setCard({ ...card, name: event.target.value })} />
          <TextField
            label="Description"
            multiline
            rows={4}
            value={card.description}
            onChange={(event) => setCard({ ...card, description: event.target.value })}
          />
          <TextField label="Image" value={card.imageUrl} onChange={(event) => setCard({ ...card, imageUrl: event.target.value })} />
          {card.attributes.map((attribute) => (
            <TextField
              key={attribute.type}
              label={attribute.type}
              value={attribute.value}
              InputProps={{
                endAdornment: <InputAdornment position="end">{attributeUnits(attribute.type)}</InputAdornment>,
              }}
              onChange={(event) => {
                setCard({
                  ...card,
                  attributes: card.attributes.map((existingAttribute) => {
                    return attribute.type === existingAttribute.type
                      ? {
                          ...attribute,
                          value: Number(event.target.value),
                        }
                      : existingAttribute;
                  }),
                });
              }}
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => onConfirm(card)}>
            Confirm
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
