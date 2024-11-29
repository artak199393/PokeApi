import { useEffect } from 'react';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Chip } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadData, loadSpecifyData, loadTypesMenu } from '../../store/slices';
import { StateType, TypeMenuType } from '../../types/types';
import { wrapper } from './styles';

function TypesMenu({ offset }: { offset: number }) {
  const dispatch = useDispatch<any>();
  const typesMenu = useSelector(
    (state: { pokemonsData: StateType }) => state.pokemonsData.pokemonTypes
  );
  const pokeAllCount = useSelector(
    (state: { pokemonsData: StateType }) => state.pokemonsData.allCount
  );

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(loadTypesMenu('https://pokeapi.co/api/v2/type'));
  }, [dispatch]);

  useEffect(() => {
    if (pathname === '/') {
      navigate('/home');
    }
  }, [navigate, pathname]);

  useEffect(() => {
    typesMenu.map((item: { name: string; url: string }) => {
      if (item.name === pathname.slice(1)) {
        dispatch(loadSpecifyData(item.url));
      }
      if (pathname.slice(1) === 'home') {
        dispatch(loadData(offset, pokeAllCount));
      }
      return null;
    });
  }, [dispatch, pathname, typesMenu]);

  const handleClick = (item: { name: string }) => {
    navigate(item.name);
  };

  return (
    <Box sx={wrapper}>
      {typesMenu?.map((item: TypeMenuType) => {
        return (
          <Box key={item.name}>
            <Chip
              label={item.name.toUpperCase()}
              onClick={() => handleClick(item)}
              color="primary"
              sx={{ margin: '5px' }}
              variant={pathname.slice(1) === item.name ? 'outlined' : 'filled'}
            />
          </Box>
        );
      })}
    </Box>
  );
}

export default TypesMenu;
