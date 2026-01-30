const path = require("path")

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  // Create client-only routes for journal detail pages
  // These routes will be handled client-side
  createPage({
    path: "/journal/blog/*",
    matchPath: "/journal/blog/:id",
    component: require.resolve("./src/pages/journal/[type]/[id].tsx"),
  })

  createPage({
    path: "/journal/research/*",
    matchPath: "/journal/research/:id",
    component: require.resolve("./src/pages/journal/[type]/[id].tsx"),
  })

  createPage({
    path: "/journal/case-study/*",
    matchPath: "/journal/case-study/:id",
    component: require.resolve("./src/pages/journal/[type]/[id].tsx"),
  })

  createPage({
    path: "/journal/internship-notes/*",
    matchPath: "/journal/internship-notes/:id",
    component: require.resolve("./src/pages/journal/[type]/[id].tsx"),
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  })
}
