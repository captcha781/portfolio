
const activeToggle = (id, des) => {
    let childs = Array(document.getElementById(id).parentElement.children)
    let datamer = Array(document.getElementById(des).parentElement.children)
    childs.forEach(element => {
        for (let i = 0; i<element.length; i++){
            element[i].classList.remove("bg-LightPurple");
            element[i].classList.add("bg-slate-700");
            
            if (datamer[0][i].classList.contains("hidden")){
                continue
            }
            datamer[0][i].classList.add("hidden")
            
        }
    });
    document.getElementById(id).classList.add("bg-LightPurple")
    document.getElementById(id).classList.remove("bg-slate-700")
    document.getElementById(des).classList.add("block")
    document.getElementById(des).classList.remove("hidden")


}

const activeToggleSkiller = (id, des) => {
    let childs = Array(document.getElementById(id).parentElement.children)
    let polymer = Array(document.getElementById(des).parentElement.children)
    childs.forEach(element => {
        for (let i = 0; i<element.length; i++){
            element[i].classList.remove("bg-LightPurple");
            element[i].classList.add("bg-slate-700");
            
            if (polymer[0][i].classList.contains("hidden")){
                continue
            }
            polymer[0][i].classList.add("hidden")
            
        }
    });
    document.getElementById(id).classList.add("bg-LightPurple")
    document.getElementById(id).classList.remove("bg-slate-700")
    document.getElementById(des).classList.add("block")
    document.getElementById(des).classList.remove("hidden")


}