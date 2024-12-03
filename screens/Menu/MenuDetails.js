import { View, Text, Switch, StyleSheet } from 'react-native';
import React, { useState } from 'react';
export default function MenuDetails() {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>
          {isEnabled ? 'Available' : 'Unavailable'}
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ marginLeft: 10 }} // Add some margin to separate text and switch
        />
      </View>
      <View style={[styles.statusContainer, { backgroundColor: isEnabled ? 'green' : 'silver' }]}>
        <Text style={styles.statusText}>
          {isEnabled ? 'Available' : 'Unavailable'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusContainer: {
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 16,
  },
});