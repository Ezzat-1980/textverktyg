Jag förstår absolut din oro\! Det är lätt att bli rädd att klicka fel med alla versioner och filer.

Här är den **kompletta och avancerade JavaScript-koden** som du ska använda. Denna kod ska ersätta allt innehåll i din `script.js`-fil.

```javascript
// Globala variabler
let textHistory = [];
let currentHistoryIndex = -1;

// DOM-element (Se till att dessa ID:n finns i din HTML!)
const inputText = document.getElementById('inputText');
const resultsContainer = document.getElementById('resultsContainer');
const resultsContent = document.getElementById('resultsContent');
const feedback = document.getElementById('feedback');

// Statistik-element (Se till att dessa ID:n finns i din HTML!)
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');
const charCountNoSpaces = document.getElementById('charCountNoSpaces');
const lineCount = document.getElementById('lineCount');
const paragraphCount = document.getElementById('paragraphCount');
const sentenceCount = document.getElementById('sentenceCount');
const readabilityScore = document.getElementById('readabilityScore');
const avgWordLength = document.getElementById('avgWordLength');

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Kontrollera om inputText finns innan event listener läggs till
    if (inputText) {
        inputText.addEventListener('input', updateStats);
    }
    
    // Verktygsknapparna
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            executeAction(action);
        });
    });
    
    // Kontrollknappar (Se till att dessa ID:n finns i din HTML!)
    const clearAllBtn = document.getElementById('clearAllBtn');
    const undoBtn = document.getElementById('undoBtn');
    const copyBtn = document.getElementById('copyBtn');
    const clearResultsBtn = document.getElementById('clearResultsBtn');

    if (clearAllBtn) clearAllBtn.addEventListener('click', clearAll);
    if (undoBtn) undoBtn.addEventListener('click', undo);
    if (copyBtn) copyBtn.addEventListener('click', copyText);
    if (clearResultsBtn) clearResultsBtn.addEventListener('click', clearResults);
    
    // Delningsknappar
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            shareOnSocialMedia(platform);
        });
    });
    
    // Initial statistikuppdatering (körs direkt när sidan laddas)
    updateStats();
});

// Huvudfunktion för att utföra åtgärder
function executeAction(action) {
    const text = inputText.value;
    if (!text.trim() && !['generateLorem', 'generateRandomWords'].includes(action)) {
        showFeedback('Vänligen ange text först!', 'error');
        return;
    }
    
    saveToHistory(); // Spara nuvarande text innan ändring
    
    let result;
    let showInResults = false; // Flagga för att visa resultat i separat ruta

    // Hämta sök/ersätt-fältens värden här, så de alltid är aktuella vid körning
    const searchText = document.getElementById('searchText') ? document.getElementById('searchText').value : '';
    const replaceText = document.getElementById('replaceText') ? document.getElementById('replaceText').value : '';
    const caseSensitive = document.getElementById('caseSensitive') ? document.getElementById('caseSensitive').checked : false;
    const useRegex = document.getElementById('useRegex') ? document.getElementById('useRegex').checked : false;

    // Hämta generering-fältens värden
    const loremWordsInput = document.getElementById('loremWords');
    const randomWordsCountInput = document.getElementById('randomWordsCount');
    const loremWords = loremWordsInput ? parseInt(loremWordsInput.value) : 50;
    const randomWordsCount = randomWordsCountInput ? parseInt(randomWordsCountInput.value) : 10;

    // Hämta prefix/suffix-fältens värden
    const prefixInput = document.getElementById('prefixInput');
    const suffixInput = document.getElementById('suffixInput');
    const prefix = prefixInput ? prefixInput.value : '';
    const suffix = suffixInput ? suffixInput.value : '';


    switch(action) {
        // Textomvandling
        case 'uppercase':
            result = text.toUpperCase();
            break;
        case 'lowercase':
            result = text.toLowerCase();
            break;
        case 'sentenceCase':
            result = toSentenceCase(text);
            break;
        case 'titleCase':
            result = toTitleCase(text);
            break;
        case 'camelCase':
            result = toCamelCase(text);
            break;
        case 'kebabCase':
            result = toKebabCase(text);
            break;
        case 'snakeCase':
            result = toSnakeCase(text);
            break;
            
        // Textmanipulation
        case 'reverseText':
            result = text.split('').reverse().join('');
            break;
        case 'reverseWords':
            result = text.split(/\s+/).reverse().join(' '); // Använder regex för att hantera flera mellanslag
            break;
        case 'reverseLines':
            result = text.split('\n').reverse().join('\n');
            break;
        case 'shuffleWords':
            result = shuffleArray(text.split(/\s+/)).join(' ');
            break;
        case 'shuffleLines':
            result = shuffleArray(text.split('\n')).join('\n');
            break;
        case 'sortLines':
            result = text.split('\n').sort().join('\n');
            break;
        case 'sortLinesDesc':
            result = text.split('\n').sort().reverse().join('\n');
            break;
            
        // Textrensning
        case 'removeExtraSpaces':
            result = text.replace(/\s+/g, ' ').trim();
            break;
        case 'removeEmptyLines':
            result = text.split('\n').filter(line => line.trim() !== '').join('\n');
            break;
        case 'removeNumbers':
            result = text.replace(/\d/g, '');
            break;
        case 'removeDuplicateLines':
            result = [...new Set(text.split('\n'))].join('\n'); // Enkel Set-baserad unicitet
            break;
        case 'removeSpecialChars':
            result = text.replace(/[^a-zA-ZÀ-ÿ0-9\s.,]/g, ''); // Behåller åäö och vanliga skiljetecken
            break;
        case 'removeHtmlTags':
            result = text.replace(/<[^>]*>/g, '');
            break;
        case 'trimLines':
            result = text.split('\n').map(line => line.trim()).join('\n');
            break;
            
        // Textformatering
        case 'addLineNumbers':
            result = text.split('\n').map((line, index) => `${index + 1}. ${line}`).join('\n');
            break;
        case 'addBulletPoints':
            result = text.split('\n').map(line => line.trim() ? `• ${line}` : line).join('\n');
            break;
        case 'addNumberedList':
            result = text.split('\n').map((line, index) => line.trim() ? `${index + 1}. ${line}` : line).join('\n');
            break;
        case 'indentText':
            result = text.split('\n').map(line => `    ${line}`).join('\n'); // Fyra mellanslag
            break;
        case 'wrapText':
            result = wrapText(text, 80); // Standardbredd 80 tecken
            break;
        case 'addPrefixSuffix':
            result = addPrefixSuffix(text, prefix, suffix); // Använder lokala prefix/suffix
            break;
            
        // Konvertering
        case 'toBase64':
            try {
                result = btoa(unescape(encodeURIComponent(text)));
            } catch (e) {
                showFeedback('Kunde inte konvertera till Base64. Ogiltiga tecken.', 'error');
                return;
            }
            break;
        case 'fromBase64':
            try {
                result = decodeURIComponent(escape(atob(text)));
            } catch (e) {
                showFeedback('Ogiltig Base64-sträng!', 'error');
                return;
            }
            break;
        case 'urlEncode':
            result = encodeURIComponent(text);
            break;
        case 'urlDecode':
            try {
                result = decodeURIComponent(text);
            } catch (e) {
                showFeedback('Ogiltig URL-kodad sträng!', 'error');
                return;
            }
            break;
        case 'toHtml':
            result = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
            break;
        case 'fromHtml':
            result = text.replace(/<br>/g, '\n').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
            break;
        case 'toJson':
            try {
                const linesArray = text.split('\n').map(line => line.trim());
                result = JSON.stringify(linesArray, null, 2); // Formattera med 2 mellanslag
            } catch (e) {
                showFeedback('Kunde inte konvertera till JSON. Kontrollera formatet.', 'error');
                return;
            }
            break;
            
        // Extrahera & Filtrera (Dessa anropar separata funktioner som visar i resultsContent)
        case 'extractEmails':
            result = extractEmails(text);
            showInResults = true;
            break;
        case 'extractUrls':
            result = extractUrls(text);
            showInResults = true;
            break;
        case 'extractNumbers':
            result = extractNumbers(text);
            showInResults = true;
            break;
        case 'extractPhones':
            result = extractPhones(text);
            showInResults = true;
            break;
        case 'extractUniqueWords':
            result = extractUniqueWords(text);
            showInResults = true;
            break;
        case 'wordFrequency':
            result = getWordFrequency(text);
            showInResults = true;
            break;
            
        // Sök och ersätt (Anropar separata funktioner)
        case 'replaceAll':
            result = performReplace(text, searchText, replaceText, caseSensitive, useRegex);
            break;
        case 'highlightMatches':
            result = highlightMatches(text, searchText, caseSensitive, useRegex);
            showInResults = true; // Visa markerad text i resultatrutan
            break;
            
        // Textgenerering
        case 'generateLorem':
            result = generateLoremIpsum(loremWords); // Använder lokalt ordantal
            break;
        case 'generateRandomWords':
            result = generateRandomWords(randomWordsCount); // Använder lokalt ordantal
            break;
            
        // Jämförelse
        case 'compareTexts':
            const compareTextInput = document.getElementById('compareText');
            const text2 = compareTextInput ? compareTextInput.value : '';
            result = compareTexts(text, text2);
            showInResults = true;
            break;
            
        default:
            showFeedback('Okänd åtgärd!', 'error');
            return;
    }
    
    // Bestäm om resultatet ska ändra inputText eller visas i resultsContainer
    if (showInResults) {
        showResults(result);
    } else {
        // För HTML-taggar och liknande, visa dem i resultsContent för att inte rendera dem i inputText
        if (action === 'highlightMatches' || action === 'toHtml') {
             showResults(result);
        } else {
             inputText.value = result;
             updateStats();
        }
    }
    
    showFeedback('Åtgärd utförd!', 'success');
}

// Hjälpfunktioner för textomvandling (Redan existerande i din gamla kod, men nu i executeAction)
function toSentenceCase(text) {
    // Gör om texten till gemener först för att säkerställa korrekt startpunkt
    text = text.toLowerCase();
    // Regex för att hitta första bokstaven i en mening (efter . ! ? följt av mellanslag, eller i början av texten)
    return text.replace(/(^\s*\w|[.!?]\s*\w)/g, match => match.toUpperCase());
}

function toTitleCase(text) {
    return text.replace(/\w\S*/g, txt => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
}

function toCamelCase(text) {
    return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
        index === 0 ? word.toLowerCase() : word.toUpperCase()
    ).replace(/\s+/g, '');
}

function toKebabCase(text) {
    return text.replace(/\s+/g, '-').toLowerCase();
}

function toSnakeCase(text) {
    return text.replace(/\s+/g, '_').toLowerCase();
}

// Hjälpfunktioner för manipulation
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function wrapText(text, width) {
    // Bryter texten vid ordgränser, inte mitt i ord
    const regex = new RegExp(`(.{1,${width}})(\\s|$)|(.{${width}})`, 'g');
    return text.replace(regex, function(match, grp1, grp2, grp3) {
        if (grp1) return grp1 + '\n';
        if (grp3) return grp3 + '\n';
        return match + '\n';
    }).trim();
}

function addPrefixSuffix(text, prefix, suffix) {
    return text.split('\n').map(line => 
        line.trim() ? `${prefix}${line}${suffix}` : line
    ).join('\n');
}

// Extraktionsfunktioner
function extractEmails(text) {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emails = text.match(emailRegex) || [];
    return [...new Set(emails)].join('\n');
}

function extractUrls(text) {
    const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/[a-zA-Z0-9]+\.[^\s]{2,}|[a-zA-Z0-9]+\.[^\s]{2,})/g;
    const urls = text.match(urlRegex) || [];
    return [...new Set(urls)].join('\n');
}

function extractNumbers(text) {
    const numberRegex = /\d+/g; // Matchar en eller flera siffror
    const numbers = text.match(numberRegex) || [];
    return [...new Set(numbers)].join('\n');
}

function extractPhones(text) {
    // Enkel regex för telefonnummer, kan behöva anpassas för specifika format
    const phoneRegex = /(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?[\d\-.\s]{7,}/g; 
    const phones = text.match(phoneRegex) || [];
    return [...new Set(phones)].join('\n');
}

function extractUniqueWords(text) {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    return [...new Set(words)].sort().join('\n');
}

function getWordFrequency(text) {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const frequency = {};
    
    words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
    });
    
    return Object.entries(frequency)
        .sort((a, b) => b[1] - a[1]) // Sortera efter frekvens (högst först)
        .map(([word, count]) => `${word}: ${count}`)
        .join('\n');
}

// Sök och ersätt funktioner
function performReplace(text, searchText, replaceText, caseSensitive, useRegex) {
    if (!searchText) {
        showFeedback('Ange text att söka efter!', 'error');
        return text;
    }
    
    try {
        const flags = caseSensitive ? 'g' : 'gi'; // 'g' för global, 'i' för skiftlägesokänslig
        let regexPattern = useRegex ? searchText : escapeRegExp(searchText);
        const regex = new RegExp(regexPattern, flags);
        return text.replace(regex, replaceText);
    } catch (e) {
        showFeedback('Ogiltigt reguljärt uttryck!', 'error');
        return text;
    }
}

function highlightMatches(text, searchText, caseSensitive, useRegex) {
    if (!searchText) {
        showFeedback('Ange text att söka efter!', 'error');
        return text;
    }
    
    try {
        const flags = caseSensitive ? 'g' : 'gi';
        let regexPattern = useRegex ? searchText : escapeRegExp(searchText);
        const regex = new RegExp(regexPattern, flags);
        // Använd en tillfällig placeholder för att undvika att mark-taggar matchas av regex
        const placeholder = '___HIGHLIGHT_START___';
        const endPlaceholder = '___HIGHLIGHT_END___';

        let highlightedText = text.replace(regex, match => `${placeholder}${match}${endPlaceholder}`);
        highlightedText = highlightedText.replace(new RegExp(placeholder, 'g'), '<mark>');
        highlightedText = highlightedText.replace(new RegExp(endPlaceholder, 'g'), '</mark>');
        
        return highlightedText;
    } catch (e) {
        showFeedback('Ogiltigt reguljärt uttryck!', 'error');
        return text;
    }
}

function escapeRegExp(string) {
    // Escapar specialtecken för att de ska behandlas som bokstavliga strängar i regex
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Textgenerering
function generateLoremIpsum(wordCount) {
    const loremWords = [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
        'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
        'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
        'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
        'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
        'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
        'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
        'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
    ];
    
    let result = [];
    for (let i = 0; i < wordCount; i++) {
        result.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
    }
    
    return result.join(' ');
}

function generateRandomWords(wordCount) {
    const randomWords = [
        'hus', 'bil', 'träd', 'bok', 'dator', 'telefon', 'katt', 'hund', 'fågel', 'fisk',
        'sol', 'måne', 'stjärna', 'himmel', 'hav', 'berg', 'skog', 'blomma', 'gräs', 'sten',
        'mat', 'vatten', 'eld', 'luft', 'tid', 'rum', 'musik', 'konst', 'sport', 'spel',
        'vän', 'familj', 'kärlek', 'glädje', 'sorg', 'hopp', 'dröm', 'tanke', 'idé', 'plan'
    ];
    
    let result = [];
    for (let i = 0; i < wordCount; i++) {
        result.push(randomWords[Math.floor(Math.random() * randomWords.length)]);
    }
    
    return result.join(' ');
}

// Jämförelse
function compareTexts(text1, text2) { // Tar nu in båda texterna som argument
    if (!text2.trim()) {
        showFeedback('Ange text att jämföra med i jämförelsefältet!', 'error');
        return 'Ingen jämförelsetext angiven.';
    }
    
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLines = Math.max(lines1.length, lines2.length);
    
    let differences = [];
    for (let i = 0; i < maxLines; i++) {
        const line1 = lines1[i] || '';
        const line2 = lines2[i] || '';
        
        if (line1 !== line2) {
            differences.push(`Rad ${i + 1}:`);
            differences.push(`  Text 1: ${line1}`);
            differences.push(`  Text 2: ${line2}`);
            differences.push(''); // Lägg till en tom rad för läsbarhet
        }
    }
    
    if (differences.length === 0) {
        return 'Texterna är identiska.';
    }
    
    return `Skillnader hittade:\n\n${differences.join('\n')}`;
}

// Statistikfunktioner
function updateStats() {
    const text = inputText.value;
    
    // Grundläggande räkning
    const words = text.trim() ? text.trim().split(/\s+/) : [];
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const lines = text.split('\n').length;
    const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).filter(p => p.trim() !== '').length : 0; // Filter tomma stycken
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    
    // Genomsnittlig ordlängd
    const avgWordLen = words.length > 0 ? 
        (words.reduce((sum, word) => sum + word.length, 0) / words.length).toFixed(1) : 0;
    
    // Läsbarhet (förenklad Flesch-formel för svenska)
    const readability = calculateReadability(text, words.length, sentences);
    
    // Uppdatera DOM
    wordCount.textContent = words.length;
    charCount.textContent = chars;
    charCountNoSpaces.textContent = charsNoSpaces;
    lineCount.textContent = lines;
    paragraphCount.textContent = paragraphs;
    sentenceCount.textContent = sentences;
    avgWordLength.textContent = avgWordLen;
    readabilityScore.textContent = readability;
}

function calculateReadability(text, wordCount, sentenceCount) {
    if (wordCount === 0 || sentenceCount === 0) return '-';
    
    const syllables = countSyllables(text);
    const avgWordsPerSentence = wordCount / sentenceCount;
    const avgSyllablesPerWord = syllables / wordCount;
    
    // Förenklad Flesch Reading Ease (anpassad för svenska, ungefärliga koefficienter)
    const score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
    
    return Math.max(0, Math.min(100, Math.round(score)));
}

function countSyllables(text) {
    // Enkel stavelsesräkning för svenska: räkna vokalgrupper
    // Detta är en approximation och kan vara felaktig för komplexa ord
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    let syllableCount = 0;
    
    words.forEach(word => {
        // Enkel regex för vokalgrupper (aeiouyåäö)
        const matches = word.match(/[aeiouyåäö]+/g);
        syllableCount += matches ? matches.length : 1; // Minst 1 stavelse per ord
    });
    
    return syllableCount;
}

// Hjälpfunktioner
function saveToHistory() {
    const currentText = inputText.value;
    // Klipp av historiken om användaren ångrat sig och skriver ny text
    textHistory = textHistory.slice(0, currentHistoryIndex + 1);
    textHistory.push(currentText);
    currentHistoryIndex = textHistory.length - 1;
    
    // Begränsa historiken för att inte använda för mycket minne
    if (textHistory.length > 50) {
        textHistory.shift(); // Ta bort äldsta posten
        currentHistoryIndex--;
    }
}

function undo() {
    if (currentHistoryIndex > 0) {
        currentHistoryIndex--;
        inputText.value = textHistory[currentHistoryIndex];
        updateStats();
        showFeedback('Ångrad!', 'info');
    } else {
        showFeedback('Inget att ångra!', 'error');
    }
}

function clearAll() {
    saveToHistory(); // Spara innan rensning så man kan ångra rensningen
    inputText.value = '';
    updateStats();
    clearResults();
    showFeedback('Allt rensat!', 'info');
}

function copyText() {
    inputText.select(); // Markera texten
    inputText.setSelectionRange(0, 99999); // För mobila enheter
    document.execCommand('copy'); // Kopiera
    showFeedback('Text kopierad!', 'success');
}

function showResults(content) {
    resultsContent.innerHTML = content; // Använd innerHTML för markerad text
    resultsContainer.style.display = 'block';
}

function clearResults() {
    resultsContainer.style.display = 'none';
    resultsContent.innerHTML = ''; // Rensa innehållet också
}

function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = `feedback ${type} show`;
    
    // Ta bort feedback efter 3 sekunder
    setTimeout(() => {
        feedback.classList.remove('show');
    }, 3000);
}

function shareOnSocialMedia(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Kolla in detta fantastiska textverktyg!'); // Standardmeddelande
    
    let shareUrl;
    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        default:
            return; // Ingen känd plattform
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400'); // Öppna i nytt fönster
}
```