import React, {createContext, useCallback, useEffect, useState} from 'react';
import {MoodOptions, MoodOptionsWithTimeStamp} from './Types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppContextType = {
  emojiList: MoodOptionsWithTimeStamp[];
  handleSelect: (selectedEmoji: MoodOptions) => void;
  handleDelete: (mood: MoodOptionsWithTimeStamp) => void;
};

const defaultValue = {
  emojiList: [],
  handleSelect: () => {},
  handleDelete: () => {},
};

type Appdata = {
  moods: MoodOptionsWithTimeStamp;
};

const storageKey = 'my_app_key';

const getAppData = async (): Promise<Appdata | null> => {
  try {
    const result = await AsyncStorage.getItem(storageKey);
    if (result) {
      return JSON.parse(result);
    }
    return null;
  } catch (error) {
    return null;
  }
};

const setAppData = async (newData: Appdata) => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
  } catch (error) {
    console.log(error);
  }
};

const AppContext = createContext<AppContextType>(defaultValue);

export const useAppContext = () => React.useContext(AppContext);

export const AppProvider: React.FC = ({children}) => {
  const [emojiList, setEmojiList] = useState<MoodOptionsWithTimeStamp[]>([]);

  const fetchDataFromStorage = async () => {
    const data = await getAppData();
    if (data) {
      setEmojiList(data.moods);
    }
  };

  useEffect(() => {
    fetchDataFromStorage();
  }, []);

  const handleSelect = useCallback((selectedEmoji: MoodOptions) => {
    setEmojiList(prev => {
      const addedEmojiList = [
        ...prev,
        {mood: selectedEmoji, timestamp: Date.now()},
      ];

      setAppData({moods: addedEmojiList});
      return addedEmojiList;
    });
  }, []);

  const handleDelete = useCallback((mood: MoodOptionsWithTimeStamp) => {
    setEmojiList(current => {
      let filteredMoodList = current.filter(
        val => val.timestamp !== mood.timestamp,
      );
      setAppData({moods: filteredMoodList});
      return filteredMoodList;
    });
  }, []);

  return (
    <AppContext.Provider value={{emojiList, handleSelect, handleDelete}}>
      {children}
    </AppContext.Provider>
  );
};
