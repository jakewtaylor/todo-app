import React, { useState } from 'react';
import { editCard, StoreCard } from '../../store/cards/cards';
import { useDispatch } from '../../store/store';
import { Button } from '../Button/Button';
import { CardLayout } from './CardLayout';

type Props = {
  card: StoreCard;
  onDone(): any;
};

export const EditCard: React.FC<Props> = ({ card, onDone }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(card.title);
  const [body, setBody] = useState(card.body);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    dispatch(editCard(card, title, body))
      // TODO: fix dispatch types, it can't work out that a promise is returned :(
      // @ts-ignore
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      })
      .then(() => {
        onDone();
      });
  };

  return (
    <CardLayout>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Title"
          className="w-full border-b-2 border-gray-400 font-bold focus:border-indigo-600 focus:outline-none leading-none focus:bg-gray-100 py-2 text-base text-indigo-900"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          disabled={loading}
        />

        <textarea
          placeholder="Description"
          className="w-full border-b-2 border-gray-400 focus:border-indigo-600 focus:outline-none leading-tight focus:bg-gray-100 py-1 mt-1 text-sm"
          value={body}
          onChange={e => setBody(e.target.value)}
          disabled={loading}
        />

        <div className="flex flex-row justify-end mt-2">
          <Button onClick={onDone} disabled={loading} variant="text">
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            Save
          </Button>
        </div>
      </form>
    </CardLayout>
  );
};
