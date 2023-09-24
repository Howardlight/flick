import moment from "moment";

/**
 *  Splits a Massive array into multiple 12 Elements Arrays
 * @param arr Array with any type of object
 * @returns The same Array Split in 12 Elements over different Numbers of Arrays
 */
export function splitElementsInEqualArrays(arr: Array<any>) {
    let out: Array<any> = [];
    let arrCopy = JSON.parse(JSON.stringify(arr));
    const arrNumber = Math.ceil(arrCopy.length / 12);

    for (let i = 0; i < arrNumber; i++) {
        out.push(arrCopy.splice(0, 12))
    }
    return out;
}

export function isInPast(release_date: Date) { return moment() > moment(release_date); }


export function logError(error: Error, context: string) {
    console.error(`[${context}] Error: `, error);
}