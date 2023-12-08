import React,{useState} from "react";
import { Button, View, Text, TextInput,StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function Register({ navigation }) {
  const [name, setName] = useState('');
  const [address, setAdress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [norek, setNorek] = useState('');
  const [password, setPassword] = useState('');
  const [confirpassword, setConfirPassword] = useState('');


  const handleFormSubmit = () => {
    console.log('Nama Toko:', name);
    console.log('Alamat Toko:', address);
    console.log('No HP:', phone);
    console.log('Email:', email);
    console.log('No Rekening:', norek);
    console.log('Password:', password);
    console.log('Confirm Password:', confirpassword);
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>D-Distance</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama Lengkap Pemilik Toko"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Alamat Toko"
        onChangeText={(text) => setAdress(text)}
        value={address}
      />
      <TextInput
        style={styles.input}
        placeholder="No. HP"
        onChangeText={(text) => setPhone(text)}
        value={phone}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="No. Rekening Danamon"
        onChangeText={(text) => setNorek(text)}
        value={norek}
      />
      <TextInput
        style={styles.input}
        placeholder="Kata Sandi"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="Kondifmari Kata Sandi"
        secureTextEntry
        onChangeText={(text) => setConfirPassword(text)}
        value={password}
      />
      <Button title="Register" onPress={handleFormSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default Register;
