'use client';
import { useActionState, useState } from 'react';
import { updateSkillRating } from '../actions/action';
import { Rating } from '@mantine/core';

export function SkillRatingForm({
  rating: initialRating,
  skillId,
}: {
  rating: number;
  skillId: string;
}) {
  const [rating, setRating] = useState(initialRating);
  const initialState = {};
  const [state, dispatch] = useActionState(updateSkillRating, initialState);

  async function handleChange(newRating: number) {
    setRating(newRating); // به‌روزرسانی مقدار محلی
    const formData = new FormData();
    formData.set('rating', newRating.toString());
    formData.set('skillId', skillId);

    try {
      await dispatch(formData);
      console.log(state);
    } catch (error) {
      console.error('Error updating skill rating:', error);
    }
  }

  return <Rating value={rating} onChange={handleChange} />;
}
