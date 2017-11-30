export type Notification = {
  key: string,
  date: number,
  type: 'error' | 'info',
  content: string,
  data: any,
}

export type State = Notification[]
