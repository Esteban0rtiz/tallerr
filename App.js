import React, { useState } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProductItem = ({ item, handleAction }) => {
  if (!item || !item.image) {
    return null;
  }

  return (
    <View style={styles.productItem}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <Button title="-" onPress={() => handleAction(item, 'remove')} />
        <Text style={styles.quantityText}>{item.quantity || 0}</Text>
        <Button title="+" onPress={() => handleAction(item, 'add')} />
      </View>
    </View>
  );
};

const CartList = ({ cart, handleAction }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setIsCartOpen(!isCartOpen)}>
        <Text style={styles.subtitle}>Artículos en el carrito:</Text>
      </TouchableOpacity>
      {isCartOpen && (
        <FlatList
          data={cart}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text>{item.name} - ${item.price.toFixed(2)} x {item.quantity}</Text>
              <Button title="Eliminar" onPress={() => handleAction(item, 'remove')} />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const ProductList = ({ productList, handleAction }) => {
  return (
    <FlatList
      data={productList}
      renderItem={({ item }) => <ProductItem item={item} handleAction={handleAction} />}
      keyExtractor={(item) => item.id}
    />
  );
};

const App = () => {
  const [cart, setCart] = useState([]);
  const [productList, setProductList] = useState([
    { id: '1', name: 'Chompas', price: 10.0, image: require('./images/chompas.jpg') },
    { id: '2', name: 'Jeans', price: 15.0, image: require('./images/jeans.jpg') },
    { id: '3', name: 'Busos', price: 20.0, image: require('./images/buzos.jpg') },
    { id: '4', name: 'Zapatos', price: 20.0, image: require('./images/zapatos.jpg') },
    { id: '5', name: 'Camisas', price: 30.0, image: require('./images/camisas.jpg') },
    { id: '6', name: 'Camisetas', price: 40.0, image: require('./images/camisetas.jpg') },
    // Agrega más productos si es necesario
  ]);

  const handleAction = (product, action) => {
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (action === 'add') {
      if (existingItemIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingItemIndex] = { ...cart[existingItemIndex], quantity: cart[existingItemIndex].quantity + 1 };
        setCart(updatedCart);
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    } else if (action === 'remove') {
      if (existingItemIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingItemIndex] = { ...cart[existingItemIndex], quantity: cart[existingItemIndex].quantity - 1 };

        if (updatedCart[existingItemIndex].quantity === 0) {
          updatedCart.splice(existingItemIndex, 1);
        }

        setCart(updatedCart);
      }
    }
  };

  const calculateTotal = () => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const iva = total * 0.12; // Supongamos un 12% de IVA
    const totalPrice = total + iva;
    alert(`Precio Bruto: $${total.toFixed(2)}\nIVA: $${iva.toFixed(2)}\nPrecio Final: $${totalPrice.toFixed(2)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Lista de Productos:</Text>
      <ProductList productList={productList} handleAction={handleAction} />
      <CartList cart={cart} handleAction={handleAction} />
      <Button title="Calcular Total" onPress={calculateTotal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productItem: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
    padding: 10,
  },
  cartItem: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
    padding: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 10,
  },
});

export default App;
