// ad retrieval code app.js — baseline v2026-03-16-01
// 1. replace ad slot with the banner images
// 2. 

import { ADS } from "./ads-data.js";

// pulls all elements defined by app in basic modal structure
const modal = document.getElementById("adModal");
const card = document.getElementById("adCard");
const kicker = document.getElementById("adKicker");
const title = document.getElementById("adTitle");
const body = document.getElementById("adBody");
const footer = document.getElementById("adFooter");

// toggle between local and github reference
// const AD_IMAGE_PATH = "../BugmanAds/images/";
const AD_IMAGE_PATH = new URL("./images/", import.meta.url).href;

const AD_ANIMATION = "flip";
// options: "none" | "flip"

const BUTTON_ACTIONS = {

  close() {
    modal.classList.add("hidden");
  },

  premium() {
    modal.classList.add("hidden");
    modal.classList.remove("active");

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("bugman:premiumAccepted"));
      console.log("event dispatched (delayed)");
    }, 0);

    // window.dispatchEvent(
    //   new CustomEvent("bugman:premiumAccepted", {
    //     detail: { source: "ad-engine" }
    //   })
    // );
  }

};

// randomly selects an ad from the JSON
// to be used with: <div id="randomAdSlot"></div>

// const randomAdSlot = document.getElementById("randomAdSlot");
// const ad = ADS[Math.floor(Math.random() * ADS.length)];
// randomAdSlot.innerHTML = `
//   <img src="${ad.bannerImage}"
//        class="ad-banner"
//        data-ad="${ad.id}">
// `;

function renderBlock(block, container) {

  if (block.type === "paragraph") {
    const div = document.createElement("div");

    if (block.className) {
      div.className = block.className;
    }

    div.innerHTML = block.html;

    container.appendChild(div);
  }

  if (block.type === "list") {
    const ul = document.createElement("ul");

    if (block.className) {
      ul.className = block.className;
    }

    block.items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });

    container.appendChild(ul);
  }

}

// loop through all predefined ad slots (class="ad-slot", so uses ".)
function initAdSlots() {

  document.querySelectorAll(".ad-slot").forEach(slot => {

    const ad = ADS.find(a => a.id === slot.dataset.ad);
    if (!ad) return;

    slot.classList.add("ad-slot-" + (ad.slotSize || "banner"));

    slot.innerHTML = `
      <img src="${AD_IMAGE_PATH}${ad.bannerImage}" 
           class="ad-banner"
           data-ad="${ad.id}">
    `;
  });

}

window.addEventListener("DOMContentLoaded", initAdSlots);

export function refreshAds() {
  initAdSlots();
}

// add a clicker to the banner via the id-name
// find JSON entry based on "data-ad" in main HTML
// populate with elements from JSON 
document.addEventListener("click", (e) => {

  const banner = e.target.closest(".ad-banner");
  if (!banner) return;

  const ad = ADS.find(a => a.id === banner.dataset.ad);
  if (!ad) return;

  title.textContent = ad.title;

  if (ad.kicker) {
    kicker.textContent = ad.kicker;
    kicker.style.display = "block";
  } else {
    kicker.style.display = "none";
  }

  body.innerHTML = "";

  ad.body.forEach(block => {
    renderBlock(block, body);
  });

  card.className = "ad-card";

  if (ad.theme) card.classList.add("ad-theme-" + ad.theme);
  if (ad.variant) card.classList.add("ad-variant-" + ad.variant);

  footer.innerHTML = "";

  ad.buttons.forEach(btn => {

    const button = document.createElement("button");
    button.textContent = btn.label;

    if (btn.className) button.className = btn.className;

    button.addEventListener("click", () => {

      const action = BUTTON_ACTIONS[btn.action];
      if (action) action();

    });

    footer.appendChild(button);

  });

  // FLIP animation
  if (AD_ANIMATION === "flip") {

    // reset previous animation state
    card.style.transition = "";
    card.style.transform = "";

    card.classList.add("animating");

    const first = banner.getBoundingClientRect();

    modal.classList.remove("hidden");
    modal.classList.add("active");

    // hide card temporarily so we can measure
    card.style.visibility = "hidden";

    requestAnimationFrame(() => {

      const last = card.getBoundingClientRect();

      const dx = first.left - last.left;
      const dy = first.top - last.top;
      const sx = first.width / last.width;
      const sy = first.height / last.height;

      card.style.transformOrigin = "top left";
      card.style.transform = `
        translate(${dx}px, ${dy}px)
        scale(${sx}, ${sy})
        rotate(-0.6deg)
      `;

      card.style.visibility = "visible";

      requestAnimationFrame(() => {

        card.style.transition =
          "transform 620ms cubic-bezier(.18,.9,.32,1.1)";
        
        // card.style.boxShadow = "0 10px 40px rgba(0,0,0,.4)";

        card.style.transform = "none";

      });

    });

  } else {

    modal.classList.remove("hidden");
    modal.classList.add("active");

  }

});

document.getElementById("closeAdBtn")?.addEventListener("click", () => {
  card.style.transition = "";
  card.style.transform = "";
  modal.classList.add("hidden");
  modal.classList.remove("active");
});

window.refreshAds = refreshAds;