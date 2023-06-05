import React from 'react';
import { useContext, useState, createContext } from 'react';

interface BookInterface {
    id: number;
    isbn: string;
    title: string;
    cover: string;
    author: string;
    published: number;
    pages: number;
  }
interface BookProps {
    book: BookInterface,
    status: number
}
interface ValueProps {
   book:[],
   setBook:any
}


const BookContext = createContext<ValueProps>({ book:[], setBook: ()=>{} });



const BookProvider = ({ children }: any) => {
  const [book, setBook] = useState<any>(localStorage.getItem('book')?JSON.parse(localStorage.getItem('book')||''):[]);
  console.log("provider", book)
  return (
    <BookContext.Provider value={{ book, setBook }}>
      <BookContext.Consumer>{() => children}</BookContext.Consumer>
    </BookContext.Provider>
  );
};
const useBook = (setternOnly: boolean) => {
  const { book, setBook } = useContext(BookContext);
  return setternOnly ? [setBook] : [book, setBook];
};
export { useBook, BookProvider };
