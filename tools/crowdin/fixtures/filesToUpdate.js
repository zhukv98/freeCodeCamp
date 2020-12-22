const filesToUpdate = [
  {
    change: 'M',
    origFilename:
      'curriculum/challenges/english/04-data-visualization/data-visualization-with-d3/add-classes-with-d3.md',
    fileContent: `---
id: 587d7fa7367417b2b2512bc8
title: Add Classes with D3
challengeType: 6
forumTopicId: 301473
---

# --description--

Using a lot of inline styles on HTML elements gets hard to manage, even for smaller apps. It's easier to add a class to elements and style that class one time using CSS rules. D3 has the \`attr()\` method to add any HTML attribute to an element, including a class name.

The \`attr()\` method works the same way that \`style()\` does. It takes comma-separated values, and can use a callback function. Here's an example to add a class of "container" to a selection:

\`selection.attr("class", "container");\`

Note that the "class" parameter will remain the same whenever you need to add a class and only the "container" parameter will change.

# --instructions--

Add the \`attr()\` method to the code in the editor and put a class of \`bar\` on the \`div\` elements.

# --hints--

Your \`div\` elements should have a class of \`bar\`.

\`\`\`js
assert($('div').attr('class') == 'bar');
\`\`\`

Your code should use the \`attr()\` method.

\`\`\`js
assert(code.match(/\.attr/g));
\`\`\`

# --seed--

## --seed-contents--

\`\`\`html
<style>
  .bar {
    width: 25px;
    height: 100px;
    display: inline-block;
    background-color: blue;
  }
</style>
<body>
  <script>
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

    d3.select("body").selectAll("div")
      .data(dataset)
      .enter()
      .append("div")
      // Add your code below this line



      // Add your code above this line
  </script>
</body>
\`\`\`

# --solutions--

\`\`\`html
<style>
  .bar {
    width: 25px;
    height: 100px;
    display: inline-block;
    background-color: blue;
  }
</style>
<body>
  <script>
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

    d3.select("body").selectAll("div")
      .data(dataset)
      .enter()
      .append("div")
      // Add your code below this line
      .attr("class","bar");
      // Add your code above this line
  </script>
</body>
\`\`\``
  },
  {
    change: 'M',
    origFilename:
      'curriculum/challenges/english/10-coding-interview-prep/data-structures/adjacency-list.md',
    fileContent: `---
id: 587d8256367417b2b2512c77
title: Adjacency List
challengeType: 1
forumTopicId: 301620
---

# --description--

Graphs can be represented in different ways. Here we describe one way, which is called an <dfn>adjacency list</dfn>. An adjacency list is essentially a bulleted list where the left side is the node and the right side lists all the other nodes it's connected to. Below is a representation of an adjacency list.

<blockquote>Node1: Node2, Node3<br>Node2: Node1<br>Node3: Node1</blockquote>

Above is an undirected graph because \`Node1\` is connected to \`Node2\` and \`Node3\`, and that information is consistent with the connections \`Node2\` and \`Node3\` show. An adjacency list for a directed graph would mean each row of the list shows direction. If the above was directed, then \`Node2: Node1\` would mean there the directed edge is pointing from \`Node2\` towards \`Node1\`. We can represent the undirected graph above as an adjacency list by putting it within a JavaScript object.

\`\`\`js
var undirectedG = {
  Node1: ["Node2", "Node3"],
  Node2: ["Node1"],
  Node3: ["Node1"]
};
\`\`\`

This can also be more simply represented as an array where the nodes just have numbers rather than string labels.

\`\`\`js
var undirectedGArr = [
  [1, 2], // Node1
  [0],    // Node2
  [0]     // Node3
];
\`\`\`

# --instructions--

Create a social network as an undirected graph with 4 nodes/people named \`James\`, \`Jill\`, \`Jenny\`, and \`Jeff\`. There are edges/relationships between James and Jeff, Jill and Jenny, and Jeff and Jenny.

# --hints--

\`undirectedAdjList\` should only contain four nodes.

\`\`\`js
assert(Object.keys(undirectedAdjList).length === 4);
\`\`\`

There should be an edge between \`Jeff\` and \`James\`.

\`\`\`js
assert(
  undirectedAdjList.James.indexOf('Jeff') !== -1 &&
    undirectedAdjList.Jeff.indexOf('James') !== -1
);
\`\`\`

There should be an edge between \`Jill\` and \`Jenny\`.

\`\`\`js
assert(
  undirectedAdjList.Jill.indexOf('Jenny') !== -1 &&
    undirectedAdjList.Jill.indexOf('Jenny') !== -1
);
\`\`\`

There should be an edge between \`Jeff\` and \`Jenny\`.

\`\`\`js
assert(
  undirectedAdjList.Jeff.indexOf('Jenny') !== -1 &&
    undirectedAdjList.Jenny.indexOf('Jeff') !== -1
);
\`\`\`

# --seed--

## --seed-contents--

\`\`\`js
var undirectedAdjList = {};
\`\`\`

# --solutions--

\`\`\`js
var undirectedAdjList = {
  James: ['Jeff'],
  Jill: ['Jenny'],
  Jenny: ['Jill', 'Jeff'],
  Jeff: ['James', 'Jenny']
};
\`\`\``
  }
];

module.exports = filesToUpdate;
