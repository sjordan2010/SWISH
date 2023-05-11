import { PropData, AlternateData, CombinedData } from "../types";

export const combineData = (propData: PropData[], altData: AlternateData[]): CombinedData[] => {
  const combined = [];

  // LOOP OVER FETCHED PROP DATA... MOST IMPORTANT DATA
  for (let i = 0; i < propData.length; i++) {
    let lowLine = propData[i].line,
      highLine = propData[i].line,
      matched = false,
      suspended = false;

  // COMBINE ALTERNATE DATA WITH PROP DATA TO CREATE STATE FOR THE TABLE
  // FIND THE HIGH AND LOW LINES FOR EACH MARKET
  // CHECK FOR CONDITIONALS THAT SUSPEND A MARKET
    for (let j = 0; j < altData.length; j++) {
      if (propData[i].playerId === altData[j].playerId) {
        if (propData[i].statTypeId === altData[j].statTypeId) {
          if (propData[i].line === altData[j].line) {
            matched = true;
          }
          if (altData[j].line > highLine) highLine = altData[j].line;
          if (altData[j].line < lowLine) lowLine = altData[j].line;
          if (
            altData[j].overOdds < 0.4 &&
            altData[j].pushOdds < 0.4 &&
            altData[j].underOdds < 0.4
          ) {
            suspended = true;
          }
        }
      }
    }
    if (suspended || !matched) propData[i].marketSuspended = 1;
    combined.push({ ...propData[i], lowLine: lowLine, highLine: highLine });
  }

  return combined;
};
