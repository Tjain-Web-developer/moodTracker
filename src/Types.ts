export type MoodOptions = {
  emoji: string;
  description: string;
};

export type MoodOptionsWithTimeStamp = {
  mood: MoodOptions;
  timestamp: string;
};
