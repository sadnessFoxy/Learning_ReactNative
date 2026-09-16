import {StyleSheet, Text, View} from 'react-native';
interface User {
  name: string,
  age: number,
  isAdmin: boolean

}

const UserCard = ({name,age,isAdmin}:User) => {
  return (
    <>
    <View>
     <Text> {name}  </Text>
     <Text> {age}  </Text>
     <Text> {isAdmin} </Text>
    </View>
    </>
  );
};
const Test = ()=>{
  return (
    <View>
       <UserCard name="LamDinhKhoa" age = {21} isAdmin= {true}></UserCard>
     </View>
  )
}

export default Test;