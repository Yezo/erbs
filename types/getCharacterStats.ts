export interface ICharacterStats {
  code: number
  message: string
  data: ICharacter[]
}

export interface ICharacter {
  code: number
  name: string
  maxHp: number
  maxSp: number
  strLearnStartSkill: StrLearnStartSkill
  strUsePointLearnStartSkill: StrUsePointLearnStartSkill
  initExtraPoint: number
  maxExtraPoint: number
  attackPower: number
  defense: number
  skillAmp: number
  adaptiveForce: number
  criticalStrikeChance: number
  hpRegen: number
  spRegen: number
  attackSpeed: number
  attackSpeedLimit: number
  attackSpeedMin: number
  moveSpeed: number
  sightRange: number
  radius: number
  pathingRadius: number
  uiHeight: number
  initStateDisplayIndex: number
  localScaleInCutscene: number
  resource: string
  lobbySubObject: LobbySubObject
}

export enum LobbySubObject {
  Chair = "Chair",
  Coffin = "Coffin",
  Desk = "Desk",
  Empty = "",
}

export enum StrLearnStartSkill {
  PassiveAttackSpecialSkill = "Passive,Attack,SpecialSkill",
  PassiveAttackSpecialSkillActive1 = "Passive,Attack,SpecialSkill,Active1",
  PassiveAttackSpecialSkillActive4 = "Passive,Attack,SpecialSkill,Active4",
}

export enum StrUsePointLearnStartSkill {
  Active1 = "Active1",
  Active3 = "Active3",
  Empty = "",
}
