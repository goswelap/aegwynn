// export class Conversation {
//   constructor(public conversation: {user: string[], assistant: string[]}) { }
// }

export class Conversation {
  user: string[] = [];
  assistant: string[] = [];

  constructor(init?: Partial<Conversation>) {
    Object.assign(this, init);
  }
}
