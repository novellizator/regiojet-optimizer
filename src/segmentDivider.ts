// closed interval
export type Segmentation = number[]
export function divideIntoSegments(start: number, end: number, numberOfSegments: number) {
    const divisions: Segmentation[] = []
    divideLineIntoSegments(start, end, numberOfSegments, [0], divisions)
    return divisions
}

function divideLineIntoSegments(start: number, end: number, numberOfSegments: number, currentDivision: Segmentation, divisions: Segmentation[]) {
    if (start == end) {
        if (numberOfSegments == 0) {
            divisions.push(currentDivision)
        } else {
            return
        }
    }
    if (numberOfSegments == 0) {
        return
    }

    for (let divider = start + 1; divider <= end; ++divider) {
        divideLineIntoSegments(divider, end, numberOfSegments - 1, [...currentDivision, divider], divisions)
    }
}
