// Quiz data with questions, options, and correct answers
const quizData = [
  // General Knowledge
  {
    id: 1,
    category: "general",
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    explanation: "Paris is the capital and most populous city of France."
  },
  {
    id: 2,
    category: "general",
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
    correctAnswer: "Oxygen",
    explanation: "Oxygen is represented by the chemical symbol 'O' on the periodic table."
  },
  {
    id: 3,
    category: "general",
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: "2",
    explanation: "2 is the smallest prime number and the only even prime number."
  },
  {
    id: 4,
    category: "general",
    question: "Which famous scientist developed the theory of relativity?",
    options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Stephen Hawking"],
    correctAnswer: "Albert Einstein",
    explanation: "Albert Einstein developed the theory of relativity, which revolutionized our understanding of space, time, and gravity."
  },
  {
    id: 5,
    category: "general",
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Thailand", "Japan", "South Korea"],
    correctAnswer: "Japan",
    explanation: "Japan is known as the Land of the Rising Sun because from China, Japan appears to be in the direction where the sun rises."
  },
  
  // Geography
  {
    id: 6,
    category: "geography",
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean",
    explanation: "The Pacific Ocean is the largest and deepest ocean on Earth."
  },
  {
    id: 7,
    category: "geography",
    question: "Which mountain is the tallest in the world?",
    options: ["K2", "Mount Everest", "Kangchenjunga", "Makalu"],
    correctAnswer: "Mount Everest",
    explanation: "Mount Everest, located in the Himalayas, is the Earth's highest mountain above sea level at 8,848.86 meters."
  },
  {
    id: 8,
    category: "geography",
    question: "Which desert is the largest in the world?",
    options: ["Gobi Desert", "Kalahari Desert", "Sahara Desert", "Antarctic Desert"],
    correctAnswer: "Antarctic Desert",
    explanation: "The Antarctic Desert is the largest desert in the world, covering an area of about 14 million square kilometers."
  },
  {
    id: 9,
    category: "geography",
    question: "Which of these countries is NOT in Europe?",
    options: ["Portugal", "Turkey", "Thailand", "Finland"],
    correctAnswer: "Thailand",
    explanation: "Thailand is located in Southeast Asia, while Portugal, Turkey (partially), and Finland are in Europe."
  },
  {
    id: 10,
    category: "geography",
    question: "Which river is the longest in the world?",
    options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
    correctAnswer: "Nile River",
    explanation: "The Nile River is generally considered the longest river in the world, flowing about 6,650 kilometers."
  },
  
  // Animals & Nature
  {
    id: 11,
    category: "animals",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    explanation: "Mars is called the Red Planet because of its reddish appearance."
  },
  {
    id: 12,
    category: "animals",
    question: "What is the main component of the Sun?",
    options: ["Helium", "Oxygen", "Carbon", "Hydrogen"],
    correctAnswer: "Hydrogen",
    explanation: "The Sun is primarily composed of hydrogen, which undergoes nuclear fusion to produce helium."
  },
  {
    id: 13,
    category: "animals",
    question: "Which animal is known as the 'King of the Jungle'?",
    options: ["Tiger", "Lion", "Elephant", "Gorilla"],
    correctAnswer: "Lion",
    explanation: "Despite lions not living in jungles but in grasslands and plains, they are traditionally known as the 'King of the Jungle'."
  },
  {
    id: 14,
    category: "animals",
    question: "What is the largest species of shark?",
    options: ["Great White Shark", "Whale Shark", "Hammerhead Shark", "Tiger Shark"],
    correctAnswer: "Whale Shark",
    explanation: "The Whale Shark is the largest known extant fish species, reaching lengths of up to 12 meters."
  },
  {
    id: 15,
    category: "animals",
    question: "Which of these animals is NOT a mammal?",
    options: ["Dolphin", "Bat", "Penguin", "Kangaroo"],
    correctAnswer: "Penguin",
    explanation: "Penguins are birds, not mammals. Dolphins, bats, and kangaroos are all mammals."
  },
  
  // Sports
  {
    id: 16,
    category: "sports",
    question: "In which sport would you perform a slam dunk?",
    options: ["Volleyball", "Basketball", "Tennis", "Football"],
    correctAnswer: "Basketball",
    explanation: "A slam dunk is a type of basketball shot that is performed when a player jumps in the air and manually powers the ball downward into the basket."
  },
  {
    id: 17,
    category: "sports",
    question: "How many players are there in a standard soccer team on the field?",
    options: ["9", "10", "11", "12"],
    correctAnswer: "11",
    explanation: "A standard soccer (football) team has 11 players on the field, including the goalkeeper."
  },
  {
    id: 18,
    category: "sports",
    question: "Which country has won the most FIFA World Cup titles?",
    options: ["Germany", "Italy", "Argentina", "Brazil"],
    correctAnswer: "Brazil",
    explanation: "Brazil has won the FIFA World Cup five times, making it the most successful national team in the tournament's history."
  },
  {
    id: 19,
    category: "sports",
    question: "In which Olympic sport would you perform a vault?",
    options: ["Swimming", "Gymnastics", "Diving", "Track and Field"],
    correctAnswer: "Gymnastics",
    explanation: "The vault is one of the events in artistic gymnastics where athletes sprint down a runway and launch themselves over an apparatus."
  },
  {
    id: 20,
    category: "sports",
    question: "Which Grand Slam tennis tournament is played on clay courts?",
    options: ["Wimbledon", "US Open", "Australian Open", "French Open"],
    correctAnswer: "French Open",
    explanation: "The French Open, also known as Roland Garros, is played on clay courts and is the only Grand Slam tournament to use this surface."
  },
  
  // Technology
  {
    id: 21,
    category: "tech",
    question: "Which of these is NOT a programming language?",
    options: ["Python", "Java", "Banana", "Ruby"],
    correctAnswer: "Banana",
    explanation: "Banana is a fruit, not a programming language. Python, Java, and Ruby are all programming languages."
  },
  {
    id: 22,
    category: "tech",
    question: "Who is considered the co-founder of Apple Inc. along with Steve Jobs?",
    options: ["Bill Gates", "Steve Wozniak", "Mark Zuckerberg", "Elon Musk"],
    correctAnswer: "Steve Wozniak",
    explanation: "Steve Wozniak co-founded Apple Inc. with Steve Jobs and Ronald Wayne in 1976."
  },
  {
    id: 23,
    category: "tech",
    question: "What does CPU stand for?",
    options: ["Central Processing Unit", "Computer Personal Unit", "Central Process Utility", "Central Processor Undertaking"],
    correctAnswer: "Central Processing Unit",
    explanation: "CPU stands for Central Processing Unit, which is the primary component of a computer that performs most of the processing."
  },
  {
    id: 24,
    category: "tech",
    question: "Which company developed the first commercially successful graphical web browser?",
    options: ["Microsoft", "Apple", "Netscape", "Google"],
    correctAnswer: "Netscape",
    explanation: "Netscape Navigator, developed by Netscape Communications, was the first commercially successful web browser."
  },
  {
    id: 25,
    category: "tech",
    question: "What year was the first iPhone released?",
    options: ["2005", "2007", "2009", "2010"],
    correctAnswer: "2007",
    explanation: "The first iPhone was announced by Steve Jobs on January 9, 2007, and released in the United States on June 29, 2007."
  },
  
  // Music
  {
    id: 26,
    category: "music",
    question: "Who is known as the 'King of Pop'?",
    options: ["Elvis Presley", "Michael Jackson", "Prince", "Justin Timberlake"],
    correctAnswer: "Michael Jackson",
    explanation: "Michael Jackson is widely known as the 'King of Pop' due to his significant contributions to music, dance, and fashion."
  },
  {
    id: 27,
    category: "music",
    question: "Which band performed the hit song 'Bohemian Rhapsody'?",
    options: ["The Beatles", "Led Zeppelin", "Queen", "The Rolling Stones"],
    correctAnswer: "Queen",
    explanation: "'Bohemian Rhapsody' was written by Freddie Mercury for Queen's 1975 album 'A Night at the Opera'."
  },
  {
    id: 28,
    category: "music",
    question: "What instrument does a pianist play?",
    options: ["Violin", "Guitar", "Drums", "Piano"],
    correctAnswer: "Piano",
    explanation: "A pianist is a musician who plays the piano, a musical instrument with a keyboard."
  },
  {
    id: 29,
    category: "music",
    question: "Which of these is NOT a type of musical note?",
    options: ["Quarter note", "Half note", "Third note", "Whole note"],
    correctAnswer: "Third note",
    explanation: "There is no standard musical note called a 'third note'. Quarter notes, half notes, and whole notes are all standard note values."
  },
  {
    id: 30,
    category: "music",
    question: "Which music genre originated in Jamaica in the late 1960s?",
    options: ["Hip hop", "Reggae", "Jazz", "Blues"],
    correctAnswer: "Reggae",
    explanation: "Reggae developed in Jamaica in the late 1960s and was popularized internationally by artists like Bob Marley."
  },
  
  // Movies
  {
    id: 31,
    category: "movies",
    question: "Who directed the movie 'Jurassic Park'?",
    options: ["James Cameron", "Steven Spielberg", "Christopher Nolan", "George Lucas"],
    correctAnswer: "Steven Spielberg",
    explanation: "Jurassic Park was directed by Steven Spielberg and released in 1993."
  },
  {
    id: 32,
    category: "movies",
    question: "Which actor played Iron Man in the Marvel Cinematic Universe?",
    options: ["Chris Evans", "Chris Hemsworth", "Robert Downey Jr.", "Mark Ruffalo"],
    correctAnswer: "Robert Downey Jr.",
    explanation: "Robert Downey Jr. portrayed Tony Stark/Iron Man in the Marvel Cinematic Universe from 2008 to 2019."
  },
  {
    id: 33,
    category: "movies",
    question: "Which film won the Academy Award for Best Picture in 2020?",
    options: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"],
    correctAnswer: "Parasite",
    explanation: "'Parasite', directed by Bong Joon-ho, became the first non-English language film to win the Academy Award for Best Picture."
  },
  {
    id: 34,
    category: "movies",
    question: "In 'The Matrix', what color pill does Neo take?",
    options: ["Blue", "Red", "Green", "Yellow"],
    correctAnswer: "Red",
    explanation: "In 'The Matrix', Neo takes the red pill offered by Morpheus to learn the truth about the Matrix."
  },
  {
    id: 35,
    category: "movies",
    question: "Which of these films is NOT directed by Christopher Nolan?",
    options: ["Inception", "Interstellar", "The Revenant", "Dunkirk"],
    correctAnswer: "The Revenant",
    explanation: "'The Revenant' was directed by Alejandro González Iñárritu, not Christopher Nolan."
  },
  
  // Literature
  {
    id: 36,
    category: "literature",
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci",
    explanation: "The Mona Lisa was painted by Leonardo da Vinci in the 16th century."
  },
  {
    id: 37,
    category: "literature",
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare",
    explanation: "'Romeo and Juliet' is a tragedy written by William Shakespeare early in his career."
  },
  {
    id: 38,
    category: "literature",
    question: "Which book series features the character Harry Potter?",
    options: ["The Chronicles of Narnia", "The Lord of the Rings", "Harry Potter", "Percy Jackson & the Olympians"],
    correctAnswer: "Harry Potter",
    explanation: "Harry Potter is the main character in J.K. Rowling's Harry Potter book series."
  },
  {
    id: 39,
    category: "literature",
    question: "Who wrote '1984'?",
    options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "H.G. Wells"],
    correctAnswer: "George Orwell",
    explanation: "'1984' is a dystopian novel by English novelist George Orwell, published in 1949."
  },
  {
    id: 40,
    category: "literature",
    question: "Which of these is NOT one of Shakespeare's plays?",
    options: ["Hamlet", "Macbeth", "Pride and Prejudice", "Othello"],
    correctAnswer: "Pride and Prejudice",
    explanation: "'Pride and Prejudice' was written by Jane Austen, not William Shakespeare."
  }
];

export default quizData;