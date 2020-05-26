class EventHub {
  private cache: { [key: string]: Array<(data: unknown) => void> } = {};
  private safeCache(eventName: string) {
    return this.cache[eventName] || []
  }
  //on负责订阅报纸和事件
  on(eventName: string, fn: (data: unknown) => void) {
    this.safeCache(eventName).push(fn);
  }
  //emit负责发布报纸和事件执行
  emit(eventName: string, data?: unknown) {
    this.safeCache(eventName).forEach(fn => fn(data));
  }

  //off负责删除订阅的报纸
  off(eventName: string, fn: (data: unknown) => void) {
    this.cache[eventName] = this.safeCache(eventName);
    let index = indexof(this.cache[eventName], fn)
    if (index === undefined) return
    this.cache[eventName].splice(index, 1)
  }
}

export default EventHub;


/**
 * 帮助函数 indexof
 * @param array 
 * @param item 
 */
function indexof(array, item) {
  if (array === undefined) return -1
  let index = -1;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) {
      index = i
      break
    }
  }
  return index
}
