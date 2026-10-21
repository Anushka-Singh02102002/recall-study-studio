# Performance Test

Tested the app with 5,000 flashcards using `performance.now()`.

- Before optimization:114.50 ms
- After optimization: 110 ms

I optimized the flashcard rendering to reduce the initial rendering workload. The measured time decreased by 4.50 ms in this test.