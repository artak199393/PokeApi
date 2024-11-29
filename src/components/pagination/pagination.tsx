import { Box, Chip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { StateType } from '../../types/types';
import { chipStyles } from './styles';

function Pagination() {
  const pokemons = useSelector(
    (state: { pokemonsData: StateType }) => state.pokemonsData.data
  );

  const [paginationPages, setPaginationPages] = useState<number>(1);
  const { pathname } = useLocation();
  const [currPage, setCurrPage] = useState<number>();
  const pagData: number[] = [];

  useEffect(() => {
    if (pathname === '/home') {
      setPaginationPages(1280 / 20);
    } else if (pokemons) {
      setPaginationPages(pokemons.length / 20);
    }
  }, [pokemons, pathname]);

  for (let i = 1; i < paginationPages; i += 1) {
    pagData.push(i);
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      {pagData.map((item) => {
        return (
          <Chip
            onClick={() => setCurrPage(item)}
            sx={chipStyles}
            color="primary"
            variant="filled"
            label={item}
          />
        );
      })}
    </Box>
  );
}

export default Pagination;
