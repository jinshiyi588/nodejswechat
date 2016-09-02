---
layout: post
title:  "How to install jekyll 安装Jekyll教程"
date:   2016-07-16 20:24:43 +0800
categories: jekyll install
---

## This is my jekyll Installation steps

### 1. Install [rvm](https://rvm.io/)
- Before any other step install mpapis public key
{% highlight bash %}
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
{% endhighlight %}

- Install RVM (development version)
{% highlight bash %}
\curl -sSL https://get.rvm.io | bash
{% endhighlight %}

### 2. Install [ruby](https://www.ruby-lang.org/en/downloads/)
- Change RVM installation souces to ruby-china server(optional)
{% highlight bash %}
echo "ruby_url=https://cache.ruby-china.org/pub/ruby" > ~/.rvm/user/db
{% endhighlight %}

- List ruby versions on rvm
{% highlight bash %}
rvm list known
{% endhighlight %}

- Install ruby lastest version, my version is 2.3.0
{% highlight bash %}
rvm install ruby
{% endhighlight %}

- Install [Bundler](http://bundler.io/)
{% highlight bash %}
gem install bundler
{% endhighlight %}

### 3. Create a local repository for your Jekyll site
- Initialized empty Git repository in /Users/octocat/my-site/.git/
- Creates a new file directory on your local computer, initialized as a Git repository
{% highlight bash %}
git init `my-jekyll-site-project-name`
{% endhighlight %}

- Changes the working directory
{% highlight bash %}
cd `my-jekyll-site-project-name`
{% endhighlight %}

- Switched to a new branch 'gh-pages'
- Creates a new branch called 'gh-pages', and checks it out
{% highlight bash %}
git checkout -b gh-pages
{% endhighlight %}

### 4. install Jekyll using bundler
- Create a file and its content is:
{% highlight bash %}
source 'https://rubygems.org'
gem 'github-pages', group: :jekyll_plugins`
{% endhighlight %}
(Source can be changed , such as 'https://gems.ruby-china.org')

- Name the file `Gemfile`

- Install jekyll and other dependencies from the GitHub Pages gem:
{% highlight bash %}
bundler install
{% endhighlight %}

- Create jekyll template site
{% highlight bash %}
bundle exec jekyll new . --force
{% endhighlight %}

### 5. Run your Jekyll site locally!
{% highlight bash %}
bundle exec jekyll serve
{% endhighlight %}

#### Now preview your local jekyll site in your web browser at "http://localhost:4000"
