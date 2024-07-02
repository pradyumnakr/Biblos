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

export interface SelectedCategory {
  categoryName: string | null;
}

export interface CatProp{
  catList:CategoryItem[];
}

export const categoryImages: Record<string, any> = {
  classics: Classics,
  fantasy : Fantasy,
  mystery : Mystery,
  romance : Romance
};
