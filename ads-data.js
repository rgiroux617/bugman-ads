// ads-data.js
export const ADS = [

  {
    id: "oracle-premium",
    theme: "oracle",
    variant: "premium",
    slotSize: "banner",

    kicker: "Available now -",

    title: "Oracle Premium Services",

    bannerImage: "ad-oracle-premium-banner.png",

    body: [

      {
        type: "paragraph",
        className: "netScreed",
        html: `
      Sitting pretty with extra rations? Why let them spoil when you can invest in what one Viking daily referred to as
      <span class="italicText">"the top foraging consultation service in the greater island area."</span>
      That's right,
      <span class="boldText greenText">Forage Buddy</span> and
      <span class="boldText purpleText">Oracle Consultation</span>
      are now available on a premium tier, offering unlimited consults. Tired of catty responses from the Oracle? Not anymore!
      With the Forage Buddy Premium you'll be the envy of your clan.
      Act now and receive a new app color just to show off your great taste!
      `
      },

      {
        type: "paragraph",
        className: "netScreed",
        html: `
      For the low rate of just
      <span class="redText">1.5 rations per day</span>
      you can be living the good life. Don't be the only Knud in your Karvi without it!
      `
      }

    ],

    buttons: [

      {
        label: "Go Premium!",
        action: "premium",
        className: "btn"
      },

      {
        label: "Close",
        action: "close",
        className: "btn"
      }

    ]
  },

  {
    id: "bugman-pawn-loan",
    theme: "bugman",
    variant: "standard",
    slotSize: "banner",

    title: "Bugman Pawn & Loan",

    bannerImage: "ad-pawn-loan-banner.png",

    body: [

      {
        type: "paragraph",
        className: "netScreed",
        html: `
      Is foraging no longer cutting it? Maybe you've seen a few weak willed crewmembers straight up starve to death and have decided there has got to be a better way. And there is!
      `
      },

      {
        type: "paragraph",
        className: "netScreed",
        html: `
      Bugman Pawn & Loan has been a trusted fixture of the Nordic island community since 754BC.
      With shops in nearly every port, our staff of technical specialists will find a solution
      <span class="boldText">for you!</span>
      Our services include:
      `
      },

      {
        type: "list",
        className: "simpleList",
        items: [
          "Indentured servitude",
          "Ration trading (at market rates)",
          "Best prices per oz for silver and gold"
        ]
      },

      {
        type: "paragraph",
        className: "netScreed",
        html: `
      At Bugman Pawn & Loan, we believe no one should have to die just because they suck balls at foraging
      (or have a half dozen 1HP 'friends' to support). There are always sponsors willing to milk the raw
      energy your body produces in exchange for gruel. Suffer no more! Inquire today.
      `
      }

    ],

    buttons: [

      {
        label: "Close",
        action: "close",
        className: "btn"
      }

    ]

  }

];