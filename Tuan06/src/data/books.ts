import { ImageSourcePropType } from 'react-native';

export interface BookInterface {
  id: number;
  title: string;
  price: string;
  priceNumber: number;
  discount: number;
  image: ImageSourcePropType;
  author: string;
  description?: string;
}

export const BOOKS_DATA: BookInterface[] = [
  {
    id: 1,
    title: 'Cho tôi xin một vé đi tuổi thơ',
    price: '120.000',
    priceNumber: 120000,
    discount: 20,
    image: require('../assets/cho-toi-xin-mot-ve-di-tuoi-tho.gif'),
    author: 'Nguyễn Nhật Ánh',
    description: 'Cho tôi xin một vé đi tuổi thơ là một trong những tác phẩm nổi tiếng nhất của nhà văn Nguyễn Nhật Ánh.',
  },
  {
    id: 2,
    title: 'Hạ Đỏ',
    price: '130.000',
    priceNumber: 130000,
    discount: 10,
    image: require('../assets/ha_do.jpg'),
    author: 'Nguyễn Nhật Ánh',
    description: 'Hạ Đỏ mang lại cảm xúc trong trẻo, lưu luyến về mùa hè tuổi trẻ.',
  },
  {
    id: 3,
    title: 'Mắt Biếc',
    price: '140.000',
    priceNumber: 140000,
    discount: 15,
    image: require('../assets/mat_biec.jpg'),
    author: 'Nguyễn Nhật Ánh',
    description: 'Câu chuyện tình đẹp và man mác buồn của Ngạn và Hà Lan.',
  },
  {
    id: 4,
    title: 'Ngày xưa có một chuyện tình',
    price: '150.000',
    priceNumber: 150000,
    discount: 30,
    image: require('../assets/ngay_xua_co_mot_chuyen_tinh.jpg'),
    author: 'Nguyễn Nhật Ánh',
    description: 'Một câu chuyện tình bạn, tình yêu tuổi trưởng thành đầy trăn trở.',
  },
  {
    id: 5,
    title: 'Tôi thấy hoa vàng trên cỏ xanh',
    price: '160.000',
    priceNumber: 160000,
    discount: 25,
    image: require('../assets/toi_thay_hoa_vang_tren_co_xanh.jpg'),
    author: 'Nguyễn Nhật Ánh',
    description: 'Thế giới tuổi thơ làng quê êm đềm với những bài học tình anh em sâu sắc.',
  },
];
