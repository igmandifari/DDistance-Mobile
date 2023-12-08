import React,{useState} from "react";
import { Image,Button, View, Text, TextInput,StyleSheet,TouchableOpacity} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.text}>D-DISTANCE</Text>
      <Image
        source={require('../../assets/img/truck.png')}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Kata Sandi"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Text>Lupa Kata Sandi?</Text>
      <TouchableOpacity
        style={styles.masuk}
        onPress={() => navigation.navigate("login")}
      >
        <Text style={styles.buttonText}>Masuk</Text>
      </TouchableOpacity>
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
    height: 50,
    width: '80%',
    borderColor: '#F36C21',
    borderWidth: 1,
    marginBottom: 16,
    borderRadius:10,
    padding: 8,
    textAlign:'center',
  },
  masuk: {
    borderRadius: 10,
    backgroundColor: '#F36C21',
    padding: 10,
    marginBottom: 16,
    width: 310,
    height: 50,
    justifyContent: 'center',
  },
  text: {
    color: "#F36C21",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    fontSize: 40,
    fontStyle: "normal",
    fontWeight: "800",
    lineHeight: 48,
    marginBottom: 30,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    marginBottom: 16,
    marginRight: 30,
  },
});

export default Login;
