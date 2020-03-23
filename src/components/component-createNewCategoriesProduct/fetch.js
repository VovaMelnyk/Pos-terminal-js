export default function(resource, method, body) {
    if (method.toUpperCase() === 'GET') {
        return fetch(`https://pos-terminal-caffe.firebaseio.com/${resource}`)
            .then(res => {
                return res.json();
            })
            .then(data => data)
            .catch(error => {
                console.log('Error: ', error);
            });
    } else if (
        method.toUpperCase() === 'POST' ||
        method.toUpperCase() === 'PUT'
    ) {
        return fetch(`https://pos-terminal-caffe.firebaseio.com/${resource}`, {
                method: method,
                body: JSON.stringify(body),
                headers: { 'content-type': 'application/json' },
            })
            .then(res => {
                return res.json();
            })
            .then(data => data)
            .catch(error => {
                console.log('Error: ', error);
            });
    }
}