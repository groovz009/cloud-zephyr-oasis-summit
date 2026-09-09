import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public/print");
const img = "../workbook/images";
mkdirSync(outDir, { recursive: true });

const DISC =
  "The Marriage Reset is an educational workbook. It is not therapy, counseling, or medical advice, and it is not a substitute for professional help. Results vary from couple to couple. If you are in crisis or danger, contact local emergency services.";

function footer(n) {
  return `<div class="footer">
    <div>
      <div>The Marriage Reset | Grace and Harmony Press</div>
      <div class="disc">${DISC}</div>
    </div>
    <div class="num">${n}</div>
  </div>`;
}

function page(n, inner, { photo, photoPos } = {}) {
  const photoHtml = photo
    ? `<div class="photo-band"><img src="${img}/${photo.replace('.jpg','-band.jpg')}" alt=""></div>`
    : "";
  const cls = photo ? "inner with-photo" : "inner";
  return `<section class="page" id="p${n}">
  <div class="${cls}">
    ${photoHtml}
    ${inner}
  </div>
  ${footer(n)}
</section>`;
}

const pages = [];

pages.push(`<section class="page cover-page" id="p1">
  <img src="${img}/cover.png" alt="The Marriage Reset">
</section>`);

pages.push(
  page(
    2,
    `<p class="kicker">Contents</p>
    <h1 class="doc-title">The path back</h1>
    <div class="gold-rule"></div>
    <p class="lede">Thirty days. Four weeks. One practice at a time.</p>
    <div class="toc-section">Front matter</div>
    <div class="toc-row"><span>Cover</span><span class="pg">1</span></div>
    <div class="toc-row"><span>Contents</span><span class="pg">2</span></div>
    <div class="toc-row"><span>Welcome and how this reset works</span><span class="pg">3</span></div>
    <div class="toc-section">Week 1 · Notice</div>
    <div class="toc-row"><span>Day 1 — Name the Distance</span><span class="pg">4</span></div>
    <div class="toc-row"><span>Day 2 — Where the Roommates Began</span><span class="pg">5</span></div>
    <div class="toc-row"><span>Day 3 — The Bid You Almost Missed</span><span class="pg">6</span></div>
    <div class="toc-row"><span>Day 4 — What Am I Actually Longing For?</span><span class="pg">7</span></div>
    <div class="toc-row"><span>Day 5 — The Story I Have Been Telling Myself</span><span class="pg">8</span></div>
    <div class="toc-row"><span>Day 6 — A Small Turn Toward</span><span class="pg">9</span></div>
    <div class="toc-row"><span>Day 7 — What Notice Week Showed Us</span><span class="pg">10</span></div>
    <div class="toc-section">Week 2 · Speak</div>
    <div class="toc-row"><span>Day 8 — Why Words Got Hard</span><span class="pg">11</span></div>
    <div class="toc-row"><span>Day 9 — Reacting vs. Repairing</span><span class="pg">12</span></div>
    <div class="toc-row"><span>Day 10 — Naming What Is Underneath</span><span class="pg">13</span></div>
    <div class="toc-row"><span>Day 11 — The Communication Repair Script</span><span class="pg">14</span></div>
    <div class="toc-row"><span>Day 12 — Practicing the Script</span><span class="pg">15</span></div>
    <div class="toc-row"><span>Day 13 — When Honesty Feels Risky</span><span class="pg">16</span></div>
    <div class="toc-row"><span>Day 14 — Speak Week Recap</span><span class="pg">17</span></div>
    <div class="toc-section">Week 3 · Trust</div>
    <div class="toc-row"><span>Day 15 — Trust Is Built in Seconds, Not Speeches</span><span class="pg">18</span></div>
    <div class="toc-row"><span>Day 16 — Pick One Ritual</span><span class="pg">19</span></div>
    <div class="toc-row"><span>Day 17 — The Kept Promise</span><span class="pg">20</span></div>
    <div class="toc-row"><span>Day 18 — Trust as a Daily Deposit</span><span class="pg">21</span></div>
    <div class="toc-row"><span>Day 19 — The Trust Micro-Habits Menu</span><span class="pg">22</span></div>
    <div class="toc-row"><span>Day 20 — Practicing the Ritual</span><span class="pg">23</span></div>
    <div class="toc-row"><span>Day 21 — Trust Week Recap</span><span class="pg">24</span></div>
    <div class="toc-section">Week 4 · Reconnect</div>
    <div class="toc-row"><span>Day 22 — What Is Different Now</span><span class="pg">25</span></div>
    <div class="toc-row"><span>Day 23 — The Both/And</span><span class="pg">26</span></div>
    <div class="toc-row"><span>Day 24 — A Letter Begins</span><span class="pg">27</span></div>
    <div class="toc-row"><span>Day 25 — What This Has Shaped in You</span><span class="pg">28</span></div>
    <div class="toc-row"><span>Days 26-29 — The Final Approach</span><span class="pg">29</span></div>
    <div class="toc-row"><span>Day 30 — The Recommitment Ceremony</span><span class="pg">30</span></div>
    <p class="small mt">Four bonus documents ship as separate printables: the Repair Script, Recommitment Letter, 30 Nights of Prayer, and Weekly Check-In Card.</p>`
  )
);

pages.push(
  page(
    3,
    `<p class="kicker">Welcome</p>
    <h1 class="doc-title">You became roommates.</h1>
    <p class="lede">You still love each other. The conversations got shorter. The silences got longer. You did not fall out of love. You drifted. The gap is not love lost. It is practice lost.</p>
    <p>Most couples do not lose each other because they stopped caring. They lose each other because they stopped practicing the small things that kept them close: noticing each other, speaking honestly, following through on small promises. That is a smaller problem to solve than it feels like from inside it.</p>
    <h3>What the next 30 days actually are</h3>
    <p>This is a structured daily reset - not a crisis intervention, and not a program for recovering from an affair. If that is what you are facing, see a licensed counselor first. This workbook is not built for that weight. If you are already in counseling, this sits alongside that work, or as a first small step before it - not instead of it.</p>
    <p>Each day takes about ten minutes. Most weeks include two short <em>Couple</em> sessions; everything else is solo. If your spouse is not ready to open a workbook yet, you can still start tonight.</p>
    <p><strong>Faith is an invitation, never a requirement.</strong> Skip any prayer line. The practical work stands on its own.</p>
    <div class="callout">
      <h3>Please read this</h3>
      <p>${DISC}</p>
    </div>
    <h3>The rhythm</h3>
    <p><strong>Week 1 - Notice.</strong> See where the distance shows up. &nbsp; <strong>Week 2 - Speak.</strong> Reopen the conversation, safely. &nbsp; <strong>Week 3 - Trust.</strong> Rebuild it in small actions. &nbsp; <strong>Week 4 - Reconnect.</strong> Choose each other again, out loud.</p>
    <h3>Tonight, before Day 1</h3>
    <p>Sit down together for five minutes (or alone) with the Weekly Check-In Card:</p>
    <ol style="margin:0 0 0.1in 0.2in;font-size:11pt;line-height:1.5">
      <li>How are we, really?</li>
      <li>What do we need right now?</li>
      <li>What is one small next step?</li>
    </ol>
    <p>Write the answers where you will find them again. You will compare them on Day 30. That is tonight's whole task.</p>`
  )
);

pages.push(
  page(
    4,
    `<p class="kicker">Week 1 · Notice</p>
    <h1 class="week-title">Notice</h1>
    <p class="lede">This week is observation - where the distance shows up, and what you are quietly longing for underneath it.</p>
    <div class="meta"><span class="chip">Couple or Solo</span><span>Day 1 · Quick Win</span></div>
    <h2 class="day-title">Name the Distance</h2>
    <p>If you did the Check-In Card last night, you have already started. If not, do it now - five minutes, and today counts as a win.</p>
    <h3>Why this matters</h3>
    <p>Naming a feeling out loud, even just on paper, changes it. "We're drifting" stops being a vague dread and starts being something you can work on, one Tuesday at a time.</p>
    <h3>Today's reflection</h3>
    <ul>
      <li>Read back what you wrote on the Check-In Card. Does anything surprise you?</li>
      <li>Without blaming anyone, finish this sentence:</li>
    </ul>
    <p class="small">Lately, our marriage has felt more like</p>
    <div class="write-line"></div>
    <p class="small">than a partnership.</p>
    <p class="solo">If you are starting this alone: answer both questions for yourself. Noticing is never something you can get wrong.</p>
    <p class="prayer">If it helps: a short prayer of thanks for even this small first step is a good way to close today.</p>`,
    { photo: "week-1.jpg", photoPos: "18%" }
  )
);

pages.push(
  page(
    5,
    `<div class="meta"><span class="chip">Solo</span><span>Week 1 · Day 2</span></div>
    <h2 class="day-title">Where the Roommates Began</h2>
    <p>Roommate distance rarely arrives all at once. It builds from a hundred small trades - a real conversation swapped for a logistics update, again and again, until logistics is most of what is left.</p>
    <h3>Why this matters</h3>
    <p>You cannot undo years of drift in a day, but you can start noticing the exact moment connection gets swapped for scheduling. That is the moment worth protecting next time.</p>
    <h3>Today's reflection</h3>
    <p>Think of one conversation from this past week. Was it about connection, or was it about logistics - schedules, bills, who is picking up the kids?</p>
    <div class="write-box"></div>
    <p>If it was logistics, what might a two-minute version of that same conversation have looked like with one extra, personal sentence added?</p>
    <div class="write-box"></div>
    <p class="solo">If you are starting this alone: you are only tracking your own side of these conversations today. That is enough data to work with.</p>`
  )
);

pages.push(
  page(
    6,
    `<div class="meta"><span class="chip">Solo</span><span>Week 1 · Day 3</span></div>
    <h2 class="day-title">The Bid You Almost Missed</h2>
    <p>Researchers who have spent decades watching how couples actually interact found something surprisingly small mattered most: how partners respond to tiny, everyday bids for attention. A sigh. A comment about the weather. A "hey, look at this." The couples who stayed close were not the ones with no problems. They were the ones who noticed these small bids and turned toward them, again and again.</p>
    <h3>Why this matters</h3>
    <p>You do not need a grand romantic gesture this week. You need to catch one small bid you would otherwise miss.</p>
    <h3>Today's reflection</h3>
    <p>Recall a moment recently when your spouse said something small - a comment, a question, a sigh - and you were distracted, tired, or elsewhere.</p>
    <p class="small">I think I missed a bid when</p>
    <div class="write-box"></div>
    <p class="solo">If you are starting this alone: this is about your own noticing, not your spouse's behavior. You are building the muscle, not scoring anyone.</p>`
  )
);

pages.push(
  page(
    7,
    `<div class="meta"><span class="chip">Solo</span><span>Week 1 · Day 4</span></div>
    <h2 class="day-title">What Am I Actually Longing For?</h2>
    <p>Under almost every complaint about a marriage is a softer, more vulnerable longing that rarely gets said out loud. "You never listen" is often really "I want to feel important to you." "We never do anything" is often really "I miss feeling chosen."</p>
    <h3>Why this matters</h3>
    <p>You cannot ask for what you have not named, even to yourself.</p>
    <h3>Today's reflection</h3>
    <p>Set the complaints aside for a moment. Underneath the frustration, what are you actually longing for - closeness? Being known? Feeling chosen? Partnership?</p>
    <p class="small">What I am really longing for is</p>
    <div class="write-box" style="min-height:1.1in"></div>
    <p class="solo">If you are starting this alone: keep this one private for now if you need to. You will have a safe, structured way to share it in Week 2.</p>`
  )
);

pages.push(
  page(
    8,
    `<div class="meta"><span class="chip">Solo</span><span>Week 1 · Day 5</span></div>
    <h2 class="day-title">The Story I Have Been Telling Myself</h2>
    <p>Every drifting marriage comes with a private narrative running underneath it - "we are just not compatible anymore," "this is just what marriage becomes," "it is too late to fix this." These stories feel like facts. Usually, they are just the loudest interpretation available at 11 p.m. on a hard day.</p>
    <h3>Why this matters</h3>
    <p>The story you tell yourself about your marriage shapes what you are willing to try. A slightly gentler, equally true story opens up more options than a hopeless one does.</p>
    <h3>Today's reflection</h3>
    <p>Write the private story you have been telling yourself - one or two sentences, no editing.</p>
    <div class="write-box"></div>
    <p>Now write one alternative story that is just as true but gentler. (Example: "We are just not compatible" becomes "We used to know how to reach each other, and we can learn that again.")</p>
    <div class="write-box"></div>
    <p class="solo">If you are starting this alone: this exercise works the same either way - you are examining your own story, not predicting your spouse's.</p>`
  )
);

pages.push(
  page(
    9,
    `<div class="meta"><span class="chip">Couple</span><span>Week 1 · Day 6</span></div>
    <h2 class="day-title">A Small Turn Toward</h2>
    <p>Today is about doing something with everything you have noticed this week - one small, concrete turn toward each other.</p>
    <h3>Why this matters</h3>
    <p>You do not need a resolved conversation to start turning toward each other again. You need one small, repeatable moment of attention.</p>
    <h3>Today's session (10 minutes together)</h3>
    <ul>
      <li>Each of you name one specific bid you will try to notice and respond to this week - a tone of voice, a certain sigh, a particular kind of question.</li>
      <li>Agree on a simple signal for "I need you to turn toward me right now" that either of you can use, even mid-argument.</li>
    </ul>
    <p class="small">The bid I will watch for</p>
    <div class="write-line"></div>
    <p class="small">Our signal</p>
    <div class="write-line"></div>
    <p class="solo">If you are going through this alone: choose your own bid to watch for in your spouse this week, without announcing it. You are practicing the noticing either way - sharing the agreement is a bonus, not a requirement.</p>`
  )
);

pages.push(
  page(
    10,
    `<div class="meta"><span class="chip">Couple · Integration</span><span>Week 1 · Day 7</span></div>
    <h2 class="day-title">What Notice Week Showed Us</h2>
    <p>One week of noticing is behind you. Today is for taking stock - gently, without turning it into a performance review.</p>
    <h3>Why this matters</h3>
    <p>Naming what you noticed, out loud, to each other, is itself a small act of reconnection - often the first real one in a while.</p>
    <h3>Today's session (10-15 minutes together)</h3>
    <ul>
      <li>Each share one thing you noticed this week about the distance, and one thing you noticed you were longing for. Listen without fixing or defending.</li>
      <li>Complete the Weekly Check-In Card again. Compare it, gently, to Day 1's answers - not to judge progress, just to see it.</li>
    </ul>
    <p class="small">One thing I noticed</p>
    <div class="write-box"></div>
    <p class="small">One thing I was longing for</p>
    <div class="write-box"></div>
    <p class="solo">If you are going through this alone: write both answers for yourself, and consider sharing just one of them with your spouse this week, low-pressure, whenever it feels natural.</p>
    <p class="prayer">If it helps: close the week with a short prayer of thanks for what you were willing to see, even in its early, unfinished shape.</p>
    <p class="small mt">End of Week 1. Next: Week 2 - Speak, where noticing turns into a safe way to reopen the harder conversations.</p>`
  )
);

pages.push(
  page(
    11,
    `<p class="kicker">Week 2 · Speak</p>
    <h1 class="week-title">Speak</h1>
    <p class="lede">What you are missing is not motivation. It is the actual words for the moment things get tense.</p>
    <div class="meta"><span class="chip">Solo</span><span>Day 8</span></div>
    <h2 class="day-title">Why Words Got Hard</h2>
    <p>Most couples do not stop talking because they ran out of things to say. They stop because talking started to feel risky - like it might turn into a fight, or into silence that is somehow worse than a fight.</p>
    <h3>Why this matters</h3>
    <p>Under stress, most people default to one of two patterns - pushing to resolve things right now, or going quiet until it blows over. Neither is wrong. Both make sense as protection. Naming your own pattern is the first step to choosing something else when it counts.</p>
    <h3>Today's reflection</h3>
    <p>Under stress, do you tend to push to talk it out immediately, or go quiet and pull back? Neither answer is a character flaw - just notice which is yours.</p>
    <div class="write-line"></div>
    <p>What does your spouse tend to do? (If you are not sure, that is useful information too.)</p>
    <div class="write-line"></div>
    <p class="solo">If you are going through this alone: you can only be sure of your own pattern today, and that is exactly enough to work with this week.</p>`,
    { photo: "week-2.jpg", photoPos: "22%" }
  )
);

pages.push(
  page(
    12,
    `<div class="meta"><span class="chip">Solo</span><span>Week 2 · Day 9</span></div>
    <h2 class="day-title">Reacting vs. Repairing</h2>
    <p>Every couple argues. What separates the ones who stay close from the ones who drift apart is not the absence of conflict - it is what happens in the middle of it. A repair attempt is any small thing, said or done, that puts the brakes on before things spiral: a joke, an apology, a hand on the arm, a simple "can we slow down."</p>
    <h3>Why this matters</h3>
    <p>You have probably already made repair attempts without having a name for them. Recognizing them makes you more likely to use them on purpose.</p>
    <h3>Today's reflection</h3>
    <p>Think of a recent disagreement. Was there a moment either of you tried to de-escalate - a joke, an apology, a pause? What happened when they did?</p>
    <div class="write-box"></div>
    <p>If no repair attempt was made, what might one have sounded like?</p>
    <div class="write-box"></div>
    <p class="solo">If you are going through this alone: you are building awareness you will use starting tomorrow, whether or not your spouse is doing this exercise alongside you.</p>`
  )
);

pages.push(
  page(
    13,
    `<div class="meta"><span class="chip">Solo</span><span>Week 2 · Day 10</span></div>
    <h2 class="day-title">Naming What Is Underneath</h2>
    <p>Most complaints are a smaller, sharper version of a bigger, softer feeling. "You're always on your phone" is often really "I feel invisible when we are in the same room." The complaint gets said. The feeling underneath rarely does.</p>
    <h3>Why this matters</h3>
    <p>The sharp version tends to start a fight. The soft version tends to start a real conversation.</p>
    <h3>Today's reflection</h3>
    <p>Write down one complaint you have had recently - the sharp, surface version, exactly as it would come out in the moment.</p>
    <div class="write-box"></div>
    <p>Now rewrite it, naming the softer feeling underneath:</p>
    <p class="small">When</p>
    <div class="write-line"></div>
    <p class="small">happens, I feel</p>
    <div class="write-line"></div>
    <p class="solo">If you are going through this alone: keep both versions somewhere you can find them. Tomorrow's tool is where you will learn when and how to actually say the second one.</p>`
  )
);

pages.push(
  page(
    14,
    `<div class="meta"><span class="chip">Solo · Tool</span><span>Week 2 · Day 11 · Page 14</span></div>
    <h2 class="day-title">The Communication Repair Script</h2>
    <p>You do not need to be naturally good at hard conversations. You need six lines, ready before you need them - the same way you would keep a fire extinguisher somewhere you can reach it without thinking.</p>
    <p class="small">Say the line out loud, exactly as written. The formality is the point. A scripted line signals "I am trying to de-escalate" more clearly than an improvised one.</p>
    <div class="callout">
      <div class="script-line"><strong>1. "Can we start over?"</strong> - the moment you hear your own voice sharpen.</div>
      <div class="script-line"><strong>2. "I think I said that wrong - let me try again."</strong> - right after you notice you were harsher than you meant to be.</div>
      <div class="script-line"><strong>3. "I'm not trying to win this. I'm trying to understand you."</strong> - when it starts feeling like a debate.</div>
      <div class="script-line"><strong>4. "Can you say more about what that felt like for you?"</strong> - when your partner is vulnerable and you want to defend.</div>
      <div class="script-line"><strong>5. "I need five minutes before I can talk about this calmly."</strong> - name a time, then actually return.</div>
      <div class="script-line"><strong>6. "You're more important to me than being right about this."</strong> - when the topic is small and the tension is not.</div>
    </div>
    <h3>Two prompts that make honesty feel safer</h3>
    <ul>
      <li>"What's one thing that would help you feel safe telling me the truth right now?"</li>
      <li>"If I promise not to react right away, is there something you've been wanting to say?"</li>
    </ul>
    <p class="solo">Every one of these six lines works even if your spouse has never seen this book. Today's reflection: which line is hardest to imagine saying out loud? That is usually the one worth practicing first.</p>
    <p class="small">The line I will practice first</p>
    <div class="write-line"></div>`
  )
);

pages.push(
  page(
    15,
    `<div class="meta"><span class="chip">Couple</span><span>Week 2 · Day 12</span></div>
    <h2 class="day-title">Practicing the Script</h2>
    <p>A script only works if it is already familiar the first time you need it under pressure. Today is for trying one line on purpose, in a low-stakes moment, so it is not brand new the first time it actually matters.</p>
    <h3>Today's session (10 minutes together)</h3>
    <ul>
      <li>Pick one small, real friction from the past week or so - nothing catastrophic, just something mildly annoying.</li>
      <li>Practice bringing it up using one line from yesterday's script. Notice how it changes the shape of the conversation, even artificially.</li>
      <li>Afterward, each share which line felt most natural to say, and which felt stiff or awkward.</li>
    </ul>
    <p class="small">The friction we chose</p>
    <div class="write-line"></div>
    <p class="small">The line we used</p>
    <div class="write-line"></div>
    <p class="small">What we noticed</p>
    <div class="write-box"></div>
    <p class="solo">If you are going through this alone: practice saying one line out loud to yourself, or use it for real the next time a small friction comes up - even without announcing that you are "doing an exercise." The line works the same either way.</p>`
  )
);

pages.push(
  page(
    16,
    `<div class="meta"><span class="chip">Solo</span><span>Week 2 · Day 13</span></div>
    <h2 class="day-title">When Honesty Feels Risky</h2>
    <p>Somewhere in every drifting marriage is at least one honest thing that has not been said - not because it is shameful, but because saying it feels like it might change something, and change feels risky when you are already unsteady.</p>
    <h3>Why this matters</h3>
    <p>The things left unsaid do not disappear. They just sit underneath everything else, quietly making every other conversation a little more guarded.</p>
    <h3>Today's reflection</h3>
    <p>Is there something you have been holding back - not a confession, just an honest thought or feeling you have not voiced? Name it for yourself, even if you are not ready to say it aloud yet.</p>
    <div class="write-box" style="min-height:0.95in"></div>
    <p>What is the actual fear underneath not saying it? Being misunderstood? Starting a fight? Being seen as needy or difficult?</p>
    <div class="write-box"></div>
    <p class="solo">If you are going through this alone: you do not have to share this today, or even this month. Naming it privately is real progress on its own, and the script will be here whenever you are ready to use it.</p>
    <p class="prayer">If it helps: a short prayer for courage to be honest - not for the perfect words, just the willingness - is a quiet way to close today.</p>`
  )
);

pages.push(
  page(
    17,
    `<div class="meta"><span class="chip">Couple · Integration</span><span>Week 2 · Day 14</span></div>
    <h2 class="day-title">Speak Week Recap</h2>
    <p>A week of learning to speak differently is behind you. Today is for taking stock of what is actually working, not grading yourselves on how well you have "done" it.</p>
    <h3>Today's session (10-15 minutes together)</h3>
    <ul>
      <li>Revisit the six script lines together. Which ones do you both want to keep using on purpose going forward?</li>
      <li>Complete the Weekly Check-In Card again. Notice anything different from Day 7's answers - even something small.</li>
    </ul>
    <p class="small">Lines we want to keep</p>
    <div class="write-box"></div>
    <p class="small">Something that felt different this week</p>
    <div class="write-box"></div>
    <p class="solo">If you are going through this alone: choose your own one or two lines to keep carrying forward, and consider using one of them for real this week, even without narrating the exercise behind it.</p>
    <p class="small mt">End of Week 2. Next: Week 3 - Trust, where honest conversations turn into small, repeatable actions that make safety feel real again.</p>`
  )
);

pages.push(
  page(
    18,
    `<p class="kicker">Week 3 · Trust</p>
    <h1 class="week-title">Trust</h1>
    <p class="lede">Trust comes back the same way it left - in small moments, repeated until they are reflexive.</p>
    <div class="meta"><span class="chip">Solo</span><span>Day 15</span></div>
    <h2 class="day-title">Trust Is Built in Seconds, Not Speeches</h2>
    <p>If you ask most long-married couples what keeps them close, they rarely point to a grand vacation or a big speech. They point to small things they do without fail - a particular greeting, a nightly check-in, a habit so ordinary it barely looks like effort from the outside.</p>
    <h3>Why this matters</h3>
    <p>You are not looking for a dramatic fix this week. You are looking for one small, protected moment you can actually keep.</p>
    <h3>Today's reflection</h3>
    <p>Did you and your spouse used to have a small ritual - a greeting, a routine, a habit - that has quietly disappeared? What was it?</p>
    <div class="write-box"></div>
    <p>What made it easy to keep, back when you kept it?</p>
    <div class="write-line"></div>
    <p class="solo">If you are going through this alone: you can start a ritual on your own side this week - greeting your spouse a certain way, asking a particular question - without needing their buy-in first. Small, one-sided consistency is still real trust-building.</p>
    <p class="prayer">If it helps: a short prayer of thanks for the ordinary, unremarkable moments of a marriage is a good way to close today.</p>`,
    { photo: "week-3.jpg", photoPos: "28%" }
  )
);

pages.push(
  page(
    19,
    `<div class="meta"><span class="chip">Solo</span><span>Week 3 · Day 16</span></div>
    <h2 class="day-title">Pick One Ritual</h2>
    <p>You will get a full menu on Day 19. Today is just for narrowing your thinking, so you are not choosing on the spot later.</p>
    <h3>Why this matters</h3>
    <p>A ritual only works if it is small enough to actually keep. Ambitious plans get abandoned by week two. Tiny ones survive.</p>
    <h3>Today's reflection</h3>
    <p>Of these three starting points, which feels most doable for you this week, not someday?</p>
    <div class="check"><span class="box"></span><span>A real greeting at reunion</span></div>
    <div class="check"><span class="box"></span><span>A genuine "how was your day"</span></div>
    <div class="check"><span class="box"></span><span>A moment of gratitude before sleep</span></div>
    <p class="mt">What has gotten in the way of a habit like this sticking before?</p>
    <div class="write-box"></div>
    <p class="solo">If you are going through this alone: choose a ritual you can start on your own end regardless of participation - a warmer greeting, a genuine question - and let it be a gift with no immediate return expected.</p>`
  )
);

pages.push(
  page(
    20,
    `<div class="meta"><span class="chip">Solo</span><span>Week 3 · Day 17</span></div>
    <h2 class="day-title">The Kept Promise</h2>
    <p>Trust is not really about big declarations. It is built - or worn down - in small promises: "I'll call you at lunch," "I'll take care of it," "I won't forget." Kept or missed, these add up faster than almost anything else in a marriage.</p>
    <h3>Why this matters</h3>
    <p>You do not need to fix every broken promise from the past. You need to start noticing the small ones you are keeping and missing right now.</p>
    <h3>Today's reflection</h3>
    <p>Think of one small promise - yours or your spouse's - that was kept this week. How did it land, even if it seemed minor?</p>
    <div class="write-box"></div>
    <p>Think of one that was missed. Try to notice this without building a case against anyone - just observe it.</p>
    <div class="write-box"></div>
    <p class="solo">If you are going through this alone: focus today on the promises you are keeping. That is the half of this you have full control over.</p>`
  )
);

pages.push(
  page(
    21,
    `<div class="meta"><span class="chip">Solo</span><span>Week 3 · Day 18</span></div>
    <h2 class="day-title">Trust as a Daily Deposit</h2>
    <p>Think of trust like a shared account. Every small positive moment - a kind word, a kept promise, a moment of real attention - is a deposit. Every dismissal or broken promise is a withdrawal. Neither one is dramatic on its own. The balance is what matters over time.</p>
    <h3>Why this matters</h3>
    <p>You do not need one huge deposit to feel safer together. You need more small deposits than withdrawals, most weeks.</p>
    <h3>Today's reflection</h3>
    <p>What is one small deposit you made into your marriage this week - something easy to overlook, but real?</p>
    <div class="write-box"></div>
    <p>What is one small deposit your spouse made, that you might not have acknowledged out loud?</p>
    <div class="write-box"></div>
    <p class="solo">If you are going through this alone: notice your own deposits this week without needing them matched right away. Consistency, not immediate reciprocity, is what rebuilds trust.</p>
    <p class="prayer">If it helps: name one thing you are grateful your spouse has deposited into this marriage over the years, even during the drift - and consider telling them, plainly, sometime this week.</p>`
  )
);

pages.push(
  page(
    22,
    `<div class="meta"><span class="chip">Solo · Tool</span><span>Week 3 · Day 19 · Page 22</span></div>
    <h2 class="day-title">The Trust Micro-Habits Menu</h2>
    <p>Pick one. Not all of these - one. Keep it for at least a week before you consider adding another. Small and kept beats ambitious and abandoned, every time.</p>
    <div class="habit"><span class="box"></span><span><strong>The six-second kiss.</strong> A real one, not a peck, at a transition point - leaving or coming home.</span></div>
    <div class="habit"><span class="box"></span><span><strong>The welcome-home routine.</strong> The first two minutes after reunion are phone-down, full attention.</span></div>
    <div class="habit"><span class="box"></span><span><strong>The daily map question.</strong> Ask, "what's one thing you're looking forward to - or dreading - today?"</span></div>
    <div class="habit"><span class="box"></span><span><strong>The stress-reducing ten.</strong> Ten minutes each day just listening to outside-world stress. No fixing.</span></div>
    <div class="habit"><span class="box"></span><span><strong>One spoken appreciation.</strong> Name one specific thing your partner did, out loud, every day.</span></div>
    <div class="habit"><span class="box"></span><span><strong>The kept-promise note.</strong> Tell your partner the moment you follow through on something small.</span></div>
    <div class="habit"><span class="box"></span><span><strong>Tech-free dinner.</strong> Phones away for one meal a day, even if it is only fifteen minutes.</span></div>
    <div class="habit"><span class="box"></span><span><strong>Bedtime gratitude.</strong> One sentence each, last thing before sleep: "today I was grateful for..."</span></div>
    <p class="mt small">The one I will try first, and why</p>
    <div class="write-box"></div>
    <p class="solo">If you are going through this alone: several of these work as one-sided gifts - the spoken appreciation, the kept-promise note, a genuine welcome-home moment. Start there. Tell your spouse which one, if you are doing this together - or simply start it quietly this week.</p>`
  )
);

pages.push(
  page(
    23,
    `<div class="meta"><span class="chip">Couple</span><span>Week 3 · Day 20</span></div>
    <h2 class="day-title">Practicing the Ritual</h2>
    <p>You picked a ritual yesterday. Today is for actually doing it - not planning it, not discussing it further, just doing it once, on purpose.</p>
    <h3>Today's session</h3>
    <ul>
      <li>Do the ritual you chose, today, together.</li>
      <li>Afterward, take two minutes to notice out loud: did it feel awkward, natural, too small to matter, surprisingly nice? There is no right answer - you are just building the habit of noticing.</li>
    </ul>
    <p class="small">The ritual we did</p>
    <div class="write-line"></div>
    <p class="small">How it felt</p>
    <div class="write-box" style="min-height:1.2in"></div>
    <p class="solo">If you are going through this alone: do your chosen ritual on your own side today, without announcing it as an exercise. Notice how it felt to you, and whether it changed anything about the moment, even slightly.</p>`
  )
);

pages.push(
  page(
    24,
    `<div class="meta"><span class="chip">Couple · Integration</span><span>Week 3 · Day 21</span></div>
    <h2 class="day-title">Trust Week Recap</h2>
    <p>A week of small, repeated actions is behind you. Today's task is simple: notice what is actually sticking, and decide - plainly - to keep it going.</p>
    <h3>Today's session (10-15 minutes together)</h3>
    <ul>
      <li>Is the ritual you chose still happening, three or four days in? If it is already slipping, that is useful information, not failure - pick a smaller version and try again.</li>
      <li>Complete the Weekly Check-In Card again. Compare it gently to Day 14's answers.</li>
    </ul>
    <p class="small">What is sticking</p>
    <div class="write-box"></div>
    <p class="small">The smaller version, if we need one</p>
    <div class="write-line"></div>
    <p class="solo">If you are going through this alone: decide, plainly, whether to keep your chosen ritual going into next week regardless of any visible change from your spouse. Consistency on your end is still the work.</p>
    <p class="prayer">If it helps: close the week with a short prayer of thanks for whatever small trust has started to return - even something too small to mention out loud yet.</p>
    <p class="small mt">End of Week 3. Next: Week 4 - Reconnect, ending with the Day 30 Recommitment Ceremony.</p>`
  )
);

pages.push(
  page(
    25,
    `<p class="kicker">Week 4 · Reconnect</p>
    <h1 class="week-title">Reconnect</h1>
    <p class="lede">Name what is actually different. Then choose, out loud, to keep going.</p>
    <div class="meta"><span class="chip">Solo</span><span>Day 22</span></div>
    <h2 class="day-title">What Is Different Now</h2>
    <p>Three Check-In Cards are behind you, filled out honestly, in the middle of ordinary weeks. Today is for reading them side by side.</p>
    <h3>Why this matters</h3>
    <p>Change over 21 days is almost always smaller and quieter than you would want it to be - and easy to miss unless you actually go back and look.</p>
    <h3>Today's reflection</h3>
    <p>Read your Day 1, Day 7, Day 14, and Day 21 Check-In Cards in order. What is one real shift, even a small one?</p>
    <div class="write-box"></div>
    <p>What has not changed yet - and is that okay for now?</p>
    <div class="write-box"></div>
    <p class="solo">If you are going through this alone: your own answers are the whole comparison today. Change on one side of a marriage still counts as real change.</p>`,
    { photo: "week-4.jpg", photoPos: "18%" }
  )
);

pages.push(
  page(
    26,
    `<div class="meta"><span class="chip">Solo</span><span>Week 4 · Day 23</span></div>
    <h2 class="day-title">The Both/And</h2>
    <p>Here is something worth saying plainly: this workbook does not end with a fixed marriage. It ends with a marriage that has better tools than it had 30 days ago. Those are different things, and only one of them is realistic.</p>
    <h3>Why this matters</h3>
    <p>Expecting a finished, permanent fix sets you up to feel like a failure the first time an old pattern resurfaces. Expecting ongoing practice sets you up to keep going when that happens.</p>
    <h3>Today's reflection</h3>
    <p>What is one old pattern you expect might resurface sometime after Day 30?</p>
    <div class="write-box"></div>
    <p>What is one tool from these 30 days you would reach for, specifically, when it does?</p>
    <div class="write-box"></div>
    <p class="solo">If you are going through this alone: the same both/and applies to solo effort. You are not expecting to single-handedly fix a marriage in a month - you are building tools you will keep using regardless of pace.</p>`
  )
);

pages.push(
  page(
    27,
    `<div class="meta"><span class="chip">Solo</span><span>Week 4 · Day 24</span></div>
    <h2 class="day-title">A Letter Begins</h2>
    <p>You will exchange something like this on Day 30. Today is just for starting the draft, honestly, with no pressure to get it right the first time. Use Bonus 2 - the Recommitment Letter Template - if you want more room.</p>
    <h3>Why this matters</h3>
    <p>Writing something down, in your own words, forces a kind of honesty that talking often lets you avoid.</p>
    <p class="small">What I have noticed about "us" over these 30 days</p>
    <div class="write-box"></div>
    <p class="small">One thing I appreciate in my spouse that I do not say often enough</p>
    <div class="write-box"></div>
    <p class="small">What I am choosing, starting today</p>
    <div class="write-box"></div>
    <p class="solo">If you are going through this alone: write this letter anyway. Keep it for whenever your spouse is ready to read it - or simply for yourself, as a record of what you were willing to choose, even alone.</p>`
  )
);

pages.push(
  page(
    28,
    `<div class="meta"><span class="chip">Solo</span><span>Week 4 · Day 25</span></div>
    <h2 class="day-title">What This Has Shaped in You</h2>
    <p>Thirty days of practical tools tends to leave a mark beyond the marriage itself - most people come out the other side a little more patient, a little more honest, a little better at loving someone imperfectly. Today's reflection stands on its own, faith or no faith.</p>
    <h3>Why this matters</h3>
    <p>Noticing how this process has shaped <em>you</em>, not just the marriage, is worth naming before the month ends.</p>
    <h3>Today's reflection</h3>
    <p>Where have you seen this marriage shape you - not just make you happy, but make you more patient, more honest, more able to love someone imperfectly?</p>
    <div class="write-box" style="min-height:1.15in"></div>
    <p class="prayer">If it is part of your life: a short, simple prayer for the next season - not for a perfect marriage, just for the willingness to keep choosing each other. If it is not your season for that, the question above is the whole day, and that is enough.</p>
    <p class="solo">If you are going through this alone: both the reflection and the prayer work solo exactly as they do together.</p>`
  )
);

pages.push(
  page(
    29,
    `<div class="meta"><span class="chip">Solo</span><span>Week 4 · Days 26-29</span></div>
    <h2 class="day-title">The Final Approach</h2>
    <p>The days are getting shorter on purpose. You are close to Day 30 - these four are quick, one line each, meant to be answered in a minute or two rather than worked through slowly.</p>
    <h3>Day 26 - One word for this month. Just one.</h3>
    <div class="write-line"></div>
    <h3>Day 27 - One thing you are proud of, about how you showed up these 30 days.</h3>
    <div class="write-box" style="min-height:0.7in"></div>
    <h3>Day 28 - One thing you are choosing to forgive - in your spouse, or in yourself.</h3>
    <div class="write-box" style="min-height:0.7in"></div>
    <h3>Day 29 - One thing you are choosing, going into tomorrow.</h3>
    <div class="write-box" style="min-height:0.7in"></div>
    <p class="solo">If you are going through this alone: every one of these four questions is yours alone to answer, regardless of where your spouse is in the process.</p>`
  )
);

pages.push(
  page(
    30,
    `<div class="meta"><span class="chip">Couple · Finale</span><span>Day 30</span></div>
    <h2 class="day-title">The Recommitment Ceremony</h2>
    <p>This is not legally binding, and it does not need an officiant - just the two of you, ten quiet minutes, and the letters you started on Day 24. Find a moment without distraction. This does not need to be elaborate. It needs to be real.</p>
    <h3>Opening (read together, or one partner reads aloud)</h3>
    <div class="quote">Thirty days ago, we named something true: we hadn't fallen out of love. We'd drifted. Today, we're choosing to stop drifting.</div>
    <h3>Spoken commitments (each partner completes and reads aloud)</h3>
    <p class="small">In the next season, I choose to notice</p>
    <div class="write-line"></div>
    <p class="small">In the next season, I choose to speak ________, even when it's hard.</p>
    <div class="write-line"></div>
    <p class="small">In the next season, I choose to protect our ritual of</p>
    <div class="write-line"></div>
    <p class="small">I choose you again - not because these thirty days fixed everything, but because I want to keep choosing you.</p>
    <p class="prayer">Optional faith blessing: a short prayer of thanks for the last 30 days, and a request for continued grace - in your own words. Optional gesture: exchange the letters, light a candle, or hold hands in silence for one full minute.</p>
    <p class="solo">If you are going through this alone: speak your own commitments aloud, even to an empty room, and keep the letter for when your spouse is ready. A ceremony of one is still a real, spoken choice.</p>
    <h3>Beyond Day 30</h3>
    <p>The reset ends here. The habit doesn't. Choose one thing - the Check-In Card, one script line, one ritual - and keep doing that one thing into month two. Write it down. That is the last task of these 30 days, and maybe the most important one.</p>
    <p class="small">The one thing I will keep</p>
    <div class="write-line"></div>`
  )
);

const htmlHead = (title) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${title}</title>
<link rel="stylesheet" href="print.css">
</head>
<body>
`;

const workbook = `${htmlHead("The Marriage Reset")}
${pages.join("\n")}
</body></html>
`;

writeFileSync(join(outDir, "workbook.html"), workbook);

function bonusDoc(filename, title, body) {
  writeFileSync(
    join(outDir, filename),
    `${htmlHead(title)}
${body}
</body></html>
`
  );
}

bonusDoc(
  "bonus-1.html",
  "Bonus 1 — Communication Repair Script",
  `${page(
    1,
    `<p class="kicker">Bonus 01 · Printable</p>
    <h1 class="week-title">Communication Repair Script</h1>
    <p class="lede">Print it. Cut it down to a card if you want. Keep it somewhere you will actually see it - the fridge, a wallet, the inside cover of the book.</p>
    <p>Use these when a conversation is heating up, or right before one you have been avoiding. Say the line exactly as written - the formality is the point.</p>`,
    { photo: "bonus-1.jpg", photoPos: "8%" }
  )}
  ${page(
    2,
    `<h2 class="day-title">The six lines</h2>
    <div class="callout">
      <div class="script-line"><strong>1. "Can we start over?"</strong> - the moment your voice sharpens.</div>
      <div class="script-line"><strong>2. "I think I said that wrong - let me try again."</strong> - right after you hear yourself land harder than you meant to.</div>
      <div class="script-line"><strong>3. "I'm not trying to win this. I'm trying to understand you."</strong> - when it starts feeling like a debate.</div>
      <div class="script-line"><strong>4. "Can you say more about what that felt like for you?"</strong> - when your instinct is to defend instead of listen.</div>
      <div class="script-line"><strong>5. "I need five minutes before I can talk about this calmly."</strong> - name an actual time, then come back at it.</div>
      <div class="script-line"><strong>6. "You're more important to me than being right about this."</strong> - when the topic is small but the tension is not.</div>
    </div>
    <h3>Two lines to ask before a hard conversation, not during one</h3>
    <ul>
      <li>"What's one thing that would help you feel safe telling me the truth right now?"</li>
      <li>"If I promise not to react right away, is there something you've been wanting to say?"</li>
    </ul>
    <h3>Make your own</h3>
    <p>These six work because they are specific, short, and said out loud on purpose - not because they are the only options. A repair attempt does not have to be a sentence at all:</p>
    <div class="check"><span class="box"></span><span><strong>Say something</strong> - a phrase, like the six above.</span></div>
    <div class="check"><span class="box"></span><span><strong>Do something physical</strong> - a hand on the arm, leaning in, softening your face.</span></div>
    <div class="check"><span class="box"></span><span><strong>Break the tension</strong> - a shared joke that lightens the moment without dismissing the issue.</span></div>
    <div class="check"><span class="box"></span><span><strong>Do something small and practical</strong> - bring water, sit down next to them instead of standing.</span></div>
    <p class="mt small">My own line or gesture</p>
    <div class="write-line"></div>`
  )}`
);

bonusDoc(
  "bonus-2.html",
  "Bonus 2 — Recommitment Letter",
  `${page(
    1,
    `<p class="kicker">Bonus 02 · Letter</p>
    <h1 class="week-title">Recommitment Letter</h1>
    <p class="lede">Start this on Day 24. Exchange it on Day 30. Write in your own words - the prompts are a place to start, not a form to fill out perfectly.</p>
    <p>Before you exchange letters: read your own back once, out loud, alone. If a line feels performative instead of true, rewrite it. This letter is for your marriage, not for effect.</p>`,
    { photo: "bonus-2.jpg", photoPos: "10%" }
  )}
  ${page(
    2,
    `<h3>What I have noticed about us this month</h3>
    <p class="small">Not a list of problems - just what is actually different, or actually still true.</p>
    <p class="solo">Starter: "I noticed that when we ________, something shifted..."</p>
    <div class="write-box" style="min-height:1.15in"></div>
    <h3>What I appreciate in you that I do not say enough</h3>
    <p class="small">Specific beats general. "You called your mom back even though you were exhausted, and I noticed."</p>
    <div class="write-box" style="min-height:1.15in"></div>
    <h3>What I am choosing, starting today</h3>
    <p class="small">Not a resolution to be perfect - a specific, honest choice about how you want to show up.</p>
    <div class="write-box"></div>
    <h3>What I promise for the next season</h3>
    <p class="small">Smaller and more concrete beats grand and vague.</p>
    <div class="write-box"></div>`
  )}`
);

const prayers = [
  ["Night 1", "God, help us see clearly - not to assign blame, just to notice where the distance actually lives.", "Psalm 139:23-24"],
  ["Night 2", "Show us the moment connection quietly became logistics, and give us the patience to notice it without shame.", "Proverbs 4:23"],
  ["Night 3", "Slow us down enough to actually hear each other's small, easy-to-miss bids for attention.", "James 1:19"],
  ["Night 4", "We bring You what we're really longing for, even the parts we haven't said out loud to each other yet.", "Psalm 62:8"],
  ["Night 5", "Where we've told ourselves a hopeless story about this marriage, help us see the truer, gentler one.", "Isaiah 43:18-19"],
  ["Night 6", "Give us the courage for one small turn toward each other this week, however small it feels.", "1 Thessalonians 5:11"],
  ["Night 7", "Thank You for whatever we were willing to notice this week, even the uncomfortable parts.", "Psalm 100:4-5"],
  ["Night 8", "Where fear has kept us quiet, replace it with the steadiness to speak honestly.", "2 Timothy 1:7"],
  ["Night 9", "Make us quick to repair and slow to escalate, even when we're tired or hurt.", "Matthew 5:9"],
  ["Night 10", "Help us find the softer truth underneath our sharpest complaints.", "Proverbs 20:5"],
  ["Night 11", "Let the words we practice this week actually land as gentle, even under pressure.", "Proverbs 16:24"],
  ["Night 12", "Season our speech with grace tonight, especially in the small, ordinary friction.", "Colossians 4:6"],
  ["Night 13", "Cast out whatever fear is keeping either of us from being fully honest.", "1 John 4:18"],
  ["Night 14", "Thank You for whatever honest words got said this week - help us keep speaking truth in love.", "Ephesians 4:15"],
  ["Night 15", "Remind us that we're stronger noticing and rebuilding this together than either of us could alone.", "Ecclesiastes 4:9-10"],
  ["Night 16", "Teach us to number these small, ordinary days rightly, instead of waiting for a dramatic one.", "Psalm 90:12"],
  ["Night 17", "Let our yes be yes this week - help us keep the small promises we make to each other.", "Matthew 5:37"],
  ["Night 18", "Thank You for the small deposits we made into each other this week, even the ones that went unnoticed.", "1 Thessalonians 5:18"],
  ["Night 19", "Give us the patience to keep this small habit going, even after the novelty wears off.", "Galatians 6:9"],
  ["Night 20", "Help us be genuinely devoted to each other in this one small, ordinary ritual tonight.", "Romans 12:10"],
  ["Night 21", "We commit this rebuilding to You, trusting it more than our own uncertain feelings about how it's going.", "Proverbs 3:5-6"],
  ["Night 22", "Thank You for whatever has actually shifted this month, however small it looks from the outside.", "Psalm 126:3"],
  ["Night 23", "Thank You that Your mercy toward us - and the mercy we owe each other - is new again tomorrow morning.", "Lamentations 3:22-23"],
  ["Night 24", "As we write to each other tonight, help our words be true, specific, and kind.", "Song of Solomon 8:6"],
  ["Night 25", "Be the third strand holding what the two of us alone couldn't hold as well.", "Ecclesiastes 4:12"],
  ["Night 26", "Whatever one word describes this month, thank You for the chance to keep choosing better words going forward.", "Proverbs 18:21"],
  ["Night 27", "Thank You for carrying the good work You started in this marriage this month, even in its unfinished shape.", "Philippians 1:6"],
  ["Night 28", "Help us forgive tonight - each other, and ourselves - the way we've been forgiven.", "Colossians 3:13"],
  ["Night 29", "Tomorrow we choose again. Tonight, prepare our hearts to mean it.", "Joshua 24:15"],
  ["Night 30", "Wherever this marriage goes next, we go together - thank You for thirty days that brought us back to that choice.", "Ruth 1:16-17"],
];

function prayerList(from, to) {
  return prayers
    .slice(from, to)
    .map(
      ([n, t, r]) =>
        `<div class="habit"><span><strong>${n}.</strong> ${t} <em class="small">(${r})</em></span></div>`
    )
    .join("");
}

bonusDoc(
  "bonus-3.html",
  "Bonus 3 — 30 Nights of Prayer",
  `${page(
    1,
    `<p class="kicker">Bonus 03 · Invitation</p>
    <h1 class="week-title">30 Nights of Prayer</h1>
    <p class="lede">One short prayer a night, said together if you can, said alone if you are the only one praying tonight. Scripture references are given so you can pray in whatever translation you already trust.</p>
    <p>Faith is an invitation in this workbook, never a requirement. If this is not your season, you can set this bonus aside. The rest of the reset still stands.</p>`,
    { photo: "bonus-3.jpg", photoPos: "18%" }
  )}
  ${page(
    2,
    `<p class="kicker">Nights 1-15</p>
    <h2 class="day-title">Notice and Speak</h2>
    <p class="small">Week 1 · Notice - Nights 1-7 &nbsp;·&nbsp; Week 2 · Speak - Nights 8-14 &nbsp;·&nbsp; Night 15 begins Trust.</p>
    <div class="red-rule"></div>
    ${prayerList(0, 15)}`
  )}
  ${page(
    3,
    `<p class="kicker">Nights 16-30</p>
    <h2 class="day-title">Trust and Reconnect</h2>
    <p class="small">Week 3 · Trust - Nights 16-21 &nbsp;·&nbsp; Week 4 · Reconnect - Nights 22-30.</p>
    <div class="red-rule"></div>
    ${prayerList(15, 30)}`
  )}`
);

bonusDoc(
  "bonus-4.html",
  "Bonus 4 — Weekly Check-In Card",
  `${page(
    1,
    `<p class="kicker">Bonus 04 · Five minutes</p>
    <h1 class="week-title">Weekly Check-In Card</h1>
    <p class="lede">Use it tonight before Day 1, again on Days 7, 14, and 21, and then monthly after Day 30. This is the one habit built specifically to outlast the workbook.</p>
    <p>Five minutes, no longer. If something bigger surfaces, name it and set a separate time to talk it through. Answer honestly even when the honest answer is "not great."</p>`,
    { photo: "bonus-4.jpg", photoPos: "42%" }
  )}
  ${page(
    2,
    `<h2 class="day-title">How are we, really?</h2>
    <p class="small">Date</p>
    <div class="write-line"></div>
    <h3>1. How are we, really?</h3>
    <p class="small">Not a status update - an honest one-line read on the actual state of things right now.</p>
    <div class="write-box" style="min-height:1.05in"></div>
    <h3>2. What do we need right now?</h3>
    <p class="small">Not a wish list - one real, current need, yours or the marriage's.</p>
    <div class="write-box" style="min-height:1.05in"></div>
    <h3>3. What is one small next step?</h3>
    <p class="small">Not a plan for the month - one specific, doable thing before the next check-in.</p>
    <div class="write-box" style="min-height:1.05in"></div>
    <p class="solo">If you are going through this alone, fill it out for yourself anyway. After Day 30, keep this going monthly. It is the smallest habit in this entire workbook, and often the one that matters most a year from now.</p>`
  )}`
);

console.log("Wrote print HTML:", pages.length, "workbook pages");
