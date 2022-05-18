import { Component } from 'react';
import { Card, CardMedia, CardActionArea, CardContent, Typography } from '@mui/material';

class PokemonCard extends Component {


  render() {
    const { id, name, image, types, showPokemonDetails } = this.props;

    return (
      <div className='pokemon'>
        <Card sx={{ maxWidth: 290 }}>
          <CardActionArea value={ id }
            onClick={ showPokemonDetails }
          >
            <CardMedia
              component='img'
              height='max'
              image={ image['official-artwork'].front_default }
              alt={ name }
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
        </Card>
      </div>
    )
  }
}

export default PokemonCard;