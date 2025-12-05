class XHR {
    static get(url: string) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.send();
        });
    }
}

export default XHR;