# nodeconf-streams-workshop

This is the repository for the NodeConf Streams Workshop. This workshop is designed to be a hands-on introduction to Node.js streams. The workshop is broken up into a series of exercises that will guide you through the basics of streams, and then into more advanced topics.

## Prerequisites

To get the most out of this workshop, you should have a basic understanding of Node.js and JavaScript. You should also have Node.js installed on your machine. If you don't have Node.js installed, you can download it from the [official website](https://nodejs.org/).
Make sure to have Node.js v20.18.0 or 22.5.0 higher.

## Excersise 1

Create a fibonacci generator using a readable stream.
The stream should emit the next number in the fibonacci sequence every time it is read from.
Make it so that it arrives at a limit (100 by default), and then reverses back to the start of the sequence;
when it reaches zero, it should start again to the limit and never end until is destroyed.
Make it so that the stream can be paused and resumed.

Implement this stream in both Node.js streams and Web Streams.

## Excersise 2

Implement a push variation and a pull variation for both Node.js and web streams.
For the push variation, the stream should produce a new number every 100ms.

## Excersise 3

Implement backpressure management, so that no more than 16 numbers are in the stream at any given time.

## Excersise 4

Implement a transform stream that converts the numbers to byte arrays.
The resulting readable should never buffer more than 16 numbers (whatever bytes there are).

## Excersise 5

Pipe the Node.js readable into the Web Writable Stream,
and pipe the Web Readable Stream into the Node.js Writable Stream.

## Excersise 6

Make the Readable stream cancellable (do it for both the push and pull versions).

