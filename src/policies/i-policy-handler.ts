
export interface IPolicyHandler {
  handle(ability: any): boolean;
}

type PolicyHandlerCallback = (ability: any) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;