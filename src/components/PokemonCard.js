import React from 'react';
import { Link } from "react-router-dom";
import { Card, CardMedia, CardActions, CardActionArea, CardContent, Typography } from '@mui/material';

function PokemonCard({ id, name, image, types }) {
  return (
    <div className='pokemon'>
      <Card sx={{ maxWidth: 290 }}>
        <CardActionArea
          href={`/pokemon/${id}`}
        >
          <CardMedia
            component='img'
            height='max'
            image={image.home.front_default}
            alt={name}
          />
          <CardContent>
            <Typography className='pokemon-name' gutterBottom variant='h5' component='div'>
              {name}
            </Typography>
            <Typography className='pokemon-types' variant='h6' component='div'>
              {
                types.map(({ type }) =>
                  <Typography key={type.name} className={type.name} gutterBottom component='p'>
                    {type.name}
                  </Typography>)
              }
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link
            to={`/pokemon/${id}`}
          >
            Details
          </Link>
        </CardActions>
      </Card>
    </div>
  )
}

export default PokemonCard;