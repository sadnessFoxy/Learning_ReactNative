import { ImageSourcePropType } from 'react-native';

export interface BookInterface {
  id: number;
  title: string;
  price: string;
  discount: number;
  image: ImageSourcePropType;
  author: string;
  description?: string;
}

export interface BookCardItemProp {
  book: BookInterface;
  isSingle?: boolean;
  onPress?: () => void;
}
