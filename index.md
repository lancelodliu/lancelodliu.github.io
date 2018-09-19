---
layout: default
---

# 文章
<ul>
　　{% for post in site.posts %}
　　　　<li>{{ post.date | date: "%Y-%m-%d" }} <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a> {{ post.author }}</li>
　　{% endfor %}
</ul>
