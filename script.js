// --- VARIABLES ---
var currentQuestion = 0;
var userAnswers = [];
var questions = []; 

// --- DATA ---

// 1. FIGURES (16 Total - 4 per quadrant)
var historyFigures = [
    // AUTH LEFT (Red)
    { n: "Joseph Stalin", x: -9, y: 9, img: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Joseph_Stalin_in_1932_%284%29_%28cropped%29%282%29.jpg", q: "Quantity has a quality all its own." },
    { n: "Mao Zedong", x: -9, y: 7, img: "https://daily.jstor.org/wp-content/uploads/2023/04/mao_zedong_reader_librarian_revolutionary_1050x700.jpg", q: "Political power grows out of the barrel of a gun." },
    { n: "Fidel Castro", x: -7, y: 8, img: "https://s3-origin-images.politico.com/2014/12/17/1974_fidel_castro_ap_629.jpg", q: "History will absolve me." },
    { n: "Karl Marx", x: -10, y: -2, img: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Karl_Marx%2C_1875.jpg", q: "Workers of the world, unite!" },

    // AUTH RIGHT (Blue)
    { n: "Adolf Hitler", x: 2, y: 9, img: "https://tidskriftenrespons.se/wp-content/uploads/2017/12/Hitler_at_the_XI_Olympic_Games_opening_ceremonies.jpg", q: "Strength lies not in defense but in attack." },
    { n: "King Louis XIV", x: 2, y: 10, img: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-167889617.jpg", q: "I am the state." },
    { n: "Augusto Pinochet", x: 8, y: 8, img: "https://cdn.britannica.com/27/192627-050-522F407B/Pres-Augusto-Pinochet-Chilean-start-military-coup-September-11-1973.jpg", q: "Sometimes democracy must be bathed in blood." },
    { n: "Donald Trump", x: 6, y: 5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/January_2025_Official_Presidential_Portrait_of_Donald_J._Trump.jpg/960px-January_2025_Official_Presidential_Portrait_of_Donald_J._Trump.jpg", q: "We will make America strong again." },

    // LIB LEFT (Green)
    { n: "Mahatma Gandhi", x: -6, y: -3, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mahatma-Gandhi%2C_studio%2C_1931.jpg/961px-Mahatma-Gandhi%2C_studio%2C_1931.jpg", q: "Be the change that you wish to see in the world." },
    { n: "Emma Goldman", x: -9, y: -9, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Emma_Goldman_seated.jpg/250px-Emma_Goldman_seated.jpg", q: "If voting changed anything, they'd make it illegal." },
    { n: "Bernie Sanders", x: -4, y: -2, img: "https://media.newyorker.com/photos/59097218c14b3c606c108142/master/pass/Cassidy-Bernie-Sanders-Loud-and-Clear.jpg", q: "Healthcare is a human right." },
    { n: "Nelson Mandela", x: -3, y: -2, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nelson_Mandela_1994.jpg/960px-Nelson_Mandela_1994.jpg", q: "It always seems impossible until it's done." },

    // LIB RIGHT (Purple)
    { n: "Ayn Rand", x: 9, y: -4, img: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Ayn_Rand_%281943_Talbot_portrait%29.jpg", q: "The smallest minority on earth is the individual." },
    { n: "Murray Rothbard", x: 10, y: -9, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Murray_Rothbard_02.jpg/440px-Murray_Rothbard_02.jpg", q: "Taxation is theft." },
    { n: "Milton Friedman", x: 7, y: -3, img: "https://fredrikstenbeck.com/articles/milton-friedman.jpg", q: "A society that puts equality before freedom will get neither." },
    { n: "Thomas Jefferson", x: 3, y: -5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/02_Thomas_Jefferson_3x4.jpg/960px-02_Thomas_Jefferson_3x4.jpg", q: "I prefer dangerous freedom over peaceful slavery." }
];

// 2. ARCHETYPES
var archetypes = [
    // AUTH LEFT
    { n: "Marxist-Leninist ☭", x: -9, y: 9, d: "Vanguard state to abolish capitalism." },
    { n: "Auth. Socialist 🚩", x: -7, y: 7, d: "State control, collective priority." },
    { n: "Left-Wing Populist 📢", x: -5, y: 2, d: "The people against the elite, economic equity." },
    { n: "Eco-Socialist 🌻", x: -6, y: -2, d: "Sustainability via collective ownership." },
    
    // AUTH RIGHT
    { n: "Fascist ⚔️", x: 4, y: 9, d: "Nation over individual, state power." },
    { n: "Conservative 🏛️", x: 3, y: 4, d: "Tradition, order, property." },
    { n: "Paleoconservative ✝️", x: 4, y: 6, d: "Religious tradition, nationalism, protectionism." },
    { n: "Technocrat 🔬", x: 1, y: 5, d: "Rule by experts and data." },

    // LIB LEFT
    { n: "Anarcho-Communist 🏴", x: -9, y: -9, d: "No state, no money, mutual aid." },
    { n: "Libertarian Socialist ✊", x: -8, y: -7, d: "Worker councils, no state." },
    { n: "Progressive 🌈", x: -6, y: -4, d: "Social justice, diversity, reform." },
    { n: "Social Democrat 🌹", x: -4, y: 2, d: "Welfare state, regulated capitalism." },

    // LIB RIGHT
    { n: "Anarcho-Capitalist 🤑", x: 9, y: -9, d: "No state, private everything." },
    { n: "Libertarian 🐍", x: 8, y: -8, d: "Maximum freedom, minimal state." },
    { n: "Minarchist 🛡️", x: 7, y: -5, d: "State only for police and courts." },
    { n: "Classical Liberal 🦅", x: 6, y: -4, d: "Individual liberty, limited state." },
    { n: "Neoliberal 🌐", x: 5, y: -2, d: "Free trade, deregulation, globalism." }
];

// 3. QUESTIONS
var rawQuestions = [
    { sect: "Globalisation", t: "If economic globalisation is inevitable, it should primarily serve humanity rather than the interests of trans-national corporations.", a: 'econ', dir: -1 },
    { sect: "Globalisation", t: "I’d always support my country, whether it was right or wrong.", a: 'soc', dir: 1 },
    { sect: "Globalisation", t: "No one chooses their country of birth, so it’s foolish to be proud of it.", a: 'soc', dir: -1 },
    { sect: "Globalisation", t: "Our race has many superior qualities, compared with other races.", a: 'soc', dir: 1 },
    { sect: "Globalisation", t: "The enemy of my enemy is my friend.", a: 'soc', dir: 1 },
    { sect: "Globalisation", t: "Military action that defies international law is sometimes justified.", a: 'soc', dir: 1 },
    { sect: "Globalisation", t: "There is now a worrying fusion of information and entertainment.", a: 'soc', dir: -1 },
    
    { sect: "The Economy", t: "People are ultimately divided more by class than by nationality.", a: 'econ', dir: -1 },
    { sect: "The Economy", t: "Controlling inflation is more important than controlling unemployment.", a: 'econ', dir: 1 },
    { sect: "The Economy", t: "Because corporations cannot be trusted to voluntarily protect the environment, they require regulation.", a: 'econ', dir: -1 },
    { sect: "The Economy", t: "“From each according to his ability, to each according to his need” is a fundamentally good idea.", a: 'econ', dir: -1 },
    { sect: "The Economy", t: "The freer the market, the freer the people.", a: 'econ', dir: 1 },
    { sect: "The Economy", t: "It’s a sad reflection on our society that something as basic as drinking water is now a bottled, branded consumer product.", a: 'econ', dir: -1 },
    { sect: "The Economy", t: "Land shouldn’t be a commodity to be bought and sold.", a: 'econ', dir: -1 },
    { sect: "The Economy", t: "It is regrettable that many personal fortunes are made by people who simply manipulate money and contribute nothing to their society.", a: 'econ', dir: -1 },
    { sect: "The Economy", t: "Protectionism is sometimes necessary in trade.", a: 'econ', dir: -1 },
    { sect: "The Economy", t: "The only social responsibility of a company should be to deliver a profit to its shareholders.", a: 'econ', dir: 1 },
    { sect: "The Economy", t: "The rich are too highly taxed.", a: 'econ', dir: 1 },
    { sect: "The Economy", t: "Those with the ability to pay should have access to higher standards of medical care.", a: 'econ', dir: 1 },
    { sect: "The Economy", t: "Governments should penalise businesses that mislead the public.", a: 'econ', dir: -1 },
    { sect: "The Economy", t: "A genuine free market requires restrictions on the ability of predator multinationals to create monopolies.", a: 'econ', dir: -1 },
    
    { sect: "Social Values", t: "Abortion, when the woman’s life is not threatened, should always be illegal.", a: 'soc', dir: 1 },
    { sect: "Social Values", t: "All authority should be questioned.", a: 'soc', dir: -1 },
    { sect: "Social Values", t: "An eye for an eye and a tooth for a tooth.", a: 'soc', dir: 1 },
    { sect: "Social Values", t: "Taxpayers should not be expected to prop up any theatres or museums that cannot survive on a commercial basis.", a: 'econ', dir: 1 },
    { sect: "Social Values", t: "Schools should not make classroom attendance compulsory.", a: 'soc', dir: -1 },
    { sect: "Social Values", t: "All people have their rights, but it is better for all of us that different sorts of people should keep to their own kind.", a: 'soc', dir: 1 },
    { sect: "Social Values", t: "Good parents sometimes have to spank their children.", a: 'soc', dir: 1 },
    { sect: "Social Values", t: "It’s natural for children to keep some secrets from their parents.", a: 'soc', dir: -1 },
    { sect: "Social Values", t: "Possessing marijuana for personal use should not be a criminal offence.", a: 'soc', dir: -1 },
    { sect: "Social Values", t: "The prime function of schooling should be to equip the future generation to find jobs.", a: 'econ', dir: 1 },
    { sect: "Social Values", t: "People with serious inheritable disabilities should not be allowed to reproduce.", a: 'soc', dir: 1 },
    { sect: "Social Values", t: "The most important thing for children to learn is to accept discipline.", a: 'soc', dir: 1 },
    { sect: "Social Values", t: "There are no savage and civilised peoples; there are only different cultures.", a: 'soc', dir: -1 },
    { sect: "Social Values", t: "Those who are able to work, and refuse the opportunity, should not expect society’s support.", a: 'econ', dir: 1 },
    { sect: "Social Values", t: "When you are troubled, it’s better not to think about it, but to keep busy with more cheerful things.", a: 'soc', dir: 1 },
    { sect: "Social Values", t: "First-generation immigrants can never be fully integrated within their new country.", a: 'soc', dir: 1 },
    { sect: "Social Values", t: "What’s good for the most successful corporations is always, ultimately, good for all of us.", a: 'econ', dir: 1 },
    { sect: "Social Values", t: "No broadcasting institution, however independent its content, should receive public funding.", a: 'econ', dir: 1 },
    
    { sect: "Society", t: "Our civil liberties are being excessively curbed in the name of counter-terrorism.", a: 'soc', dir: -1 },
    { sect: "Society", t: "A significant advantage of a one-party state is that it avoids all the arguments that delay progress in a democratic political system.", a: 'soc', dir: 1 },
    { sect: "Society", t: "Although the electronic age makes official surveillance easier, only wrongdoers need to be worried.", a: 'soc', dir: 1 },
    { sect: "Society", t: "The death penalty should be an option for the most serious crimes.", a: 'soc', dir: 1 },
    { sect: "Society", t: "In a civilised society, one must always have people above to be obeyed and people below to be commanded.", a: 'soc', dir: 1 },
    { sect: "Society", t: "Abstract art that doesn’t represent anything shouldn’t be considered art at all.", a: 'soc', dir: 1 },
    { sect: "Society", t: "In criminal justice, punishment should be more important than rehabilitation.", a: 'soc', dir: 1 },
    { sect: "Society", t: "It is a waste of time to try to rehabilitate some criminals.", a: 'soc', dir: 1 },
    { sect: "Society", t: "The businessperson and the manufacturer are more important than the writer and the artist.", a: 'econ', dir: 1 },
    { sect: "Society", t: "Mothers may have careers, but their first duty is to be homemakers.", a: 'soc', dir: 1 },
    { sect: "Society", t: "Almost all politicians promise economic growth, but we should heed the warnings of climate science that growth is detrimental to our efforts to curb global warming.", a: 'econ', dir: -1 },
    { sect: "Society", t: "Making peace with the establishment is an important aspect of maturity.", a: 'soc', dir: 1 },
    
    { sect: "Religion & Sex", t: "Astrology accurately explains many things.", a: 'soc', dir: 1 },
    { sect: "Religion & Sex", t: "You cannot be moral without being religious.", a: 'soc', dir: 1 },
    { sect: "Religion & Sex", t: "Charity is better than social security as a means of helping the genuinely disadvantaged.", a: 'econ', dir: 1 },
    { sect: "Religion & Sex", t: "Some people are naturally unlucky.", a: 'soc', dir: 1 },
    { sect: "Religion & Sex", t: "It is important that my child’s school instills religious values.", a: 'soc', dir: 1 },
    { sect: "Religion & Sex", t: "Sex outside marriage is usually immoral.", a: 'soc', dir: 1 },
    { sect: "Religion & Sex", t: "A same sex couple in a stable, loving relationship should not be excluded from the possibility of child adoption.", a: 'soc', dir: -1 },
    { sect: "Religion & Sex", t: "Pornography, depicting consenting adults, should be legal for the adult population.", a: 'soc', dir: -1 },
    { sect: "Religion & Sex", t: "What goes on in a private bedroom between consenting adults is no business of the state.", a: 'soc', dir: -1 },
    { sect: "Religion & Sex", t: "No one can feel naturally homosexual.", a: 'soc', dir: 1 },
    { sect: "Religion & Sex", t: "These days openness about sex has gone too far.", a: 'soc', dir: 1 }
];


// --- FUNCTIONS ---

function goHome() {
    document.getElementById('view-landing').classList.remove('hidden');
    document.getElementById('view-quiz').classList.add('hidden');
    document.getElementById('view-results').classList.add('hidden');
    window.scrollTo(0,0);
}

function startQuiz() {
    document.getElementById('view-landing').classList.add('hidden');
    document.getElementById('view-quiz').classList.remove('hidden');
    
    // Copy questions to a new list so we don't mess up the original
    questions = [];
    for(var i = 0; i < rawQuestions.length; i++) {
        questions.push(rawQuestions[i]);
    }
    
    currentQuestion = 0;
    userAnswers = [];
    renderQuestion();
}

function renderQuestion() {
    if (currentQuestion >= questions.length) {
        finishQuiz();
        return;
    }

    var q = questions[currentQuestion];
    
    // Update labels
    document.getElementById('q-category').innerText = q.sect.toUpperCase();
    
    // Simple progress tracker
    var progressNum = currentQuestion + 1;
    var totalNum = questions.length;
    document.getElementById('q-section-tracker').innerText = "Question: " + progressNum + " / " + totalNum;
    
    document.getElementById('q-text').innerText = q.t;
    
    // Disable back button if on first question
    if (currentQuestion === 0) {
        document.getElementById('btn-back').disabled = true;
    } else {
        document.getElementById('btn-back').disabled = false;
    }
}

function vote(val) {
    userAnswers[currentQuestion] = val;
    currentQuestion++;
    renderQuestion();
}

function prevQuestion() {
    if(currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

function finishQuiz() {
    document.getElementById('view-quiz').classList.add('hidden');
    document.getElementById('view-results').classList.remove('hidden');

    var scoreEcon = 0;
    var scoreSoc = 0;
    var maxEcon = 0;
    var maxSoc = 0;

    // Calculate Scores using a simple loop
    for (var i = 0; i < questions.length; i++) {
        var q = questions[i];
        var answer = userAnswers[i];
        
        // If user skipped or undefined, treat as 0
        if (answer === undefined) {
            answer = 0;
        }

        if (q.a === 'econ') {
            scoreEcon = scoreEcon + (answer * q.dir);
            maxEcon = maxEcon + 1;
        } else {
            scoreSoc = scoreSoc + (answer * q.dir);
            maxSoc = maxSoc + 1;
        }
    }
    
    // Avoid dividing by zero
    if (maxEcon === 0) maxEcon = 1;
    if (maxSoc === 0) maxSoc = 1;

    // Convert to -10 to +10 scale
    var x = (scoreEcon / maxEcon) * 10;
    var y = (scoreSoc / maxSoc) * 10;

    // Make results more radical (multiply by 1.25)
    x = x * 1.25;
    y = y * 1.25;
    
    // Cap at 10 and -10
    if (x > 10) x = 10;
    if (x < -10) x = -10;
    if (y > 10) y = 10;
    if (y < -10) y = -10;

    showResults(x, y);
}

function showResults(x, y) {
    document.getElementById('score-econ').innerText = x.toFixed(1);
    document.getElementById('score-soc').innerText = y.toFixed(1);
    
    // Move the Dot
    var leftPercent = ((x + 10) / 20) * 100;
    var topPercent = (100 - ((y + 10) / 20) * 100); 
    
    var dot = document.getElementById('result-dot');
    dot.style.left = leftPercent + "%"; 
    dot.style.top = topPercent + "%";

    // --- QUADRANT LOCK LOGIC ---
    // Only search for figures in the same quadrant as the user
    
    var relevantArchetypes = [];
    var relevantFigures = [];
    
    // Determine user quadrant
    var userIsRight = (x >= 0);
    var userIsAuth = (y >= 0);

    // Filter lists
    for(var i = 0; i < archetypes.length; i++) {
        var a = archetypes[i];
        var archIsRight = (a.x >= 0);
        var archIsAuth = (a.y >= 0);
        
        if(archIsRight === userIsRight && archIsAuth === userIsAuth) {
            relevantArchetypes.push(a);
        }
    }

    for(var i = 0; i < historyFigures.length; i++) {
        var h = historyFigures[i];
        var figIsRight = (h.x >= 0);
        var figIsAuth = (h.y >= 0);
        
        if(figIsRight === userIsRight && figIsAuth === userIsAuth) {
            relevantFigures.push(h);
        }
    }

    // fallback if lists are empty (e.g. exactly 0,0)
    if(relevantArchetypes.length === 0) relevantArchetypes = archetypes;
    if(relevantFigures.length === 0) relevantFigures = historyFigures;


    // 1. Find Closest Archetype
    var bestArch = null;
    var minDist = 9999;
    
    for(var i = 0; i < relevantArchetypes.length; i++) {
        var a = relevantArchetypes[i];
        // Distance Formula: sqrt( (x2-x1)^2 + (y2-y1)^2 )
        var dist = Math.sqrt( Math.pow(a.x - x, 2) + Math.pow(a.y - y, 2) );
        if (dist < minDist) {
            minDist = dist;
            bestArch = a;
        }
    }

    if (bestArch) {
        document.getElementById('archetype-title').innerText = bestArch.n;
        document.getElementById('archetype-desc').innerText = bestArch.d;
    }

    // 2. Find Closest Historical Figure
    var bestHist = null; 
    var histDist = 9999;
    
    for(var i = 0; i < relevantFigures.length; i++) {
        var h = relevantFigures[i];
        var dist = Math.sqrt( Math.pow(h.x - x, 2) + Math.pow(h.y - y, 2) );
        if (dist < histDist) {
            histDist = dist;
            bestHist = h;
        }
    }

    if(bestHist) {
        var img = document.getElementById('history-img');
        img.src = bestHist.img;
        img.classList.remove('hidden');
        document.getElementById('history-name').innerText = bestHist.n;
        document.getElementById('history-quote').innerText = bestHist.q;
    }
}

function copyResult() {
    alert("Coordinates copied to clipboard!");
}

function fullReset() {
    location.reload();
}

function scrollToSection(id) {
    goHome();
    setTimeout(function() {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// Theme Toggle
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('theme-toggle').addEventListener('click', function() {
        var body = document.body;
        if (body.getAttribute('data-theme') === 'dark') {
            body.setAttribute('data-theme', '');
            this.innerText = '🌙';
        } else {
            body.setAttribute('data-theme', 'dark');
            this.innerText = '☀️';
        }
    });
});