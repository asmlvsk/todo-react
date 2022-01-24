import React from 'react';
import { Grid } from '@mui/material';

interface ListProps<T> {
  items: T[];

  renderItem: (item: T) => React.ReactNode;
}

export default function List<T>(props: ListProps<T>) {
  const { items, renderItem } = props;
  return <Grid container>{items.map(renderItem)}</Grid>;
}
