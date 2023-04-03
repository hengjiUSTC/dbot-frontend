// ----------------------------------------------------------------------
export type IBot = {
  _id: string;
  image: string;
  name: string;
  addde_time: string;
  prompt: string;
  description: string;
  default_prompt: string;
};

export type IBotState = {
  isLoading: boolean;
  error: Error | string | null;
  bots: IBot[];
};

export type IBotChatState = {
  isLoading: boolean;
  error: Error | string | null;
  bot: IBot | null;
};
