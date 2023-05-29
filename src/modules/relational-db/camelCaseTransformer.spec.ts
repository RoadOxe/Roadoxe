import { camelCaseTransformer, createJsonTransform } from "./camelCaseTransformer";

describe('jsonTransform', () => {
  it('should return an empty object for an empty input', () => {
    const fn = (x: string): string => x.toUpperCase();
    const transform = createJsonTransform(fn);

    const x = {};
    const column = {
      name: 'column_name',
      table: 1,
      number: 123,
      type: 114,
    }; 

    expect(transform(x, column)).toEqual({});
  });

  it('should transform array elements and keys in nested objects', () => {
    const fn = (x: string): string => x.toUpperCase();
    const transform = createJsonTransform(fn);

    const x = [
      { name: 'John', age: 30 },
      { name: 'Alice', age: 25 },
    ];
    const column = {
      name: 'column_name',
      table: 1,
      number: 123,
      type: 3802,
    };

    expect(transform(x, column)).toEqual([
      { NAME: 'John', AGE: 30 },
      { NAME: 'Alice', AGE: 25 },
    ]);
  });

  it('should transform keys in a nested object', () => {
    const fn = (x: string): string => x.toUpperCase();
    const transform = createJsonTransform(fn);

    const x = {
      name: 'John',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'New York',
      },
    };
    const column = {
      name: 'column_name',
      table: 1,
      number: 123,
      type: 3802,
    };

    expect(transform(x, column)).toEqual({
      NAME: 'John',
      AGE: 30,
      ADDRESS: {
        STREET: '123 Main St',
        CITY: 'New York',
      },
    });
  });
});

