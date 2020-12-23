export function promiseAllResolved<T>(promises: Promise<T>[]): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
        let nFullfilled = 0
        let results: T[] = []
        function checkAllFullfilled() {
            if (promises.length == nFullfilled) {
                resolve(results.filter(r => !!r))
            }
        }

        promises.forEach((promise, index)=> {
            promise.then((val) => {
                results[index] = val
                nFullfilled++
                checkAllFullfilled()
            }, (err) => {
                nFullfilled++
                checkAllFullfilled()
            })
        })
    })
}
