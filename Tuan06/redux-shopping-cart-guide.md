# Redux Toolkit

> Ví dụ thực tế: **Shopping Cart** với các action cơ bản

---

## I. CHUẨN BỊ

npm install @reduxjs/toolkit react-redux

## II. HIỂU KHÁI NIỆM GIỎ HÀNG

### Câu hỏi 1: **State của giỏ hàng nên là gì?**

Suy nghĩ: Giỏ hàng cần lưu:
- Danh sách sản phẩm?
- Tổng tiền?
- Số lượng sản phẩm?

Viết cấu trúc state của bạn:

{
  // Bạn viết ở đây
}

💡 **Gợi ý:** Mỗi sản phẩm trong giỏ cần:
- id (để phân biệt)
- name (tên sản phẩm)
- price (giá)
- quantity (số lượng)

Vậy state có thể là:

{
  items: [
    { id: 1, name: "Laptop", price: 1000, quantity: 1 },
    { id: 2, name: "Mouse", price: 25, quantity: 2 }
  ]
}

### Câu hỏi 2: **Những action nào cần có?**

Giỏ hàng cần action gì?
- Thêm sản phẩm?
- Xóa sản phẩm?
- Cập nhật số lượng?
- Xóa toàn bộ?

Liệt kê các action bạn cần:

1. ?
2. ?
3. ?
4. ?

💡 **Gợi ý:** Ít nhất cần có:
- `addToCart` - Thêm sản phẩm vào giỏ
- `removeFromCart` - Xóa sản phẩm khỏi giỏ
- `updateQuantity` - Cập nhật số lượng
- `clearCart` - Xóa hết giỏ

### Câu hỏi 3: **Action addToCart cần payload gì?**

Khi thêm sản phẩm, bạn cần truyền gì?

dispatch(addToCart(?))

💡 **Gợi ý:** Cần truyền thông tin sản phẩm

dispatch(addToCart({
  id: 1,
  name: "Laptop",
  price: 1000
}))

### Câu hỏi 4: **Reducer addToCart nên làm gì?**

Khi nhận action addToCart, reducer phải:
- Nếu sản phẩm chưa có trong giỏ → thêm mới
- Nếu sản phẩm đã có → tăng quantity?

Viết logic bạn cần:

if (sản phẩm đã có trong items) {
  // ?
} else {
  // ?
}

💡 **Gợi ý:**
- Nếu có: tìm item, tăng `quantity`
- Nếu không có: thêm item mới với `quantity: 1`

---

## III. BƯỚC 1: TẠO SLICE (store/cartSlice.ts)

### Nhiệm vụ: Tạo slice cho giỏ hàng

1. **Định nghĩa Interface cho sản phẩm**
   
   Sản phẩm trong giỏ cần có gì?
   
   interface CartItem {
     // Bạn viết
   }
   
   💡 **Gợi ý:** `id`, `name`, `price`, `quantity`

2. **Định nghĩa Interface cho CartState**
   
   CartState chứa gì?
   
   interface CartState {
     // Bạn viết
   }
   
   💡 **Gợi ý:** `items: CartItem[]`

3. **Tạo initialState**
   
   Giỏ hàng ban đầu như thế nào?
   
   const initialState: CartState = {
     // Bạn viết
   };
   
   💡 **Gợi ý:** Giỏ rỗng = `items: []`

4. **Tạo Slice với 4 reducers**
   
   const cartSlice = createSlice({
     name: '?',
     initialState,
     reducers: {
       // 1. addToCart
       addToCart: (state, action: PayloadAction<...>) => {
         // Bạn viết logic ở đây
         // Kiểm tra sản phẩm có trong giỏ không?
       },
       
       // 2. removeFromCart
       removeFromCart: (state, action: PayloadAction<...>) => {
         // Bạn viết logic ở đây
         // Xóa sản phẩm khỏi items
       },
       
       // 3. updateQuantity
       updateQuantity: (state, action: PayloadAction<...>) => {
         // Bạn viết logic ở đây
         // Cập nhật số lượng
       },
       
       // 4. clearCart
       clearCart: (state) => {
         // Bạn viết logic ở đây
         // Xóa hết items
       },
     },
   });
   
   💡 **Gợi ý - Logic chi tiết:**
   
   **addToCart:**
   - Tìm sản phẩm trong `state.items` (dùng `findIndex`)
   - Nếu tìm thấy (index >= 0): tăng `state.items[index].quantity`
   - Nếu không tìm thấy: push sản phẩm mới với `quantity: 1`
   
   **removeFromCart:**
   - Payload là `id` của sản phẩm cần xóa
   - Dùng `filter` để loại bỏ sản phẩm có id đó
   - `state.items = state.items.filter(...)`
   
   **updateQuantity:**
   - Payload có `id` và `quantity` mới
   - Tìm sản phẩm, cập nhật `quantity`
   - Nếu `quantity <= 0`, xóa sản phẩm
   
   **clearCart:**
   - Đơn giản: `state.items = []`

5. **Export actions và reducer**
   
   export const { addToCart, removeFromCart, updateQuantity, clearCart } = 
     cartSlice.actions;
   export default cartSlice.reducer;

---

## IV. BƯỚC 2: TẠO STORE (store/index.ts)

### Nhiệm vụ: Cấu hình store

**Bước làm:**

1. **Import gì?**
   - Import `configureStore`
   - Import `cartReducer` từ cartSlice
   
   💡 **Gợi ý:**
   import { configureStore } from '@reduxjs/toolkit';
   import cartReducer from './cartSlice';

2. **Tạo store**
   
   export const store = configureStore({
     reducer: {
       // Kết nối reducer nào?
     },
   });
   
   💡 **Gợi ý:** `cart: cartReducer`

3. **Export RootState**
   
   export type RootState = ReturnType<typeof store.getState>;

---

## V. BƯỚC 3: TẠO COMPONENT (CartScreen.tsx)

### Nhiệm vụ: Hiển thị giỏ hàng + 2 button (thêm, xóa)

**Bước làm:**

1. **Import gì?**
   - React Native: View, Text, TouchableOpacity, FlatList, StyleSheet
   - Redux: useDispatch, useSelector
   - Actions từ cartSlice
   - RootState từ store
   
   💡 **Gợi ý:** `FlatList` dùng để hiển thị danh sách sản phẩm

2. **Tạo component**
   
   export default function CartScreen() {
     const dispatch = useDispatch();
     
     // Lấy danh sách sản phẩm từ store
     const cartItems = useSelector((state: RootState) => {
       // Bạn trả về cái gì?
     });
   }
   
   💡 **Gợi ý:** `state.cart.items`

3. **Tạo hàm xử lý**
   
   // Hàm thêm sản phẩm
   const handleAddProduct = () => {
     // Bạn dispatch action gì?
     // Dữ liệu sản phẩm: id, name, price
   };
   
   // Hàm xóa sản phẩm
   const handleRemoveProduct = (id: number) => {
     // Bạn dispatch action gì?
   };
   
   // Hàm cập nhật số lượng
   const handleUpdateQuantity = (id: number, quantity: number) => {
     // Bạn dispatch action gì?
   };
   
   💡 **Gợi ý:**
   dispatch(addToCart({
     id: 1,
     name: "Laptop",
     price: 1000
   }))

4. **Render UI**
   
   return (
     <View style={styles.container}>
       <Text style={styles.title}>🛒 Giỏ Hàng</Text>
       
       {/* Danh sách sản phẩm */}
       <FlatList
         data={cartItems}
         keyExtractor={(item) => item.id.toString()}
         renderItem={({ item }) => (
           <View style={styles.cartItem}>
             <View>
               <Text>{item.name}</Text>
               <Text>${item.price}</Text>
             </View>
             <View>
               <Text>Số lượng: {item.quantity}</Text>
               {/* Nút tăng/giảm */}
               <TouchableOpacity onPress={() => ?}>
                 <Text>-</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => ?}>
                 <Text>+</Text>
               </TouchableOpacity>
             </View>
             {/* Nút xóa */}
             <TouchableOpacity onPress={() => ?}>
               <Text>Xóa</Text>
             </TouchableOpacity>
           </View>
         )}
       />
       
       {/* 2 nút chính: Thêm sản phẩm, Xóa giỏ */}
       <View style={styles.buttonRow}>
         <TouchableOpacity 
           style={styles.addButton}
           onPress={handleAddProduct}
         >
           <Text>+ Thêm Sản Phẩm</Text>
         </TouchableOpacity>
         
         <TouchableOpacity 
           style={styles.clearButton}
           onPress={() => dispatch(clearCart())}
         >
           <Text>🗑️ Xóa Giỏ</Text>
         </TouchableOpacity>
       </View>
       
       {/* Tính tổng tiền */}
       <View style={styles.totalBox}>
         <Text>Tổng: ${?}</Text>
       </View>
     </View>
   );
   ```
   
   💡 **Gợi ý:**
   - Nút "-": `handleUpdateQuantity(item.id, item.quantity - 1)`
   - Nút "+": `handleUpdateQuantity(item.id, item.quantity + 1)`
   - Nút "Xóa": `handleRemoveProduct(item.id)`
   - Tổng tiền: `cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)`

5. **Styles**
   
   Bạn viết StyleSheet cho:
   - container, title
   - cartItem (mỗi sản phẩm)
   - Buttons
   - totalBox
   
   💡 **Gợi ý:** Sản phẩm nên hiển thị ngang (flexDirection: 'row')

---

## VI. BƯỚC 4: SETUP PROVIDER (App.tsx)

### Nhiệm vụ: Kết nối store với app

**Bước làm:**

1. **Import**
   - Provider từ 'react-redux'
   - store từ './store'
   - CartScreen

2. **Wrap Provider**
   
   export default function App() {
     return (
       <Provider store={store}>
         <CartScreen />
       </Provider>
     );
   }


## VII. KIỂM TRA KẾT QUẢ

**Sau khi code xong, hãy chạy và kiểm tra:**

1. ✅ App chạy được không?
2. ✅ Hiển thị danh sách giỏ (rỗng ban đầu)?
3. ✅ Nhấn "+ Thêm Sản Phẩm" → sản phẩm xuất hiện?
4. ✅ Nếu thêm sản phẩm 2 lần → số lượng tăng lên 2?
5. ✅ Nút "-" giảm số lượng?
6. ✅ Nút "+" tăng số lượng?
7. ✅ Nút "Xóa" (sản phẩm) xóa khỏi giỏ?
8. ✅ Nút "Xóa Giỏ" xóa hết?
9. ✅ Tổng tiền tính đúng?

---

## VIII. FLOW HOẠT ĐỘNG

**Khi bạn nhấn "+ Thêm Sản Phẩm", gì xảy ra?**

```
1. Nhấn nút
2. ?
3. ?
4. ?
5. Giỏ hàng cập nhật trên màn hình

💡 **Gợi ý:**
1. Nhấn nút
2. Gọi `handleAddProduct()`
3. `dispatch(addToCart({...}))`
4. Reducer kiểm tra và thêm/tăng quantity
5. `useSelector` nhận state mới
6. Component re-render
7. FlatList cập nhật danh sách

---

## IX. NHỮNG CÂU HỎI ĐỂ KIỂM TRA HIỂU BIẾT

### Câu 1: Tại sao phải dùng `findIndex` trong addToCart?

A. Để tìm sản phẩm có sẵn
B. Để xóa sản phẩm
C. Để tính tổng tiền

💡 **Gợi ý:** Để biết sản phẩm có trong giỏ không, nếu có thì tăng quantity

### Câu 2: Nếu user giảm số lượng xuống 0, bạn nên làm gì?

A. Giữ quantity = 0
B. Xóa sản phẩm khỏi giỏ
C. Cảnh báo user

💡 **Gợi ý:** Xóa sản phẩm (quantity = 0 không hợp lý)

### Câu 3: Cách tính tổng tiền đúng là?

// Option 1
cartItems.reduce((sum, item) => sum + item.price, 0)

// Option 2
cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

// Option 3
cartItems.map(item => item.price).reduce((a, b) => a + b, 0)

💡 **Gợi ý:** Option 2 (vì cần nhân với số lượng)

### Câu 4: State của app trông như thế nào?

// Viết state sau khi thêm 2 sản phẩm:
// Laptop (quantity: 1, price: 1000)
// Mouse (quantity: 2, price: 25)

{
  // Bạn viết
}

💡 **Gợi ý:**
{
  cart: {
    items: [
      { id: 1, name: "Laptop", price: 1000, quantity: 1 },
      { id: 2, name: "Mouse", price: 25, quantity: 2 }
    ]
  }
}

### Câu 5: Nếu bạn muốn thêm `totalPrice` vào state, phải sửa gì?

A. Chỉ sửa Component
B. Chỉ sửa cartSlice
C. Sửa cả cartSlice lẫn Component

💡 **Gợi ý:** Sửa cartSlice thêm field `totalPrice`, sau mỗi action cập nhật nó

---

## X. BÀI TẬP NÂNG CAO

**Sau khi làm xong giỏ hàng cơ bản:**

1. **Thêm `totalPrice` vào state**
   - Mỗi lần thêm/xóa/cập nhật, tính lại totalPrice
   - Hiển thị totalPrice ở dưới cùng
   - Gợi ý: `totalPrice = cartItems.reduce(...)`

2. **Thêm `maxQuantity` limit**
   - Không cho thêm quá 10 cái 1 sản phẩm
   - Gợi ý: Kiểm tra `if (quantity >= 10) return`

3. **Lưu giỏ hàng vào localStorage**
   - Khi xóa app, giỏ vẫn còn
   - Gợi ý: Dùng thunk (advanced)

4. **Thêm `discount` field**
   - State có `discount: 0` (%)
   - Thêm action `applyDiscount`
   - Tính `totalPrice * (1 - discount/100)`

5. **Thêm `productList` screen**
   - Screen hiển thị tất cả sản phẩm
   - Bấm "Thêm vào giỏ"
   - Chuyển giữa ProductList và Cart screen

---

## XI. CHEAT SHEET - KHI BỊ STUCK

| Cần làm | Gợi ý |
|--------|--------|
| Tìm sản phẩm | `state.items.findIndex(item => item.id === id)` |
| Xóa sản phẩm | `state.items.filter(item => item.id !== id)` |
| Tăng quantity | `state.items[index].quantity += 1` |
| Giảm quantity | `state.items[index].quantity -= 1` |
| Tính tổng | `items.reduce((sum, i) => sum + i.price * i.quantity, 0)` |
| FlatList render | `renderItem={({ item }) => (...)}` |
| Dispatch action | `dispatch(addToCart({...}))` |

---

## XII. KIỂM TRA TỰ HỎI SAU KHI LÀM XONG

1. ✅ Bạn có thể giải thích `findIndex` làm gì không?
2. ✅ Bạn biết tại sao cần check `quantity <= 0` không?
3. ✅ Bạn có thể viết logic tính tổng tiền không?
4. ✅ Bạn hiểu FlatList hoạt động sao không?
5. ✅ Bạn có thể thêm action mới (ví dụ: applyDiscount)?
6. ✅ Bạn biết cách lưu state vào localStorage không?
7. ✅ Bạn có thể vẽ Redux Flow cho giỏ hàng không?

---

## XIII. LỖI THƯỜNG GẶP 

### ❌ Lỗi 1: "Cannot read property 'map' of undefined"
- **Nguyên nhân:** `cartItems` là undefined, `useSelector` sai
- **Cách fix:** Kiểm tra `state.cart.items` đúng chưa?

### ❌ Lỗi 2: Thêm sản phẩm 2 lần nhưng không tăng quantity
- **Nguyên nhân:** Logic `findIndex` sai hoặc quên cập nhật quantity
- **Cách fix:** Dùng `console.log(state.items)` để debug

### ❌ Lỗi 3: FlatList không update khi thêm sản phẩm
- **Nguyên nhân:** Quên cập nhật state hoặc `keyExtractor` sai
- **Cách fix:** Dùng `keyExtractor={(item) => item.id.toString()}`

### ❌ Lỗi 4: Tổng tiền tính sai
- **Nguyên nhân:** Quên nhân với `quantity`
- **Cách fix:** `item.price * item.quantity`

### ❌ Lỗi 5: Action không được dispatch
- **Nguyên nhân:** Quên import action hoặc export action
- **Cách fix:** Kiểm tra `export const { addToCart, ... }`

---

## XIV. CÁCH MOCK DỮ LIỆU SẢN PHẨM

Khi thêm sản phẩm, bạn có thể dùng mock data:

const PRODUCTS = [
  { id: 1, name: "Laptop Dell XPS", price: 1200 },
  { id: 2, name: "Mouse Logitech", price: 45 },
  { id: 3, name: "Keyboard Mechanical", price: 120 },
  { id: 4, name: "Monitor LG 27\"", price: 350 },
  { id: 5, name: "USB Cable", price: 15 },
];

// Hàm thêm sản phẩm random
const handleAddProduct = () => {
  const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
  dispatch(addToCart(randomProduct));
};


💡 **Gợi ý:** Sau này có thể thay bằng API

---

## XV. CẤU TRÚC THỰC CỦA DỰ ÁN

shopping-app/
├── store/
│   ├── index.ts
│   └── cartSlice.ts
├── screens/
│   └── CartScreen.tsx
├── App.tsx
└── package.json

---


