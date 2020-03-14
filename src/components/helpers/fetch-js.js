function fetchJs() {
    return fetch("https://pos-terminal-caffe.firebaseio.com/category.json")
        .then(res =>

            res.json()
        )
        .then(data => {

            // console.log(Object.values(data));
            return Object.values(data)
        })

    .catch(err => console.log(err))
}
export default fetchJs