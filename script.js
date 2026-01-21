

// --- GLOBAL VARIABLES ---
let currentQuestion = 0;
let userAnswers = [];
let activeQuestions = [];

// --- DATABASE ---

const historyFigures = [
    // AUTH LEFT (State Control + Equality)
    { n: "Joseph Stalin", x: -9, y: 9, img: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Joseph_Stalin_in_1932_%284%29_%28cropped%29%282%29.jpg", q: "Quantity has a quality all its own." },
    { n: "Vladimir Lenin", x: -10, y: 8, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Vladimir_Lenin_in_July_1920_by_Pavel_Zhukov.jpg/960px-Vladimir_Lenin_in_July_1920_by_Pavel_Zhukov.jpg", q: "A lie told often enough becomes the truth." },
    { n: "Mao Zedong", x: -9, y: 7, img: "https://daily.jstor.org/wp-content/uploads/2023/04/mao_zedong_reader_librarian_revolutionary_1050x700.jpg", q: "Political power grows out of the barrel of a gun." },
    { n: "Fidel Castro", x: -7, y: 8, img: "https://s3-origin-images.politico.com/2014/12/17/1974_fidel_castro_ap_629.jpg", q: "Condemn me. It does not matter. History will absolve me." },
    { n: "Karl Marx", x: -10, y: -2, img: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Karl_Marx%2C_1875.jpg", q: "The history of all hitherto existing society is the history of class struggles." },
    { n: "Leon Trotsky", x: -10, y: 0, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Leon_Trotsky_1918_%283x4_rotated_cropped_b%29.jpg/250px-Leon_Trotsky_1918_%283x4_rotated_cropped_b%29.jpg", q: "You may not be interested in war, but war is interested in you." },
    { n: "Nikita Khrushchev", x: -7, y: 6, img: "https://static.tvtropes.org/pmwiki/pub/images/imageswsj_1.jpg", q: "Politicians are the same all over. They promise to build a bridge even where there is no river." },

    // AUTH RIGHT (State Control + Markets/Hierarchy)
    { n: "Adolf Hitler", x: 2, y: 9, img: "https://tidskriftenrespons.se/wp-content/uploads/2017/12/Hitler_at_the_XI_Olympic_Games_opening_ceremonies.jpg", q: "Strength lies not in defense but in attack." },
    { n: "Benito Mussolini", x: 3, y: 8, img: "https://upload.wikimedia.org/wikipedia/commons/3/38/Duce_Benito_Mussolini.jpg", q: "All within the state, nothing outside the state, nothing against the state." },
    { n: "Augusto Pinochet", x: 8, y: 8, img: "https://cdn.britannica.com/27/192627-050-522F407B/Pres-Augusto-Pinochet-Chilean-start-military-coup-September-11-1973.jpg", q: "Sometimes democracy must be bathed in blood." },
    { n: "Donald Trump", x: 6, y: 5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/January_2025_Official_Presidential_Portrait_of_Donald_J._Trump.jpg/960px-January_2025_Official_Presidential_Portrait_of_Donald_J._Trump.jpg", q: "We will make America strong again." },
    { n: "Margaret Thatcher", x: 6, y: 6, img: "https://hips.hearstapps.com/hmg-prod/images/margaret-thatcher_500x500_gettyimages-108932085.jpg", q: "There is no such thing as society." },
    { n: "Otto von Bismarck", x: 2, y: 6, img: "https://m.media-amazon.com/images/I/61819YtE0PL.jpg", q: "Laws are like sausages - it is best not to see them being made." },
    { n: "Edmund Burke", x: 4, y: 5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Sir_Joshua_Reynolds_-_Edmund_Burke%2C_1729_-_1797._Statesman%2C_orator_and_author_-_PG_2362_-_National_Galleries_of_Scotland.jpg/983px-Sir_Joshua_Reynolds_-_Edmund_Burke%2C_1729_-_1797._Statesman%2C_orator_and_author_-_PG_2362_-_National_Galleries_of_Scotland.jpg", q: "The only thing necessary for the triumph of evil is for good men to do nothing." },
    { n: "King Louis XIV", x: 2, y: 10, img: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-167889617.jpg", q: "I am the state." },

    // LIB LEFT (Individual Freedom + Equality)
    { n: "Mahatma Gandhi", x: -6, y: -3, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mahatma-Gandhi%2C_studio%2C_1931.jpg/961px-Mahatma-Gandhi%2C_studio%2C_1931.jpg", q: "The weak can never forgive. Forgiveness is the attribute of the strong." },
    { n: "Noam Chomsky", x: -7, y: -6, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Portrait_of_Noam_Chomsky_used_in_the_April_1961_issue_of_The_Technology_Review_%28cropped%29.jpg/250px-Portrait_of_Noam_Chomsky_used_in_the_April_1961_issue_of_The_Technology_Review_%28cropped%29.jpg", q: "Colorless green ideas sleep furiously." },
    { n: "Emma Goldman", x: -9, y: -9, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Emma_Goldman_seated.jpg/250px-Emma_Goldman_seated.jpg", q: "If voting changed anything, they'd make it illegal." },
    { n: "Rosa Luxemburg", x: -9, y: -6, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Rosa_Luxemburg.jpg/960px-Rosa_Luxemburg.jpg", q: "Freedom is always and exclusively freedom for the one who thinks differently." },
    { n: "Bernie Sanders", x: -4, y: -2, img: "https://media.newyorker.com/photos/59097218c14b3c606c108142/master/pass/Cassidy-Bernie-Sanders-Loud-and-Clear.jpg", q: "A nation will not survive morally or economically when so few have so much and so many have so little." },
    { n: "Peter Kropotkin", x: -10, y: -8, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Atelier_Nadar_-_Pierre_Kropotkine.jpg/250px-Atelier_Nadar_-_Pierre_Kropotkine.jpg", q: "Competition is the law of the jungle, but cooperation is the law of civilization." },
    { n: "Nelson Mandela", x: -3, y: -2, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nelson_Mandela_1994.jpg/960px-Nelson_Mandela_1994.jpg", q: "It always seems impossible until it's done." },
    { n: "Martin Luther King Jr.", x: -4, y: -3, img: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_auto,q_auto:best/msnbc/Components/Photo_StoryLevel/080121/080121-mlk-vmed-6a.jpg", q: "Injustice anywhere is a threat to justice everywhere." },

    // LIB RIGHT (Individual Freedom + Markets)
    { n: "Milton Friedman", x: 7, y: -3, img: "https://fredrikstenbeck.com/articles/milton-friedman.jpg", q: "A society that puts equality before freedom will get neither." },
    { n: "Ayn Rand", x: 9, y: -4, img: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Ayn_Rand_%281943_Talbot_portrait%29.jpg", q: "The smallest minority on earth is the individual." },
    { n: "Thomas Jefferson", x: 3, y: -5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/02_Thomas_Jefferson_3x4.jpg/960px-02_Thomas_Jefferson_3x4.jpg", q: "I prefer dangerous freedom over peaceful slavery." },
    { n: "Max Stirner", x: 8, y: -9, img: "https://i.redd.it/13ge9hpsvzc81.jpg", q: "The state calls its own violence law, but that of the individual, crime." },
    { n: "Murray Rothbard", x: 10, y: -9, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Murray_Rothbard_02.jpg/440px-Murray_Rothbard_02.jpg", q: "Taxation is theft." },
    { n: "John Locke", x: 3, y: -3, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/John_Locke.jpg/440px-John_Locke.jpg", q: "Government has no other end than the preservation of property." },
    { n: "Ron Paul", x: 8, y: -5, img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/MurrayBW.jpg", q: "We don't need a Federal Reserve." },
    { n: "Ludwig von Mises", x: 9, y: -6, img: "https://pacificlegal.org/wp-content/uploads/2024/07/Mises-768x597.png", q: "Government interference always results in a worse situation." },

    // CENTER / MODERATE / OTHER
    { n: "George Washington", x: 2, y: -1, img: "https://images.squarespace-cdn.com/content/v1/5f189980db5cb01fc34a47f5/1626465746859-REQSBKLNKQAGG6ZZPPGW/gw-landsdowne-portrait.jpg", q: "Liberty, when it begins to take root, is a plant of rapid growth." },
    { n: "John M. Keynes", x: -2, y: 0, img: "https://finanskursen.se/wp-content/uploads/2021/04/John-Maynard-Keynes.jpg", q: "The difficulty lies not so much in developing new ideas as in escaping from old ones." },
    { n: "FDR", x: -3, y: 1, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/FDR_1944_Color_Portrait.jpg/250px-FDR_1944_Color_Portrait.jpg", q: "The only thing we have to fear is fear itself." },
    { n: "Thomas Hobbes", x: 4, y: 7, img: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Thomas_Hobbes_by_John_Michael_Wright_%282%29.jpg", q: "The condition of man... is a condition of war of everyone against everyone." },
    { n: "Adam Smith", x: 4, y: -2, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Adam_Smith_The_Muir_portrait.jpg/985px-Adam_Smith_The_Muir_portrait.jpg", q: "It is not from the benevolence of the butcher... that we expect our dinner." },
    { n: "John Stuart Mill", x: -3, y: -4, img: "https://i.guim.co.uk/img/media/7572f760af259b5f842443662606317ad5eb26ad/272_293_2306_1383/master/2306.jpg?width=465&dpr=1&s=none&crop=none", q: "Over his own body and mind, the individual is sovereign." },
    { n: "Cicero", x: 2, y: 1, img: "https://www.discovery.org/m/2020/10/Cicero-the-greatest-orator-of-Ancient-Rome-scaled.jpg", q: "The safety of the people shall be the highest law." },
    { n: "Machiavelli", x: 1, y: 6, img: "https://www.modernista.se/sites/default/files/forfattare/niccolo_machiavelli_by_santi_di_tito.jpg", q: "It is better to be feared than loved, if you cannot be both." }
];

const archetypes = [
    // AUTH LEFT
    { n: "Marxist-Leninist ☭", x: -9, y: 9, d: "Vanguard state to abolish capitalism.", b: ["State and Revolution (Lenin)", "Das Kapital (Marx)", "The Communist Manifesto", "What Is to Be Done?"] },
    { n: "Auth. Socialist 🚩", x: -7, y: 7, d: "State control, collective priority.", b: ["Socialism: Utopian and Scientific (Engels)", "The God That Failed", "Reform or Revolution"] },
    { n: "Left-Wing Populist 📢", x: -5, y: 2, d: "The people against the elite, economic equity.", b: ["For a Left Populism (Mouffe)", "The People, No", "Hegemony and Socialist Strategy"] },
    { n: "Eco-Socialist 🌻", x: -6, y: -2, d: "Sustainability via collective ownership.", b: ["This Changes Everything (Klein)", "The Ecology of Freedom", "Green New Deal"] },
    
    // AUTH RIGHT
    { n: "Fascist ⚔️", x: 4, y: 9, d: "Nation over individual, state power.", b: ["The Doctrine of Fascism", "The Concept of the Political", "Revolt Against the Modern World"] },
    { n: "Conservative 🏛️", x: 3, y: 4, d: "Tradition, order, property.", b: ["Reflections on the Revolution in France (Burke)", "The Conservative Mind", "Leviathan (Hobbes)"] },
    { n: "Paleoconservative ✝️", x: 4, y: 6, d: "Religious tradition, nationalism, protectionism.", b: ["The Suicide of the West", "Patriotism and Christianity", "The Old Right"] },
    { n: "Right-Wing Populist 🧢", x: 5, y: 3, d: "National sovereignty, anti-globalist.", b: ["The Strange Death of Europe", "The Madness of Crowds", "Nationalism"] },
    { n: "Technocrat 🔬", x: 1, y: 5, d: "Rule by experts and data.", b: ["The Technocrats", "Scientific Management", "Technocracy Rising"] },
    { n: "Paternalistic Conservative", x: 2, y: 4, d: "Traditional values with social welfare.", b: ["One Nation (Disraeli)", "Hillbilly Elegy", "The Road to Character"] },

    // LIB LEFT
    { n: "Anarcho-Communist 🏴", x: -9, y: -9, d: "No state, no money, mutual aid.", b: ["The Conquest of Bread (Kropotkin)", "Anarchism and Other Essays", "Mutual Aid", "Post-Scarcity Anarchism"] },
    { n: "Libertarian Socialist ✊", x: -8, y: -7, d: "Worker councils, no state.", b: ["Homage to Catalonia (Orwell)", "Chomsky on Anarchism", "The Dispossessed"] },
    { n: "Social Libertarian 🗽", x: -5, y: -6, d: "Civil liberties + welfare state.", b: ["Justice as Fairness (Rawls)", "On Liberty (Mill)", "Humanism and Democratic Criticism"] },
    { n: "Progressive 🌈", x: -6, y: -4, d: "Social justice, diversity, reform.", b: ["The New Jim Crow", "Manufacturing Consent", "A People's History of the United States"] },
    { n: "Social Democrat 🌹", x: -4, y: 2, d: "Welfare state, regulated capitalism.", b: ["Capital in the Twenty-First Century (Piketty)", "The Spirit Level", "After the Welfare State"] },

    // LIB RIGHT
    { n: "Anarcho-Capitalist 🤑", x: 9, y: -9, d: "No state, private everything.", b: ["The Machinery of Freedom (Friedman)", "For a New Liberty (Rothbard)", "Democracy: The God That Failed", "The Ethics of Liberty"] },
    { n: "Libertarian 🐍", x: 8, y: -8, d: "Maximum freedom, minimal state.", b: ["The Road to Serfdom (Hayek)", "Atlas Shrugged (Rand)", "Economics in One Lesson"] },
    { n: "Minarchist 🛡️", x: 7, y: -5, d: "State only for police and courts.", b: ["Anarchy, State, and Utopia (Nozick)", "The Law (Bastiat)", "Our Enemy, the State"] },
    { n: "Classical Liberal 🦅", x: 6, y: -4, d: "Individual liberty, limited state.", b: ["Two Treatises of Government (Locke)", "The Wealth of Nations (Smith)", "Common Sense"] },
    { n: "Neoliberal 🌐", x: 5, y: -2, d: "Free trade, deregulation, globalism.", b: ["Capitalism and Freedom (Friedman)", "The End of History", "Why Nations Fail"] },
    { n: "Pink Capitalist 🦄", x: 4, y: -6, d: "Socially progressive, fiscally conservative.", b: ["Conscious Capitalism", "Free to Choose", "The Constitution of Liberty"] }
];

const rawQuestions = [
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

// --- APP FUNCTIONS ---

function goHome() {
    document.getElementById('view-landing').classList.remove('hidden');
    document.getElementById('view-quiz').classList.add('hidden');
    document.getElementById('view-results').classList.add('hidden');
    window.scrollTo(0,0);
}

function startQuiz() {
    document.getElementById('view-landing').classList.add('hidden');
    document.getElementById('view-quiz').classList.remove('hidden');
    
    // Always use default order (removed randomization)
    activeQuestions = [...rawQuestions];
    
    currentQuestion = 0;
    userAnswers = [];
    renderQuestion();
}

function renderQuestion() {
    if (currentQuestion >= activeQuestions.length) {
        finishQuiz();
        return;
    }

    const q = activeQuestions[currentQuestion];
    const sectionTotal = activeQuestions.filter(x => x.sect === q.sect).length;
    let sectionCount = 0;
    for(let i=0; i<=currentQuestion; i++) {
        if(activeQuestions[i].sect === q.sect) sectionCount++;
    }

    document.getElementById('q-category').innerText = q.sect.toUpperCase();
    document.getElementById('q-section-tracker').innerText = `${q.sect}: ${sectionCount} / ${sectionTotal}`;
    document.getElementById('q-text').innerText = q.t;
    
    document.getElementById('btn-back').disabled = (currentQuestion === 0);
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

    let es = 0, ss = 0, em = 0, sm = 0;
    
    activeQuestions.forEach((q, i) => {
        const v = userAnswers[i] || 0;
        const w = q.w || 1.0;
        if (q.a === 'econ') { es += v * q.dir * w; em += w; } 
        else { ss += v * q.dir * w; sm += w; }
    });
    
    if(em === 0) em = 1; 
    if(sm === 0) sm = 1;

    let x = (es / em) * 10;
    let y = (ss / sm) * 10;

    // Polarization logic to avoid centrism
    x = x * 1.25; 
    y = y * 1.25;
    
    x = Math.max(-10, Math.min(10, x));
    y = Math.max(-10, Math.min(10, y));

    showResults(x, y);
}

function showResults(x, y) {
    document.getElementById('score-econ').innerText = x.toFixed(1);
    document.getElementById('score-soc').innerText = y.toFixed(1);
    
    const lp = ((x + 10) / 20) * 100;
    const tp = (100 - ((y + 10) / 20) * 100); 
    const dot = document.getElementById('result-dot');
    dot.style.left = `${lp}%`; dot.style.top = `${tp}%`;

    // 1. Find Closest Archetype
    let bestArch = null;
    let minDist = Infinity;
    
    archetypes.forEach(a => {
        const d = Math.sqrt(Math.pow(a.x - x, 2) + Math.pow(a.y - y, 2));
        if (d < minDist) {
            minDist = d;
            bestArch = a;
        }
    });

    if (bestArch) {
        document.getElementById('archetype-title').innerText = bestArch.n;
        document.getElementById('archetype-desc').innerText = bestArch.d;
        
        const bookBox = document.getElementById('book-container');
        bookBox.innerHTML = '';
        if(bestArch.b) {
            bestArch.b.forEach(book => {
                bookBox.innerHTML += `<div class="book-card"><span>📖</span> ${book}</div>`;
            });
        }
    }

    // 2. Find Historical Match
    let bestHist = null; 
    let histDist = Infinity;
    historyFigures.forEach(h => {
        const d = Math.sqrt(Math.pow(h.x - x, 2) + Math.pow(h.y - y, 2));
        if (d < histDist) {
            histDist = d;
            bestHist = h;
        }
    });

    if(bestHist) {
        const img = document.getElementById('history-img');
        img.src = bestHist.img;
        img.classList.remove('hidden');
        document.getElementById('history-name').innerText = bestHist.n;
        document.getElementById('history-quote').innerText = bestHist.q || "";
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
    setTimeout(() => {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('theme-toggle').addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        document.body.setAttribute('data-theme', isDark ? '' : 'dark');
        document.getElementById('theme-toggle').innerText = isDark ? '🌙' : '☀️';
    });
});