import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './EditableListStyle';
import FastImage from 'react-native-fast-image';
import {ArrowBack} from '../ArrowBack';
import {images} from '../../Content/resources';
import {strWhiteColor} from '../../styles/responsive';

type EditableListProps = {
  title: string;
  data: string[];
  onEdit: (index: number, value: string) => void;
  onDelete: (index: number) => void;
  onAdd: () => void;
};

export default function EditableList({
  title,
  data,
  onEdit,
  onDelete,
  onAdd,
}: EditableListProps) {
  return (
    <View style={styles.mainContainer}>
      {/* Top Back Button */}
      <ArrowBack />

      {/* Background Decorations */}
      <FastImage
        style={styles.wave}
        resizeMode="contain"
        source={images.WallWave}
      />
      <FastImage
        style={styles.wallCoffeeImage1}
        resizeMode="contain"
        source={images.CartWallIcon1}
      />
      <FastImage
        style={styles.wallCoffeeImage2}
        resizeMode="contain"
        source={images.LoginWallIcon2}
      />
      <Text style={styles.header}>{title}</Text>

      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={styles.row}>
            <Text style={styles.itemText}>{item}</Text>
            <TouchableOpacity onPress={() => onEdit(index, item)}>
              <Icon name="pencil-outline" size={22} color={strWhiteColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(index)}>
              <Icon name="delete-outline" size={22} color={strWhiteColor} />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={onAdd}>
        <Icon name="plus" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Add Another {title}</Text>
      </TouchableOpacity>
    </View>
  );
}
