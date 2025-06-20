export interface Enemy {
  name: string;
  artifact: string;
  hp: number;
  cr: number;
  outspeed: boolean;
  immunity: boolean;
  protection: boolean;
  counter: boolean;
  lifesteal: boolean;
  injury: boolean;
  infos: string;
}

export const makeDefaultEnemy = (): Enemy => ({
  name: '',
  artifact: '',
  hp: 0,
  cr: 0,
  outspeed: false,
  immunity: false,
  protection: false,
  counter: false,
  lifesteal: false,
  injury: false,
  infos: '',
});