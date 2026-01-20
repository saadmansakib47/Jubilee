module.exports = {
  siteMetadata: {
    title: `Tasmiah Nawal`,
    description: `Personal Virtual Medical Chamber`,
    author: `@tasmiahnawal`,
    siteUrl: `https://tasmiahnawal.com/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Tasmiah Nawal`,
        short_name: `Tasmiah`,
        start_url: `/`,
        background_color: `#5B2D8B`,
        theme_color: `#5B2D8B`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, //add icon here
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      },
    },
    `gatsby-transformer-remark`,
    // Uncomment for offline support
    // `gatsby-plugin-offline`,
  ],
}