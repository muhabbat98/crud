import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getBooks } from '../../util/mockData';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import BooksItem from './BooksItem';
import { useBook } from '../../util/books';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} >
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}
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
export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [book] = useBook(false)
  const [newBook, setNewBook] = React.useState<BookProps[]>(getBooks.data||[])
  React.useEffect(()=>{
    setNewBook(getBooks.data.map((e:any)=>(book.length&&book.find((b:any)=>b.book.id===e.book.id))||{...e, status:0}))
  },[ book])
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        height: '70wh'
      }}
    >
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label='Vertical tabs example'
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {newBook.map((u, i) => (
          <Tab key={i} label={MediaControlCard(u.book)} {...a11yProps(i)} />
        ))}
      </Tabs>
      {newBook.map((u, i) => (
        <TabPanel key={i} value={value} index={i}>
          <BooksItem {...u} />
        </TabPanel>
      ))}

    </Box>
  );
}

interface BookInterface {
  id: number;
  isbn: string;
  title: string;
  cover: string;
  author: string;
  published: number;
  pages: number;
}
function MediaControlCard(u: BookInterface) {
  return (
    <Card key={u.id} sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component='div' variant='h5'>
            {u.title}
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
            component='div'
          >
            {u.author}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <Typography>{u.isbn}</Typography>
        </Box>
      </Box>
      <CardMedia
        component='img'
        sx={{ width: 151 }}
        image={u.cover}
        alt={u.title}
      />
    </Card>
  );
}
