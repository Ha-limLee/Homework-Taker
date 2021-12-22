const trampoline = (fn: Function) => (...args: any[]) => {
    let result = fn(...args)
    while (typeof result === "function") result = result()
    return result
}

const deepCopy = (data: any) => {
    const result = typeof data === "object" ? data.constructor() : undefined
    if (!result) return

    const nextArgs: [any, any][] = []
    const _deepCopy = (curr: any, copy: any) => {
        for (const nextKey in curr) {
            if (typeof curr[nextKey] === "object") {
                const newObject = curr[nextKey].constructor()
                copy[nextKey] = newObject
                nextArgs.push([curr[nextKey], newObject])
            } else
                copy[nextKey] = curr[nextKey]
        }
        if (nextArgs.length === 0) return
        return () => _deepCopy(...nextArgs.pop())
    }
    const _deepCopy_recur = trampoline(_deepCopy)
    
    _deepCopy_recur(data, result)

    return result
}

const produce = <T>(data: T, fn: (copy: T)=>void): T => {
    const copy = deepCopy(data)
    fn (copy)
    return copy
}

const pipe = (...fns: Function[]) => (x: any) => fns.reduce((prev, curr) => curr(prev), x)

export { deepCopy, produce, pipe }