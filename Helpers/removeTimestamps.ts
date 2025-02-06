export const removeTimestamps = (lyrics: string): string => {
    return lyrics.replace(/\[\d{2}:\d{2}\.\d{2}\]\s*/g, '');
  };