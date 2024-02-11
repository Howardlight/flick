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


/**
 * Object containing breakpoints for the landing page.
 */
export const landingBreakpoints = {
    320: {
        slidesPerView: 1.5,
        spaceBetween: 20
    },
    425: {
        slidesPerView: 1.5,
        spaceBetween: 20
    },
    640: {
        slidesPerView: 2,
        spaceBetween: 20
    },
    768: {
        slidesPerView: 3,
        spaceBetween: 40
    },
    1024: {
        slidesPerView: 4,
        spaceBetween: 50
    },
    1440: {
        slidesPerView: 5,
        spaceBetween: 50
    },
    2560: {
        slidesPerView: 8,
        spaceBetween: 50
    }
};
