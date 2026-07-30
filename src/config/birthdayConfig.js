/**
 * Central configuration for the birthday surprise experience.
 * Edit this file to personalize names, password, media, questions, gifts, and messages.
 * Place media files in /public/media/
 */

export const birthdayConfig = {
  birthdayName: "VAHINI",
  nickname: "BAALA",
  password: "SAMBAR",

  passwordHint: "Think of the one thing that makes this day special.",
  passwordHintStrong: "It's something you say every year on this day… or maybe just her name.",

  heroTitle: "Happy Birthday",
  heroSubtitle: "A little surprise, made just for you",
  heroJourneyLine: "A little journey through memories, moments and surprises…",

  finalMessage: `[FINAL_MESSAGE]

This is where your personal message goes.
Write something warm, specific, and from the heart.
She will see this after the final twist.`,

  closingLine: "Made especially for you.",

  photos: [
    "/media/photo1.jpg",
    "/media/photo2.jpg",
    "/media/photo3.jpg",
    "/media/photo4.jpg",
    "/media/final-photo.jpg",
  ],

  videos: ["/media/video1.mp4", "/media/video2.mp4"],

  musicPath: "/media/birthday-music.mp3",
  musicVolume: 0.28,

  memories: [
    {
      id: 1,
      label: "MEMORY 01",
      type: "photo",
      media: "/media/photo1.jpg",
      caption: "[MEMORY_CAPTION_01]",
      date: "A day that still glows",
      text: "Some moments become memories without us realizing it.",
      layout: "full",
      tilt: 0,
    },
    {
      id: 2,
      label: "MEMORY 02",
      type: "video",
      media: "/media/video1.mp4",
      caption: "[MEMORY_CAPTION_02]",
      date: "",
      text: "Some memories still feel like yesterday.",
      layout: "polaroid",
      tilt: -3,
    },
    {
      id: 3,
      label: "MEMORY 03",
      type: "photo",
      media: "/media/photo2.jpg",
      caption: "[MEMORY_CAPTION_03]",
      date: "An ordinary evening",
      text: "And some people make every ordinary moment special.",
      layout: "side",
      tilt: 2,
    },
    {
      id: 4,
      label: "MEMORY 04",
      type: "photo",
      media: "/media/photo3.jpg",
      caption: "[MEMORY_CAPTION_04]",
      date: "",
      text: "Laughter that stays long after the night ends.",
      layout: "polaroid",
      tilt: -2,
    },
    {
      id: 5,
      label: "MEMORY 05",
      type: "photo",
      media: "/media/photo4.jpg",
      caption: "[MEMORY_CAPTION_05]",
      date: "A quiet kind of magic",
      text: "Not every chapter needs words. Some just need you.",
      layout: "full",
      tilt: 0,
    },
  ],

  questions: [
    {
      question: "[QUESTION_01] What always makes her smile?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 1,
      correctMessage: "Okay, you actually know this 😌",
      incorrectMessage: "Close… but not quite.",
    },
    {
      question: "[QUESTION_02] Her favorite kind of evening?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 0,
      correctMessage: "You remembered ✨",
      incorrectMessage: "Hmm… try thinking softer.",
    },
    {
      question: "[QUESTION_03] What would she never say no to?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 2,
      correctMessage: "Nailed it.",
      incorrectMessage: "Nice try 😌",
    },
    {
      question: "[QUESTION_04] A little secret about her?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 3,
      correctMessage: "You really do know her.",
      incorrectMessage: "Think a little deeper…",
    },
  ],

  emotionalMessages: [
    "You make people feel at home.",
    "Your presence makes ordinary days better.",
    "You bring your own kind of warmth into the family.",
    "Some people become family by relation. Some become family by heart.",
    "You notice the small things — and that changes everything.",
    "The room feels softer when you're in it.",
    "Thank you for being you.",
  ],

  gifts: [
    {
      id: 1,
      title: "[GIFT_01]",
      description: "A surprise waiting for you",
      reveal: "YOUR GIFT MESSAGE — something thoughtful and personal.",
    },
    {
      id: 2,
      title: "[GIFT_02]",
      description: "Wrapped in quiet intention",
      reveal: "YOUR GIFT MESSAGE — a wish for joy that lasts.",
    },
    {
      id: 3,
      title: "[GIFT_03]",
      description: "A little luxury for later",
      reveal: "YOUR GIFT MESSAGE — something she'll smile about.",
    },
    {
      id: 4,
      title: "[GIFT_04]",
      description: "Soft, sweet, unexpected",
      reveal: "YOUR GIFT MESSAGE — a treat made for her.",
    },
    {
      id: 5,
      title: "[GIFT_05]",
      description: "An experience, not a thing",
      reveal: "YOUR GIFT MESSAGE — a moment to share together.",
    },
    {
      id: 6,
      title: "[GIFT_06]",
      description: "Kept just for this day",
      reveal: "YOUR GIFT MESSAGE — something chosen with care.",
    },
    {
      id: 7,
      title: "[GIFT_07]",
      description: "A promise of celebration",
      reveal: "YOUR GIFT MESSAGE — dinner, dessert, or delight.",
    },
    {
      id: 8,
      title: "[GIFT_08]",
      description: "For the quiet nights",
      reveal: "YOUR GIFT MESSAGE — comfort wrapped in kindness.",
    },
    {
      id: 9,
      title: "[GIFT_09]",
      description: "The one she didn't ask for",
      reveal: "YOUR GIFT MESSAGE — because she deserves it anyway.",
    },
  ],

  finalMedia: {
    type: "photo",
    src: "/media/final-photo.jpg",
    alt: "A meaningful moment",
  },

  easterEgg: {
    message:
      "Okay… you found something you weren't supposed to find 👀",
    secretMessage:
      "[SECRET_MESSAGE] — a family joke, a funny memory, or something only she would understand.",
    photo: "/media/easter-photo.jpg",
    video: "/media/easter-video.mp4",
  },

  wrongPasswordMessages: [
    "Not quite…",
    "Nice try 😌",
    "Think a little deeper…",
    "Almost… but not yet.",
  ],
};
