export type ScenarioCategory = "everyday" | "work";

export interface ConversationTurn {
  speaker: "partner" | "user";
  text: string;
  pinyin?: string;
  translation?: string;
  suggestions?: string[];
}

export interface Scenario {
  id: string;
  title: string;
  category: ScenarioCategory;
  situation: string;
  turns: ConversationTurn[];
}
