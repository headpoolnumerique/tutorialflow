# Workflow to generate static filter page for hackmd tutorials

This repo compiles hackmd tutorials into a static html page with a frontend to filter tutorials via their tags.
Tags are defined within the Markdown document inside their yaml header.

## Markdown syntax

Make sure that all md files inside this repository follow this syntax:

~~~yaml
---
title: Title of tutorial
description: Short description
lang: specify langauge by countrycode (FR, EN, etc)
tags: tutorials,put_your_tag_here (for example: web, JS, hacking) 
year: 2020
---
~~~

## Installation

