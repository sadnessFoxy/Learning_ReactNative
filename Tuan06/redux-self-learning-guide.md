# Redux Toolkit 
---
## I. CHUẨN BỊ

- Cần cài `@reduxjs/toolkit` và `react-redux`

- npm install @reduxjs/toolkit react-redux
---

## II. HIỂU KHÁI NIỆM TRƯỚC KHI CODE

### Câu hỏi 1: **Store là gì?**
- Store là gì? Nó lưu cái gì?
- App của bạn có bao nhiêu store?


💡 **Gợi ý:** Store = kho lưu **một state duy nhất** cho toàn app

### Câu hỏi 2: **State là gì?**
- State của Counter app nên có gì?
- Chỉ cần `{ value: 0 }` có đủ không?
- Nếu muốn lưu lịch sử, state cần gì thêm?

💡 **Gợi ý:** State = data mà component dùng

### Câu hỏi 3: **Action là gì?**
- Khi người dùng nhấn nút "Tăng", bạn sẽ dispatch action gì?
- Action cần có gì? (type? payload?)

💡 **Gợi ý:** Action = sự kiện. Ví dụ: `{ type: 'counter/increment' }`

### Câu hỏi 4: **Reducer là gì?**
- Khi action `increment` được gửi, reducer phải làm gì?
- Reducer nhận gì? Trả về gì?

💡 **Gợi ý:** Reducer = hàm nhận `(state, action)` → trả về `newState`

---

## III. BƯỚC 1: TẠO SLICE (store/counterSlice.ts)

### Nhiệm vụ: Tạo file slice định nghĩa state + actions

**Bước làm:**

1. **Import gì từ `@reduxjs/toolkit`?**
   - Bạn cần tạo Slice, vậy import gì?
   
   💡 **Gợi ý:** `import { ... } from '@reduxjs/toolkit'`

2. **Định nghĩa Interface CounterState**
   - State cần có những field nào?
   - Giá trị khởi tạo là bao nhiêu?
   
   💡 **Gợi ý:**
   
   interface CounterState {
     // Bạn viết
   }
   

3. **Tạo initialState**
   - Khởi tạo giá trị cho state
   - Ví dụ: `{ value: ? }`
   
   💡 **Gợi ý:** Giá trị ban đầu của counter nên là 0

4. **Tạo slice với createSlice**

   const counterSlice = createSlice({
     name: '?',        // Tên slice là gì? (dùng trong action type)
     initialState: ?,  // State ban đầu
     reducers: {
       increment: (state) => {
         // Khi increment được gọi, state.value tăng bao nhiêu?
       },
       decrement: (state) => {
         // Khi decrement được gọi, state.value giảm bao nhiêu?
       },
     },
   });

   
   💡 **Gợi ý:** 
   - `name` thường là tên feature (ví dụ: 'counter')
   - Redux Toolkit xử lý immutability, nên `state.value += 1` được phép

5. **Export actions và reducer**
   - Bạn cần export cái gì để component dùng được?
   - Actions được lấy từ đâu?
   
   💡 **Gợi ý:**

   export const { increment, decrement } = counterSlice.actions;
   export default counterSlice.reducer;

---

## IV. BƯỚC 2: TẠO STORE (store/index.ts)

### Nhiệm vụ: Cấu hình store để kết nối slice

**Bước làm:**

1. **Import gì?**
   - Cần import `counterReducer` từ counterSlice
   - Cần import function nào từ '@reduxjs/toolkit'?
   
   💡 **Gợi ý:** `configureStore` là function để tạo store

2. **Tạo store**
   export const store = configureStore({
     reducer: {
       // Kết nối reducer nào?
       // Key tên gì? (nên trùng với name trong slice)
     },
   });
   
   💡 **Gợi ý:** `counter: counterReducer`

3. **Export RootState**
   - Component sẽ dùng `RootState` để type-check state
   - RootState nên là gì?
   
   💡 **Gợi ý:** 
   export type RootState = ReturnType<typeof store.getState>;

---

## V. BƯỚC 3: TẠO COMPONENT (CounterScreen.tsx)

### Nhiệm vụ: Component hiển thị counter + 2 nút tăng/giảm

1. **Import gì?**
   - React Native components: View, Text, TouchableOpacity, StyleSheet
   - Redux: `useDispatch`, `useSelector` từ 'react-redux'
   - Actions: `increment`, `decrement` từ slice
   - RootState từ store
   
   💡 **Gợi ý:** 
   import { useDispatch, useSelector } from 'react-redux';

2. **Tạo component function**
   export default function CounterScreen() {
     // Lấy dispatch
     const dispatch = ?
     
     // Lấy state từ store
     // Cách dùng useSelector là gì?
     const counter = useSelector(state => {
       // Trả về cái gì?
     });
   }
   
   💡 **Gợi ý:**
   - `useDispatch()` gọi không có tham số
   - `useSelector` nhận callback để lấy state
   - `state.counter.value` là cái bạn cần (vì store có `counter: counterReducer`)

3. **Render UI**
   - Hiển thị số counter
   - 2 nút: tăng và giảm
   
   <View>
     <Text>{counter}</Text>
     <TouchableOpacity onPress={() => dispatch(?)}>
       <Text>+ Tăng</Text>
     </TouchableOpacity>
     <TouchableOpacity onPress={() => dispatch(?)}>
       <Text>- Giảm</Text>
     </TouchableOpacity>
   </View>
   
   💡 **Gợi ý:**
   - `dispatch(increment())` để dispatch action
   - `dispatch(decrement())` để dispatch action

4. **Styles**
   - Bạn viết StyleSheet cho component
   - Nên có: container, text size, button colors
   
   💡 **Gợi ý:** Tham khảo file tối giản trước đó để biết style nào

---

## VI. BƯỚC 4: SETUP PROVIDER (App.tsx)

### Nhiệm vụ: Kết nối store với app

**Bước làm:**

1. **Import gì?**
   - `Provider` từ 'react-redux'
   - `store` từ './store'
   - Component CounterScreen
   
   💡 **Gợi ý:** Provider cung cấp store cho toàn app

2. **Wrap Provider**
   export default function App() {
     return (
       <Provider store={?}>
         <? />
       </Provider>
     );
   }
   
   💡 **Gợi ý:** Provider phải wrap CounterScreen để nó có thể dùng Redux

---

## VII. KIỂM TRA KẾT QUẢ

**Sau khi code xong, hãy chạy và kiểm tra:**

1. ✅ App chạy được không? (Không lỗi?)
2. ✅ Hiển thị số 0 ở giữa?
3. ✅ Nhấn "+ Tăng" → số thành 1, 2, 3...?
4. ✅ Nhấn "- Giảm" → số thành 0, -1, -2...?

---

## VIII. HIỂU FLOW HOẠT ĐỘNG

**Khi bạn nhấn nút "+ Tăng", điều gì xảy ra?**

Hãy viết thứ tự các bước:

1. Người dùng nhấn nút
2. ?
3. ?
4. ?
5. Số thay đổi trên màn hình

💡 **Gợi ý:** 
- Bước 2: Component gọi `dispatch(increment())`
- Bước 3: Redux Reducer nhận action, cập nhật state
- Bước 4: `useSelector` nhận state mới, component re-render

---

## IX. NHỮNG CÂU HỎI ĐỂ KIỂM TRA HIỂU BIẾT

### Câu 1: Nếu bạn muốn tăng 10 thay vì 1
- Bạn cần thay đổi gì?
- A. Thay đổi trong counterSlice
- B. Thay đổi trong CounterScreen
- C. Thay đổi cả hai

💡 **Gợi ý:** Chỉ cần thay `state.value += 1` → `state.value += 10`

### Câu 2: Nếu bạn muốn thêm action "reset" (về 0)
- Bạn thêm gì vào counterSlice?
- Bạn thêm gì vào CounterScreen?

💡 **Gợi ý:**
- counterSlice: Thêm `reset: (state) => { ... }`
- CounterScreen: Thêm nút mới và `dispatch(reset())`

### Câu 3: State của app hiện tại trông như thế nào?
- Viết cấu trúc state đầy đủ

💡 **Gợi ý:**
{
  counter: {
    value: 0
  }
}


### Câu 4: Action "increment" được Redux tạo thành cái gì?
- Redux tự động tạo action object ra sao?

💡 **Gợi ý:**
{ type: 'counter/increment' }

### Câu 5: Tại sao phải có `useSelector`?
- Nếu không dùng `useSelector`, component biết được state thay đổi không?

💡 **Gợi ý:** Không, vì component không subscribe store. `useSelector` kết nối component với store

## X. BÀI TẬP NÂNG CAO

**Sau khi làm xong counter cơ bản, thử:**

1. **Thêm action reset**
   - Gợi ý: Tạo nút Reset, khi nhấn → counter về 0

2. **Thêm action tăng 5**
   - Gợi ý: Tạo nút "+ 5", dispatch action mới

3. **Tạo state có thêm field `step`**
   - State: `{ value: 0, step: 1 }`
   - Action tăng sử dụng `step` thay vì 1 cứng
   - Gợi ý: `state.value += state.step`

4. **Thêm selector để tránh viết lại useSelector**
   - Tạo hàm `selectCounterValue(state)` trả về `state.counter.value`
   - Dùng trong component: `useSelector(selectCounterValue)`

---

## XI. CHEAT SHEET - KHI BỊ STUCK

| Cần làm | Câu hỏi để tự suy | Gợi ý |
|--------|------------------|--------|
| Import từ Redux | "@reduxjs/toolkit" có gì? | createSlice, configureStore |
| Tạo action | Reducer cần làm gì? | Thêm trong `reducers: {}` |
| Dispatch action | Cách gửi action là? | `dispatch(increment())` |
| Lấy state | useSelector cần trả về gì? | `state => state.counter.value` |
| TypeScript state | RootState là gì? | `ReturnType<typeof store.getState>` |

---

## XII. KIỂM TRA TỰ HỎI SAU KHI LÀM XONG

1. ✅ Bạn có thể giải thích Slice là gì không?
2. ✅ Bạn biết tại sao cần Store không?
3. ✅ Bạn có thể giải thích Action không?
4. ✅ Bạn biết Reducer làm gì không?
5. ✅ Bạn có thể vẽ Redux Flow không?
6. ✅ Bạn có thể thêm action mới vào Slice không?
7. ✅ Bạn biết `useDispatch` và `useSelector` khác gì không?

---

## XIII. LỖI THƯỜNG GẶP 

### ❌ Lỗi: "Cannot read property of undefined"
- **Nguyên nhân:** `useSelector` được import sai hoặc state structure sai
- **Cách fix:** Kiểm tra `state.counter.value` có đúng không?

### ❌ Lỗi: Nút bấm không có tác dụng
- **Nguyên nhân:** Quên `dispatch()` hoặc action không export
- **Cách fix:** Kiểm tra `export const { increment, decrement }`

### ❌ Lỗi: Redux DevTools không hoạt động
- **Nguyên nhân:** Bình thường, không sao
- **Cách fix:** Không bắt buộc, chỉ dùng khi debug

---
