export const starterFlashcards = [
    {
        deckId: "javascript",
        front: "What is JavaScript?",
        back: "JavaScript is a programming language used to make web pages interactive and dynamic.",
        hint: "Think about what makes a web page interactive.",
        tags: ["basics"]
    },
    {
        deckId: "javascript",
        front: "What is a variable in JavaScript?",
        back: "A variable is a named place used to store a value.",
        hint: "Think about storing data for later use.",
        tags: ["variables", "basics"]
    },
    {
        deckId: "javascript",
        front: "What is the difference between var, let, and const?",
        back: "var is function-scoped; let and const are block-scoped. let allows reassignment, while const prevents reassignment.",
        hint: "Think about scope, redeclaration, and reassignment.",
        tags: ["variables", "scope"]
    },
    {
        deckId: "javascript",
        front: "What are the data types in JavaScript?",
        back: "Primitive types are string, number, bigint, boolean, undefined, symbol, and null. Objects form another major category.",
        hint: "Think about the different kinds of values.",
        tags: ["data-types", "basics"]
    },
    {
        deckId: "javascript",
        front: "What is the difference between == and ===?",
        back: "== compares values with type conversion; === compares values without type conversion.",
        hint: "Think about whether JavaScript converts types.",
        tags: ["operators", "basics"]
    },
    {
        deckId: "javascript",
        front: "What does typeof do?",
        back: "typeof returns a string indicating the type of a value.",
        hint: "Think about checking a value's type.",
        tags: ["operators", "data-types"]
    },
    {
        deckId: "javascript",
        front: "What is the difference between null and undefined?",
        back: "undefined usually means a value is missing or unassigned; null represents an intentional absence of value.",
        hint: "Think about missing versus intentionally empty.",
        tags: ["data-types", "basics"]
    },
    {
        deckId: "javascript",
        front: "What is NaN in JavaScript?",
        back: "NaN means Not-a-Number and represents an invalid numeric result.",
        hint: "Think about an operation that cannot produce a valid number.",
        tags: ["numbers", "data-types"]
    },
    {
        deckId: "javascript",
        front: "What is a template literal?",
        back: "A template literal uses backticks and supports interpolation with ${expression}.",
        hint: "Think about inserting variables into strings.",
        tags: ["strings", "basics"]
    },
    {
        deckId: "javascript",
        front: "What is type coercion?",
        back: "Type coercion is the automatic or implicit conversion of a value from one type to another.",
        hint: "Think about a string being converted into a number.",
        tags: ["data-types", "operators"]
    },
    {
        deckId: "javascript",
        front: "What is a conditional statement?",
        back: "A conditional statement executes different code depending on whether a condition is true or false.",
        hint: "Think about making decisions in code.",
        tags: ["conditionals", "basics"]
    },
    {
        deckId: "javascript",
        front: "What is the difference between if-else and switch?",
        back: "if-else handles conditions and ranges; switch compares an expression against multiple case values.",
        hint: "Think about choosing between several possible cases.",
        tags: ["conditionals"]
    },
    {
        deckId: "javascript",
        front: "What is a for loop?",
        back: "A for loop repeatedly executes code while its condition remains true.",
        hint: "Think about repeating a task a set number of times.",
        tags: ["loops", "basics"]
    },
    {
        deckId: "javascript",
        front: "What is the difference between break and continue?",
        back: "break exits a loop; continue skips the current iteration and proceeds to the next one.",
        hint: "Think about stopping versus skipping.",
        tags: ["loops"]
    },
    {
        deckId: "javascript",
        front: "What is a function?",
        back: "A function is a reusable block of code designed to perform a task.",
        hint: "Think about writing code once and reusing it.",
        tags: ["functions", "basics"]
    },
    {
        deckId: "javascript",
        front: "What is the difference between parameters and arguments?",
        back: "Parameters are names in a function definition; arguments are values passed when calling it.",
        hint: "Think about the function definition versus the function call.",
        tags: ["functions"]
    },
    {
        deckId: "javascript",
        front: "What does return do in a function?",
        back: "return ends the function and optionally sends a value back to the caller.",
        hint: "Think about getting a result from a function.",
        tags: ["functions"]
    },
    {
        deckId: "javascript",
        front: "What is an arrow function?",
        back: "An arrow function is a function expression that uses the => syntax.",
        hint: "Look for the arrow symbol in the function syntax.",
        tags: ["functions", "modern-javascript"]
    },
    {
        deckId: "javascript",
        front: "What is an array?",
        back: "An array is an ordered collection of values stored in a single variable.",
        hint: "Think about keeping multiple items in one list.",
        tags: ["arrays", "data-structures"]
    },
    {
        deckId: "javascript",
        front: "What does push() do?",
        back: "push() adds one or more elements to the end of an array.",
        hint: "Think about adding an item at the end.",
        tags: ["arrays", "methods"]
    },
    {
        deckId: "javascript",
        front: "What does pop() do?",
        back: "pop() removes and returns the last element of an array.",
        hint: "Think about removing the final item.",
        tags: ["arrays", "methods"]
    },
    {
        deckId: "javascript",
        front: "What does map() do?",
        back: "map() creates a new array by transforming each element of an existing array.",
        hint: "Think about applying the same transformation to every item.",
        tags: ["arrays", "methods"]
    },
    {
        deckId: "javascript",
        front: "What does filter() do?",
        back: "filter() creates a new array containing elements that pass a test.",
        hint: "Think about keeping only matching items.",
        tags: ["arrays", "methods"]
    },
    {
        deckId: "javascript",
        front: "What does reduce() do?",
        back: "reduce() combines array elements into one accumulated result.",
        hint: "Think about calculating a total from a list.",
        tags: ["arrays", "methods"]
    },
    {
        deckId: "javascript",
        front: "What is the difference between map() and forEach()?",
        back: "map() returns a new array; forEach() executes a callback for each element and returns undefined.",
        hint: "Think about which method gives you a new array.",
        tags: ["arrays", "methods"]
    },
    {
        deckId: "javascript",
        front: "What is an object in JavaScript?",
        back: "An object stores related data and functionality as properties using key-value pairs.",
        hint: "Think about describing something with named properties.",
        tags: ["objects", "basics"]
    },
    {
        deckId: "javascript",
        front: "How can you access an object property?",
        back: "Use dot notation, such as user.name, or bracket notation, such as user['name'].",
        hint: "Think about the two ways to access a key.",
        tags: ["objects"]
    },
    {
        deckId: "javascript",
        front: "What is destructuring?",
        back: "Destructuring extracts values from arrays or properties from objects into variables.",
        hint: "Think about unpacking values into separate variables.",
        tags: ["objects", "arrays", "modern-javascript"]
    },
    {
        deckId: "javascript",
        front: "What is the spread operator?",
        back: "The spread syntax (...) expands iterable values or object properties into another context.",
        hint: "Think about expanding an array into individual values.",
        tags: ["arrays", "objects", "modern-javascript"]
    },
    {
        deckId: "javascript",
        front: "What are rest parameters?",
        back: "Rest parameters use ... to collect remaining function arguments into an array.",
        hint: "Think about gathering multiple arguments together.",
        tags: ["functions", "modern-javascript"]
    },
    {
        deckId: "javascript",
        front: "What is scope in JavaScript?",
        back: "Scope determines where variables and other bindings can be accessed in code.",
        hint: "Think about where a variable is available.",
        tags: ["scope", "variables"]
    },
    {
        deckId: "javascript",
        front: "What is a closure?",
        back: "A closure is a function that retains access to variables from its lexical environment.",
        hint: "Think about a function remembering variables from its outer scope.",
        tags: ["functions", "scope", "closures"]
    },
    {
        deckId: "javascript",
        front: "What is the DOM?",
        back: "The Document Object Model represents an HTML document as objects that JavaScript can access and modify.",
        hint: "Think about how JavaScript interacts with HTML.",
        tags: ["dom", "web-development"]
    },
    {
        deckId: "javascript",
        front: "What does querySelector() do?",
        back: "querySelector() returns the first element matching a CSS selector.",
        hint: "Think about selecting an HTML element using a selector.",
        tags: ["dom", "methods"]
    },
    {
        deckId: "javascript",
        front: "What is an event listener?",
        back: "An event listener runs a callback when a specified event occurs.",
        hint: "Think about responding to a click or key press.",
        tags: ["dom", "events"]
    },
    {
        deckId: "javascript",
        front: "What does preventDefault() do?",
        back: "preventDefault() prevents the browser's default action for an event when that action is cancelable.",
        hint: "Think about stopping a form's normal submission behavior.",
        tags: ["dom", "events"]
    },
    {
        deckId: "javascript",
        front: "What is a Promise?",
        back: "A Promise represents the eventual success or failure of an asynchronous operation.",
        hint: "Think about a result that may arrive later.",
        tags: ["async-javascript", "promises"]
    },
    {
        deckId: "javascript",
        front: "What does async do?",
        back: "The async keyword declares a function that always returns a Promise.",
        hint: "Think about declaring a function for asynchronous work.",
        tags: ["async-javascript", "functions"]
    },
    {
        deckId: "javascript",
        front: "What does await do?",
        back: "await pauses an async function until a Promise settles, then provides its result or throws its rejection.",
        hint: "Think about waiting for an asynchronous result.",
        tags: ["async-javascript", "promises"]
    },
    {
        deckId: "javascript",
        front: "What does JSON.parse() do?",
        back: "JSON.parse() converts valid JSON text into a JavaScript value.",
        hint: "Think about turning stored JSON text into usable data.",
        tags: ["json", "data"]
    },
    {
        deckId: "javascript",
        front: "What is localStorage?",
        back: "localStorage is browser storage that stores string key-value pairs across browser sessions.",
        hint: "Think about saving data in the browser for later.",
        tags: ["storage", "web-development"]
    },
    {
        deckId: "javascript",
        front: "What is the difference between localStorage and sessionStorage?",
        back: "localStorage persists until cleared; sessionStorage generally lasts for the lifetime of its browser tab session.",
        hint: "Think about which storage lasts beyond a browser session.",
        tags: ["storage", "web-development"]
    },
    {
        deckId: "javascript",
        front: "What is the Fetch API?",
        back: "The Fetch API makes HTTP requests and returns a Promise that resolves to a Response.",
        hint: "Think about requesting data from a server.",
        tags: ["fetch", "apis", "async-javascript"]
    },
        {
        deckId: "python",
        front: "What is Python?",
        back: "Python is a high-level, general-purpose programming language known for its readable syntax.",
        hint: "Think about a language that is easy to read and write.",
        tags: ["basics", "introduction"]
    },
    {
        deckId: "python",
        front: "What is a variable in Python?",
        back: "A variable is a name that refers to an object or value.",
        hint: "Think about storing a value under a name.",
        tags: ["variables", "basics"]
    },
    {
        deckId: "python",
        front: "How do you print output in Python?",
        back: "Use the print() function, for example: print('Hello').",
        hint: "Think about the function used to display text.",
        tags: ["basics", "output"]
    },
    {
        deckId: "python",
        front: "What are the main built-in data types in Python?",
        back: "Common types include int, float, str, bool, list, tuple, dict, set, and NoneType.",
        hint: "Think about numbers, text, collections, and Boolean values.",
        tags: ["data-types", "basics"]
    },
    {
        deckId: "python",
        front: "What is the difference between a list and a tuple?",
        back: "Lists are mutable; tuples are immutable.",
        hint: "Think about whether the collection can be changed.",
        tags: ["lists", "tuples", "data-structures"]
    },
    {
        deckId: "python",
        front: "What is a dictionary in Python?",
        back: "A dictionary stores data as key-value pairs.",
        hint: "Think about looking up a value using its key.",
        tags: ["dictionary", "data-structures"]
    },
    {
        deckId: "python",
        front: "What is a set in Python?",
        back: "A set is an unordered collection of unique elements.",
        hint: "Think about removing duplicate values.",
        tags: ["sets", "data-structures"]
    },
    {
        deckId: "python",
        front: "What is the difference between = and == in Python?",
        back: "= assigns a value; == checks whether two values are equal.",
        hint: "Think about assigning versus comparing.",
        tags: ["operators", "basics"]
    },
    {
        deckId: "python",
        front: "What is indentation in Python?",
        back: "Indentation uses leading whitespace to define code blocks.",
        hint: "Think about the spaces before a statement.",
        tags: ["syntax", "basics"]
    },
    {
        deckId: "python",
        front: "What is an if statement?",
        back: "An if statement executes a block when its condition is true.",
        hint: "Think about making a decision based on a condition.",
        tags: ["conditionals", "basics"]
    },
    {
        deckId: "python",
        front: "What is a for loop in Python?",
        back: "A for loop iterates over items in an iterable.",
        hint: "Think about processing each item in a collection.",
        tags: ["loops", "basics"]
    },
    {
        deckId: "python",
        front: "What is a while loop?",
        back: "A while loop repeats a block while its condition remains true.",
        hint: "Think about repeating code based on a condition.",
        tags: ["loops"]
    },
    {
        deckId: "python",
        front: "What does range() do?",
        back: "range() produces a sequence of integers commonly used in loops.",
        hint: "Think about generating numbers for repeated iterations.",
        tags: ["loops", "built-in-functions"]
    },
    {
        deckId: "python",
        front: "What does break do in Python?",
        back: "break immediately exits the nearest enclosing loop.",
        hint: "Think about stopping a loop early.",
        tags: ["loops", "control-flow"]
    },
    {
        deckId: "python",
        front: "What does continue do in Python?",
        back: "continue skips the rest of the current loop iteration.",
        hint: "Think about skipping one iteration, not the entire loop.",
        tags: ["loops", "control-flow"]
    },
    {
        deckId: "python",
        front: "What is a function in Python?",
        back: "A function is a reusable block of code commonly defined with def.",
        hint: "Think about writing code once and calling it when needed.",
        tags: ["functions", "basics"]
    },
    {
        deckId: "python",
        front: "What is the difference between parameters and arguments?",
        back: "Parameters are names in a function definition; arguments are values passed to the function.",
        hint: "Think about the function definition and the function call.",
        tags: ["functions"]
    },
    {
        deckId: "python",
        front: "What does return do in Python?",
        back: "return ends a function call and optionally sends a value back to the caller.",
        hint: "Think about sending a result back.",
        tags: ["functions"]
    },
    {
        deckId: "python",
        front: "What is a lambda function?",
        back: "A lambda is an anonymous function limited to a single expression.",
        hint: "Think about a short function without a def statement.",
        tags: ["functions", "lambda"]
    },
    {
        deckId: "python",
        front: "What is a list comprehension?",
        back: "A list comprehension creates a list concisely using an expression and an iterable, optionally with a condition.",
        hint: "Think about creating a list in one compact line.",
        tags: ["lists", "comprehensions"]
    },
    {
        deckId: "python",
        front: "What is the difference between append() and extend()?",
        back: "append() adds one item; extend() adds each item from an iterable.",
        hint: "Think about adding one object versus multiple elements.",
        tags: ["lists", "methods"]
    },
    {
        deckId: "python",
        front: "What does len() do?",
        back: "len() returns the number of items in a collection or the length of a sequence.",
        hint: "Think about counting items or characters.",
        tags: ["built-in-functions", "basics"]
    },
    {
        deckId: "python",
        front: "What does enumerate() do?",
        back: "enumerate() produces pairs containing an index and an item while iterating.",
        hint: "Think about getting both position and value in a loop.",
        tags: ["loops", "built-in-functions"]
    },
    {
        deckId: "python",
        front: "What does zip() do?",
        back: "zip() combines corresponding items from multiple iterables into tuples.",
        hint: "Think about pairing items from two lists.",
        tags: ["built-in-functions", "iterables"]
    },
    {
        deckId: "python",
        front: "What is slicing in Python?",
        back: "Slicing extracts part of a sequence using start, stop, and optional step values.",
        hint: "Think about selecting a range of list items.",
        tags: ["lists", "strings"]
    },
    {
        deckId: "python",
        front: "What is a string in Python?",
        back: "A string is an immutable sequence of Unicode characters.",
        hint: "Think about text stored in quotes.",
        tags: ["strings", "data-types"]
    },
    {
        deckId: "python",
        front: "What does split() do on a string?",
        back: "split() divides a string into a list of substrings.",
        hint: "Think about separating a sentence into words.",
        tags: ["strings", "methods"]
    },
    {
        deckId: "python",
        front: "What does strip() do on a string?",
        back: "strip() removes leading and trailing whitespace by default.",
        hint: "Think about removing spaces at the beginning and end.",
        tags: ["strings", "methods"]
    },
    {
        deckId: "python",
        front: "What is exception handling?",
        back: "Exception handling manages runtime errors using constructs such as try and except.",
        hint: "Think about responding when an operation fails.",
        tags: ["exceptions", "error-handling"]
    },
    {
        deckId: "python",
        front: "What is the purpose of finally?",
        back: "A finally block runs when control leaves the try statement, whether or not an exception occurred.",
        hint: "Think about code that must run during cleanup.",
        tags: ["exceptions", "error-handling"]
    },
    {
        deckId: "python",
        front: "How do you open a file in Python?",
        back: "Use open(), preferably with a with statement to manage the file resource.",
        hint: "Think about safely reading or writing a file.",
        tags: ["files", "input-output"]
    },
    {
        deckId: "python",
        front: "What is a module in Python?",
        back: "A module is a Python file containing reusable code such as functions, classes, and variables.",
        hint: "Think about organizing reusable code into a file.",
        tags: ["modules", "organization"]
    },
    {
        deckId: "python",
        front: "What is a Python package?",
        back: "A package organizes related modules under a common namespace.",
        hint: "Think about grouping related Python modules.",
        tags: ["modules", "packages"]
    },
    {
        deckId: "python",
        front: "What is a class in Python?",
        back: "A class defines a type of object and its associated attributes and methods.",
        hint: "Think about a blueprint for creating objects.",
        tags: ["oop", "classes"]
    },
    {
        deckId: "python",
        front: "What is an object in Python?",
        back: "An object is an instance of a class with identity, type, and state.",
        hint: "Think about something created from a class.",
        tags: ["oop", "objects"]
    },
    {
        deckId: "python",
        front: "What is __init__() used for?",
        back: "__init__() initializes a newly created instance's attributes.",
        hint: "Think about setting up an object when it is created.",
        tags: ["oop", "classes"]
    },
    {
        deckId: "python",
        front: "What is inheritance?",
        back: "Inheritance allows a class to derive attributes and methods from another class.",
        hint: "Think about reusing behavior from a parent class.",
        tags: ["oop", "inheritance"]
    },
    {
        deckId: "python",
        front: "What is a generator in Python?",
        back: "A generator produces values lazily, commonly using yield.",
        hint: "Think about producing values one at a time.",
        tags: ["generators", "iterators"]
    },
    {
        deckId: "python",
        front: "What is an iterator?",
        back: "An iterator returns items one at a time using __next__() until exhausted.",
        hint: "Think about moving through a sequence one item at a time.",
        tags: ["iterators", "iterables"]
    },
    {
        deckId: "python",
        front: "What is a decorator?",
        back: "A decorator wraps a function or class to extend or modify its behavior.",
        hint: "Think about adding behavior without rewriting the original function.",
        tags: ["decorators", "functions"]
    },
    {
        deckId: "python",
        front: "What is a virtual environment?",
        back: "A virtual environment isolates a project's Python packages from other projects.",
        hint: "Think about keeping project dependencies separate.",
        tags: ["environment", "packages"]
    },
    {
        deckId: "python",
        front: "What is PEP 8?",
        back: "PEP 8 is the style guide for writing readable Python code.",
        hint: "Think about consistent formatting and naming conventions.",
        tags: ["best-practices", "style"]
    },
    {
        deckId: "algorithms",
        front: "What is an algorithm?",
        back: "An algorithm is a finite sequence of well-defined steps used to solve a problem.",
        hint: "Think about a step-by-step recipe for solving a task.",
        tags: ["basics", "introduction"]
    },
    {
        deckId: "algorithms",
        front: "What is time complexity?",
        back: "Time complexity describes how an algorithm's running time grows with input size.",
        hint: "Think about how the number of operations changes as input grows.",
        tags: ["complexity", "time-complexity"]
    },
    {
        deckId: "algorithms",
        front: "What is space complexity?",
        back: "Space complexity describes how an algorithm's memory usage grows with input size.",
        hint: "Think about the extra memory an algorithm needs.",
        tags: ["complexity", "space-complexity"]
    },
    {
        deckId: "algorithms",
        front: "What does Big O notation describe?",
        back: "Big O describes an asymptotic upper bound on an algorithm's growth rate.",
        hint: "Think about how performance scales for large inputs.",
        tags: ["big-o", "complexity"]
    },
    {
        deckId: "algorithms",
        front: "What is O(1) time complexity?",
        back: "O(1) means the operation count remains bounded independently of input size.",
        hint: "Think about accessing an array element by index.",
        tags: ["big-o", "time-complexity"]
    },
    {
        deckId: "algorithms",
        front: "What is O(n) time complexity?",
        back: "O(n) means running time grows linearly with the input size.",
        hint: "Think about checking every element in a list once.",
        tags: ["big-o", "time-complexity"]
    },
    {
        deckId: "algorithms",
        front: "What is O(log n) time complexity?",
        back: "O(log n) means the number of steps grows logarithmically with input size.",
        hint: "Think about repeatedly halving the search space.",
        tags: ["big-o", "time-complexity"]
    },
    {
        deckId: "algorithms",
        front: "What is O(n²) time complexity?",
        back: "O(n²) means running time grows proportionally to the square of input size.",
        hint: "Think about two nested loops over the same input.",
        tags: ["big-o", "time-complexity"]
    },
    {
        deckId: "algorithms",
        front: "What is linear search?",
        back: "Linear search checks elements one by one until a target is found or the list ends.",
        hint: "Think about searching through items in order.",
        tags: ["searching", "linear-search"]
    },
    {
        deckId: "algorithms",
        front: "What is binary search?",
        back: "Binary search repeatedly halves a sorted search space to find a target.",
        hint: "Think about searching a sorted list by checking its middle.",
        tags: ["searching", "binary-search"]
    },
    {
        deckId: "algorithms",
        front: "What is required for standard binary search?",
        back: "The search space must be sorted or otherwise satisfy the ordering needed by the algorithm.",
        hint: "Think about whether the middle element tells you which half to discard.",
        tags: ["searching", "binary-search"]
    },
    {
        deckId: "algorithms",
        front: "What is a sorting algorithm?",
        back: "A sorting algorithm arranges items according to a chosen order.",
        hint: "Think about arranging numbers from smallest to largest.",
        tags: ["sorting", "basics"]
    },
    {
        deckId: "algorithms",
        front: "How does bubble sort work?",
        back: "Bubble sort repeatedly compares adjacent elements and swaps them when they are out of order.",
        hint: "Think about larger values moving toward the end.",
        tags: ["sorting", "bubble-sort"]
    },
    {
        deckId: "algorithms",
        front: "How does selection sort work?",
        back: "Selection sort repeatedly selects the smallest remaining element and places it in the next position.",
        hint: "Think about finding the minimum in the unsorted portion.",
        tags: ["sorting", "selection-sort"]
    },
    {
        deckId: "algorithms",
        front: "How does insertion sort work?",
        back: "Insertion sort inserts each new element into its correct position in an already-sorted portion.",
        hint: "Think about arranging cards in your hand.",
        tags: ["sorting", "insertion-sort"]
    },
    {
        deckId: "algorithms",
        front: "What is merge sort?",
        back: "Merge sort divides data into smaller parts, sorts them, and merges the sorted parts.",
        hint: "Think about divide, sort, and combine.",
        tags: ["sorting", "merge-sort", "divide-and-conquer"]
    },
    {
        deckId: "algorithms",
        front: "What is quicksort?",
        back: "Quicksort partitions elements around a pivot and recursively sorts the partitions.",
        hint: "Think about choosing a pivot and splitting the array.",
        tags: ["sorting", "quicksort"]
    },
    {
        deckId: "algorithms",
        front: "What is recursion?",
        back: "Recursion occurs when a function solves a problem by calling itself.",
        hint: "Think about a smaller version of the same problem.",
        tags: ["recursion", "basics"]
    },
    {
        deckId: "algorithms",
        front: "What is a base case in recursion?",
        back: "A base case stops recursive calls when a simple condition is reached.",
        hint: "Think about when the function should stop calling itself.",
        tags: ["recursion"]
    },
    {
        deckId: "algorithms",
        front: "What is the divide-and-conquer technique?",
        back: "It divides a problem into smaller subproblems, solves them, and combines their results.",
        hint: "Think about breaking one large task into smaller tasks.",
        tags: ["techniques", "divide-and-conquer"]
    },
    {
        deckId: "algorithms",
        front: "What is a greedy algorithm?",
        back: "A greedy algorithm chooses the locally best available option at each step.",
        hint: "Think about making the best immediate choice.",
        tags: ["greedy", "techniques"]
    },
    {
        deckId: "algorithms",
        front: "What is dynamic programming?",
        back: "Dynamic programming solves overlapping subproblems and stores their results to avoid repeated work.",
        hint: "Think about remembering solutions to smaller problems.",
        tags: ["dynamic-programming", "techniques"]
    },
    {
        deckId: "algorithms",
        front: "What is memoization?",
        back: "Memoization caches function results so repeated calls with the same inputs can reuse them.",
        hint: "Think about storing an answer for later reuse.",
        tags: ["memoization", "dynamic-programming"]
    },
    {
        deckId: "algorithms",
        front: "What is a data structure?",
        back: "A data structure organizes data so it can be stored and accessed efficiently.",
        hint: "Think about different ways to organize information.",
        tags: ["data-structures", "basics"]
    },
    {
        deckId: "algorithms",
        front: "What is an array?",
        back: "An array stores elements in an ordered sequence that can be accessed by index.",
        hint: "Think about items arranged in numbered positions.",
        tags: ["arrays", "data-structures"]
    },
    {
        deckId: "algorithms",
        front: "What is a linked list?",
        back: "A linked list consists of nodes that store values and references to other nodes.",
        hint: "Think about connected nodes rather than one contiguous array.",
        tags: ["linked-list", "data-structures"]
    },
    {
        deckId: "algorithms",
        front: "What is a stack?",
        back: "A stack follows Last In, First Out (LIFO): the most recently added item is removed first.",
        hint: "Think about a stack of plates.",
        tags: ["stack", "data-structures"]
    },
    {
        deckId: "algorithms",
        front: "What is a queue?",
        back: "A queue typically follows First In, First Out (FIFO): the earliest added item is removed first.",
        hint: "Think about people waiting in a line.",
        tags: ["queue", "data-structures"]
    },
    {
        deckId: "algorithms",
        front: "What is a hash table?",
        back: "A hash table uses a hash function to map keys to storage locations for efficient lookup.",
        hint: "Think about finding a value using a key.",
        tags: ["hash-table", "data-structures"]
    },
    {
        deckId: "algorithms",
        front: "What is a tree in computer science?",
        back: "A tree is a hierarchical data structure made of nodes connected by edges.",
        hint: "Think about parent and child relationships.",
        tags: ["trees", "data-structures"]
    },
    {
        deckId: "algorithms",
        front: "What is a binary tree?",
        back: "A binary tree is a tree in which each node has at most two children.",
        hint: "Think about a left child and a right child.",
        tags: ["trees", "binary-tree"]
    },
    {
        deckId: "algorithms",
        front: "What is a binary search tree?",
        back: "A binary search tree orders keys so smaller keys go left and larger keys go right, subject to its duplicate policy.",
        hint: "Think about how key ordering helps searching.",
        tags: ["trees", "binary-search-tree"]
    },
    {
        deckId: "algorithms",
        front: "What is a graph?",
        back: "A graph consists of vertices and edges representing relationships between them.",
        hint: "Think about cities connected by roads.",
        tags: ["graphs", "data-structures"]
    },
    {
        deckId: "algorithms",
        front: "What is breadth-first search (BFS)?",
        back: "BFS explores a graph level by level, commonly using a queue.",
        hint: "Think about visiting immediate neighbors before deeper nodes.",
        tags: ["graphs", "bfs", "searching"]
    },
    {
        deckId: "algorithms",
        front: "What is depth-first search (DFS)?",
        back: "DFS explores one path deeply before backtracking, commonly using recursion or a stack.",
        hint: "Think about going deep along a path before returning.",
        tags: ["graphs", "dfs", "searching"]
    },
    {
        deckId: "algorithms",
        front: "What is a shortest-path algorithm?",
        back: "It finds a path with minimum total cost between vertices, according to the chosen cost measure.",
        hint: "Think about finding the cheapest or shortest route.",
        tags: ["graphs", "shortest-path"]
    },
    {
        deckId: "algorithms",
        front: "What is Dijkstra's algorithm used for?",
        back: "It finds shortest paths from a source in a graph with non-negative edge weights.",
        hint: "Think about shortest routes when all edge costs are non-negative.",
        tags: ["graphs", "dijkstra", "shortest-path"]
    },
    {
        deckId: "algorithms",
        front: "What is a topological sort?",
        back: "It orders the vertices of a directed acyclic graph so every directed edge goes from earlier to later.",
        hint: "Think about ordering tasks with prerequisites.",
        tags: ["graphs", "topological-sort"]
    },
    {
        deckId: "algorithms",
        front: "What is a stable sorting algorithm?",
        back: "A stable sort preserves the relative order of elements with equal sorting keys.",
        hint: "Think about equal-key items keeping their original order.",
        tags: ["sorting", "stability"]
    },
    {
        deckId: "algorithms",
        front: "What is an in-place algorithm?",
        back: "An in-place algorithm uses only a small, typically constant amount of extra working memory, excluding the input.",
        hint: "Think about modifying data without creating another full-sized copy.",
        tags: ["complexity", "space-complexity"]
    },
    {
        deckId: "algorithms",
        front: "What is a brute-force algorithm?",
        back: "A brute-force algorithm tries possible candidates directly without relying on a more specialized strategy.",
        hint: "Think about checking every possible option.",
        tags: ["techniques", "brute-force"]
    },
    {
        deckId: "algorithms",
        front: "What is backtracking?",
        back: "Backtracking explores choices and reverses a choice when it cannot lead to a valid solution.",
        hint: "Think about trying a path and undoing it when it fails.",
        tags: ["backtracking", "techniques"]
    }
];

