import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { Box, CardActionArea, CircularProgress } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { getCardsImg } from '../../store/fetchApi';
import { CardsProps } from '../../types/types';
import { cardName, cardMedia, cards } from './styles';

function Cards({ name, src, onClick }: CardsProps) {
  const [pokeImgSrc, setPokeImgSrc] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (() => {
      setLoading(true);
      getCardsImg(src)
        .then((res) => {
          setPokeImgSrc(res.sprites.front_default);
        })
        .finally(() => {
          setLoading(false);
        });
    })();
  }, [src]);

  return (
    <Card onClick={onClick} sx={cards}>
      <Box sx={{ backgroundColor: '#1976d2' }}>
        <CardActionArea>
          <Box sx={cardMedia}>
            {loading && !pokeImgSrc ? (
              <CircularProgress />
            ) : pokeImgSrc ? (
              <CardMedia component="img" alt={name} image={pokeImgSrc} />
            ) : (
              <ImageNotSupportedIcon
                color="primary"
                sx={{ fontSize: '100px' }}
              />
            )}
          </Box>
          <Box sx={{ overflow: 'hidden' }}>
            <Box sx={cardName}>{name.toUpperCase()}</Box>
          </Box>
        </CardActionArea>
      </Box>
    </Card>
  );
}

export default Cards;
