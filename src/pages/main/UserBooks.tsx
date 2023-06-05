


import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useBook } from '../../util/books';
import Stack from '@mui/material/Stack';
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));



export default function UserBooks() {
  const [expanded, setExpanded] = React.useState(false);
  const [book,setBook] = useBook(false)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleRead = (isbn: string) => {
   
    if(book?.status===0){
      localStorage.setItem('book', JSON.stringify([...book,{...book, status:1}]))
      setBook( [...book,{...book, status:1}])
    }else{
      localStorage.setItem('book', JSON.stringify(book.filter((u:any)=>u.book.isbn!==isbn)))
      setBook( book.filter((u:any)=>u.book.isbn!==isbn))
    }

  };

  return (
    <Stack direction="row" justifyContent="space-around" flexWrap="wrap">{book.length?<>{
        book.map((u:any,i:number)=><Card key={i} sx={{ maxWidth: 345 }}>
        <CardHeader
          title={u.book?.title}
          subheader={u.book?.author + ',   ' + u.book?.published}
        />
        <CardMedia
          component='img'
          height='194'
          image={u.book?.cover}
          alt={u.book?.title}
        />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            ISBN:{u.book?.isbn}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
              onClick={()=>handleRead(u.book?.isbn)}
            aria-label='add to favorites'
          >
            {!u.status? <FavoriteBorderOutlinedIcon/>:<FavoriteIcon />}
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography paragraph>Additional Information about book:</Typography>
          </CardContent>
        </Collapse>
      </Card>)
    }</>
        :<Typography>You don't have any book to read</Typography>}</Stack>
  );
}
