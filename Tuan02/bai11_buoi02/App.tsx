import { View, Text, TextInput, Pressable, FlatList } from 'react-native';
import { useState } from 'react'; 
type ProductType = {
  id: number;
  title: string;
  price: number;
};

const fetchProducts = async (keyword: string, limit: number) => {
  const res = await fetch(`https://dummyjson.com/products/search?q=${keyword}&limit=${limit}`);
  const data = await res.json();
    return data.products; 
};

const ProductSearchAPI = () => {
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState<ProductType[]>([]);

  const searchProducts = async () => {
    const result = await fetchProducts(keyword, 10);
    setProducts(result);
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Tìm sản phẩm</Text>
      
      <TextInput
        placeholder="Nhập từ khóa"
        value={keyword}
        onChangeText={setKeyword}
      />
      
      <Pressable 
        onPress={searchProducts}
      >
        <Text>Tìm kiếm</Text>
      </Pressable>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

const Test = () => {
  return (
    <View style={{ flex: 1, marginTop: 40 }}> 
      <ProductSearchAPI />
    </View>
  );
};

export default Test;