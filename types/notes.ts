export interface Note {
  id: string;
  title: string;
  content: string;
  image?: string;
  checked?: boolean[];
  checkItems?: string[];
}
