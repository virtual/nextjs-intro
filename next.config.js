/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    webpack: (config, options) => {
        config.module.rules.push({
          test: /\.(graphql|gql)/,
          exclude: /node_modules/,
          loader: "graphql-tag/loader"
        })
    
        return config
      }
}
   
module.exports = nextConfig