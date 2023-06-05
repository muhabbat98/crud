import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useBook } from '../../util/books';
import { getBooks } from '../../util/mockData';

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

interface BookInterface {
  id: number;
  isbn: string;
  title: string;
  cover: string;
  author: string;
  published: number;
  pages: number;
}
interface BookProps{
  book:BookInterface,
  status:number
}

export default function BooksItem(data: BookProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [book,setBook] = useBook(false)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleRead = (isbn: string) => {
    
    if(data.status==0){
      localStorage.setItem('book', JSON.stringify([...book,{...data, status:1}]))
      setBook( [...book,{...data, status:1}])
      getBooks.data = getBooks.data.map((u:any)=>u.book.id==data.book.id?({...u, status:1}):u)
    }else if (data.status==1){
      localStorage.setItem('book',  JSON.stringify(book.filter((u:any)=>u.book.isbn!==isbn)))
      setBook( book.filter((u:any)=>u.book.isbn!==isbn))
      getBooks.data = getBooks.data.map((u:any)=>u.book.id==data.book.id?({...u, status:0}):u)
    }

  };
 
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={data.book.title}
        subheader={data.book.author + ',   ' + data.book.published}
      />
      <CardMedia
        component='img'
        height='194'
        image={data.book.cover}
        alt={data.book.title}
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          ISBN:{data.book.isbn}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
            onClick={()=>handleRead(data.book.isbn)}
          aria-label='add to favorites'
        >
          {!data.status? <FavoriteBorderOutlinedIcon/>:<FavoriteIcon />}
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
    </Card>
  );
}
