# Traveling Salesperson Problem -- Empirical Analysis

For this exercise, you'll need to take the code from the TSP Held-Karp and TSP
Local Search exercises. This can be your own implementation or somebody else's.
You will now do an empirical analysis of the implementations, comparing their
performance. Both the Held-Karp and the Local Search algorithms solve the same
problem, but they do so in completely different ways. This results in different
solutions, and in different times required to get to the solution.

Investigate the implementations' empirical time complexity, i.e. how the runtime
increases as the input size increases. *Measure* this time by running the code
instead of reasoning from the asymptotic complexity (this is the empirical
part). Create inputs of different sizes and plot how the runtime scales (input
size on the $x$ axis, time on the $y$ axis). Your largest input should have a
runtime of *at least* an hour. The input size that gets you to an hour will
probably not be the same for the Held-Karp and Local Search implementations.

In addition to the measured runtime, plot the tour lengths obtained by both
implementations on the same input distance matrices. The length of the tour that
Held-Karp found should always be less than or equal to the tour length that
Local Search found. Why is this?

Add the code to run your experiments, graphs, and an explanation of what you did
to this markdown file.

For the code, I put my code for Held-Karp and Local-Search into the same file. I then created a function that generates an undirected, weighted distance matrix, with paths having weights from 1 to 10. My code tests graph sizes from 0 to 21 with a for loop. It generates the matrix, outputs input size, starts time, runs held-karp, returns tour length, ends time, returns held-karp time, starts time, runs local search, returns tour length, ends time, the returns local search time. It does this for each size tested. 

[Runtime Graph](RuntimeGraph.png)

For runtime, the time it takes for the Held-Karp algorithm to run increases exponentially. The largest input value I was able to have run was a graph with 20 nodes. This ran for around half an hour. Once I attempted 21 nodes, I was unable to get the program to complete, even after waiting for multiple hours. If it ran with no issue, I predict it would have taken 60-90 minutes to run. For Local-Search, the runtime never increased significantly for the inputs tested. The time wavered between 0 and 1 milliseconds, increasing to 5 milliseconds with an input size of 20 nodes, likely continuing to increase with larger input sizes. 

[Shortest Tour Graph](TourPathGraph.png)

For the tour length returned, Held-Karp always returns a value less than or equal to Local-Search. This is because Held-Karp methodically tests each path, finding and returning the true shortest tour length. Local-Search randommly tests for a shorter path with no guarantee of finding the shortest one. As the input size increases, the tour length returned by Local-Search becomes greater and greater than what is returned by Help-Karp. There is less chance for the randomness factor to find shorter paths while testing. While Help-Karp boasts greater accuracy, it comes at the cost of an increasingly greater run time. 

[Local Search Time](LocalSearchHour.png)

Going past the hour-causing input for Held-Karp, I continued to test different input sizes for Local-Search. The runtime increased slowly, so I testing the function with input sizes incrementing by 100. The runtime started to exponentially increase, reaching over an hour at input size 1100. 

[Data Table](GraphNumbers.png)

[Data Table 2](localsearchtime.png)

These tables hold the values I recorded from running my code.

### Sources:

I used https://www.canva.com/ to generate my graphs and tables. 

“I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.” - Natalie Sleight
