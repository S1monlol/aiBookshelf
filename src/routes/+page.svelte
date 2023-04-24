<script>
    // let books;
    let books = [
        {
            title: "Testing JavaScript",
            author: "Liang Yuxian Eugene",
            description:
                "This book is the ultimate guide to writing automated tests for your JavaScript applications. It covers everything from unit testing to end-to-end testing and shows how to use popular testing frameworks like Jest, Mocha, and Cypress.",
        },
        {
            title: "JavaScript Testing with Jasmine",
            author: "Evan Hahn",
            description:
                "This book is a comprehensive guide to using the Jasmine testing framework for JavaScript. It covers everything from setting up your testing environment to writing complex tests for your applications.",
        },
        {
            title: "Test-Driven JavaScript Development",
            author: "Christian Johansen",
            description:
                "This book teaches you how to write better JavaScript code by using the test-driven development (TDD) approach. It covers all the major testing frameworks like Jasmine, QUnit, and Mocha and shows you how to apply TDD to your JavaScript projects.",
        },
        {
            title: "Effective JavaScript Testing",
            author: "Lionel Osipov",
            description:
                "This book shows you how to design and implement effective testing strategies for your JavaScript applications. It covers everything from unit testing to integration testing and provides practical examples and tips for improving the quality of your code.",
        },
        {
            title: "JavaScript Testing Recipes",
            author: "Mark Ethan Trostler",
            description:
                "This book provides you with practical recipes for testing your JavaScript applications. It covers topics like mocking, spies, and stubs and shows how to use popular testing frameworks like Jasmine and Karma.",
        },
    ];

    // add an empty sources array to each book
    books.forEach((book) => {
        book.sources = [];
    });

    let bookSources = getSources(books);

    getSources(books);

    const addWord = () => {
        const topics = [
            "with the theme of loss",
            "about friendship and loyalty",
            "that will make my heart race",
            "that explores the depths of the human mind",
            "about adventure and exploration",
            "about environmentalism",
            "that will keep me on the edge of my seat",
            "with plot twists and unexpected turns",
            "about politics and social justice",
            "that inspires my self-expression",
            "about spiritual journeys and enlightenment",
            "that teaches me about entrepreneurship",
            "about cooking and gastronomy",
            "about sports and athletic challenges",
            "about the latest technological innovations",
            "that explores philosophy and ethics",
            "that challenges social norms",
            "that showcases the latest fashion trends",
            "about education and the pursuit of knowledge",
            "about the lives and careers of musicians",
            "that explores the complexity of nature",
            "about medicine and the science of healing",
            "that makes me laugh out loud",
            "about the supernatural and paranormal",
            "about war and the human experience",
            "about parenting and family life",
            "about scientific research and discovery",
            "that explores language and communication",
            "about sports and adventure",
            "that delves into the mysteries of faith",
        ];

        const word = document.getElementById("word");

        // Add a random word each char
        const randomWord = topics[Math.floor(Math.random() * topics.length)];
        for (let i = 0; i < randomWord.length; i++) {
            setTimeout(() => {
                word.textContent += randomWord[i];
                // console.log(word.innerHTML);

                if (word.textContent.length === randomWord.length) {
                    setTimeout(() => {
                        removeWord();
                    }, 1500);
                }
            }, 100 * i);
        }
    };

    const removeWord = () => {
        if (word.textContent.length === 0) {
            setTimeout(() => {
                addWord();
            }, 200);
        }
        for (let i = 0; i < word.textContent.length; i++) {
            // Remove the last character every second
            setTimeout(() => {
                word.textContent = word.textContent.slice(0, -1);
                // console.log(word.innerHTML);
                // console.log(word.textContent.length);
                if (word.textContent.length === 0) {
                    setTimeout(() => {
                        addWord();
                    }, 1000);
                }
            }, 70 * i);
        }
        // addWord();
    };

    async function getSources(books) {
        books.forEach((book) => {
            book.sources = [];

            const googleBooks = async () => {
                let results = await fetch(
                    `https://www.googleapis.com/books/v1/volumes?q=${book.title}+inauthor:${book.author}`
                );

                let body = await results.json();

                // console.log(body);

                // console.log(body.totalItems);
                if (body.totalItems > 0) {
                    console.log("Pushing google books");
                    book.sources.push({
                        title: "Google Books",
                        url: body.items[0].volumeInfo.infoLink,
                    });
                }
            };

            googleBooks();

            // book.sources.push({
            //     title: "Amazon",
            //     url: "https://www.amazon.com/s?k=" + book.title,
            // });
        });
        console.log(books);

        // return a promise, then resolve it with books 
        return new Promise((resolve) => {
            resolve(books);
        });
    }

    async function dotsAnimation() {
        // hide all demo elements by class
        const demo = document.getElementsByClassName("demo");
        for (let i = 0; i < demo.length; i++) {
            demo[i].style.display = "none";
        }

        const loading = document.getElementById("loading");
        const dots = ["", ".", "..", "..."];
        let i = 0;
        while (loading.style.display === "inline-block") {
            loading.textContent = "Loading " + dots[i];
            i++;
            if (i === dots.length) {
                i = 0;
            }
            await new Promise((resolve) => setTimeout(resolve, 500));
        }
    }

    async function handleSearch(event) {
        // show loading message with animated dots
        const loading = document.getElementById("loading");
        loading.style.display = "inline-block";
        dotsAnimation();

        event.preventDefault(); // prevent the form from submitting normally

        const query = document.querySelector("input").value;

        console.log(query);

        let response = await fetch("/api/search?book=" + query);

        let body = await response.json();

        console.log(response);

        console.log(body.data.choices[0].message.content);

        // convert string to object
        books = JSON.parse(body.data.choices[0].message.content);

        console.log(books);

        // hide loading message
        loading.style.display = "none";

        // show all demo elements by class
        const demo = document.getElementsByClassName("demo");
        for (let i = 0; i < demo.length; i++) {
            demo[i].style.display = "inline-block";
        }
    }

    if (typeof window !== "undefined") {
        // wait a couple seconds
        setTimeout(() => {
            const form = document.querySelector("form");
            form.addEventListener("submit", handleSearch); // add the event listener to the form
            getSources(books);

            removeWord();
        }, 1000);
    }
</script>

<body>
    <div>
        <h1>AI Bookshelf</h1>
        <p>Your AI powered personal book recommendation engine.</p>
    </div>

    <div id="demo">
        <h1 style="display: none;" id="loading">Searching</h1>

        <h1 class="demo" style="display: inline-block">
            <!-- svelte-ignore a11y-missing-content -->
            Find me a book
            <h1
                class="demo"
                id="word"
                style="display: inline-block; margin-left: 5px"
            />
        </h1>
    </div>

    <div class="search-container">
        <form>
            <input type="text" placeholder="Search..." />
        </form>
    </div>

    {#if books}
        <div id="book-results">
            {#each books as book, index}
                <div class="book">
                    <div class="book">
                        <h2>{book.title}</h2>
                        <p>{book.author}</p>
                        <p>{book.description}</p>
                        <div class="sources">
                            <h3>Sources</h3>

                            {#await bookSources then promise}
                                {#if promise[index]}
                                    {console.log(Object.values(promise[index].sources))}
                                    <div>
                                        <h3>Sources</h3>
                                        {#if promise[index].length === 0}
                                            <p>No sources found</p>
                                        {:else}
                                            <p>
                                                <a href={promise[index][0]}
                                                    >{promise[index][0]}</a
                                                >
                                            </p>
                                        {/if}
                                    </div>
                                {:else}
                                    <p>Loading...</p>
                                {/if}
                            {/await}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</body>

<style>
    body {
        font-family: "Open Sans", sans-serif;
        text-align: center;

        background-color: #1a2a3a;
    }

    .search-container {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .search-container form {
        display: flex;
        width: 100%;
        max-width: 600px;
    }

    .search-container input[type="text"] {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        background-color: #2d2d2d; /* Change the background color to a dark gray */
        color: #f1f1f1; /* Change the font color to white */
        margin-right: -3px;
    }

    /* Change the placeholder color to a lighter gray */
    .search-container input[type="text"]::placeholder {
        color: #b3b3b3;
    }

    #demo {
        text-align: center;
        width: 100%;
    }

    #book-results {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 20px;
    }

    .book {
        background-color: #2d2d2d;
        color: white;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        margin: 10px;
        max-width: 300px;
        padding: 10px;
    }

    h1 {
        font-size: 3rem;
        margin: 0;
        color: white;
    }
    p {
        color: white;
    }

    .sources {
        margin-top: 10px;
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 10px;
    }

    .sources h3 {
        font-size: 1.2rem;
        margin-top: 0;
    }

    .sources p {
        margin: 5px 0;
    }

    .sources a {
        color: #0077cc;
        text-decoration: none;
    }
</style>
