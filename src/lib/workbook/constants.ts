export type DayMode = "solo" | "couple" | "couple_integration" | "solo_tool" | "couple_finale" | "couple_or_solo";

export type FieldType = "write_line" | "write_box" | "sentence_template" | "checkbox_group";

export interface ExerciseFieldBase {
  key: string;
  prompt: string;
  placeholder?: string;
  tall?: boolean;
}

export interface WriteLineField extends ExerciseFieldBase {
  type: "write_line";
}

export interface WriteBoxField extends ExerciseFieldBase {
  type: "write_box";
}

export interface SentenceTemplateField extends ExerciseFieldBase {
  type: "sentence_template";
}

export interface CheckboxGroupField extends ExerciseFieldBase {
  type: "checkbox_group";
  options: string[];
  suggestSingle?: boolean;
}

export type ExerciseField = WriteLineField | WriteBoxField | SentenceTemplateField | CheckboxGroupField;

export interface DayConfig {
  day: number;
  week: number;
  title: string;
  mode: DayMode;
  intro: string;
  whyItMatters?: string;
  exercises: ExerciseField[];
  soloNote?: string;
  prayer?: string;
  checkinAtStart?: boolean;
  checkinAtEnd?: boolean;
}

export const WEEKS = [
  { number: 1, name: "Notice", theme: "Notice" },
  { number: 2, name: "Speak", theme: "Speak" },
  { number: 3, name: "Trust", theme: "Trust" },
  { number: 4, name: "Reconnect", theme: "Reconnect" },
] as const;

export const CHECKIN_CHECKPOINTS = [0, 7, 14, 21, 30] as const;

export const REPAIR_SCRIPT_LINES = [
  {
    line: "Can we start over?",
    when: "The moment your voice sharpens.",
  },
  {
    line: "I think I said that wrong — let me try again.",
    when: "Right after you hear yourself land harder than you meant to.",
  },
  {
    line: "I'm not trying to win this. I'm trying to understand you.",
    when: "When it starts feeling like a debate.",
  },
  {
    line: "Can you say more about what that felt like for you?",
    when: "When your instinct is to defend instead of listen.",
  },
  {
    line: "I need five minutes before I can talk about this calmly.",
    when: "Name an actual time, then come back at it.",
  },
  {
    line: "You're more important to me than being right about this.",
    when: "When the topic is small but the tension isn't.",
  },
] as const;

export const REPAIR_SCRIPT_PROMPTS = [
  "Which line felt hardest to say out loud?",
  "When could you realistically use one of these this week?",
] as const;

export const MICRO_HABITS = [
  {
    key: "six_second_kiss",
    label: "The six-second kiss",
    desc: "A kiss long enough to actually feel something.",
  },
  {
    key: "welcome_home",
    label: "The welcome-home routine",
    desc: "The first sixty seconds when you see each other.",
  },
  {
    key: "daily_map",
    label: "The daily map question",
    desc: "\"What does the rest of your day look like?\"",
  },
  {
    key: "stress_ten",
    label: "The stress-reducing ten",
    desc: "Ten minutes of undistracted conversation about your day.",
  },
  {
    key: "spoken_appreciation",
    label: "One spoken appreciation",
    desc: "Say one specific thing you're grateful for.",
  },
  {
    key: "kept_promise",
    label: "The kept-promise note",
    desc: "Leave a note about a small promise you kept.",
  },
  {
    key: "tech_free_dinner",
    label: "Tech-free dinner",
    desc: "Phones away for one meal together.",
  },
  {
    key: "bedtime_gratitude",
    label: "Bedtime gratitude",
    desc: "Share one thing you're grateful for before sleep.",
  },
] as const;

export const DAYS: DayConfig[] = [
  // ── WEEK 1: NOTICE ─────────────────────────────────────────────
  {
    day: 1,
    week: 1,
    title: "Name the Distance",
    mode: "couple_or_solo",
    intro:
      "If you did the Check-In Card last night, you've already started. If not, do it now — it takes five minutes and it's the whole reason today counts as a win.",
    whyItMatters:
      "Naming a feeling out loud, even just to yourselves on paper, changes it.",
    exercises: [
      {
        key: "q1",
        type: "write_box",
        prompt:
          "Read back what you wrote on the Check-In Card. Does anything surprise you?",
      },
      {
        key: "q2",
        type: "sentence_template",
        prompt: "Without blaming anyone, finish this sentence:",
        placeholder:
          "Lately, our marriage has felt more like ____ than a partnership.",
      },
    ],
    soloNote:
      "If you're doing this solo today, that's completely fine. Your answers are for you.",
    checkinAtStart: true,
  },
  {
    day: 2,
    week: 1,
    title: "Where the Roommates Began",
    mode: "solo",
    intro:
      "Nobody wakes up one day and decides to stop talking. Roommate distance builds from a hundred small trades — one conversation skipped, one laugh saved for someone else, one sigh you stopped explaining.",
    exercises: [
      {
        key: "q1",
        type: "write_box",
        prompt:
          "When did your conversations shift from connection to logistics? What was happening around that time?",
      },
      {
        key: "q2",
        type: "write_box",
        prompt:
          "In two minutes or less, tell the story of how you went from partners to roommates — and finish with a sentence about what you wish you could say.",
      },
    ],
    soloNote:
      "You're the only one answering today. Write what's true, not what sounds good.",
  },
  {
    day: 3,
    week: 1,
    title: "The Bid You Almost Missed",
    mode: "solo",
    intro:
      "John Gottman's research shows that couples who thrive aren't the ones who never fight — they're the ones who catch each other's bids. A bid is anything small: a sigh, a comment about a bird outside, a pause that invites conversation. How you respond to those tiny moments predicts the health of a relationship better than any grand gesture.",
    exercises: [
      {
        key: "q1",
        type: "write_box",
        prompt:
          "Recall a recent bid you missed — a moment your spouse reached out (even subtly) and you didn't notice or didn't respond. What happened?",
      },
      {
        key: "q2",
        type: "sentence_template",
        prompt: "Finish this sentence:",
        placeholder: "I think I missed a bid when ____.",
      },
    ],
    soloNote:
      "Remember: noticing is not the same as fixing. You don't need to solve anything today. Just notice.",
  },
  {
    day: 4,
    week: 1,
    title: "What Am I Actually Longing For?",
    mode: "solo",
    intro:
      "Underneath every complaint in a marriage is a longing. \"You never listen\" usually means \"I need to feel heard.\" \"You never plan anything\" often means \"I need to feel chosen.\" When you can name the longing, the complaint loses its teeth.",
    exercises: [
      {
        key: "q1",
        type: "write_box",
        tall: true,
        prompt:
          "What are you actually longing for in your marriage right now? Not what's wrong — what you wish was there.",
      },
      {
        key: "q2",
        type: "sentence_template",
        prompt: "Finish this sentence:",
        placeholder: "What I'm really longing for is ____.",
      },
    ],
    soloNote:
      "This one's quiet work. Let yourself want something without having to justify it.",
  },
  {
    day: 5,
    week: 1,
    title: "The Story I've Been Telling Myself",
    mode: "solo",
    intro:
      "We all carry private narratives about our marriages. Stories we've never said out loud. Some are true. Some are old. Some are just scared. But they run the show until you write them down and look at them honestly.",
    exercises: [
      {
        key: "q1",
        type: "write_box",
        tall: true,
        prompt:
          "What is the private story you've been telling yourself about your marriage? Write it like you're telling a friend — the whole version.",
      },
      {
        key: "q2",
        type: "write_box",
        tall: true,
        prompt:
          "Now rewrite that story with one gentler assumption about your spouse. You don't have to believe it yet. Just try it on.",
      },
    ],
    soloNote:
      "This is between you and the page. No one needs to see this.",
  },
  {
    day: 6,
    week: 1,
    title: "A Small Turn Toward",
    mode: "couple",
    intro:
      "Notice week isn't about a grand revelation. It's about one concrete turn — one moment where you notice your spouse and choose to move toward them instead of away.",
    exercises: [
      {
        key: "q1",
        type: "write_box",
        prompt:
          "What is one specific bid or moment you're going to notice this week? Describe it as if you're telling yourself what to watch for.",
      },
      {
        key: "q2",
        type: "write_line",
        prompt:
          "What's one signal you can give each other that means \"turn toward me\"?",
      },
    ],
    soloNote:
      "If you're doing this alone today, your \"turn toward\" might be toward yourself. That counts.",
  },
  {
    day: 7,
    week: 1,
    title: "What Notice Week Showed Us",
    mode: "couple_integration",
    intro:
      "You've been noticing for seven days. Some of it probably surprised you. Some of it probably confirmed what you already knew. Now it's time to take stock — not to judge, but to see clearly.",
    exercises: [
      {
        key: "q1",
        type: "write_box",
        prompt:
          "Share one thing you noticed this week — about yourself, your spouse, or your marriage. What did you see that you hadn't before?",
      },
      {
        key: "q2",
        type: "write_box",
        prompt:
          "Compare your Check-In Card from Day 1 to how you feel today. What shifted?",
      },
    ],
    soloNote:
      "If you're reflecting solo, you can compare your own answers from the beginning of the week to now.",
    checkinAtEnd: true,
  },

  // ── WEEK 2: SPEAK ──────────────────────────────────────────────
  {
    day: 8,
    week: 2,
    title: "Why Words Got Hard",
    mode: "solo",
    intro:
      "Most couples don't stop talking because they don't care. They stop talking because talking started to feel risky. Every sharp exchange teaches you to say less. Every shutdown teaches you to need less. But underneath the silence, the need to be understood never leaves.",
    exercises: [
      {
        key: "q1",
        type: "write_line",
        prompt:
          "When things get hard between you, what is your stress pattern? Do you withdraw, get louder, shut down, or shut the other person out?",
      },
      {
        key: "q2",
        type: "write_line",
        prompt:
          "What do you think your spouse's stress pattern is? What does it look like from the outside?",
      },
    ],
    soloNote:
      "Knowing your pattern is the first step to choosing a different one. Don't judge it — just name it.",
  },
  {
    day: 9,
    week: 2,
    title: "Reacting vs. Repairing",
    mode: "solo",
    intro:
      "The Gottman Institute found that the number of arguments a couple has barely matters. What matters is repair — the attempt to de-escalate. A joke, a touch, a pause, an apology mid-fight. These small repair attempts are what separate couples who fight well from couples who fight destructively.",
    exercises: [
      {
        key: "q1",
        type: "write_box",
        prompt:
          "Think of a recent disagreement. Was there a repair attempt? What did it look like — or what would one have sounded like?",
      },
      {
        key: "q2",
        type: "write_box",
        prompt:
          "If you were going to try one repair line in your next disagreement, what would it be and why?",
      },
    ],
    soloNote:
      "Repair is a skill, not a personality trait. You can learn it even if it's never been modeled for you.",
  },
  {
    day: 10,
    week: 2,
    title: "Naming What's Underneath",
    mode: "solo",
    intro:
      "Every complaint hides a softer feeling underneath. \"You never help\" might hide loneliness. \"You're always on your phone\" might hide a fear of not being enough. When you can name the softer feeling, your spouse hears it differently — and so do you.",
    exercises: [
      {
        key: "q1",
        type: "write_box",
        prompt:
          "What is one sharp complaint you've been carrying? Write the unfiltered version.",
      },
      {
        key: "q2",
        type: "write_box",
        prompt:
          "Now try to write it as a softer feeling. Start with \"When ____, I feel ____.\"",
      },
    ],
    soloNote:
      "You're not excusing anything. You're just getting underneath it so it can actually be heard.",
  },
  {
    day: 11,
    week: 2,
    title: "The Communication Repair Script",
    mode: "solo_tool",
    intro:
      "There are six lines that can stop a fight before it starts. They're not magic. They're just honest. Pick the one that feels hardest for you — that's probably the one you need most.",
    exercises: [
      {
        key: "hardest_line",
        type: "checkbox_group",
        prompt:
          "Which line would be hardest for you to say out loud? Select all that apply.",
        options: [
          "Can we start over?",
          "I think I said that wrong — let me try again.",
          "I'm not trying to win this. I'm trying to understand you.",
          "Can you say more about what that felt like for you?",
          "I need five minutes before I can talk about this calmly.",
          "You're more important to me than being right about this.",
        ],
      },
    ],
    soloNote:
      "If none of these feel natural yet, that's normal. They're meant to be practiced, not performed.",
  },
  {
    day: 12,
    week: 2,
    title: "Practicing the Script",
    mode: "couple",
    intro:
      "Now that you've picked your line, practice it. Not in the middle of a fight — that's too late. Practice it now, in a calm moment, so it's available when you need it.",
    exercises: [
      {
        key: "q1",
        type: "write_line",
        prompt:
          "What's a low-stakes area of friction you could practice with this week?",
      },
      {
        key: "q2",
        type: "write_line",
        prompt:
          "Which repair line are you going to try, and when?",
      },
      {
        key: "q3",
        type: "write_box",
        prompt:
          "After trying it: did it feel natural or stiff? What happened?",
      },
    ],
    soloNote:
      "Even if you're practicing alone right now, imagining the moment still rewires your reflexes.",
  },
  {
    day: 13,
    week: 2,
    title: "When Honesty Feels Risky",
    mode: "solo",
    intro:
      "Sometimes the hardest thing to say isn't the sharpest thing. It's the truest thing. The thing you've been holding back because you're afraid of what it will do. But silence doesn't protect a marriage — it just delays the cost.",
    exercises: [
      {
        key: "q1",
        type: "write_box",
        tall: true,
        prompt:
          "What is one thing you've been holding back from your spouse? Not the nuclear version — the honest one.",
      },
      {
        key: "q2",
        type: "write_line",
        prompt:
          "What's the fear underneath that silence? What are you afraid will happen if you say it?",
      },
    ],
    soloNote:
      "You don't have to say it out loud yet. Writing it is already a risk — and a brave one.",
    prayer:
      "God, give me courage to speak truthfully and grace to hear what my spouse needs to say. Let honesty be the bridge, not the weapon.",
  },
  {
    day: 14,
    week: 2,
    title: "Speak Week Recap",
    mode: "couple_integration",
    intro:
      "Two weeks in. Some of what you've practiced probably felt awkward. Some of it probably felt like relief. Either way, you're still here — and that matters more than getting it perfect.",
    exercises: [
      {
        key: "q1",
        type: "write_box",
        prompt:
          "Which repair lines are actually working for you? Which ones still feel forced?",
      },
      {
        key: "q2",
        type: "write_box",
        prompt:
          "Compare your Check-In Card from two weeks ago to how you feel today. What's different?",
      },
    ],
    soloNote:
      "If you're here alone, you're still building these skills. One day you'll use them with your spouse.",
    checkinAtEnd: true,
  },

  // ── WEEK 3: TRUST ──────────────────────────────────────────────
  {
    day: 15,
    week: 3,
    title: "Trust Is Built in Seconds, Not Speeches",
    mode: "solo",
    intro:
      "Trust doesn't come from a single dramatic moment. It comes from thousands of tiny ones — a greeting, a kept promise, a moment of attention. The small things are the big things.",
    exercises: [
      {
        key: "q1",
        type: "write_box",
        prompt:
          "What is one small ritual you used to have that you've lost? Describe it.",
      },
      {
        key: "q2",
        type: "write_line",
        prompt:
          "What made that ritual work? Why did it matter?",
      },
    ],
    soloNote:
      "Trust isn't about grand gestures. It's about consistency. And consistency starts with noticing what you've let slide.",
    prayer:
      "God, help me see the small moments for what they are — the foundation of something worth protecting. Give me the discipline to show up in the tiny things.",
  },
  {
    day: 16,
    week: 3,
    title: "Pick One Ritual",
    mode: "solo",
    intro:
      "You can't rebuild everything at once. And trying to will exhaust you. Pick one small ritual. Just one. The one that would make the biggest difference if it came back.",
    exercises: [
      {
        key: "q1",
        type: "checkbox_group",
        prompt:
          "Which one ritual would make the biggest difference if you brought it back?",
        options: [
          "A real greeting at reunion",
          "A genuine 'how was your day'",
          "A moment of gratitude before sleep",
        ],
      },
      {
        key: "q2",
        type: "write_line",
        prompt:
          "What has gotten in the way of this ritual? What's the real obstacle?",
      },
    ],
    soloNote:
      "Narrowing your focus isn't weakness. It's wisdom.",
  },
  {
    day: 17,
    week: 3,
    title: "The Kept Promise",
    mode: "solo",
    intro:
      "Every small promise kept is a deposit in the trust account. Every small promise broken is a withdrawal. You probably can't remember the last time a promise felt truly important — and that's the problem.",
    exercises: [
      {
        key: "q1",
        type: "write_box",
        prompt:
          "Think of one small promise you kept recently — something you said you'd do, and did. How did it feel?",
      },
      {
        key: "q2",
        type: "write_box",
        prompt:
          "Think of one small promise you didn't keep. What happened? What would it take to follow through next time?",
      },
    ],
    soloNote:
      "Keeping promises isn't about perfection. It's about showing your spouse — and yourself — that your word means something.",
  },
  {
    day: 18,
    week: 3,
    title: "Trust as a Daily Deposit",
    mode: "solo",
    intro:
      "Think of trust as a bank account. Every kept promise, every moment of attention, every small act of care is a deposit. Every broken promise, every distraction, every withdrawal is a withdrawal. The balance matters more than any single transaction.",
    exercises: [
      {
        key: "q1",
        type: "write_box",
        prompt:
          "What is one thing you could do today — even something very small — that would be a deposit in your spouse's trust account?",
      },
      {
        key: "q2",
        type: "write_box",
        prompt:
          "What is one thing your spouse does that feels like a deposit to you?",
      },
    ],
    soloNote:
      "Trust is built in moments, not milestones. Start with today.",
    prayer:
      "God, teach me to be a person whose word is steady. Let my daily choices build something my spouse can count on.",
  },
  {
    day: 19,
    week: 3,
    title: "The Trust Micro-Habits Menu",
    mode: "solo_tool",
    intro:
      "You don't need a personality overhaul. You need one small habit, practiced consistently. Pick the one that speaks to you right now. You can always change later.",
    exercises: [
      {
        key: "chosen_habit",
        type: "checkbox_group",
        prompt:
          "Which micro-habit do you want to practice this week?",
        options: [
          "The six-second kiss",
          "The welcome-home routine",
          "The daily map question",
          "The stress-reducing ten",
          "One spoken appreciation",
          "The kept-promise note",
          "Tech-free dinner",
          "Bedtime gratitude",
        ],
      },
      {
        key: "why_habit",
        type: "write_line",
        prompt:
          "Why did this one stand out to you?",
      },
    ],
    soloNote:
      "Even if you're practicing alone, you're changing the rhythm of the relationship.",
  },
  {
    day: 20,
    week: 3,
    title: "Practicing the Ritual",
    mode: "couple",
    intro:
      "You picked your micro-habit. You picked your ritual. Now it's time to do it. Not perfectly. Just actually.",
    exercises: [
      {
        key: "q1",
        type: "write_line",
        prompt:
          "Did you practice your ritual today? What happened?",
      },
      {
        key: "q2",
        type: "write_box",
        prompt:
          "How did it feel — for you? For them? What did you notice?",
      },
    ],
    soloNote:
      "If you're practicing solo, you can still observe the shift. Trust starts inside you.",
  },
  {
    day: 21,
    week: 3,
    title: "Trust Week Recap",
    mode: "couple_integration",
    intro:
      "Three weeks in. Some habits are sticking. Some aren't. That's not failure — that's information. What's working? What needs adjusting?",
    exercises: [
      {
        key: "q1",
        type: "write_box",
        prompt:
          "Is your chosen ritual or micro-habit sticking? What's getting in the way?",
      },
      {
        key: "q2",
        type: "write_box",
        prompt:
          "Compare your Check-In Card from three weeks ago to today. What has shifted in how you trust each other?",
      },
    ],
    soloNote:
      "Three weeks is long enough to see a pattern. Short enough to adjust. Use this moment wisely.",
    prayer:
      "God, thank you for the progress I can see. Give me patience for the parts that aren't fixed yet. Help me trust the process.",
    checkinAtEnd: true,
  },

  // ── WEEK 4: RECONNECT ──────────────────────────────────────────
  {
    day: 22,
    week: 4,
    title: "What's Different Now",
    mode: "solo",
    intro:
      "By now you have enough Check-In Cards to compare. Lay them out. Look at them side by side. Some of the shifts will be obvious. Some will be quiet. Both matter.",
    exercises: [
      {
        key: "q1",
        type: "write_box",
        prompt:
          "What is one real shift you can see in yourself or your marriage over the past three weeks?",
      },
      {
        key: "q2",
        type: "write_box",
        prompt:
          "What hasn't changed yet? What are you still waiting on?",
      },
    ],
    soloNote:
      "Naming what hasn't changed isn't failure. It's focus.",
  },
  {
    day: 23,
    week: 4,
    title: "The Both/And",
    mode: "solo",
    intro:
      "These tools aren't a finished product. They're a starting point. You're going to have setbacks. Old patterns will resurface. That's not evidence that nothing worked — it's proof that you're human.",
    exercises: [
      {
        key: "q1",
        type: "write_box",
        prompt:
          "What is one old pattern that might resurface when this workbook is done? How will you recognize it?",
      },
      {
        key: "q2",
        type: "write_box",
        prompt:
          "When that pattern shows up, what's one tool from this workbook you'd reach for first?",
      },
    ],
    soloNote:
      "Knowing your own patterns is half the battle. The other half is choosing differently when they show up.",
  },
  {
    day: 24,
    week: 4,
    title: "A Letter Begins",
    mode: "solo",
    intro:
      "Today you start drafting your recommitment letter. This isn't the final version — it's the raw material. Write about what you noticed. What you appreciate. What you're choosing. Let it be imperfect. Let it be true.",
    exercises: [
      {
        key: "q1",
        type: "write_box",
        tall: true,
        prompt:
          "What have you noticed about \"us\" over these 30 days?",
      },
      {
        key: "q2",
        type: "write_box",
        tall: true,
        prompt:
          "What is one appreciation you don't say enough?",
      },
      {
        key: "q3",
        type: "write_box",
        tall: true,
        prompt:
          "What are you choosing, going forward? What do you want your marriage to look like?",
      },
    ],
    soloNote:
      "You're not writing the final version today. You're writing the one that's honest. That's enough.",
  },
  {
    day: 25,
    week: 4,
    title: "What This Has Shaped in You",
    mode: "solo",
    intro:
      "Marriage doesn't just change a relationship. It changes the people in it. Some of that change is the kind you'd choose. Some of it is the kind that chose you. Both are worth naming.",
    exercises: [
      {
        key: "q1",
        type: "write_box",
        tall: true,
        prompt:
          "How has your marriage shaped you? Where has it made you more patient, more honest, more loving — or where has it stretched you in ways you didn't expect?",
      },
    ],
    soloNote:
      "This is a reflection, not a scorecard. You don't need to grade yourself. Just look at what's there.",
    prayer:
      "God, thank you for the ways this marriage has shaped me — even the hard ways. Help me carry what I've learned into the next season with grace.",
  },
  {
    day: 26,
    week: 4,
    title: "The Final Approach",
    mode: "solo",
    intro:
      "One word for this month. Just one. It might be hope, or tired, or ready, or grateful. Whatever it is — it's yours.",
    exercises: [
      {
        key: "q1",
        type: "write_line",
        prompt: "What is your one word for this month?",
      },
    ],
    soloNote:
      "There's no wrong answer. Just the true one.",
  },
  {
    day: 27,
    week: 4,
    title: "The Final Approach",
    mode: "solo",
    intro:
      "One thing you're proud of, about how you showed up these 30 days.",
    exercises: [
      {
        key: "q1",
        type: "write_box",
        prompt:
          "What is one thing you're proud of — about how you showed up these 30 days?",
      },
    ],
    soloNote:
      "Pride isn't arrogance. It's acknowledgment. You did something hard.",
  },
  {
    day: 28,
    week: 4,
    title: "The Final Approach",
    mode: "solo",
    intro:
      "One thing you're choosing to forgive — in your spouse, or in yourself.",
    exercises: [
      {
        key: "q1",
        type: "write_box",
        prompt:
          "What is one thing you're choosing to forgive — in your spouse, or in yourself?",
      },
    ],
    soloNote:
      "Forgiveness is not agreement. It's release. You don't have to forget. You just have to put it down.",
  },
  {
    day: 29,
    week: 4,
    title: "The Final Approach",
    mode: "solo",
    intro:
      "One thing you're choosing, going into tomorrow.",
    exercises: [
      {
        key: "q1",
        type: "write_line",
        prompt: "What is one thing you're choosing, going into tomorrow?",
      },
    ],
    soloNote:
      "Tomorrow is Day 30. You've done the work to get here. Now you get to choose what comes next.",
  },
  {
    day: 30,
    week: 4,
    title: "The Recommitment Ceremony",
    mode: "couple_finale",
    intro:
      "This is the day. Take ten quiet minutes together. No officiant needed. No audience. Just the two of you, and four honest sentences. Read them to each other. Look at each other. Let it land.",
    exercises: [
      {
        key: "q1",
        type: "sentence_template",
        prompt: "Read this aloud to each other:",
        placeholder: "In the next season, I choose to notice ____.",
      },
      {
        key: "q2",
        type: "sentence_template",
        prompt: "Read this aloud to each other:",
        placeholder:
          "In the next season, I choose to speak ____, even when it's hard.",
      },
      {
        key: "q3",
        type: "sentence_template",
        prompt: "Read this aloud to each other:",
        placeholder:
          "In the next season, I choose to protect our ritual of ____.",
      },
      {
        key: "q4",
        type: "write_line",
        prompt: "Beyond Day 30, the one thing I'll keep is:",
      },
    ],
    soloNote:
      "If you're here alone, you can still make these commitments — to yourself, to your future, to the marriage you're building toward. You are not less brave for doing this alone.",
  },
];

export function getDayByNumber(n: number): DayConfig | undefined {
  return DAYS.find((d) => d.day === n);
}

export function getDaysByWeek(week: number): DayConfig[] {
  return DAYS.filter((d) => d.week === week);
}
