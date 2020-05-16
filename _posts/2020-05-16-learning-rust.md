---
layout: post
title: "Learing Rust"
postdate: "May 16, 2020"
---

I've been learning Rust for the past few months, and it's been great so far.
I love the language, the syntax, the strict compiler, the tooling and the
communuty.

![Ferris - The Rust Mascor']({{site.url}}/img/ferris.png)

<center>
Ferris - The unofficial Rust Mascot
(License: Public Domain)
</center>

Rust is an open-source systems programming language, focused on performance and
safety. It has a compiled language, with a performance comparable to that of C++.
It has a great inferred typing system which is very convenient as you don't have
to worry about specifying types all the time, all while ensuring the robustness
of a static type sysyem, but I will get to that later.

I'm using "The Rust Programming Language" by by Steve Klabnik and Carol Nichols
which is the de-facto book used to learn Rust. It is fondly called as "The Book"
by the Rust community. It's a very nice book with lots of background on every
topic, and plenty of examples, and some real-world practice projects!

## Why I'm learning Rust

Since a long time, I've been programming in JavaScript. It's a dynamically typed
language that can be used in a lot of places - on the web to add functionality
to websites, on the server using Node.JS, on the desktop using Electron, or on
mobile devices using React Native - basicaly everywhere. And I love it. But
programming in plain JavaScript got boring after so many years. I wanted to
learn a statically typed language that is fast and modern, to explore new areas.
Rust fit the requirements perfectly, so I started learning it, and I love it so
far. I've learnt a lof of new things while studying it, apart from the language
itself. I do know C & C++ already, but I wanted to learn something more modern.

## What I like about Rust so far

First of all, I'm just a begginer and there are a lot of features I don't know
about - but I know enough to say that I like it.

### Automaitc Type inference

Most of the times, you don't have to specify types at all! The rust compiler is
intelligent enough to infer types in even to most complex situations.

A simple example, copied from Rust By Example (Section 5.3) is:

```rust
fn main() {
    // Because of the annotation, the compiler knows that `elem` has type u8.
    let elem = 5u8;

    // Create an empty vector (a growable array).
    let mut vec = Vec::new();
    // At this point the compiler doesn't know the exact type of `vec`, it
    // just knows that it's a vector of something (`Vec<_>`).

    // Insert `elem` in the vector.
    vec.push(elem);
    // Aha! Now the compiler knows that `vec` is a vector of `u8`s (`Vec<u8>`)
    // TODO ^ Try commenting out the `vec.push(elem)` line

    println!("{:?}", vec);
}
```

It makes programming so much more fast and fun!

### Lack of `null`

Rust does not have `null`. Null is a value that is currently invalid or absent.
Most programming languages, notably C/C++ and Java support it, and it makes it
very easy to write buggy code my making assumptions about your code. For
example, the following C++ code will result in a run-time exception:

```c++
vector<int> x;
x.push_back(10);
```

because the vector has not been initialized and the compiler does not warn you
before hand. Although, Rust does not have null, iy provides a built-in enum
`Option` which can encode the concept of a value being present or absent.

```rust
enum Option {
  Some(T),
  None,
}
```

and you can't write buggy code with it because the rust compiler ensures, at
compile time, that your code handles both the cases - `Some` and `None`.

### An expansive standard library

[The Rust standard library](https://doc.rust-lang.org/std/)
is full of useful abstractions that make programming
much easier and save you from re-inventing the wheel. The functions etc. have
been very well defined and integrated with each other and it's a breeze to
use them. All the library functions have been well documented with markdown
formatting, and includes examples too! So it's really easy to look them up
right from your editor.

### The Cargo and Crates ecosystem.

Rust comes with it's own
[package manager - `cargo`](https://doc.rust-lang.org/cargo/).
It's very easy to use and the whole ecosystem is filled with user-contributed
packages ( called Crates ) that extend Rust functionality. Some of the crates
are maintained by the Rust team itself and they are very well written. It's
easy to publish your own crates, or use them in your program. Some of the
crates, like [regex](https://github.com/rust-lang/regex) are the one of the
fastest implementaions out there, across programming languages, because they are
able to use modern programming languae features.

### Ferris

I love Ferris, the unofficail Rust mascot. It makes the languae so much cuter
and friendlier. [Need I say anything more?](https://rustacean.net/)

---

_There are a lot of other things I like, but this list is long enough for now._

## The future

After going through The Book, I hope to create some useful projects using Rust,
and maybe even contribute to the language itself. If you found the language to
be exciting, and want to check it out for yourself, you can go through the
[official website](https://www.rust-lang.org/), which has links to lots of
resources.
