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

export function stripDiacritics(text: string) {
    const sdiak = "áäčďéěíĺľňóô öŕšťúů üýřžÁÄČĎÉĚÍĹĽŇÓÔ ÖŔŠŤÚŮ ÜÝŘŽ";
    const bdiak = "aacdeeillnoo orstuu uyrzAACDEEILLNOO ORSTUU UYRZ";

    return text.split('').map(char => {
        const index = sdiak.indexOf(char)
        if (index == -1) {
            return char
        } else {
            return bdiak[index]
        }

    }).join('')
}
