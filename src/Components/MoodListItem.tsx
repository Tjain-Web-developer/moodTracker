import React, {useCallback} from 'react';
import {Pressable, StyleSheet, Text, View, LayoutAnimation} from 'react-native';
import {theme} from '../theme';
import {MoodOptionsWithTimeStamp} from '../Types';
import {format} from 'date-fns';
import {useAppContext} from '../App.provider';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {useAnimatedGestureHandler, withTiming} from 'react-native-reanimated';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';

export const MoodListItem: React.FC<MoodOptionsWithTimeStamp> = ({
  mood,
  timestamp,
}) => {
  const {handleDelete} = useAppContext();

  const handleDeleteMood = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    handleDelete({mood, timestamp});
  }, [handleDelete, mood, timestamp]);

  const offset = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));

  const deleteAsync = useCallback(() => {
    setTimeout(() => {
      handleDeleteMood();
    }, 500);
  }, []);

  const onGestureEvent = useAnimatedGestureHandler(
    {
      onActive: event => {
        const xVal = Math.floor(event.translationX);
        offset.value = xVal;
      },
      onEnd: event => {
        if (Math.abs(event.translationX) > 80) {
          offset.value = withTiming(1000 * Math.sign(event.translationX));
          runOnJS(deleteAsync)();
        } else {
          offset.value = withTiming(0);
        }
      },
    },
    [],
  );

  return (
    <PanGestureHandler
      minDeltaX={1}
      minDeltaY={100}
      onGestureEvent={onGestureEvent}
    >
      <Reanimated.View style={[styles.itemContainer, animatedStyle]}>
        <View style={styles.itemNameAndEmoji}>
          <Text style={styles.itemEmoji}>{mood.emoji}</Text>
          <Text style={styles.itemEmojiDescription}>{mood.description}</Text>
        </View>
        <Text style={styles.itemTimestamp}>
          {format(new Date(timestamp), "dd MMM, yyyy 'at' hh:mmaaa")}
        </Text>
        <Pressable onPress={handleDeleteMood}>
          <Text>✖️</Text>
        </Pressable>
      </Reanimated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    backgroundColor: theme.colorWhite,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemNameAndEmoji: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  itemEmoji: {
    fontSize: 40,
    color: theme.colorWhite,
  },
  itemEmojiDescription: {
    fontSize: 20,
    fontFamily: theme.fontFamilyBold,
    color: theme.colorPurple,
  },
  itemTimestamp: {
    fontSize: 15,
    fontFamily: theme.fontFamilyRegular,
    color: theme.colorLavender,
  },
});
