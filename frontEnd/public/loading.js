const loadingprocess = document.querySelector('.loadingprocess')
const loading = document.querySelector('.loading')
const home = document.querySelector('.home')
home.style.display = 'none'
let after = getComputedStyle(loadingprocess, ':after')
let width = parseInt(after.getPropertyValue('width'))
const timer = setInterval(() => {
  let width = parseInt(after.getPropertyValue('width'))
  let percent = parseInt(width/7.65)
  loadingprocess.innerText = `${percent}%`
  if(percent >= 100){
    clearInterval(timer)
    setTimeout(()=>{
      loading.style.display = 'none'
      home.style.display = 'block'
    },200)
  }
},10)
loadingprocess.innerText = `${width}%`

