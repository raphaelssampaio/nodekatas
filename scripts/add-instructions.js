#!/usr/bin/env node
/**
 * add-instructions.js
 * 
 * Adds a multilingual `instructions` field to every exercise JSON file that
 * doesn't already have one.  The instructions are derived from each exercise's
 * `id`, `starter` code, and `tests` so they are always actionable and specific.
 */

const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '../src/data/exercises');

// Map from exercise id → multilingual instructions
const INSTRUCTIONS = {
  '01-hello-node': {
    en: 'Implement the `getNodeVersion()` function so that it returns the current Node.js version string (e.g. `"v20.11.0"`). Use the global `process` object — no import needed.',
    pt: 'Implemente a função `getNodeVersion()` para que ela retorne a string da versão do Node.js em execução (ex.: `"v20.11.0"`). Use o objeto global `process` — nenhum import é necessário.',
    es: 'Implementa la función `getNodeVersion()` para que devuelva la cadena de versión de Node.js en ejecución (ej.: `"v20.11.0"`). Usa el objeto global `process` — no se necesita ningún import.',
    de: 'Implementiere die Funktion `getNodeVersion()` so, dass sie den aktuellen Node.js-Versionsstring zurückgibt (z. B. `"v20.11.0"`). Verwende das globale Objekt `process` — kein Import nötig.',
    it: 'Implementa la funzione `getNodeVersion()` in modo che restituisca la stringa della versione di Node.js in esecuzione (es. `"v20.11.0"`). Usa l\'oggetto globale `process` — nessun import necessario.',
    fr: 'Implémente la fonction `getNodeVersion()` pour qu\'elle retourne la chaîne de version de Node.js en cours d\'exécution (ex. : `"v20.11.0"`). Utilise l\'objet global `process` — aucun import nécessaire.',
  },
  '02-modules': {
    en: 'Implement `add(a, b)` to return the sum of two numbers, and `multiply(a, b)` to return their product. Both functions are already exported via `module.exports` — just fill in the function bodies.',
    pt: 'Implemente `add(a, b)` para retornar a soma de dois números e `multiply(a, b)` para retornar o produto deles. Ambas já são exportadas via `module.exports` — apenas preencha os corpos das funções.',
    es: 'Implementa `add(a, b)` para devolver la suma de dos números y `multiply(a, b)` para devolver su producto. Ambas funciones ya se exportan con `module.exports` — solo rellena los cuerpos.',
    de: 'Implementiere `add(a, b)`, um die Summe zweier Zahlen zurückzugeben, und `multiply(a, b)`, um ihr Produkt zurückzugeben. Beide Funktionen werden bereits über `module.exports` exportiert — fülle nur die Funktionsrümpfe aus.',
    it: 'Implementa `add(a, b)` per restituire la somma di due numeri e `multiply(a, b)` per restituire il loro prodotto. Entrambe le funzioni sono già esportate tramite `module.exports` — compila solo i corpi delle funzioni.',
    fr: 'Implémente `add(a, b)` pour retourner la somme de deux nombres et `multiply(a, b)` pour retourner leur produit. Les deux fonctions sont déjà exportées via `module.exports` — remplis simplement les corps des fonctions.',
  },
  '03-fs-read': {
    en: 'Implement `readFileContent(path)` as an async function that reads the file at the given path and returns its content as a UTF-8 string. Use `fs.promises.readFile` — the `fs` module is already required at the top.',
    pt: 'Implemente `readFileContent(path)` como uma função async que lê o arquivo no caminho dado e retorna seu conteúdo como string UTF-8. Use `fs.promises.readFile` — o módulo `fs` já está importado no topo.',
    es: 'Implementa `readFileContent(path)` como una función async que lea el archivo en la ruta dada y devuelva su contenido como cadena UTF-8. Usa `fs.promises.readFile` — el módulo `fs` ya está requerido arriba.',
    de: 'Implementiere `readFileContent(path)` als async-Funktion, die die Datei am angegebenen Pfad liest und deren Inhalt als UTF-8-String zurückgibt. Verwende `fs.promises.readFile` — das `fs`-Modul ist bereits oben eingebunden.',
    it: 'Implementa `readFileContent(path)` come funzione async che legge il file al percorso dato e ne restituisce il contenuto come stringa UTF-8. Usa `fs.promises.readFile` — il modulo `fs` è già importato in cima.',
    fr: 'Implémente `readFileContent(path)` comme une fonction async qui lit le fichier au chemin donné et retourne son contenu sous forme de chaîne UTF-8. Utilise `fs.promises.readFile` — le module `fs` est déjà requis en haut.',
  },
  '04-event-emitter': {
    en: 'Complete the `DataEmitter` class so that it extends `EventEmitter` and its `send(value)` method emits a `"data"` event carrying that value. Replace both `__fill_me__` placeholders.',
    pt: 'Complete a classe `DataEmitter` para que ela estenda `EventEmitter` e seu método `send(value)` emita um evento `"data"` com o valor recebido. Substitua os dois `__fill_me__`.',
    es: 'Completa la clase `DataEmitter` para que extienda `EventEmitter` y su método `send(value)` emita un evento `"data"` con ese valor. Reemplaza los dos `__fill_me__`.',
    de: 'Vervollständige die Klasse `DataEmitter`, sodass sie `EventEmitter` erweitert und ihre Methode `send(value)` ein `"data"`-Event mit dem übergebenen Wert auslöst. Ersetze beide `__fill_me__`-Platzhalter.',
    it: 'Completa la classe `DataEmitter` in modo che estenda `EventEmitter` e il suo metodo `send(value)` emetta un evento `"data"` con quel valore. Sostituisci entrambi i `__fill_me__`.',
    fr: 'Complète la classe `DataEmitter` pour qu\'elle étende `EventEmitter` et que sa méthode `send(value)` émette un événement `"data"` portant cette valeur. Remplace les deux `__fill_me__`.',
  },
  '05-http-server': {
    en: 'Implement `createServer()` so it returns an HTTP server that responds with the plain-text string `"Hello, Node!"` to every request, regardless of the URL or method. Use `res.end(...)` to send the response.',
    pt: 'Implemente `createServer()` para que retorne um servidor HTTP que responda com a string de texto simples `"Hello, Node!"` a qualquer requisição, independentemente da URL ou método. Use `res.end(...)` para enviar a resposta.',
    es: 'Implementa `createServer()` para que devuelva un servidor HTTP que responda con el texto plano `"Hello, Node!"` a cualquier solicitud, sin importar la URL o el método. Usa `res.end(...)` para enviar la respuesta.',
    de: 'Implementiere `createServer()`, sodass es einen HTTP-Server zurückgibt, der auf jede Anfrage mit dem Klartext `"Hello, Node!"` antwortet, unabhängig von URL oder Methode. Sende die Antwort mit `res.end(...)`.',
    it: 'Implementa `createServer()` in modo che restituisca un server HTTP che risponde con la stringa di testo semplice `"Hello, Node!"` a ogni richiesta, indipendentemente dall\'URL o dal metodo. Usa `res.end(...)` per inviare la risposta.',
    fr: 'Implémente `createServer()` pour qu\'il retourne un serveur HTTP répondant avec la chaîne de texte brut `"Hello, Node!"` à chaque requête, quelle que soit l\'URL ou la méthode. Utilise `res.end(...)` pour envoyer la réponse.',
  },
  '06-http-routing': {
    en: 'Fill in the two `__fill_me__` statements inside `createServer()`: respond with `"Hello!"` when the route is `GET /hello`, and with `"Bye!"` when it\'s `GET /bye`. All other routes already return 404.',
    pt: 'Preencha as duas instruções `__fill_me__` dentro de `createServer()`: responda com `"Hello!"` na rota `GET /hello` e com `"Bye!"` na rota `GET /bye`. Todas as outras rotas já retornam 404.',
    es: 'Rellena las dos instrucciones `__fill_me__` dentro de `createServer()`: responde con `"Hello!"` en la ruta `GET /hello` y con `"Bye!"` en `GET /bye`. El resto de rutas ya devuelven 404.',
    de: 'Fülle die beiden `__fill_me__`-Anweisungen in `createServer()` aus: Antworte mit `"Hello!"` für die Route `GET /hello` und mit `"Bye!"` für `GET /bye`. Alle anderen Routen geben bereits 404 zurück.',
    it: 'Compila le due istruzioni `__fill_me__` all\'interno di `createServer()`: rispondi con `"Hello!"` per la rotta `GET /hello` e con `"Bye!"` per `GET /bye`. Tutte le altre rotte restituiscono già 404.',
    fr: 'Remplis les deux instructions `__fill_me__` dans `createServer()` : réponds avec `"Hello!"` pour la route `GET /hello` et avec `"Bye!"` pour `GET /bye`. Toutes les autres routes renvoient déjà 404.',
  },
  '07-http-json-response': {
    en: 'Implement `createServer()` so it returns a server that responds to every request with a JSON body `{"message":"ok"}`, a `Content-Type: application/json` header, and a `200` status code.',
    pt: 'Implemente `createServer()` para que retorne um servidor que responda a toda requisição com o corpo JSON `{"message":"ok"}`, o cabeçalho `Content-Type: application/json` e status `200`.',
    es: 'Implementa `createServer()` para que devuelva un servidor que responda a cada solicitud con el cuerpo JSON `{"message":"ok"}`, el encabezado `Content-Type: application/json` y el estado `200`.',
    de: 'Implementiere `createServer()`, sodass ein Server zurückgegeben wird, der auf jede Anfrage mit dem JSON-Body `{"message":"ok"}`, dem Header `Content-Type: application/json` und Status `200` antwortet.',
    it: 'Implementa `createServer()` in modo che restituisca un server che risponda a ogni richiesta con il corpo JSON `{"message":"ok"}`, l\'header `Content-Type: application/json` e lo status `200`.',
    fr: 'Implémente `createServer()` pour qu\'il retourne un serveur répondant à chaque requête avec le corps JSON `{"message":"ok"}`, l\'en-tête `Content-Type: application/json` et le statut `200`.',
  },
  '08-npm-scripts': {
    en: 'Study the starter code and implement the missing utility functions so that each npm script task (lint, format, test run, etc.) is correctly wired. Replace every `__fill_me__` placeholder with the appropriate value or logic.',
    pt: 'Estude o código inicial e implemente as funções utilitárias faltantes para que cada tarefa de script npm (lint, formato, execução de testes, etc.) esteja corretamente configurada. Substitua cada `__fill_me__` pelo valor ou lógica adequada.',
    es: 'Estudia el código inicial e implementa las funciones utilitarias que faltan para que cada tarea de script npm (lint, formato, ejecución de pruebas, etc.) esté correctamente configurada. Reemplaza cada `__fill_me__` por el valor o la lógica adecuada.',
    de: 'Untersuche den Startercode und implementiere die fehlenden Hilfsfunktionen, sodass jede npm-Skript-Aufgabe (Lint, Format, Testausführung usw.) korrekt verdrahtet ist. Ersetze jeden `__fill_me__`-Platzhalter durch den passenden Wert oder die passende Logik.',
    it: 'Studia il codice iniziale e implementa le funzioni utilitarie mancanti affinché ogni task dello script npm (lint, formato, esecuzione test, ecc.) sia correttamente configurato. Sostituisci ogni `__fill_me__` con il valore o la logica appropriata.',
    fr: 'Étudie le code de départ et implémente les fonctions utilitaires manquantes pour que chaque tâche de script npm (lint, format, exécution des tests, etc.) soit correctement câblée. Remplace chaque `__fill_me__` par la valeur ou la logique appropriée.',
  },
  '09-es6-syntax': {
    en: 'Refactor the starter code to use modern ES6+ syntax: arrow functions, destructuring, template literals, `const`/`let`, spread/rest operators, and default parameters. Every `__fill_me__` marks a spot where you must apply an ES6 feature.',
    pt: 'Refatore o código inicial para usar sintaxe ES6+ moderna: arrow functions, destructuring, template literals, `const`/`let`, operadores spread/rest e parâmetros padrão. Cada `__fill_me__` indica um ponto onde você deve aplicar um recurso ES6.',
    es: 'Refactoriza el código inicial para usar sintaxis ES6+ moderna: arrow functions, destructuring, template literals, `const`/`let`, operadores spread/rest y parámetros por defecto. Cada `__fill_me__` indica un lugar donde debes aplicar una característica ES6.',
    de: 'Refaktoriere den Startercode, um moderne ES6+-Syntax zu verwenden: Pfeilfunktionen, Destructuring, Template Literals, `const`/`let`, Spread-/Rest-Operatoren und Standardparameter. Jedes `__fill_me__` markiert eine Stelle, an der ein ES6-Feature anzuwenden ist.',
    it: 'Refactoring del codice iniziale per usare la sintassi ES6+ moderna: arrow function, destructuring, template literal, `const`/`let`, operatori spread/rest e parametri di default. Ogni `__fill_me__` indica un punto in cui applicare una funzionalità ES6.',
    fr: 'Refactorise le code de départ pour utiliser la syntaxe ES6+ moderne : arrow functions, destructuring, template literals, `const`/`let`, opérateurs spread/rest et paramètres par défaut. Chaque `__fill_me__` indique un endroit où tu dois appliquer une fonctionnalité ES6.',
  },
  '10-promises-async-await': {
    en: 'Complete `fetchData()` so that the Promise resolves (after the 10 ms timeout) with the object `{ status: "ok" }`. Replace `__fill_me__` inside the `setTimeout` callback with a call to `resolve`.',
    pt: 'Complete `fetchData()` para que a Promise resolva (após o timeout de 10 ms) com o objeto `{ status: "ok" }`. Substitua `__fill_me__` dentro do callback do `setTimeout` por uma chamada a `resolve`.',
    es: 'Completa `fetchData()` para que la Promise se resuelva (tras el timeout de 10 ms) con el objeto `{ status: "ok" }`. Reemplaza `__fill_me__` dentro del callback de `setTimeout` con una llamada a `resolve`.',
    de: 'Vervollständige `fetchData()`, sodass das Promise (nach dem 10-ms-Timeout) mit dem Objekt `{ status: "ok" }` aufgelöst wird. Ersetze `__fill_me__` im `setTimeout`-Callback durch einen Aufruf von `resolve`.',
    it: 'Completa `fetchData()` in modo che la Promise si risolva (dopo il timeout di 10 ms) con l\'oggetto `{ status: "ok" }`. Sostituisci `__fill_me__` all\'interno del callback `setTimeout` con una chiamata a `resolve`.',
    fr: 'Complète `fetchData()` pour que la Promise se résolve (après le délai de 10 ms) avec l\'objet `{ status: "ok" }`. Remplace `__fill_me__` dans le callback `setTimeout` par un appel à `resolve`.',
  },
  '11-express-setup': {
    en: 'Inside `createApp()`, make the `GET /` route respond with the plain-text string `"Hello, Express!"` using `res.send(...)`. The Express app is already created and returned — only the route handler body is missing.',
    pt: 'Dentro de `createApp()`, faça a rota `GET /` responder com a string de texto simples `"Hello, Express!"` usando `res.send(...)`. O app Express já está criado e retornado — apenas o corpo do handler de rota está faltando.',
    es: 'Dentro de `createApp()`, haz que la ruta `GET /` responda con la cadena de texto plano `"Hello, Express!"` usando `res.send(...)`. El app de Express ya está creado y retornado — solo falta el cuerpo del handler de ruta.',
    de: 'Lass die Route `GET /` in `createApp()` mit dem Klartext `"Hello, Express!"` antworten, indem du `res.send(...)` verwendest. Die Express-App ist bereits erstellt und zurückgegeben — nur der Handler-Rumpf fehlt.',
    it: 'All\'interno di `createApp()`, fai rispondere la rotta `GET /` con la stringa di testo semplice `"Hello, Express!"` usando `res.send(...)`. L\'app Express è già creata e restituita — manca solo il corpo del handler della rotta.',
    fr: 'À l\'intérieur de `createApp()`, fais répondre la route `GET /` avec la chaîne de texte brut `"Hello, Express!"` en utilisant `res.send(...)`. L\'app Express est déjà créée et retournée — seul le corps du handler de route manque.',
  },
  '12-express-routes': {
    en: 'Add two Express route handlers inside `createApp()`: `GET /users` must respond with the JSON array of user objects, and `GET /users/:id` must return the single matching user object (or `404` if not found). Replace the `__fill_me__` placeholders.',
    pt: 'Adicione dois handlers de rota Express dentro de `createApp()`: `GET /users` deve responder com o array JSON de usuários, e `GET /users/:id` deve retornar o usuário correspondente (ou `404` se não encontrado). Substitua os `__fill_me__`.',
    es: 'Agrega dos handlers de ruta Express en `createApp()`: `GET /users` debe responder con el array JSON de usuarios, y `GET /users/:id` debe devolver el usuario correspondiente (o `404` si no se encuentra). Reemplaza los `__fill_me__`.',
    de: 'Füge in `createApp()` zwei Express-Route-Handler hinzu: `GET /users` soll mit dem JSON-Array der Benutzer antworten, und `GET /users/:id` soll den passenden Benutzer zurückgeben (oder `404`, wenn nicht gefunden). Ersetze die `__fill_me__`-Platzhalter.',
    it: 'Aggiungi due handler di rotta Express all\'interno di `createApp()`: `GET /users` deve rispondere con l\'array JSON degli utenti, e `GET /users/:id` deve restituire l\'utente corrispondente (o `404` se non trovato). Sostituisci i `__fill_me__`.',
    fr: 'Ajoute deux handlers de route Express dans `createApp()` : `GET /users` doit répondre avec le tableau JSON des utilisateurs, et `GET /users/:id` doit retourner l\'utilisateur correspondant (ou `404` s\'il n\'est pas trouvé). Remplace les `__fill_me__`.',
  },
  '13-express-middleware': {
    en: 'Implement the `requestLogger` middleware function that logs `"[METHOD] /path"` to the console and then calls `next()` to pass control to the next handler. Register it globally on the Express app before any route handlers.',
    pt: 'Implemente a função middleware `requestLogger` que registra `"[MÉTODO] /caminho"` no console e depois chama `next()` para passar o controle ao próximo handler. Registre-a globalmente no app Express antes de qualquer handler de rota.',
    es: 'Implementa la función middleware `requestLogger` que registre `"[MÉTODO] /ruta"` en la consola y luego llame a `next()` para pasar el control al siguiente handler. Regístrala globalmente en el app de Express antes de cualquier handler de ruta.',
    de: 'Implementiere die Middleware-Funktion `requestLogger`, die `"[METHODE] /Pfad"` in der Konsole ausgibt und dann `next()` aufruft, um die Kontrolle an den nächsten Handler weiterzugeben. Registriere sie global in der Express-App vor allen Route-Handlern.',
    it: 'Implementa la funzione middleware `requestLogger` che registra `"[METODO] /percorso"` nella console e poi chiama `next()` per passare il controllo al handler successivo. Registrala globalmente sull\'app Express prima di qualsiasi handler di rotta.',
    fr: 'Implémente la fonction middleware `requestLogger` qui journalise `"[MÉTHODE] /chemin"` dans la console puis appelle `next()` pour passer le contrôle au handler suivant. Enregistre-la globalement sur l\'app Express avant tout handler de route.',
  },
  '14-express-post-body': {
    en: 'Set up `express.json()` middleware so the app can parse JSON request bodies, then implement the `POST /echo` route that responds with the request body as-is. Replace the `__fill_me__` placeholders.',
    pt: 'Configure o middleware `express.json()` para que o app possa processar corpos de requisição JSON, depois implemente a rota `POST /echo` que responde com o corpo da requisição como ele veio. Substitua os `__fill_me__`.',
    es: 'Configura el middleware `express.json()` para que el app pueda procesar cuerpos de solicitud JSON, luego implementa la ruta `POST /echo` que responde con el cuerpo de la solicitud tal cual. Reemplaza los `__fill_me__`.',
    de: 'Richte die `express.json()`-Middleware ein, damit die App JSON-Request-Bodies parsen kann, und implementiere dann die Route `POST /echo`, die den Request-Body unverändert zurückgibt. Ersetze die `__fill_me__`-Platzhalter.',
    it: 'Imposta il middleware `express.json()` affinché l\'app possa analizzare i corpi delle richieste JSON, poi implementa la rotta `POST /echo` che risponde con il corpo della richiesta così com\'è. Sostituisci i `__fill_me__`.',
    fr: 'Configure le middleware `express.json()` pour que l\'app puisse analyser les corps de requête JSON, puis implémente la route `POST /echo` qui répond avec le corps de la requête tel quel. Remplace les `__fill_me__`.',
  },
  '15-express-error-handling': {
    en: 'Add a global Express error-handling middleware (4-argument function: `err, req, res, next`) that responds with status `500` and the JSON body `{ error: err.message }`. Also make the `GET /boom` route throw an error so the middleware is triggered.',
    pt: 'Adicione um middleware global de tratamento de erros do Express (função com 4 argumentos: `err, req, res, next`) que responda com status `500` e o corpo JSON `{ error: err.message }`. Também faça a rota `GET /boom` lançar um erro para que o middleware seja acionado.',
    es: 'Agrega un middleware global de manejo de errores de Express (función de 4 argumentos: `err, req, res, next`) que responda con estado `500` y el cuerpo JSON `{ error: err.message }`. También haz que la ruta `GET /boom` lance un error para que el middleware se active.',
    de: 'Füge eine globale Express-Fehlerbehandlungs-Middleware (4-Argument-Funktion: `err, req, res, next`) hinzu, die mit Status `500` und dem JSON-Body `{ error: err.message }` antwortet. Lass die Route `GET /boom` außerdem einen Fehler werfen, damit die Middleware ausgelöst wird.',
    it: 'Aggiungi un middleware globale di gestione degli errori Express (funzione a 4 argomenti: `err, req, res, next`) che risponda con status `500` e il corpo JSON `{ error: err.message }`. Fai anche in modo che la rotta `GET /boom` lanci un errore per attivare il middleware.',
    fr: 'Ajoute un middleware global de gestion des erreurs Express (fonction à 4 arguments : `err, req, res, next`) qui répond avec le statut `500` et le corps JSON `{ error: err.message }`. Fais également en sorte que la route `GET /boom` lance une erreur pour déclencher le middleware.',
  },
  '16-fs-write': {
    en: 'Implement `writeFileContent(path, data)` as an async function that writes the given string `data` to the file at `path` using UTF-8 encoding, creating the file if it does not exist. Use `fs.promises.writeFile`.',
    pt: 'Implemente `writeFileContent(path, data)` como função async que escreve a string `data` no arquivo em `path` com encoding UTF-8, criando o arquivo se não existir. Use `fs.promises.writeFile`.',
    es: 'Implementa `writeFileContent(path, data)` como función async que escribe la cadena `data` en el archivo en `path` con codificación UTF-8, creándolo si no existe. Usa `fs.promises.writeFile`.',
    de: 'Implementiere `writeFileContent(path, data)` als async-Funktion, die den String `data` in die Datei unter `path` mit UTF-8-Kodierung schreibt und sie erstellt, falls sie noch nicht existiert. Verwende `fs.promises.writeFile`.',
    it: 'Implementa `writeFileContent(path, data)` come funzione async che scrive la stringa `data` nel file al percorso `path` con codifica UTF-8, creando il file se non esiste. Usa `fs.promises.writeFile`.',
    fr: 'Implémente `writeFileContent(path, data)` comme une fonction async qui écrit la chaîne `data` dans le fichier à `path` en UTF-8, en créant le fichier s\'il n\'existe pas. Utilise `fs.promises.writeFile`.',
  },
  '17-fs-directory': {
    en: 'Implement `listDirectory(path)` as an async function that returns an array of file/directory names inside the given directory path. Use `fs.promises.readdir`. The returned list must match the actual entries in the directory.',
    pt: 'Implemente `listDirectory(path)` como função async que retorna um array com os nomes dos arquivos/diretórios dentro do caminho de diretório fornecido. Use `fs.promises.readdir`. A lista retornada deve corresponder às entradas reais.',
    es: 'Implementa `listDirectory(path)` como función async que devuelve un array con los nombres de archivos/directorios dentro de la ruta de directorio dada. Usa `fs.promises.readdir`. La lista devuelta debe coincidir con las entradas reales del directorio.',
    de: 'Implementiere `listDirectory(path)` als async-Funktion, die ein Array mit den Datei-/Verzeichnisnamen im angegebenen Verzeichnispfad zurückgibt. Verwende `fs.promises.readdir`. Die zurückgegebene Liste muss den tatsächlichen Einträgen entsprechen.',
    it: 'Implementa `listDirectory(path)` come funzione async che restituisce un array con i nomi dei file/directory all\'interno del percorso di directory dato. Usa `fs.promises.readdir`. La lista restituita deve corrispondere alle voci effettive della directory.',
    fr: 'Implémente `listDirectory(path)` comme une fonction async qui retourne un tableau des noms de fichiers/répertoires dans le chemin de répertoire donné. Utilise `fs.promises.readdir`. La liste retournée doit correspondre aux entrées réelles du répertoire.',
  },
  '18-streams-basics': {
    en: 'Implement `readStreamContent(path)` that reads a file using a readable stream (`fs.createReadStream`) and returns a Promise that resolves with the full file content as a string when the stream ends.',
    pt: 'Implemente `readStreamContent(path)` que lê um arquivo usando um readable stream (`fs.createReadStream`) e retorna uma Promise que resolve com o conteúdo completo do arquivo como string quando o stream terminar.',
    es: 'Implementa `readStreamContent(path)` que lea un archivo usando un readable stream (`fs.createReadStream`) y devuelva una Promise que se resuelva con el contenido completo del archivo como cadena cuando el stream termine.',
    de: 'Implementiere `readStreamContent(path)`, das eine Datei mit einem Readable Stream (`fs.createReadStream`) liest und ein Promise zurückgibt, das sich mit dem vollständigen Dateiinhalt als String auflöst, wenn der Stream endet.',
    it: 'Implementa `readStreamContent(path)` che legge un file usando un readable stream (`fs.createReadStream`) e restituisce una Promise che si risolve con il contenuto completo del file come stringa quando lo stream termina.',
    fr: 'Implémente `readStreamContent(path)` qui lit un fichier en utilisant un readable stream (`fs.createReadStream`) et retourne une Promise qui se résout avec le contenu complet du fichier sous forme de chaîne lorsque le stream se termine.',
  },
  '19-error-handling-async': {
    en: 'Implement `safeReadFile(path)` that attempts to read a file and returns its content as a string on success, or returns `null` (instead of throwing) when the file does not exist or any other error occurs.',
    pt: 'Implemente `safeReadFile(path)` que tenta ler um arquivo e retorna seu conteúdo como string em caso de sucesso, ou retorna `null` (em vez de lançar) quando o arquivo não existe ou qualquer outro erro ocorre.',
    es: 'Implementa `safeReadFile(path)` que intenta leer un archivo y devuelve su contenido como cadena en caso de éxito, o devuelve `null` (en vez de lanzar) cuando el archivo no existe o se produce cualquier otro error.',
    de: 'Implementiere `safeReadFile(path)`, das versucht, eine Datei zu lesen und bei Erfolg deren Inhalt als String zurückgibt oder `null` zurückgibt (statt zu werfen), wenn die Datei nicht existiert oder ein anderer Fehler auftritt.',
    it: 'Implementa `safeReadFile(path)` che tenta di leggere un file e restituisce il suo contenuto come stringa in caso di successo, oppure restituisce `null` (invece di lanciare un\'eccezione) quando il file non esiste o si verifica qualsiasi altro errore.',
    fr: 'Implémente `safeReadFile(path)` qui tente de lire un fichier et retourne son contenu sous forme de chaîne en cas de succès, ou retourne `null` (au lieu de lancer une exception) lorsque le fichier n\'existe pas ou qu\'une autre erreur se produit.',
  },
  '20-environment-variables': {
    en: 'Implement `getPort()` to return the value of the `PORT` environment variable as a number, defaulting to `3000` if the variable is not set. Implement `getDatabaseUrl()` to return the `DATABASE_URL` env var, throwing an error if it\'s missing.',
    pt: 'Implemente `getPort()` para retornar o valor da variável de ambiente `PORT` como número, com padrão `3000` se a variável não estiver definida. Implemente `getDatabaseUrl()` para retornar a var de ambiente `DATABASE_URL`, lançando um erro se estiver ausente.',
    es: 'Implementa `getPort()` para devolver el valor de la variable de entorno `PORT` como número, con valor predeterminado `3000` si la variable no está definida. Implementa `getDatabaseUrl()` para devolver la var de entorno `DATABASE_URL`, lanzando un error si falta.',
    de: 'Implementiere `getPort()`, um den Wert der Umgebungsvariable `PORT` als Zahl zurückzugeben, mit Standard `3000`, falls die Variable nicht gesetzt ist. Implementiere `getDatabaseUrl()`, um die Umgebungsvariable `DATABASE_URL` zurückzugeben und einen Fehler zu werfen, falls sie fehlt.',
    it: 'Implementa `getPort()` per restituire il valore della variabile d\'ambiente `PORT` come numero, con default `3000` se la variabile non è impostata. Implementa `getDatabaseUrl()` per restituire la variabile d\'ambiente `DATABASE_URL`, lanciando un errore se mancante.',
    fr: 'Implémente `getPort()` pour retourner la valeur de la variable d\'environnement `PORT` sous forme de nombre, avec la valeur par défaut `3000` si la variable n\'est pas définie. Implémente `getDatabaseUrl()` pour retourner la variable d\'environnement `DATABASE_URL`, en lançant une erreur si elle est absente.',
  },
  '21-knex-select': {
    en: 'Implement `getAllUsers(knex)` to query and return all rows from the `users` table, and `getUserById(knex, id)` to return the single user whose `id` matches. Use the Knex query builder — no raw SQL strings.',
    pt: 'Implemente `getAllUsers(knex)` para consultar e retornar todas as linhas da tabela `users`, e `getUserById(knex, id)` para retornar o usuário cujo `id` corresponde. Use o query builder Knex — sem strings SQL brutas.',
    es: 'Implementa `getAllUsers(knex)` para consultar y devolver todas las filas de la tabla `users`, y `getUserById(knex, id)` para devolver el único usuario cuyo `id` coincide. Usa el query builder de Knex — sin cadenas SQL en bruto.',
    de: 'Implementiere `getAllUsers(knex)`, um alle Zeilen der Tabelle `users` abzufragen und zurückzugeben, und `getUserById(knex, id)`, um den Benutzer mit der passenden `id` zurückzugeben. Verwende den Knex Query Builder — kein rohes SQL.',
    it: 'Implementa `getAllUsers(knex)` per interrogare e restituire tutte le righe della tabella `users`, e `getUserById(knex, id)` per restituire il singolo utente con `id` corrispondente. Usa il query builder Knex — nessuna stringa SQL grezza.',
    fr: 'Implémente `getAllUsers(knex)` pour interroger et retourner toutes les lignes de la table `users`, et `getUserById(knex, id)` pour retourner l\'unique utilisateur dont l\'`id` correspond. Utilise le query builder Knex — pas de SQL brut.',
  },
  '22-knex-mutations': {
    en: 'Implement `createUser(knex, data)` to insert a new user record and return the newly created row, `updateUser(knex, id, data)` to update fields of an existing user, and `deleteUser(knex, id)` to remove a user by id.',
    pt: 'Implemente `createUser(knex, data)` para inserir um novo registro de usuário e retornar a linha criada, `updateUser(knex, id, data)` para atualizar campos de um usuário existente, e `deleteUser(knex, id)` para remover um usuário pelo id.',
    es: 'Implementa `createUser(knex, data)` para insertar un nuevo registro de usuario y devolver la fila creada, `updateUser(knex, id, data)` para actualizar campos de un usuario existente, y `deleteUser(knex, id)` para eliminar un usuario por id.',
    de: 'Implementiere `createUser(knex, data)`, um einen neuen Benutzereintrag einzufügen und die erstellte Zeile zurückzugeben, `updateUser(knex, id, data)`, um Felder eines bestehenden Benutzers zu aktualisieren, und `deleteUser(knex, id)`, um einen Benutzer nach ID zu löschen.',
    it: 'Implementa `createUser(knex, data)` per inserire un nuovo record utente e restituire la riga creata, `updateUser(knex, id, data)` per aggiornare i campi di un utente esistente e `deleteUser(knex, id)` per rimuovere un utente per id.',
    fr: 'Implémente `createUser(knex, data)` pour insérer un nouvel enregistrement utilisateur et retourner la ligne créée, `updateUser(knex, id, data)` pour mettre à jour les champs d\'un utilisateur existant, et `deleteUser(knex, id)` pour supprimer un utilisateur par id.',
  },
  '23-mongoose-schema': {
    en: 'Define a Mongoose `Schema` for a `User` model with at least `name` (String, required) and `email` (String, required, unique) fields. Export both the schema and the compiled model.',
    pt: 'Defina um `Schema` Mongoose para um modelo `User` com pelo menos os campos `name` (String, obrigatório) e `email` (String, obrigatório, único). Exporte tanto o schema quanto o modelo compilado.',
    es: 'Define un `Schema` Mongoose para un modelo `User` con al menos los campos `name` (String, requerido) y `email` (String, requerido, único). Exporta tanto el schema como el modelo compilado.',
    de: 'Definiere ein Mongoose-`Schema` für ein `User`-Modell mit mindestens den Feldern `name` (String, erforderlich) und `email` (String, erforderlich, eindeutig). Exportiere sowohl das Schema als auch das kompilierte Modell.',
    it: 'Definisci un `Schema` Mongoose per un modello `User` con almeno i campi `name` (String, obbligatorio) ed `email` (String, obbligatorio, unico). Esporta sia lo schema che il modello compilato.',
    fr: 'Définis un `Schema` Mongoose pour un modèle `User` avec au moins les champs `name` (String, requis) et `email` (String, requis, unique). Exporte à la fois le schéma et le modèle compilé.',
  },
  '24-mongoose-crud': {
    en: 'Implement `createUser`, `findUserByEmail`, `updateUserName`, and `deleteUser` functions using the Mongoose `User` model. Each function receives the model as its first argument and returns a Promise.',
    pt: 'Implemente as funções `createUser`, `findUserByEmail`, `updateUserName` e `deleteUser` usando o modelo Mongoose `User`. Cada função recebe o modelo como primeiro argumento e retorna uma Promise.',
    es: 'Implementa las funciones `createUser`, `findUserByEmail`, `updateUserName` y `deleteUser` usando el modelo Mongoose `User`. Cada función recibe el modelo como primer argumento y devuelve una Promise.',
    de: 'Implementiere die Funktionen `createUser`, `findUserByEmail`, `updateUserName` und `deleteUser` mit dem Mongoose-`User`-Modell. Jede Funktion erhält das Modell als erstes Argument und gibt ein Promise zurück.',
    it: 'Implementa le funzioni `createUser`, `findUserByEmail`, `updateUserName` e `deleteUser` usando il modello Mongoose `User`. Ogni funzione riceve il modello come primo argomento e restituisce una Promise.',
    fr: 'Implémente les fonctions `createUser`, `findUserByEmail`, `updateUserName` et `deleteUser` en utilisant le modèle Mongoose `User`. Chaque fonction reçoit le modèle comme premier argument et retourne une Promise.',
  },
  '25-jwt-basics': {
    en: 'Implement `generateToken(payload)` to sign a JWT using the `SECRET` constant with a 1-hour expiry, and `verifyToken(token)` to verify and decode it — throwing on invalid or expired tokens. Replace the two `__fill_me__` placeholders.',
    pt: 'Implemente `generateToken(payload)` para assinar um JWT usando a constante `SECRET` com expiração de 1 hora, e `verifyToken(token)` para verificar e decodificá-lo — lançando erro em tokens inválidos ou expirados. Substitua os dois `__fill_me__`.',
    es: 'Implementa `generateToken(payload)` para firmar un JWT usando la constante `SECRET` con expiración de 1 hora, y `verifyToken(token)` para verificarlo y decodificarlo — lanzando error en tokens inválidos o caducados. Reemplaza los dos `__fill_me__`.',
    de: 'Implementiere `generateToken(payload)`, um ein JWT mit der Konstanten `SECRET` und einer 1-Stunden-Ablaufzeit zu signieren, und `verifyToken(token)`, um es zu verifizieren und zu dekodieren — bei ungültigen oder abgelaufenen Tokens soll ein Fehler geworfen werden. Ersetze die beiden `__fill_me__`.',
    it: 'Implementa `generateToken(payload)` per firmare un JWT usando la costante `SECRET` con scadenza di 1 ora, e `verifyToken(token)` per verificarlo e decodificarlo — lanciando un errore per token non validi o scaduti. Sostituisci i due `__fill_me__`.',
    fr: 'Implémente `generateToken(payload)` pour signer un JWT en utilisant la constante `SECRET` avec une expiration d\'1 heure, et `verifyToken(token)` pour le vérifier et le décoder — en lançant une erreur pour les tokens invalides ou expirés. Remplace les deux `__fill_me__`.',
  },
  '26-sessions': {
    en: 'Configure `express-session` middleware on the app with a secret, then implement `POST /login` to store `req.body.username` in the session, `GET /profile` to return the session user (or 401 if not logged in), and `POST /logout` to destroy the session.',
    pt: 'Configure o middleware `express-session` no app com um segredo, depois implemente `POST /login` para salvar `req.body.username` na sessão, `GET /profile` para retornar o usuário da sessão (ou 401 se não logado) e `POST /logout` para destruir a sessão.',
    es: 'Configura el middleware `express-session` en el app con un secreto, luego implementa `POST /login` para guardar `req.body.username` en la sesión, `GET /profile` para devolver el usuario de la sesión (o 401 si no está logueado) y `POST /logout` para destruir la sesión.',
    de: 'Konfiguriere die `express-session`-Middleware mit einem Secret auf der App, implementiere dann `POST /login`, um `req.body.username` in der Session zu speichern, `GET /profile`, um den Session-Benutzer zurückzugeben (oder 401, falls nicht eingeloggt), und `POST /logout`, um die Session zu löschen.',
    it: 'Configura il middleware `express-session` sull\'app con un segreto, poi implementa `POST /login` per salvare `req.body.username` nella sessione, `GET /profile` per restituire l\'utente di sessione (o 401 se non loggato) e `POST /logout` per distruggere la sessione.',
    fr: 'Configure le middleware `express-session` sur l\'app avec un secret, puis implémente `POST /login` pour stocker `req.body.username` dans la session, `GET /profile` pour retourner l\'utilisateur de session (ou 401 s\'il n\'est pas connecté) et `POST /logout` pour détruire la session.',
  },
  '27-passport-local': {
    en: 'Configure Passport.js with the `LocalStrategy` that validates username and password against a hardcoded users list. Wire up `passport.initialize()`, `passport.session()`, `serializeUser`, and `deserializeUser`. Implement `POST /login` and `GET /profile` routes.',
    pt: 'Configure o Passport.js com a `LocalStrategy` que valida usuário e senha contra uma lista de usuários hardcoded. Conecte `passport.initialize()`, `passport.session()`, `serializeUser` e `deserializeUser`. Implemente as rotas `POST /login` e `GET /profile`.',
    es: 'Configura Passport.js con la `LocalStrategy` que valida usuario y contraseña contra una lista de usuarios hardcodeada. Conecta `passport.initialize()`, `passport.session()`, `serializeUser` y `deserializeUser`. Implementa las rutas `POST /login` y `GET /profile`.',
    de: 'Konfiguriere Passport.js mit der `LocalStrategy`, die Benutzername und Passwort gegen eine hartcodierte Benutzerliste prüft. Verbinde `passport.initialize()`, `passport.session()`, `serializeUser` und `deserializeUser`. Implementiere die Routen `POST /login` und `GET /profile`.',
    it: 'Configura Passport.js con la `LocalStrategy` che valida username e password contro una lista di utenti hardcoded. Collega `passport.initialize()`, `passport.session()`, `serializeUser` e `deserializeUser`. Implementa le rotte `POST /login` e `GET /profile`.',
    fr: 'Configure Passport.js avec la `LocalStrategy` qui valide nom d\'utilisateur et mot de passe contre une liste d\'utilisateurs codée en dur. Connecte `passport.initialize()`, `passport.session()`, `serializeUser` et `deserializeUser`. Implémente les routes `POST /login` et `GET /profile`.',
  },
  '28-access-control': {
    en: 'Implement the `requireRole(role)` middleware factory that checks `req.user.role` and calls `next()` if it matches, or responds with 403 Forbidden if not. Use it to protect admin-only routes.',
    pt: 'Implemente a factory de middleware `requireRole(role)` que verifica `req.user.role` e chama `next()` se corresponder, ou responde com 403 Forbidden se não. Use-a para proteger rotas exclusivas de administrador.',
    es: 'Implementa la factory de middleware `requireRole(role)` que verifique `req.user.role` y llame a `next()` si coincide, o responda con 403 Forbidden si no. Úsala para proteger rutas exclusivas de administrador.',
    de: 'Implementiere die Middleware-Factory `requireRole(role)`, die `req.user.role` prüft und `next()` aufruft, wenn es übereinstimmt, oder mit 403 Forbidden antwortet, wenn nicht. Verwende sie, um Admin-Only-Routen zu schützen.',
    it: 'Implementa la factory di middleware `requireRole(role)` che controlla `req.user.role` e chiama `next()` se corrisponde, oppure risponde con 403 Forbidden in caso contrario. Usala per proteggere le rotte solo per amministratori.',
    fr: 'Implémente la factory de middleware `requireRole(role)` qui vérifie `req.user.role` et appelle `next()` si ça correspond, ou répond avec 403 Forbidden sinon. Utilise-la pour protéger les routes réservées aux administrateurs.',
  },
  '29-rest-api-design': {
    en: 'Build a fully RESTful Express router for a `todos` resource: implement `GET /todos`, `POST /todos`, `GET /todos/:id`, `PUT /todos/:id`, and `DELETE /todos/:id`. Use an in-memory array as the data store. Follow REST conventions for status codes.',
    pt: 'Construa um router Express totalmente RESTful para um recurso `todos`: implemente `GET /todos`, `POST /todos`, `GET /todos/:id`, `PUT /todos/:id` e `DELETE /todos/:id`. Use um array em memória como store. Siga as convenções REST para status codes.',
    es: 'Construye un router Express totalmente RESTful para un recurso `todos`: implementa `GET /todos`, `POST /todos`, `GET /todos/:id`, `PUT /todos/:id` y `DELETE /todos/:id`. Usa un array en memoria como almacén. Sigue las convenciones REST para los códigos de estado.',
    de: 'Baue einen vollständig RESTful Express-Router für eine `todos`-Ressource: Implementiere `GET /todos`, `POST /todos`, `GET /todos/:id`, `PUT /todos/:id` und `DELETE /todos/:id`. Verwende ein In-Memory-Array als Datenspeicher. Halte dich an REST-Konventionen für Status Codes.',
    it: 'Costruisci un router Express completamente RESTful per una risorsa `todos`: implementa `GET /todos`, `POST /todos`, `GET /todos/:id`, `PUT /todos/:id` e `DELETE /todos/:id`. Usa un array in memoria come data store. Segui le convenzioni REST per i codici di stato.',
    fr: 'Construis un router Express entièrement RESTful pour une ressource `todos` : implémente `GET /todos`, `POST /todos`, `GET /todos/:id`, `PUT /todos/:id` et `DELETE /todos/:id`. Utilise un tableau en mémoire comme store. Respecte les conventions REST pour les codes de statut.',
  },
  '30-production-config': {
    en: 'Wire up a production-ready Express app: set up `helmet` for security headers, `compression` for gzip responses, a proper `morgan` logger for HTTP request logging, and graceful shutdown on `SIGTERM`. Replace every `__fill_me__` with the correct setup.',
    pt: 'Configure um app Express pronto para produção: instale `helmet` para cabeçalhos de segurança, `compression` para respostas gzip, um logger `morgan` apropriado para requisições HTTP e shutdown gracioso no `SIGTERM`. Substitua cada `__fill_me__` pela configuração correta.',
    es: 'Configura un app Express listo para producción: instala `helmet` para cabeceras de seguridad, `compression` para respuestas gzip, un logger `morgan` adecuado para las solicitudes HTTP y shutdown elegante en `SIGTERM`. Reemplaza cada `__fill_me__` con la configuración correcta.',
    de: 'Konfiguriere eine produktionsfertige Express-App: Richte `helmet` für Sicherheits-Header, `compression` für gzip-Antworten, einen geeigneten `morgan`-Logger für HTTP-Anfragen und ein graceful Shutdown bei `SIGTERM` ein. Ersetze jeden `__fill_me__` durch die korrekte Konfiguration.',
    it: 'Configura un\'app Express pronta per la produzione: imposta `helmet` per gli header di sicurezza, `compression` per le risposte gzip, un logger `morgan` appropriato per le richieste HTTP e uno shutdown graceful su `SIGTERM`. Sostituisci ogni `__fill_me__` con la configurazione corretta.',
    fr: 'Configure une app Express prête pour la production : installe `helmet` pour les en-têtes de sécurité, `compression` pour les réponses gzip, un logger `morgan` adapté pour les requêtes HTTP et un arrêt gracieux sur `SIGTERM`. Remplace chaque `__fill_me__` par la configuration correcte.',
  },
};

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.json'));

let updated = 0;
let skipped = 0;

for (const file of files) {
  const filepath = path.join(DIR, file);
  const exercise = JSON.parse(fs.readFileSync(filepath, 'utf8'));

  if (exercise.instructions) {
    console.log(`⏭  ${file} — already has instructions, skipping`);
    skipped++;
    continue;
  }

  const instr = INSTRUCTIONS[exercise.id];
  if (!instr) {
    console.warn(`⚠️  No instructions defined for id "${exercise.id}" (${file}) — skipping`);
    skipped++;
    continue;
  }

  // Insert instructions after theory, before starter
  const { id, trail, order, title, theory, starter, solution, tests } = exercise;
  const updated_exercise = { id, trail, order, title, theory, instructions: instr, starter, solution, tests };

  fs.writeFileSync(filepath, JSON.stringify(updated_exercise, null, 2) + '\n', 'utf8');
  console.log(`✅  ${file} — instructions added`);
  updated++;
}

console.log(`\nDone: ${updated} updated, ${skipped} skipped.`);
