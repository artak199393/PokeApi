import React, { useEffect, useState } from 'react';
import { ArrowCircleLeft, ArrowCircleRight } from '@mui/icons-material';
import { Box, Button, Chip, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Cards from '../card/cards';
import ModalView from '../modal/modal';
import { loadData, loadModalPoke } from '../../store/slices';
import TypesMenu from '../pokemonTypes/pokemonTypes';
import { PokemonType, StateType } from '../../types/types';
import OnPaginationWithDots from './utilis';
import {
  buttonsWrapper,
  cardsWrapper,
  chipStyles,
  errorIcon,
  noDataBlock,
  pokemonLogo,
  prevNextButtons,
} from './styles';

function Main() {
  const [fetchOffset, setFetchOffset] = useState<number>(0);
  const [paginationPagesCount, setPaginationPagesCount] = useState<number>(0);
  const pagData: string[] = [];
  const [open, setOpen] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [currPage, setCurrPage] = useState<number>(1);
  const specifyData: any = {};
  const dispatch = useDispatch<any>();
  const pokemonModal = useSelector(
    (state: { pokemonsData: StateType }) => state.pokemonsData.modalPoke
  );
  const pokemons = useSelector(
    (state: { pokemonsData: StateType }) => state.pokemonsData.data
  );
  const pokeAllCount = useSelector(
    (state: { pokemonsData: StateType }) => state.pokemonsData.allCount
  );

  useEffect(() => {
    if (pathname === '/home') {
      dispatch(loadData(fetchOffset, pokeAllCount));
    }
    dispatch(loadData(fetchOffset, pokeAllCount));
    // setFetchOffset(0);
  }, [dispatch, fetchOffset]);

  useEffect(() => {
    if (pathname === '/home') {
      setFetchOffset(() => (currPage === 1 ? 0 : 20 * currPage));
    }
  }, [currPage, pathname]);

  useEffect(() => {
    if (pathname === '/home') {
      setPaginationPagesCount(pokeAllCount / 20);
    } else if (pokemons) {
      setPaginationPagesCount(Math.ceil(pokemons.length / 20));
    }
  }, [pokemons, pathname]);

  useEffect(() => {
    setCurrPage(1);
  }, [pathname]);

  if (pathname !== '/home') {
    if (pokemons) {
      for (
        let i = 0, j = 1;
        i < pokemons.length, j < Math.ceil(pokemons.length / 20) + 1;
        j += 1, i += 20
      ) {
        specifyData[j] = pokemons.slice(i, i + 20);
      }
    }
  }

  const handleClick = (item: string | string[]) => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
    if (item !== '...') {
      setCurrPage(+item);
    }
  };

  function pagination() {
    for (let i = 1; i <= paginationPagesCount; i += 1) {
      pagData.push(`${i}`);
    }

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        {OnPaginationWithDots(currPage, pagData)?.map((item) => {
          return (
            <Chip
              onClick={() => handleClick(item)}
              style={{ color: currPage === +item ? 'black' : '#ffcc01' }}
              sx={chipStyles}
              color="primary"
              variant={`${currPage === +item ? 'outlined' : 'filled'}`}
              label={item}
            />
          );
        })}
      </Box>
    );
  }

  const handleOpen = (url: string) => {
    setOpen(true);
    if (url) {
      dispatch(loadModalPoke(url));
    }
  };

  const handleClose = (isOpen: boolean) => setOpen(isOpen);
  const handleClickNext = () => {
    setCurrPage((prev) => prev + 1);
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  };

  const handleClickPrev = () => {
    setCurrPage((prev) => prev - 1);
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  };

  if (!pokemons) {
    return null;
  }

  return (
    <Box sx={{ textAlign: 'center' }}>
      <img
        style={pokemonLogo}
        src="http://surl.li/gmzcb"
        alt="pokemon-logo"
        onClick={() => navigate('/home')}
      />
      <Box sx={buttonsWrapper} />
      <TypesMenu offset={fetchOffset} />
      <Box sx={cardsWrapper}>
        {pokemons.length ? (
          (pathname === '/home'
            ? pokemons
            : specifyData[currPage]
          )?.map((item: PokemonType) => (
            <Cards
              key={item.name}
              name={item.name}
              src={item.url}
              onClick={() => handleOpen(item.url)}
            />
          ))
        ) : (
          <Box sx={noDataBlock}>
            <ErrorIcon sx={errorIcon} />
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'fantasy',
              }}
            >
              No Data
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={buttonsWrapper}>
        <Button
          sx={prevNextButtons}
          onClick={handleClickPrev}
          disabled={currPage === 1 || !pokemons.length}
          variant="contained"
        >
          <ArrowCircleLeft sx={{ width: '40px', height: '30px' }} />
        </Button>
        {pagination()}
        <Button
          sx={prevNextButtons}
          disabled={
            currPage === Object.keys(specifyData).length ||
            currPage === Math.floor(pokeAllCount / 20) ||
            !pokemons.length
          }
          variant="contained"
          onClick={handleClickNext}
        >
          <ArrowCircleRight sx={{ width: '40px', height: '30px' }} />
        </Button>
      </Box>
      <ModalView data={pokemonModal} handleClose={handleClose} open={open} />
    </Box>
  );
}

export default Main;
