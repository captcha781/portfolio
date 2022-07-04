const servicein = (id) => {
    let child = document.getElementById(id).children
    child[0].style.borderColor = "hsl(228, 75%, 65%)"
    child[1].style.color = "hsl(228, 75%, 65%)"
}

const serviceout = (id) => {
    let child = document.getElementById(id).children
    child[0].style.borderColor = "hsl(0,0%, 100%)"
    child[1].style.color = "hsl(0,0%, 100%)"
}