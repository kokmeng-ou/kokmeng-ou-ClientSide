<template lang="">
  <img src="./Image/peopleListentomusic.png" alt="peopleListentomusic" class="position-absolute Liston-music-img" >
  <img src="./Image/Phone.png" alt="phone" class="position-absolute phone-img " >
  <img src="./Image/Other04.png" alt="laptop" class="position-absolute laptop-img " >
  <img src="./Image/PeopeoOnRocket.png" alt="PeopeoOnRocket" class="position-absolute people-rocket " >
  <img src="./Image/prototype.png" alt="prototype" class="position-absolute prototype " >
</template>
<script>
export default {

}
</script>
<style scoped>

@media (max-width: 1000px) {
  .Liston-music-img {
    display: none;
  }
  .phone-img{
    display: none;
  }
  .laptop-img {
    display: none;
  }
  .people-rocket{
    display: none;
  }
  .prototype{
    display: none;
  }
}
  .Liston-music-img {
    top: 0px;
    left: -7rem;
    max-width: 350px;
    animation-name: music;
    animation-duration: 8s;
    animation-iteration-count: infinite;
  }

  @keyframes music {
    0%   {left:-7rem; top:0px;}
    50%  { left:-7rem; top:100px;}
    75%  { left:-7rem; top:0px;}
  }
  .phone-img{
    right: 13rem;
    top: 35px;
    max-width: 250px;
    animation-name: phone;
    animation-duration: 12s;
    animation-iteration-count: infinite;
  }
  @keyframes phone {
    0%   {right:13rem; top:35px;}
    50%  { right:13rem; top:70px;}
    75%  { right:13rem; top:35px;}
  }
  .laptop-img{
    max-width: 130px;
    right: -3rem;
    top: 7rem;
    animation-name: laptop;
    animation-duration: 9s;
    animation-iteration-count: infinite;
  }
  @keyframes laptop {
    0%   {right:-3rem;; top:7rem;}
    50%  { right:-3rem;; top:9rem;}
    75%  { right:-3rem;; top:7rem;}
  }
  .people-rocket{
    right: 2rem;
    bottom: -5rem;
    max-width: 450px;
    animation-name: rocket;
    animation-duration: 5s;
    animation-iteration-count: infinite;
  }
  @keyframes rocket {
    0%   {right:2rem; bottom:-5rem;}
    50%  { right:2rem;; bottom:-7rem;}
    75%  { right:2rem;; bottom:-5rem;}
    50%  { right:2rem;; bottom:-7rem;}
  }
  .prototype{
    left: 10rem;
    bottom: -5rem;
    max-width: 250px;
    animation-name: prototype;
    animation-duration: 5s;
    animation-iteration-count: infinite;
  }
  @keyframes prototype {
    0%   {left:10rem; bottom:-5rem;}
    50%  { left:10rem;; bottom:-6rem;}
    75%  { left:10rem;; bottom:-5rem;}
    50%  { left:10rem;; bottom:-6rem;}
  }
</style>
