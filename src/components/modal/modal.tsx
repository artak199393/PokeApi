import * as React from 'react';
import { ArrowCircleLeft, ArrowCircleRight } from '@mui/icons-material';
import Backdrop from '@mui/material/Backdrop';
import { Box, Button, Fade, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { ModalViewProps } from '../../types/types';
import { descriptionLines, descriptionWrapper, modalBox, modalName, modalPhotoWrapper, pokeImg } from './styles';

function ModalView({ data, handleClose, open }: ModalViewProps) {
  const [picChanger, setPicChanger] = useState<boolean>(false);
  const [photoSrc, setPhotoSrc] = useState<any>({
    front: data?.sprites.front_default,
    back: data?.sprites.front_default,
  });

  useEffect(() => {
    setPhotoSrc({
      front: data?.sprites.front_default,
      back: data?.sprites.back_default,
    });
    setPicChanger(false);
  }, [data]);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => {
        handleClose(false);
      }}
      slots={{ backdrop: Backdrop }}
    >
      <Fade in={open}>
        <Box sx={modalBox}>
          <Box>
            <img
              style={{ width: '150px', marginTop: '20px' }}
              src="http://surl.li/gmzcb"
              alt="pokemon-logo"
            />
            <Box sx={modalPhotoWrapper}>
              <Button onClick={() => setPicChanger((prev) => !prev)}>
                <ArrowCircleLeft />
              </Button>
              {!picChanger ? (
                photoSrc.front ? (
                  <img
                    style={pokeImg}
                    src={photoSrc.front}
                    alt="front-img"
                  />
                ) : (
                  <Box sx={pokeImg}>
                    <ImageNotSupportedIcon
                      color="primary"
                      sx={{ fontSize: '100px' }}
                    />
                  </Box>
                )
              ) : photoSrc.back ? (
                <img
                  style={pokeImg}
                  src={photoSrc.back}
                  alt="back-img"
                />
              ) : (
                <Box sx={pokeImg}>
                  <ImageNotSupportedIcon
                    color="primary"
                    sx={{ fontSize: '100px' }}
                  />
                </Box>
              )}
              <Button onClick={() => setPicChanger((prev) => !prev)}>
                <ArrowCircleRight />
              </Button>
            </Box>
            <Box sx={descriptionWrapper}>
              <Box sx={modalName}>{data?.name.toUpperCase()}</Box>
              <Box sx={{ padding: '10px' }}>
                <Box sx={descriptionLines}>
                  Type :
                  <span style={{ marginLeft: '5px' }}>
                    {data?.types[0].type.name}
                  </span>
                </Box>
                <Box sx={descriptionLines}>
                  Weight :
                  <span style={{ marginLeft: '5px' }}>{data?.weight}</span>
                  KG
                </Box>
                <Box sx={descriptionLines}>
                  Height :
                  <span style={{ marginLeft: '5px' }}>{data?.height}</span>
                  0CM
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ModalView;
