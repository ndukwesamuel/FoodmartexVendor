import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react';
import Icon from "react-native-vector-icons/Ionicons";

export default function AllCategories(styles, item, menuItems, selectedOptionLink) {
  console.log(selectedOptionLink);
  
  const SubDataRenderItemFunction = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card(options)}
      >
        <View style={{ flex: 1, gap: 8 }}>
          <Text style={styles.foodName(selectedOptionLink)}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>
        <Image source={{ uri: item.image }} style={styles.foodImage} />
      </TouchableOpacity>
    )
  }
  return (
    <TouchableOpacity
      style={styles.card}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.foodName(selectedOptionLink)}>{item.MainTitle}</Text>
            <View style={styles.actionIcons}>
              <TouchableOpacity>
                <Icon name="create-outline" size={24} color="#FFA500" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList 
          data={menuItems}
          renderItem={(subData) => <SubDataRenderItemFunction item={subData.item}/>}/>
        </View>
      </TouchableOpacity>
  )
}
