
function  dishCategories () {
    return fetch (`https://pos-terminal-caffe.firebaseio.com/category.json`)
    .then(res => {console.log(res.json()); res.json()})
    .then(data => console.log(Object.values(data)))
}

export default dishCategories()