---
layout: default
---
# 关于我
测试开发，现居上海，主要研究分布式构建（DB）、持续集成（CI）以及自动化测试（AT）相关应用。

# 文章
<ul>
　　{% for post in site.posts %}
　　　　<li>{{ post.date | date: "%Y-%m-%d" }} <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a> {{ post.author }}</li>
　　{% endfor %}
</ul>
