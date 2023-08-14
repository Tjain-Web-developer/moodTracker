import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useAppContext} from '../App.provider';
import {groupBy} from 'lodash';
import {VictoryPie} from 'victory-native';
import {theme} from '../theme';

export const Analytics: React.FC = () => {
  const appContext = useAppContext();

  let g = groupBy(appContext.emojiList, 'mood.emoji');
  let data = Object.entries(g).map(([key, value]) => ({
    x: key,
    y: value.length,
  }));

  return (
    <View style={styles.container}>
      {appContext.emojiList.length < 1 && (
        <Text style={{fontSize: 20}}>No Moods Selected Yet</Text>
      )}
      <VictoryPie
        labelRadius={80}
        radius={150}
        innerRadius={50}
        colorScale={[
          theme.colorPurple,
          theme.colorLavender,
          theme.colorBlue,
          theme.colorGrey,
          theme.colorWhite,
        ]}
        style={{labels: {fontSize: 30}}}
        data={data}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
