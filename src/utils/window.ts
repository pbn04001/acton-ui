export function getWindow(value: string): any {
  return (window as any)[value]
}

export function setWindow(value: string, obj: any) {
  ;(window as any)[value] = obj
}
