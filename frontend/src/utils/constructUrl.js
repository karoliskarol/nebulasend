const constructUrl = (path, params) => {
    const url = new URL(window.location.href);
    url.pathname = path;

    params.forEach(param => {
        const key = param[0];
        const value = param[1];

        if(key) {
            url.searchParams.append(key, value);
        }
    });

    return url.pathname + url.search;
}

export default constructUrl;