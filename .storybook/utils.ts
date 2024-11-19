/**
 * Removes the "key" attribute from the story component source code
 * Note: the "key" attribute should be removed, since it is only used to allow dynamic rendering of the story.
 * 
 * @param code the original component code used to produce the story
 * @returns the component code to be displayed in the story
 */
export const RemoveKeyAttribute = (code: string) => {
    return code.replace(/^.*key.*$\n/gm, "")
}

/**
 * timeZoneSamples is used by the DateRenderer and the TimeRenderer stories
 */
const timeZoneSamples = { 
    PacificNiue: ["Pacific/Niue", "-11"],
    PacificGalapagos: ["Pacific/Galapagos", "-9"],
    EuropeDublin: ["Europe/Dublin", "+0/+1"],
    EuropeParis: ["Europe/Paris", "+1/+2"],
    IndianMauritius: ["Indian/Mauritius", "+4"],
    EtcGMTMinus8: ["Etc/GMT-8", "+8"],
    PacificTongatapu: ["Pacific/Tongatapu", "+13"],
}
export const timeZoneLabels = Object.keys(timeZoneSamples).map((tz) => `${timeZoneSamples[tz][0]} (${timeZoneSamples[tz][1]})`);
export const timeZoneOptions = Object.keys(timeZoneSamples).map((_, i)=> i);
export const timeZoneMappings = Object.keys(timeZoneSamples).map((tz) => timeZoneSamples[tz][0]);

/**
 * numberingSystemSamples is used by the WeekRenderer story
 */
const numberingSystemSamples = {
    arab: "Arabic-Indic digits",
    brah: "Brahmi digits",
    deva: "Devanagari digits",
    hanidec: "Chinese number ideographs",
    latn: "Latin digits",
    tibt: "Tibetan digits"
}
export const numberingSystemLabels = Object.keys(numberingSystemSamples).map((tz) => numberingSystemSamples[tz] );
export const numberingSystemOptions = Object.keys(numberingSystemSamples).map((_, i)=> i);
export const numberingSystemMappings = Object.keys(numberingSystemSamples);