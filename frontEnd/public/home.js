/* 首页 */
const scrolltip = document.querySelector('.scrollTip')
function tip(){
  if(index == 1){
    scrolltip.style.opacity = 1
  }else{
    scrolltip.style.opacity = 0
  }
}
/* navs */
const navWrap = document.querySelector('.nav')
const navs = document.querySelectorAll('.nav > ul > li')
const scrollList = document.querySelector('.scrollList')
const dir = document.querySelector('.dir')
let scrollY = 0
let index = 1
//更新标页码
function updatepag(){
  dir.innerHTML = `/ 0${index}/ 05`
  scrollList.style.transform = `translateY(${scrollY}px)`
}
//点击滚动
function scrollto(ind){
  scrollY = -746*(ind-1)
  index = ind 
  updatepag()
  bottomSlide()
  characterPage()
  leftSlide()
  tip()
}
//滚轮滚动
function onscr(){
  e = window.event
  if(e.wheelDelta > 0){
    if(scrollY == 0){}
    else if(scrollY < -3000){
      scrollY += 350
      updatepag()
      changeActive()
      navWrap.style.transform = `translateY(0px)`
    }
    else{
      index -= 1
      scrollY += 746
      updatepag()
      bottomSlide()
      leftSlide()
      changeActive()
      characterPage()
      tip()
    }
  } 
  if(e.wheelDelta < 0){
    if(scrollY < -3000){}
    else if(scrollY < -2800){
      scrollY -= 350
      updatepag()
      changeActive()
      navWrap.style.transform = `translateY(-350px)`
    }
    else{
      index += 1
      if(index == 6){index = 5}
      scrollY -= 746
      updatepag()
      bottomSlide()
      leftSlide()
      characterPage()
      changeActive()
      tip()
    }
  } 
}
//改变navs样式
function changeActive(){
  for(const nav of navs){
    nav.classList.remove('active')
  }
  navs[index-1].classList.add('active')
}
for(const nav of navs){
  nav.onclick = (e) => {
    let flag = parseInt(e.target.getAttribute('name'))
    scrollto(flag)
    changeActive()
  }
}
//节流函数
function throttle(fun,time){
  let timer; //定时器
  return function(){
    _this = this;
    let args = arguments;
    if(!timer){//如果定时器还在，则说明前一次延迟执行还没有完成
      fun.apply(_this, args);
      timer = setTimeout(function(){
        console.log(timer);
        clearTimeout(timer);
        timer = null;
      },time || 1000)  
    }
  }
}
window.onwheel = throttle(onscr,1000) 

/* 情报 */
const infoSlideIdx = document.querySelectorAll('.slideShow > ul >li')
const infoSlideList = document.querySelector('.slideList')
let infoSlideListIdx = 0
//情报轮播图idx指示改变函数
function infoSlideIdxChange(target){
  infoSlideIdx.forEach((li)=>{
    li.classList.remove('infoActive')
  })
  target.classList.add('infoActive')
}
//情报轮播图自动播放函数
function autoPlay(){
  setInterval(() => {
    infoSlideListIdx++
    infoSlideIdxChange(infoSlideIdx[infoSlideListIdx])
    infoSlideList.style.transform = `translateX(${-800 * infoSlideListIdx}px)`
    if(infoSlideListIdx == 4){
      infoSlideListIdx = -1
    }
  },3000)
}
autoPlay()

/* character */
const characterNav = document.querySelector('.characterNav > ol')
const characters = document.querySelectorAll('.characterNav > ol > li')
const charNm = document.querySelector('.characterCard > div > h1')
const charEnm = document.querySelectorAll('.characterCard > div > div > div')[0]
const charCv = document.querySelectorAll('.characterCard > div > div > div')[1]
const chardiscrip = document.querySelector('.characterCard > .chardiscrip')
const charImg = document.querySelector('.characterShow > .charImg')
var att = 0
function fadeout(nm,Enm,img,cv,discrip){
  nm.style.animation = 'leftfade .5s linear'
  img.style.animation = 'leftfade .5s linear'
  Enm.style.animation = 'leftfade .5s linear'
  cv.style.animation = 'leftfade .5s linear'
  discrip.style.animation = 'bottomfade .5s linear'
  nm.style.animationFillMode = 'forwards'
  Enm.style.animationFillMode = 'forwards'
  cv.style.animationFillMode = 'forwards'
  img.style.animationFillMode = 'forwards'
  discrip.style.animationFillMode = 'forwards'
}
function showup(nm,Enm,img,cv,discrip){
  nm.style.animation = 'leftshow .5s linear'
  img.style.animation = 'leftshow .5s linear'
  Enm.style.animation = 'leftshow .5s linear'
  cv.style.animation = 'leftshow .5s linear'
  discrip.style.animation = 'bottomshow .5s linear'
}
function animateClear(){
  charNm.style.animation = ''
  charEnm.style.animation = ''
  charCv.style.animation = ''
  charImg.style.animation = ''
  charNm.style.animation = ''
  chardiscrip.style.animation = ''
}
function charchange(nm,Enm,img,cv,discrip){
  charNm.innerText = nm
  charEnm.innerText = Enm
  charImg.innerHTML = `<img height="800px" width="400px" src=${img}>`
  charCv.innerText = `CV:${cv}`
  chardiscrip.innerText = discrip
}
function charNavOnclick (e) {
  for(const char of characters){
    char.classList.remove('active')
  }
  e.target.classList.add('active')
  fadeout(charNm,charEnm,charImg,charCv,chardiscrip)
  setTimeout(()=>{
    showup(charNm,charEnm,charImg,charCv,chardiscrip)
    charchange(
      e.target.getAttribute('charNm'),
      e.target.getAttribute('charEnm'),
      e.target.getAttribute('charImg'),
      e.target.getAttribute('charCv'),
      e.target.getAttribute('chardiscrip')
    )
  },800)
  setTimeout(()=>{
    animateClear()
    att = 0
  },1500)
}
function characterPage(){
  if(index == 3){
    characters.forEach((character) => {
      character.onclick = () => {
        if(att == 0){
          charNavOnclick(event)
          att = 1
        }
      }
    })
  }
}

/* settings */
const settingsLi = document.querySelectorAll('.settings > ul > li')
function leftSlide(){
  if(index == 4){
    setTimeout(() => {
      settingsLi.forEach((li,idx) => {
        li.style.animation = `leftSlide .7s ease-out`
        li.style.animationFillMode = 'forwards'
        li.style.animationDelay = `${idx*0.1}s`
      })
    },1000)
  }
}

/* archives */
const archives_divs = document.querySelectorAll('.archivesWrap > div')
function bottomSlide(){
  if(index == 5 ){
    setTimeout(()=>{
      archives_divs.forEach((div) => {
        div.style.animation = `bottomSlide .7s linear`
        div.style.animationFillMode = 'forwards'
      })
    },1000)
  }else{
    archives_divs.forEach((div) => {
      setTimeout(() => {
        div.style.animation = ``
        div.style.visibility = 'hidden'
      },1000)
    })
  }
}