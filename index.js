function saveToCrud(event) {
    event.preventDefault()
    const Price = event.target.price.value;
    const Product = event.target.product.value;

    const obj = {
        Price,
        Product


    }
    //axios POST
    axios.post("https://crudcrud.com/api/bf16bfa670ac4c83bb2e8c4523ada823/Product", obj)
        .then(res => onscreen(res.data))
        .catch((err) => { document.body.innerHTML = document.body.innerHTML + '<h4>Something Went Wrong</h4>' })
}

window.addEventListener("DOMContentLoaded", () => {
    //axios GET
    axios.get("https://crudcrud.com/api/bf16bfa670ac4c83bb2e8c4523ada823/Product")
        .then(res => {
            for (var i = 0; i < res.data.length; i++) {
                onscreen(res.data[i])
                console.log(res)
            }
        })
        .catch((err) => { document.body.innerHTML = document.body.innerHTML + '<h4>Something Went Wrong</h4>' })
})


var to = 0
function onscreen(obj) {
    const total = document.getElementById('l')
    const Parent = document.getElementById('list');

    const child = document.createElement('li');
    child.textContent = obj.Price + '-' + obj.Product

    // total add
    to += parseInt(obj.Price)
    total.textContent = `Total Price = ${to}`

    // delete
    const delbtn = document.createElement('input')
    delbtn.type = "button"
    delbtn.value = 'del'

    //axios DELETE 
    var del = delbtn.onclick = () => {

        to -= parseInt(obj.Price)
        total.textContent = `Total Price = ${to}`

        axios.delete(`https://crudcrud.com/api/bf16bfa670ac4c83bb2e8c4523ada823/Product/${obj._id}`)
            .then(res => res)
            .catch((err) => { document.body.innerHTML = document.body.innerHTML + '<h4>Something Went Wrong</h4>' })

        Parent.removeChild(child)
    }


    child.appendChild(delbtn)
    Parent.appendChild(child)
}



