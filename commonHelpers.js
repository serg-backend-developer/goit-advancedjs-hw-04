import{a as E,i as I,S as w,d as $}from"./assets/vendor-d04b2d9f.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();const P="https://pixabay.com/api/",H="44145043-d94906ce2cc1245071fea5b6f";async function D(e,t=1,r=30){const a=await E.get(`${P}/?key=${H}&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${r}&page=${t}`);return{hits:a.data.hits.map(({webformatURL:n,largeImageURL:s,tags:l,likes:b,views:v,comments:L,downloads:S})=>({webformatURL:n,largeImageURL:s,tags:l,likes:b,views:v,comments:L,downloads:S})),total:a.data.totalHits}}function f(e,t,r="topRight",a=5e3){I.show({message:e,color:t,position:r,timeout:a})}function i(e){f(e,"red")}function M(e){f(e,"green")}const m=30;let c;function O(){const e=document.getElementById("search-form");e&&e.addEventListener("submit",async t=>{t.preventDefault();const r=[...e.elements].find(o=>o.name==="searchQuery");if(!r)return;const a=r.value;await g(a,1,!0)})}function A({query:e,page:t,total:r}){localStorage.setItem("query",e),localStorage.setItem("page",t),localStorage.setItem("total",r)}function p(){const e=localStorage.getItem("query"),t=+localStorage.getItem("page"),r=+localStorage.getItem("total");return{query:e,page:t,total:r}}function R(){window.addEventListener("scroll",$(async()=>{const{scrollTop:e,scrollHeight:t,clientHeight:r}=document.documentElement;if(e+r>=t&&y()){const{query:a,page:o}=p();await g(a,o+1)}},400),{passive:!0})}async function g(e,t,r=!1){if(!(e!=null&&e.trim())){u(),i("Query should not be empty.");return}try{d();const a=await D(e,t,m);A({query:e,page:t,total:a.total}),h(a.hits,r),r&&(a.total?M(`Hooray! We found ${a.total} images.`):i("Sorry, there are no images matching your search query. Please try again.")),!y()&&a.total&&i("We're sorry, but you've reached the end of search results.")}catch{u(),i("Sorry, error occurred. Please try again.")}finally{d(!1)}}function u(){h([],!0)}function y(){const{page:e,total:t}=p();return t>e*m}function _(){O(),R(),c=Q()}function F(e){const{webformatURL:t,largeImageURL:r,tags:a,likes:o,views:n,comments:s,downloads:l}=e;return`
  <div class="photo-card">
    <div class="image-container">
      <a href="${r}">
        <img src="${t}" alt="${a}" loading="lazy" />
      </a>
    </div>
    <div class="info">
        <p class="info-item">
          <b>Likes</b>
          <span>${o}</span>
        </p>
        <p class="info-item">
          <b>Views</b>
          <span>${n}</span>
        </p>
        <p class="info-item">
            <b>Comments</b>
            <span>${s}</span>
        </p>
        <p class="info-item">
            <b>Downloads</b>
            <span>${l}</span>
        </p>
    </div>
   </div>
  `}function h(e,t=!0){const r=document.querySelector(".gallery");if(!r)return;const a=e.map(o=>F(o)).join("");t?r.innerHTML=a:r.insertAdjacentHTML("beforeend",a),c==null||c.refresh()}function d(e=!0){const t=document.querySelector(".loader");t&&(e?t.classList.remove("hidden"):t.classList.add("hidden"))}function Q(){return new w(".gallery a",{captionDelay:250,captionsData:"alt"})}_();
//# sourceMappingURL=commonHelpers.js.map
