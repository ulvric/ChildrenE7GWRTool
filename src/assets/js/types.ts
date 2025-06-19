export interface Character {
  _id: string;
  name: string;
  rarity: number;
  role: 'Warrior' | 'Knight' | 'Thief' | 'Mage' | 'Soul Weaver' | 'Ranger';
  attribute: 'Fire' | 'Ice' | 'Earth' | 'Light' | 'Dark';
  zodiac: 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';
}

export interface CharacterIncomplete {
  _id: string;
  name: string;
}

export interface Artifact {
  _id: string;
  name: string;
  rarity: number;
  role: 'Warrior' | 'Knight' | 'Thief' | 'Mage' | 'Soul Weaver' | 'Ranger' | 'Any';
}

export interface ArtifactIncomplete {
  _id: string;
  name: string;
}