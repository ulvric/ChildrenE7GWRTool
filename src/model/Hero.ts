export interface Hero {
  name: string;
  speed: number;
  crBonus: number;
  crPush: number;
  crPushAlly: number;
  speedDown: boolean;
}

export const makeDefaultHero = (): Hero => ({
  name: '',
  speed: 0,
  crBonus: 0,
  crPush: 0,
  crPushAlly: 0,
  speedDown: false,
});
