// Contains all the custom types we want to use for our application
import Classics from './assets/images/categories/classics.jpg';
import Fantasy from './assets/images/categories/fantasy.jpg';
import Mystery from './assets/images/categories/mystery.jpg';
import Romance from './assets/images/categories/romance.jpg';
export interface BookItem {
  bookId: number;
  title: string;
  author: string;
  price: number;
  isPublic: boolean;
}

export interface CategoryItem {
  categoryId: number;
  name: string;
}
export const categoryImages: Record<string, any> = {
  classics: Classics,
  fantasy : Fantasy,
  mystery : Mystery,
  romance : Romance
};
export const categoryList = [
  { categoryId: 1001, name: "Best Seller" },
  { categoryId: 1002, name: "Fiction" },
  { categoryId: 1003, name: "Non Fiction" },
  { categoryId: 1004, name: "Young Adult" },
];

export const bookList = [
  {
    bookId: 1001,
    title: "Power of Habit",
    author: "Charles Duhigg",
    price: 13,
    isPublic: true,
  },
  {
    bookId: 1002,
    title: "Steve Jobs",
    author: "Walter Isaccson",
    price: 14,
    isPublic: false,
  },
  {
    bookId: 1003,
    title: "Atomic Habits",
    author: "James Clear",
    price: 17,
    isPublic: true,
  },
  {
    bookId: 1004,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 10,
    isPublic: true,
  },
  {
    bookId: 1005,
    title: "Intelligent Investor",
    author: "Benjamin Graham",
    price: 17,
    isPublic: true,
  },
  {
    bookId: 1004,
    title: "Think and Grow Rich",
    author: "Napolean Hill",
    price: 13,
    isPublic: true,
  }
];