import React, { useState } from 'react';
import { makeCard } from '../../store/cards/cards';
import { useDispatch } from '../../store/store';
import { Button } from '../Button/Button';
import { CardLayout } from './CardLayout';

type Props = {
  columnId: number;
};

export const CreateCard: React.FC<Props> = ({ columnId }) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleCancel = () => {
    setOpened(false);
    setTitle('');
    setBody('');
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    dispatch(makeCard(columnId, title, body))
      // TODO: fix dispatch types, it can't work out that a promise is returned :(
      // @ts-ignore
      .then(() => {
        setLoading(false);
        setOpened(false);
        setTitle('');
        setBody('');
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return opened ? (
    <CardLayout loading={loading}>
      <form onSubmit={handleCreate}>
        <input
          placeholder="Title"
          className="w-full border-b-2 border-gray-400 font-bold focus:border-indigo-600 focus:outline-none leading-loose focus:bg-gray-100 px-1"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          disabled={loading}
        />

        <textarea
          placeholder="Description"
          className="w-full border-b-2 border-gray-400 focus:border-indigo-600 focus:outline-none leading-loose focus:bg-gray-100 px-1 mt-1"
          value={body}
          onChange={e => setBody(e.target.value)}
          disabled={loading}
        />

        <div className="flex flex-row justify-end mt-2">
          <Button onClick={handleCancel} disabled={loading} variant="text">
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            Save
          </Button>
        </div>
      </form>
    </CardLayout>
  ) : (
    <button
      className="p-2 bg-gray-300 hover:bg-gray-400 opacity-50 rounded focus:outline-none cursor-auto"
      onClick={() => setOpened(true)}
    >
      <p className="text-xl">+</p>
    </button>
  );
};
