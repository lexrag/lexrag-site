import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

export const GENDER_OPTIONS = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
    { value: 'PreferNotToSay', label: 'Prefer not to say' },
];

export const LANGUAGE_OPTIONS = [
    { value: 'EN', label: 'English' },
    { value: 'DE', label: 'German' },
    { value: 'FR', label: 'French' },
    { value: 'ES', label: 'Spanish' },
    { value: 'IT', label: 'Italian' },
    { value: 'PT', label: 'Portuguese' },
    { value: 'NL', label: 'Dutch' },
    { value: 'PL', label: 'Polish' },
    { value: 'TR', label: 'Turkish' },
    { value: 'AR', label: 'Arabic' },
    { value: 'HI', label: 'Hindi' },
    { value: 'JA', label: 'Japanese' },
    { value: 'KO', label: 'Korean' },
    { value: 'ZH', label: 'Chinese' },
];

const countryCodes = Object.keys(countries.getNames('en'));
const countryList = countryCodes.map((code) => ({
  value: code,
  label: countries.getNames('en')[code]
}));
export const COUNTRY_OPTIONS = countryList.sort((a, b) => a.label.localeCompare(b.label));
