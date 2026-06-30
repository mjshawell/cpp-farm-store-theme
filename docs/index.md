---
layout: default
title: CPP Farm Store Group Project Assignments
---

<header>
  <p>IBM 6300 Group Project</p>

  <h1>CPP Farm Store Group Project Assignment Hub</h1>

  <p>
    This site organizes our group project assignments and deliverables for the
    CPP Farm Store consulting project, including omnichannel strategy, customer
    journey mapping, Shopify prototype development, and ecommerce recommendations.
  </p>
</header>

<section>
  <h2>Group Project Assignments</h2>

  <div class="grid">
    {% for assignment in site.data.assignments %}
      <div class="card">
        <span class="tag">{{ assignment.tag }}</span>

        <h3>{{ assignment.title }}</h3>

        <p>
          {{ assignment.description }}
        </p>

        <a class="button" href="{{ assignment.url | relative_url }}">
          {{ assignment.button }}
        </a>
      </div>
    {% endfor %}
  </div>
</section>

<section>
  <h2>Project Links</h2>

  <p>
    <a class="button" href="https://github.com/mjshawell/cpp-farm-store-theme" target="_blank">
      View GitHub Repository
    </a>
  </p>
</section>
