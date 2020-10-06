---
layout: default
---

## Contact

I would love to hear from you. Please fill the form below to email me. Or you can email me directly at
<a href="mailto:agrawal-d@outlook.com">agrawal-d@outlook.com</a>. I will try to respond soon!

<form id="email-form">

<label for="subject">Subject</label><br>
<input type="text" id="subject" name="subject"><br>
<label for="content">Content</label><br>
<textarea name="content" id="content"></textarea>
<br/>
<input type="submit" value="Send an email">

</form>

<script>
    const emailForm = document.getElementById("email-form");


    emailForm.addEventListener("submit", ()=>{
        const subject =  document.getElementById("subject").value;
        const content =  document.getElementById("content").value;
        console.log(subject,content);
        document.location.href =`mailto:agrawal-d@outlook.com?subject=${subject}&body=${content}`
    });

</script>

I am also active a few web communities and you can check out my content there too:

- [Hacker News](https://news.ycombinator.com/user?id=hereisdx)

- [Goodreads](https://www.goodreads.com/review/list/26803636)

I am also a member of my college's programming club - CRUx, you can [check out my page there](https://crux-bphc.github.io/members/divyanshu-agrawal)
