import { Component } from 'react';
import { Card, CardMedia, CardActionArea, CardContent, Typography } from '@mui/material';

class PokemonCard extends Component {


  render() {
    const { name, image, types } = this.props;

    return (
      <div>
        <Card sx={{ maxWidth: 300 }}>
          <CardActionArea>
            <CardMedia
              component='img'
              height='max'
              image={ image['official-artwork'].front_default }
              alt={ name }
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {name}
              </Typography>
              <Typography variant='h6' component='div'>
                {
                  types.map(({ type }) => 
                    <Typography gutterBottom component='p'>
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