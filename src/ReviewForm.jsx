import React from 'react';
import TextField from './TextField';

export default function ReviewForm({ fields, onChange, onSubmit }) {
  const { score, description } = fields;

  return (
    <>
      <TextField
        id="review-score"
        label="평점"
        type="number"
        name="score"
        inputValue={score}
        onChange={onChange}
      />
      <TextField
        id="review-description"
        label="리뷰 내용"
        name="description"
        inputValue={description}
        onChange={onChange}
      />
      <button
        type="button"
        onClick={onSubmit}
      >
        리뷰 남기기
      </button>
    </>
  );
}
