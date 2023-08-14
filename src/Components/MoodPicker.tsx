import React, {useCallback} from 'react';
import {useState} from 'react';
import {View, FlatList, Text, StyleSheet, Pressable, Image} from 'react-native';
import {MoodOptions} from '../Types';
import {theme} from '../theme';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const imageSrc = require('../../assets/butterflies.png');

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

export type MoodPickerProps = {
  handleSelect: (moodOption: MoodOptions) => void;
};

export const MoodPicker: React.FC<MoodPickerProps> = ({handleSelect}) => {
  const [selectedEmoji, setSelectedEmoji] = useState<MoodOptions>();
  const [hasSelected, setHasSelected] = useState(false);

  const moodOptions: MoodOptions[] = [
    {emoji: '🧑‍💻', description: 'studious'},
    {emoji: '🤔', description: 'pensive'},
    {emoji: '😊', description: 'happy'},
    {emoji: '🥳', description: 'celebratory'},
    {emoji: '😤', description: 'frustrated'},
  ];

  const handleMoodSelect = useCallback(() => {
    if (selectedEmoji) {
      handleSelect(selectedEmoji);
      setSelectedEmoji(undefined);
      setHasSelected(true);
    }
  }, [handleSelect, selectedEmoji]);

  const btnStyle = useAnimatedStyle(
    () => ({
      opacity: selectedEmoji ? withTiming(1) : withTiming(0.5),
      transform: [{scale: selectedEmoji ? withTiming(1) : 0.8}],
    }),
    [selectedEmoji],
  );

  if (hasSelected) {
    return (
      <View style={styles.container}>
        <View style={styles.moodPickerBox}>
          <Image source={imageSrc} />
          <Pressable
            style={styles.chooseButton}
            onPress={() => setHasSelected(false)}
          >
            <Text style={styles.chooseBtnText}>Choose Another!</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.moodPickerBox}>
        <Text style={styles.moodPickerTitle}>How are you right now?</Text>
        <FlatList
          data={moodOptions}
          numColumns={5}
          keyExtractor={item => item.description}
          renderItem={({item}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Pressable
                style={[
                  styles.emojiCtn,
                  selectedEmoji?.emoji === item.emoji && styles.selectedEmoji,
                ]}
                onPress={() => setSelectedEmoji(item)}
              >
                <Text style={styles.emojiStyle}>{item.emoji}</Text>
              </Pressable>
              <Text style={styles.moodText}>
                {selectedEmoji?.emoji === item.emoji
                  ? selectedEmoji.description
                  : ''}
              </Text>
            </View>
          )}
        />
        <ReanimatedPressable
          style={[styles.chooseButton, btnStyle]}
          onPress={handleMoodSelect}
        >
          <Text style={styles.chooseBtnText}>Choose</Text>
        </ReanimatedPressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  emojiStyle: {
    fontSize: 25,
    color: '#ffffff',
    borderRadius: 10,
  },
  emojiCtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedEmoji: {
    backgroundColor: theme.colorPurple,
    borderWidth: 2,
    borderColor: theme.colorWhite,
  },
  moodText: {
    fontFamily: theme.fontFamilyBold,
    color: theme.colorPurple,
    textAlign: 'center',
  },
  moodPickerTitle: {
    fontSize: 25,
    color: 'white',
    fontFamily: theme.fontFamilyBold,
  },
  moodPickerBox: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colorPurple,
    borderRadius: 10,
    marginHorizontal: 10,
    paddingVertical: 20,
    gap: 20,
    backgroundColor: '#00000020',
    height: 260,
  },
  chooseButton: {
    paddingHorizontal: 50,
    paddingVertical: 10,
    backgroundColor: theme.colorPurple,
    textAlign: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: theme.colorWhite,
  },
  chooseBtnText: {
    color: theme.colorWhite,
    fontFamily: theme.fontFamilyBold,
  },
});
