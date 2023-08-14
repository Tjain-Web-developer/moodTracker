import React from 'react';
import {FlatList} from 'react-native';
import {useAppContext} from '../App.provider';
import {MoodListItem} from '../Components/MoodListItem';

export const History: React.FC = () => {
  const {emojiList} = useAppContext();

  return (
    <>
      <FlatList
        data={emojiList.slice().reverse()}
        keyExtractor={item => item.timestamp}
        renderItem={({item}) => (
          <MoodListItem mood={item.mood} timestamp={item.timestamp} />
        )}
      />
    </>
  );
};
