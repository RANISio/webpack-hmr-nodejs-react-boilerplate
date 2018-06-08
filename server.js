
import app from './src/server/app'
// import webpack from 'webpack'
// import webpackDevMiddleware from 'webpack-dev-middleware'
// import config from '../../webpack.config.js'

// const compiler = webpack(config)

// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config[1].output.publicPath
// }))

const appFile = './src/server/app'

if (module.hot) {
  module.hot.accept(appFile, () => {
    console.log(`🔁  HMR Reloading '${appFile}'...`);
  });

  console.info("✅  Server-side HMR Enabled!");
} else {
  console.warn("❌  Server-side HMR Not Supported.");
}

app.listen(3000, error => {
  if (error) {
    console.error(error)
    return
  }
  console.log("Listening at http://localhost:3000")
})

export default app