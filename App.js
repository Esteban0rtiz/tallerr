import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [item, setItem] = useState('');
  const [cart, setCart] = useState([]);

  const addToCart = () => {
    setCart([...cart, item]);
    setItem('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Carrito de Compras</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese un artículo"
        value={item}
        onChangeText={(text) => setItem(text)}
      />
      <Button title="Agregar al carrito" onPress={addToCart} />
      <View>
        <Text>Artículos en el carrito:</Text>
        {cart.map((item, index) => (
          <Text key={index}>{item}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '100%',
  },
}); 
