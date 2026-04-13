import{a as m,S as p,i as n}from"./assets/vendor-BkC4bTqC.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const y="55066588-ed2d39315576c70ee50c91166",g="https://pixabay.com/api/";function h(s){const o=`${g}?key=${y}&q=${encodeURIComponent(s)}&image_type=photo&orientation=horizontal&safesearch=true`;return m.get(o).then(e=>e.data)}const d=document.querySelector(".gallery"),a=document.querySelector(".loader"),L=new p(".gallery a",{captionsData:"alt",captionPosition:"bottom"});function w(s){const o=s.map(e=>`
    <li class="gallery-item">
      <a href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" />
      </a>
      <p> likes: ${e.likes}</p>
      <p> views: ${e.views}</p>
      <p> comments: ${e.comments}</p>
      <p> downloads: ${e.downloads}</p>
    </li>
  `).join("");d.innerHTML=o,L.refresh()}function $(){d.innerHTML=""}function S(){a&&a.classList.remove("is-hidden")}function l(){a&&a.classList.add("is-hidden")}const f=document.querySelector(".form"),u=f.querySelector('input[name="search-text"]');f.addEventListener("submit",async s=>{s.preventDefault();const o=u.value.trim();if(o===""){n.error({message:"Please enter a search query."});return}$(),S();try{const e=await h(o);if(e.hits.length===0){n.error({message:"Sorry, no images found. Try a different search query."}),l();return}w(e.hits),n.success({message:`Found ${e.hits.length} images!`})}catch{n.error({message:"Something went wrong. Please try again."})}finally{l(),u.value=""}});
//# sourceMappingURL=index.js.map
