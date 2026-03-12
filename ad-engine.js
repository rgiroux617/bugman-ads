// ad retrieval code app.js — baseline v2026-02-19-01
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

const AD_IMAGE_PATH = "../BugmanAds/images/";

const BUTTON_ACTIONS = {

  close() {
    modal.classList.add("hidden");
  },

  premium() {
    console.log("premium upgrade clicked");
    modal.classList.add("hidden");
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
window.addEventListener("DOMContentLoaded", () => {

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

});

// add a clicker to the banner via the id-name
// find JSON entry based on "data-ad" in main HTML
// populate with elements from JSON 
document.querySelectorAll("[data-ad]").forEach(banner => {
  banner.addEventListener("click", () => {
// we perform a search based on the banner to allow for this search to be independent 
// and therefore work with multiple ads
    const ad = ADS.find(a => a.id === banner.dataset.ad);
    if (!ad) return;

    title.textContent = ad.title;

    if (ad.kicker) {
      kicker.textContent = ad.kicker;
      kicker.style.display = "block";
    } else {
      kicker.style.display = "none";
    }

    /* clear any previous ad content */
    body.innerHTML = "";

    /* render each block from JSON */
    ad.body.forEach(block => {
      renderBlock(block, body);
    });

    /* reset card class */
    card.className = "ad-card";

    /* apply theme */
    if (ad.theme) {
      card.classList.add("ad-theme-" + ad.theme);
    }

    /* apply variant */
    if (ad.variant) {
      card.classList.add("ad-variant-" + ad.variant);
    }

    /* clear old buttons */
    footer.innerHTML = "";

    ad.buttons.forEach(btn => {
      if (!ad.buttons) return;

      const button = document.createElement("button");

      button.textContent = btn.label;

      if (btn.className) {
        button.className = btn.className;
      }

      button.addEventListener("click", () => {

        const action = BUTTON_ACTIONS[btn.action];

        if (action) {
          action();
        }

      });

      footer.appendChild(button);

    });

    modal.classList.remove("hidden");
  });

});

document.getElementById("closeAdBtn")?.addEventListener("click", () => {
  modal.classList.add("hidden");
});