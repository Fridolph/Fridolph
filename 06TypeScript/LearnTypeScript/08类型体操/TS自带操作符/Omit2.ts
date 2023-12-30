type Mouse_Event = {
	eventType: 'click'
	x: number
	y: number
	id: number
}

type Keyboard_Event = {
	eventType: 'keyup'
	key: number
	id: number
}

type EventRec = EventFunctions<Mouse_Event | Keyboard_Event, 'eventType'>
type EventFunctions<Events extends Record<string, any>, EventKey extends keyof Events> = {
  // 这样就可拿到类型了，但并不是准确的类型
  // [Event in Events as string]: (event: Event) => any

  // 终于拿到类型了。但写得太累 - - 有点看不懂
  // [Event in Events as Event extends Events ? Event[EventKey] : never]: (event: Event) => any

  // 优雅一波
  [Event in Events as Event[EventKey]]: (event: Event) => any
}
// [x: string]  TS的可索引签名
export {}
