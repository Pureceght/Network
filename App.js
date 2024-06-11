import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';

const One = () => {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true)
    const url = 'https://api.freeapi.app/api/v1/public/randomjokes?limit=10&query=science&inc=categories%2Cid%2Ccontent&page=1';
    const options = {
      method: 'GET',
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result.data)
      setData(result.data.data);
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  };


  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.description}> Идет загрузка...</Text> 
      ) : (
        <>
          {data.map((item, index) => (
          <TouchableOpacity>
            <View key={index} style={styles.card}>
              <Text style={styles.description}>{item.content}</Text>
            </View>
          </TouchableOpacity>
        ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2'
  },
  card: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default One;