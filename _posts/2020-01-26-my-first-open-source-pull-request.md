---
layout: post
title: "My first pull request to get merged!"
postdate: "January 26, 2020"
---

I have been using GitHub for a long time. I use it to create hobby projects, to collaborate with friends on college projects, and sometimes even as backup storage! But until recently, I had never really contributed to an open-source project ( via GitHub or otherwise ). That changed this month. [My first pull request got merged in Zulip mobile](https://github.com/zulip/zulip-mobile/pull/3797)

![pull-request]({{site.url}}/img/pull-request.png)

A brief introduction to Zulip - [Zulip](https://zulipchat.com/) is an open-source, cross-platform team chat application and server. It has some cool features like topic-based messaging that makes it very good for collaboration.

However, it was not a simple journey. [My first pull request in zulip-mobile](https://github.com/zulip/zulip-mobile/pull/3736) was closed without being merged! But it was not because my code wasn't good enough ( I hope :p). The pull request changed event listeners for the chat apps message list by making them passive, which could result in performance improvement.

![unmerged]({{site.url}}/img/unmerged.png)

However, while working I was working on it, the reviewer realized that the change wasn't needed because such events are default passive in most modern web browsers - and them message list of Zulip's mobile application is an embedded web-view. Damn, I was disappointed. I really wanted it to get merged.

So soon after, I began looking for simple issues I could fix - and found one that looked relatively simple. [The one I found](https://github.com/zulip/zulip-mobile/issues/3528) required removal of the 'Reply' option from a message when you are already in the reply screen! Well this was simple. But it turned out, while the solution itself was simple, I had a **lot** to learn - writing clean code, writing code that adheres to the style of the organization, writing proper commit messages and a lot more! I really enjoyed the process, and my reviewer, [Ray Kraesig](https://github.com/ray-kraesig) was extremely kind and helpful, both while reviewing this PR, and in the one that didn't get merged - I certainly would not have been able to do it without him! Thanks a lot, Ray! In the end, the PR was only 10 lines of changes - but it still took time. I hope to contribute to Zulip even more, because 1. The product is amazing and 2. The developer community is very helpful and I hope to learn a lot!
