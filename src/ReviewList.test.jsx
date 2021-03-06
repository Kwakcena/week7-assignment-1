import React from 'react';

import { render } from '@testing-library/react';

import ReviewList from './ReviewList';

import reviews from '../fixtures/reviews';

describe('ReviewList', () => {
  context('with reviews', () => {
    it('render reviews', () => {
      const { container } = render((
        <ReviewList reviews={reviews} />
      ));

      reviews.forEach(({ name, score, description }) => {
        expect(container).toHaveTextContent(`${name}${score}${description}`);
      });
    });
  });

  context('without reviews', () => {
    it('renders no reviews message', () => {
      [[], null, undefined].forEach((noReviews) => {
        const { container } = render(<ReviewList reviews={noReviews} />);

        expect(container).toHaveTextContent('리뷰가 없어요');
      });
    });
  });
});
