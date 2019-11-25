---
title : Github pages static blogs using Jekyll
description: In this blog post, I discuss how I discovered Jekyll and used it to create my very own static blog and hosted it on github pages!
header: Github pages static blogs using Jekyll
---
A long time ago, I stumbled upon a beautiful and simple website - the personal blog / website of [Alexy Guzey](https://guzey.com/). And while the content was interesting, what left the biggest impression on me was how lightweight his website was. I tinkered a bit and realized that he was not using Wordpress or Blogger (he uses [hugo](https://gohugo.io/), which are rather heavy (and ugly). I realized that I too wanted my own blog. Being the programmer that I am, I started creating my own blog-generating website called, well, [blog](https://github.com/agrawal-d/blog). But I quickly realized the problem - it needed dynamic hosting. And since Github Pages was the hosting I wanted to use, I had to search for another alternative.

### Enter Jekyll

![Jekyll logo](img/logo-jekyll.png)

Then a few days ago, I stumbled upon [Jekyll](https://jekyllrb.com/). And I immediately fell in love. Jkeyll was exactly what I was looking for. I no longer needed to reinvent the wheel. The project was very active, the documentation was beautiful and minmal themes were a-plenty! But the most important thing to me was that it was completely customizable! I like to tinker a lot with whatever I make, and Wordpress and Blogger are a bit difficult to handle for me. It took me less that 30 minutes to set up my own blog.

### A quick tutorial

If you, like me, love the idea of using Jekyll ( which is written in Ruby, if you want to know ), then let me show you just _how_ easy it is to use it. This is not an exhaustive introduction, and the [official documentation](https://jekyllrb.com/docs/) is the best place to get started. However, you will find the gist of what it is below.


<ol>
<li>Install ruby and ruby-dev

If you are using a linux distribution, it should be very easy. Just use you package manager. For windows and mac, see the docs for detailed steps.

{% highlight bash linenos %}
sudo apt install ruby
sudo apt install ruby-dev
{% endhighlight %}
</li>
<li>Install Jekyll and bundler gems

This should be sasy
{% highlight bash linenos %}
gem install jekyll bundler
{% endhighlight %}
</li>
<li>Create a new blog in the folder <code>./blog</code>
{% highlight bash linenos %}
jekyll new myblog
{% endhighlight %}
</li>
<li> cd into the current directory and serve the site locally
{% highlight bash linenos %}
cd myblog
bundle exec jekyll serve
{% endhighlight %}
</li>
</ol>

That's it. Your static blog-site should be ready to publish. Open it in your browser. It should look something like this

![Jekyll screenshot](img/jekyll-demo.png)


### Limitations

Nothing is perfect. The downside of Jekyll is the same as it's upside - its a stactic website generator. You cand have dynamically generated content like comments, dashboards, user-generated content or submissions or customized content for different users. But I think that its for the better that these features are not included. I prefer simple, clean, fast websites. Jekyll was never meant for dynamic content.

But I still think that comments are important for a blog. It's great to hear what users think of your posts and they usually have something to add to it. There are solutions like Github events or Disqus, but I dont like either of them. Github events seems just wrong, and I Disqus has ads and privacy concerns. I am thinking of hosting an actual Node.JS server and fetching comments via [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)). I will create another post when I finally implement that. Until then, to send your thoughts to, visit [this page](/contact).

