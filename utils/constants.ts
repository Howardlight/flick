const constants = {
    baseAPI: "https://api.themoviedb.org/3/",
    cacheRevalidation: {
        landing: 90000, // 1 day
        mediaDetails: 43200, // half day
    }
}

export default constants;