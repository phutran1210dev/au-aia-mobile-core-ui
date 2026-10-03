import { describe, expect, it, jest } from '@jest/globals';

import { createCache } from '../createCache';

describe('createCache', () => {
  it('returns the cached value for a known key', () => {
    const cache = createCache<object>(2);
    const first = cache('a', () => ({}));
    expect(cache('a', () => ({}))).toBe(first);
  });

  it('keeps a recently used entry and drops the least recently used one', () => {
    const cache = createCache<object>(2);
    const a = cache('a', () => ({}));
    cache('b', () => ({}));
    cache('a', () => ({})); // using `a` again makes `b` the least recently used
    cache('c', () => ({})); // over the limit: `b` goes

    const createB = jest.fn(() => ({}));
    expect(cache('a', () => ({}))).toBe(a);
    cache('b', createB);
    expect(createB).toHaveBeenCalledTimes(1);
  });
});
