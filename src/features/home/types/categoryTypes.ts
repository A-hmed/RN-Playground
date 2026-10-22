// 1. Single Category Item Model
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
// 3. Root API Response Object
export interface CategoriesResponse {
  results: number;
  data: Category[];
}
