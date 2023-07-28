/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [pincode, setPincode] = useState('');
  const [locationInfo, setLocationInfo] = useState(null);

  const fetchLocationInfo = () => {
    axios
      .get(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((response) => {
        const data = response.data;
        if (data && data.length > 0 && data[0].Status === 'Success') {
          setLocationInfo(data[0].PostOffice[0]);
        } else {
          setLocationInfo(null);
        }
      })
      .catch((error) => {
        console.error('Error fetching location information:', error);
        setLocationInfo(null);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Pincode"
        value={pincode}
        onChangeText={(text) => setPincode(text)}
       
      />
      <Button title="Fetch Location" onPress={fetchLocationInfo} />
      {locationInfo && (
        <View style={styles.locationInfo}>
          <Text>District: {locationInfo.District}</Text>
          <Text>State: {locationInfo.State}</Text>
          <Text>Country: {locationInfo.Country}</Text>
          <Text>Name: {locationInfo.Name}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin:30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
  },
  locationInfo: {
    marginTop: 30,
    
  },
});

export default App;
