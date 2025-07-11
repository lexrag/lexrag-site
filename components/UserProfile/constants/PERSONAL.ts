import countries from 'i18n-iso-countries';

export const GENDER_OPTIONS = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
    { value: 'PreferNotToSay', label: 'Prefer not to say' },
];

export const LANGUAGE_OPTIONS = [
    { value: 'en', label: 'English' },
    { value: 'de', label: 'German' },
    { value: 'fr', label: 'French' },
    { value: 'es', label: 'Spanish' },
    { value: 'it', label: 'Italian' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'nl', label: 'Dutch' },
    { value: 'pl', label: 'Polish' },
    { value: 'tr', label: 'Turkish' },
    { value: 'ar', label: 'Arabic' },
    { value: 'hi', label: 'Hindi' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'zh', label: 'Chinese' },
];

const countryCodes = Object.keys(countries.getNames('en'));
const countryList = countryCodes.map((code) => ({ value: code, label: countries.getNames('en')[code] }));
export const COUNTRY_OPTIONS = countryList.sort((a, b) => a.label.localeCompare(b.label));
