/**
 * Central configuration for the birthday surprise experience.
 * Edit this file to personalize names, password, media, questions, gifts, and messages.
 * Place media files in /public/media/
 */

/** Respect Vite `base` so assets work on GitHub Pages (/birthday/...). */
const media = (path) => {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${String(path).replace(/^\//, "")}`;
};

export const birthdayConfig = {
  birthdayName: "VAHINI",
  nickname: "BAALA",
  password: "sambar",

  passwordHint: "Think of the one thing that makes this day special.",
  passwordHintStrong: "It's something you say every year on this day… or maybe just her name.",

  heroTitle: "Happy Birthday",
  heroSubtitle: "A little surprise, made just for you",
  heroJourneyLine: "A little journey through memories, moments and surprises…",

  finalMessage: `If you've made it this far, thank you for taking this little journey I created just for you.

There's something I've never really said out loud.

I truly care about you more than I probably show. Your kindness, your patience, your smile, and the way you make our home feel brighter never go unnoticed. Your presence matters — not just to my brother, but to me and to our family as well.

Thank you for accepting all of us with so much love, for making ordinary moments feel special, and for being exactly the wonderful person you are.

I hope this new year of your life brings you endless happiness, good health, beautiful memories, and every little dream you've been wishing for.

Keep smiling, keep being your amazing self, and always remember that you will always have a place in our hearts.

Happy 30th Birthday! 🎂❤️

With lots of love,
Your Devar 💙`,

  closingLine: "Made especially for you.",

  photos: [
    media("media/photo1.jpeg"),
    media("media/photo2.jpeg"),
    media("media/photo3.jpeg"),
    media("media/photo4.jpeg"),
    media("media/photo5.jpeg"),
    media("media/final-photo.jpg"),
  ],

  videos: [media("media/video1.mp4")],

  musicPath: media("media/birthday-music.mp3"),
  musicVolume: 0.28,

  /**
   * Memory layouts (set per media orientation):
   * - "portrait"  → vertical phone photos (3:4) — best for photo1–5
   * - "full"      → wide / cinematic / video frames (21:11)
   * - "side"      → default softer landscape crop (16:11)
   * - "polaroid"  → square-ish scrapbook tilt — only if photo is near-square
   */
  memories: [
    {
      id: 1,
      label: "MEMORY 01",
      type: "photo",
      media: media("media/photo1.jpeg"),
      caption: "One picture. A thousand emotions.",
      date: "A day that still glows",
      text: "The first picture captured on my new phone... and one of my favorites.",
      layout: "portrait",
      tilt: 0,
    },
    {
      id: 2,
      label: "MEMORY 02",
      type: "video",
      media: media("media/video1.mp4"),
      caption: "",
      date: "",
      text: "Some memories still feel like yesterday.",
      layout: "portrait",
      tilt: 0,
    },
    {
      id: 3,
      label: "MEMORY 03",
      type: "photo",
      media: media("media/photo2.jpeg"),
      caption: "Where ordinary becomes beautiful",
      date: "An ordinary evening",
      text: "And some people make every ordinary moment special.",
      layout: "portrait",
      tilt: 0,
    },
    {
      id: 4,
      label: "MEMORY 04",
      type: "photo",
      media: media("media/photo3.jpeg"),
      caption: "Every scar carries a story.",
      date: "",
      text: "Our first little mishap… and somehow, it became one of the stories we still smile about",
      layout: "portrait",
      tilt: -2,
    },
    // {
    //   id: 5,
    //   label: "MEMORY 05",
    //   type: "photo",
    //   media: media("media/photo4.jpeg"),
    //   caption: "[MEMORY_CAPTION_05]",
    //   date: "A quiet kind of magic",
    //   text: "Not every chapter needs words. Some just need you.",
    //   layout: "portrait",
    //   tilt: 0,
    // },
    {
      id: 6,
      label: "MEMORY 06",
      type: "photo",
      media: media("media/photo5.jpeg"),
      caption: "Simply unforgettable.]",
      date: "A day that still glows",
      text: "Some moments become memories without us realizing it.",
      layout: "portrait",
      tilt: 0,
    },
  ],

  questions: [
    {
      question: "What always makes you smile?",
      options: ["Baala", "Mom", "Money", "My Husband"],
      correctAnswer: 0,
      correctMessage: "Okay, you actually know this 😌",
      incorrectMessage: "Close… but not quite.",
    },
    {
      question: "Favorite kind of evening?",
      options: ["A quiet drink with her husband", "A family game night", "Going out for dinner", "A solo Netflix binge"],
      correctAnswer: 1,
      correctMessage: "You remembered ✨",
      incorrectMessage: "Hmm… try thinking softer.",
    },
    {
      question: "What would you never say no to?",
      options: ["A spontaneous trip", "Good food", "A cozy evening with family", "Shopping"],
      correctAnswer: 0,
      correctMessage: "Nailed it.",
      incorrectMessage: "Nice try 😌",
    },
    {
      question: "A little secret about you?",
      options: ["Kind & Carin", "Being the sweetest person", "Giving the best advice", "Helping everyone without expecting anything"],
      correctAnswer: 3,
      correctMessage: "You really do know her.",
      incorrectMessage: "Think a little deeper…",
    },
    {
      question: "When your husband says 'I'm ready in 5 minutes'... what does that actually mean?",
      options: ["Exactly 5 minutes", "15–20 minutes", "An hour later", "Tomorrow"],
      correctAnswer: 2,
      correctMessage: "Haha! So true! 😂",
      incorrectMessage: "You know him better than that!",
    },
    {
      question: "What's your devar's hidden talent?",
      options: ["Making me laugh", "He thinks he does", "Eating without gaining weight", "Pretending he's always right"],
      correctAnswer: 1,
      correctMessage: "Haha! You know me well Bhavi!",
      incorrectMessage: "Nice try! Think about all the fun memories.",
    }
  ],

  emotionalMessages: [
    "You make people feel at home.",
    "Your presence makes ordinary days better.",
    "You bring your own kind of warmth into the family.",
    "You notice the small things — and that changes everything.",
    "The room feels softer when you're in it.",
    "Some people become family because of a relationship. Some become family because of the love they give. You are one of the rare ones who became both.",
    "There's something I've never told you. I truly care about you. If I've ever said 'no' to something, it wasn't because I didn't want to help or spend time with you. Sometimes I just wasn't ready in that moment, and I never meant to hurt you. You and my brother are very important to me, and your presence brings so much warmth and happiness to our home. I'm really grateful to have you as part of our family. ❤️",
    "Thank you for being you.",
  ],

  gifts: [
    {
      id: 1,
      title: "Birthday Cake 🎂",
      description: "A sweet surprise made just for you",
      reveal: "A delicious birthday cake to celebrate your special day! ❤️",
    },
    {
      id: 2,
      title: "Red Wine 🍷",
      description: "For a cozy and memorable evening",
      reveal: "A bottle of wine to toast another beautiful year together. 🥂",
    },
    {
      id: 3,
      title: "Elegant Handbag 👜",
      description: "A little luxury you'll love carrying",
      reveal: "A stylish handbag chosen especially for you. ✨",
    },
    {
      id: 4,
      title: "Signature Perfume 🌸",
      description: "A fragrance as beautiful as you",
      reveal: "A perfume that reminds everyone of your elegance. 💕",
    },
    {
      id: 5,
      title: "Stylish Sunglasses 😎",
      description: "For your next adventure",
      reveal: "A sunglasses to make every outing more stylish. ☀️",
    },
    {
      id: 6,
      title: "Luxury Chocolates 🍫",
      description: "Because every celebration deserves sweetness",
      reveal: "A box of your favorite chocolates is waiting for you! ❤️",
    },
    {
      id: 7,
      title: "Mystery Gift",
      description: "A surprise waiting for you",
      reveal: "Better luck next time 💫 You found a decoy. The real surprises were hiding elsewhere.",
    },
    {
      id: 8,
      title: "Mystery Gift",
      description: "A surprise waiting for you",
      reveal: "Better luck next time 😌 This one was empty — enjoy the joke!",
    },
    {
      id: 9,
      title: "Mystery Gift",
      description: "A surprise waiting for you",
      reveal: "Better luck next time 😉 This gift was a playful trap — still love you though!",
    },
  ],

  finalMedia: {
    type: "photo",
    src: media("media/photo.jpg"),
    alt: "A meaningful moment",
  },

  easterEgg: {
    message:
      "Okay… you found something you weren't supposed to find 👀",
    secretMessage:
      "[SECRET_MESSAGE] — a family joke, a funny memory, or something only she would understand.",
    photo: media("media/easter-photo.jpg"),
    video: media("media/easter-video.mp4"),
  },

  wrongPasswordMessages: [
    "Not quite…",
    "Nice try 😌",
    "Think a little deeper…",
    "Almost… but not yet.",
  ],
};



