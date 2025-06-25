        // Här kommer all din JavaScript-funktionalitet

        // Funktion för att uppdatera statistik (Oförändrad)
        function updateStats() {
            const text = document.getElementById(\'textInput\').value;
            const words = text.match(/\\b\\w+\\b/g);
            const wordCount = words ? words.length : 0;
            const charCount = text.length;
            const charNoSpaceCount = text.replace(/\\s/g, \'\').length;

            document.getElementById(\'wordCount\').textContent = wordCount;
            document.getElementById(\'charCount\').textContent = charCount;
            document.getElementById(\'charNoSpaceCount\').textContent = charNoSpaceCount;
        }

        // Funktioner för textomvandling (Oförändrade)
        function convertToUppercase() {
            const textInput = document.getElementById(\'textInput\');
            textInput.value = textInput.value.toUpperCase();
            updateStats();
        }

        function convertToLowercase() {
            const textInput = document.getElementById(\'textInput\');
            textInput.value = textInput.value.toLowerCase();
            updateStats();
        }

        function convertToSentenceCase() {
            const textInput = document.getElementById(\'textInput\');
            let text = textInput.value.toLowerCase();
            text = text.replace(/(^\\s*\\w|[.!?]\\s*\\w)/g, function(match) {
                return match.toUpperCase();
            });
            textInput.value = text;
            updateStats();
        }

        function convertToTitleCase() {
            const textInput = document.getElementById(\'textInput\');
            let text = textInput.value.toLowerCase();
            text = text.replace(/\\b\\w/g, function(char) {
                return char.toUpperCase();
            });
            textInput.value = text;
            updateStats();
        }

        // NYTT: Funktioner för textmanipulation
        function reverseText() {
            const textInput = document.getElementById(\'textInput\');
            // Delar upp strängen i en array av tecken, vänder på arrayen, och sätter ihop den igen
            textInput.value = textInput.value.split(\'\').reverse().join(\'\');
            updateStats();
        }

        function reverseWordOrder() {
            const textInput = document.getElementById(\'textInput\');
            // Delar upp strängen i en array av ord (separerade med ett eller flera mellanslag)
            // Vänder på arrayen och sätter ihop den igen med ett mellanslag mellan varje ord
            textInput.value = textInput.value.split(/\\s+/).reverse().join(\' \');
            updateStats();
        }

        // Funktioner för textrensning (Oförändrade)
        function removeExtraSpaces() {
            const textInput = document.getElementById(\'textInput\');
            let text = textInput.value.replace(/\\s+/g, \' \').trim();
            textInput.value = text;
            updateStats();
        }

        function removeEmptyLines() {
            const textInput = document.getElementById(\'textInput\');
            let lines = textInput.value.split(\'\\n\');
            let filteredLines = lines.filter(line => line.trim() !== \'\');
            textInput.value = filteredLines.join(\'\\n\');
            updateStats();
        }

        function removeNumbers() {
            const textInput = document.getElementById(\'textInput\');
            let text = textInput.value.replace(/\\d/g, \'\');
            textInput.value = text;
            updateStats();
        }

        function removeDuplicateLines() {
            const textInput = document.getElementById(\'textInput\');
            const lines = textInput.value.split(\'\\n\');
            const uniqueLines = [...new Set(lines.map(line => line.trim()))];
            const filteredUniqueLines = uniqueLines.filter(line => line !== \'\');
            textInput.value = filteredUniqueLines.join(\'\\n\');
            updateStats();
        }

        function clearText() {
            const textInput = document.getElementById(\'textInput\');
            textInput.value = \'\';
            updateStats();
        }

        // Funktioner för Extrahera & Filtrera (Oförändrade)
        function extractEmails() {
            const text = document.getElementById(\'textInput\').value;
            const resultDiv = document.getElementById(\'extractionResult\');

            const emailRegex = /\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b/g;
            const foundEmails = text.match(emailRegex);

            if (foundEmails && foundEmails.length > 0) {
                const uniqueEmails = [...new Set(foundEmails)].sort();
                resultDiv.textContent = uniqueEmails.join(\'\\n\');
            } else {
                resultDiv.textContent = \"Inga e-postadresser hittades.\";
            }
        }

        function extractURLs() {
            const text = document.getElementById(\'textInput\').value;
            const resultDiv = document.getElementById(\'extractionResult\');

            const urlRegex = /(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/[a-zA-Z0-9]+\\.[^\\s]{2,}|[a-zA-Z0-9]+\\.[^\\s]{2,})/g;
            const foundURLs = text.match(urlRegex);

            if (foundURLs && foundURLs.length > 0) {
                const uniqueURLs = [...new Set(foundURLs)].sort();
                resultDiv.textContent = uniqueURLs.join(\'\\n\');
            } else {
                resultDiv.textContent = \"Inga URL:er hittades.\";
            }
        }

        function clearExtractionResult() {
            document.getElementById(\'extractionResult\').textContent = \"Här visas extraherade e-postadresser, URL:er eller andra resultat.\";
        }

        // Funktion för Sök och Ersätt (Oförändrad)
        function findAndReplace() {
            const textInput = document.getElementById(\'textInput\');
            const findText = document.getElementById(\'findInput\').value;
            const replaceText = document.getElementById(\'replaceInput\').value;

            if (!findText) {
                alert(\"Vänligen ange text att söka efter.\");
                return;
            }

            const escapedFindText = findText.replace(/[.*+?^${}()|[\]\\\\]/g, \'\\\\$&\');
            const regex = new RegExp(escapedFindText, \'g\');

            textInput.value = textInput.value.replace(regex, replaceText);
            updateStats();
        }

    </script>

